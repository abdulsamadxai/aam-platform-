require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupStorage() {
    console.log('--- INITIATING STORAGE PROTOCOL ---');

    const buckets = [
        { name: 'gallery', public: true },
        { name: 'news-images', public: true },
        { name: 'job-cvs', public: false }
    ];

    for (const bucket of buckets) {
        const { data, error } = await supabase.storage.createBucket(bucket.name, {
            public: bucket.public,
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
            fileSizeLimit: 5242880 // 5MB
        });

        if (error) {
            if (error.message.includes('already exists')) {
                console.log(`BUCKET_EXISTS: ${bucket.name}`);
            } else {
                console.error(`CREATION_FAILED: ${bucket.name}`, error);
            }
        } else {
            console.log(`BUCKET_CREATED: ${bucket.name}`);
        }
    }

    console.log('--- STORAGE PROTOCOL COMPLETE ---');
}

setupStorage();
