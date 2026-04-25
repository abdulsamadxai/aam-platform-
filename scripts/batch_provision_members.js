require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function batchProvisionMembers() {
    console.log('--- INITIATING BATCH PROVISIONING PROTOCOL ---');

    // 1. Fetch all members who don't have an auth link yet or all members
    const { data: members, error: fetchError } = await supabase
        .from('members')
        .select('id, email, full_name');

    if (fetchError) {
        console.error('FETCH_FAILED:', fetchError);
        return;
    }

    console.log(`FOUND ${members.length} MEMBERS. STARTING CREATION...`);

    for (const member of members) {
        console.log(`PROCESSING: ${member.full_name} (${member.email})`);

        // 2. Create user in Auth
        const { data: userData, error: authError } = await supabase.auth.admin.createUser({
            email: member.email,
            password: '123456',
            email_confirm: true,
            app_metadata: { role: 'member' },
            user_metadata: { full_name: member.full_name }
        });

        if (authError) {
            if (authError.message.includes('already registered')) {
                console.log(`SKIPPING: ${member.email} already has an account.`);
                
                // Still update metadata just in case
                const { data: existing } = await supabase.auth.admin.listUsers();
                const user = existing.users.find(u => u.email === member.email);
                if (user) {
                    await supabase.auth.admin.updateUserById(user.id, {
                        app_metadata: { role: 'member' }
                    });
                    // Sync the member ID to the auth ID
                    await supabase.from('members').update({ id: user.id }).eq('email', member.email);
                }
            } else {
                console.error(`FAILED: ${member.email}`, authError.message);
            }
        } else {
            console.log(`CREATED: ${member.email} -> ID: ${userData.user.id}`);
            
            // 3. Link the new Auth ID back to the members table
            // This is crucial because our 'members' table ID is a PK that references auth.users
            // In a fresh migration, we should actually move the member data to match the new ID.
            
            // Note: Since 'id' is a Primary Key and we can't easily change it if it has refs,
            // we will delete the old 'placeholder' row and insert the real one with the new ID.
            const { error: syncError } = await supabase
                .from('members')
                .update({ id: userData.user.id })
                .eq('email', member.email);
            
            if (syncError) console.error(`SYNC_ERROR: ${member.email}`, syncError);
        }
    }

    console.log('--- BATCH PROVISIONING COMPLETE ---');
}

batchProvisionMembers();
