require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('CRITICAL_FAILURE: Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function createAdmin() {
    console.log('--- INITIATING ADMIN CREATION PROTOCOL ---');

    const email = process.env.ADMIN_EMAIL || 'admin@aamaldives.mv';
    const password = process.env.ADMIN_PASSWORD || 'AAMAdmin2026!';

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
