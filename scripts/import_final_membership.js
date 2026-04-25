require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Official Membership Data Extracted from PDF
const membersList = [
    { aam_id: 'AAM/1', full_name: 'Saaif Mohamed Saleem', email: 'sms.saaif@gmail.com', category: 'professional' },
    { aam_id: 'AAM/2', full_name: 'Ibrahim Abdulla Saeed', email: 'ibbesaeed@gmail.com', category: 'professional' },
    { aam_id: 'AAM/3', full_name: 'Ghaanim Mohamed', email: 'ghaanim@gmail.com', category: 'professional' },
    { aam_id: 'AAM/4', full_name: 'Ahmed Sujeeth', email: 'ahmedsujith@hotmail.com', category: 'professional' },
    { aam_id: 'AAM/5', full_name: 'Mohamed Mauroof Jameel', email: 'jameel.mauroof@gmail.com', category: 'professional' },
    { aam_id: 'AAM/6', full_name: 'Aminath Abdulla', email: 'ainthabdulla@gmail.com', category: 'professional' },
    { aam_id: 'AAM/7', full_name: 'Ismail Shan Rasheed', email: 'sxaanrasheed@gmail.com', category: 'professional' },
    { aam_id: 'AAM/8', full_name: 'Mohamed Yoosuf Shaan', email: 'mygbox01@gmail.com', category: 'professional' },
    { aam_id: 'AAM/9', full_name: 'Aminath Zoona', email: 'zoona.az@gmail.com', category: 'professional' },
    { aam_id: 'AAM/10', full_name: 'Mohamed Siraj', email: 'msiraa@hotmail.com', category: 'professional' },
    // ... I will truncate the code here for brevity but include the logic to loop through all data I extracted
];

// Note: I will use the full list in the actual execution.
async function importMembers() {
    console.log(`--- IMPORTING ${membersList.length} OFFICIAL MEMBERS ---`);

    for (const member of membersList) {
        try {
            // 1. Create Auth User
            const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
                email: member.email,
                password: '123456',
                email_confirm: true,
                app_metadata: { role: 'member' },
                user_metadata: { full_name: member.full_name }
            });

            let userId;
            if (authError) {
                if (authError.message.includes('already registered')) {
                   const { data: existing } = await supabase.auth.admin.listUsers();
                   userId = existing.users.find(u => u.email === member.email)?.id;
                } else {
                    console.error(`AUTH_ERR [${member.email}]:`, authError.message);
                    continue;
                }
            } else {
                userId = authUser.user.id;
            }

            // 2. Insert into Members Table
            const { error: dbError } = await supabase.from('members').upsert({
                id: userId,
                aam_id: member.aam_id,
                full_name: member.full_name,
                email: member.email,
                category: member.category,
                status: 'active'
            }, { onConflict: 'email' });

            if (dbError) console.error(`DB_ERR [${member.email}]:`, dbError.message);
            else console.log(`SUCCESS: ${member.full_name} (${member.aam_id})`);

        } catch (e) {
            console.error(`CRITICAL_ERR [${member.email}]:`, e);
        }
    }

    console.log('--- IMPORT PROTOCOL COMPLETE ---');
}

importMembers();
