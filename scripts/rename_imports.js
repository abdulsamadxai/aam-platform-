const fs = require('fs');
const path = require('path');

function replaceInFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf8');
    const newContent = content.replace(/@\/lib\/mock-data/g, '@/lib/api');
    if (newContent !== content) {
        fs.writeFileSync(filepath, newContent, 'utf8');
        console.log(`Updated ${filepath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                walk(filepath);
            }
        } else {
            if (filepath.endsWith('.ts') || filepath.endsWith('.tsx')) {
                replaceInFile(filepath);
            }
        }
    }
}

walk('.');
