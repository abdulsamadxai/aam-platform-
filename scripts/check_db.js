const net = require('net');

const hosts = [
    'db.gfybxonwarqcfltfqhvv.supabase.co',
    'gfybxonwarqcfltfqhvv.supabase.co',
    'db.gfybxonwarqcfltfqhvv.supabase.net'
];

hosts.forEach(host => {
    const client = new net.Socket();
    client.setTimeout(2000);
    client.connect(5432, host, () => {
        console.log(`OPEN: ${host}:5432`);
        client.destroy();
    });
    client.on('error', (err) => {
        console.log(`CLOSED: ${host}:5432 - ${err.message}`);
        client.destroy();
    });
    client.on('timeout', () => {
        console.log(`TIMEOUT: ${host}:5432`);
        client.destroy();
    });
});
