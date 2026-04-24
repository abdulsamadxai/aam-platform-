/* eslint-disable @typescript-eslint/no-require-imports */
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseServiceKey = 'your-service-role-key'; // This should be replaced with the actual key from .env.local

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function createAdmin() {
    console.log('--- INITIATING ADMIN CREATION PROTOCOL ---');

    const email = 'admin@aamaldives.mv';
    const password = 'AAMAdmin2026!';

    // 1. Create the user in Auth
    const { data: userData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        app_metadata: { role: 'admin' }
    });

    if (authError) {
        if (authError.message.includes('already registered')) {
            console.log('USER EXISTS. ATTEMPTING METADATA UPDATE...');

            // Get the existing user
            const { data: existingUser } = await supabase.auth.admin.listUsers();
            const user = existingUser.users.find(u => u.email === email);

            if (user) {
                const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
                    app_metadata: { role: 'admin' }
                });
                if (updateError) console.error('UPDATE_FAILED:', updateError);
                else console.log('METADATA_SYNCHRONIZED: ROLE=ADMIN');
            }
        } else {
            console.error('AUTH_CREATION_FAILED:', authError);
            return;
        }
    } else {
        console.log('USER_CREATED:', userData.user.id);
    }

    // 2. Ensure member record exists as admin
    const { error: memberError } = await supabase
        .from('members')
        .upsert({
            email,
            full_name: 'AAM SYSTEM ADMINISTRATOR',
            status: 'active',
            category: 'Fellow'
        }, { onConflict: 'email' });

    if (memberError) console.error('MEMBER_RECORD_FAILED:', memberError);
    else console.log('MEMBER_RECORD_SYNCHRONIZED');

    console.log('--- PROTOCOL COMPLETE ---');
    console.log(`URL: http://localhost:3000/login`);
    console.log(`EMAIL: ${email}`);
    console.log(`PASSWORD: ${password}`);
}

createAdmin();
