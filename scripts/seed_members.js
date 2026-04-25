require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedMembers() {
    console.log('--- SEEDING MEMBERS ---');

    const members = [
        { email: 'member1@aamaldives.mv', full_name: 'Member One', status: 'active', category: 'professional', aam_id: 'AAM-M-001' },
        { email: 'member2@aamaldives.mv', full_name: 'Member Two', status: 'active', category: 'general', aam_id: 'AAM-M-002' },
        { email: 'member3@aamaldives.mv', full_name: 'Member Three', status: 'active', category: 'associate', aam_id: 'AAM-M-003' }
    ];

    const { error } = await supabase.from('members').upsert(members, { onConflict: 'email' });
    if (error) console.error('SEED_FAILED:', error);
    else console.log('SEED_SUCCESSFUL');
}

seedMembers();
