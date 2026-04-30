const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const srcDir = 'd:\\PROJECTS\\PORTFOLIO\\portfolio3\\src';
const files = walk(srcDir);

let changedFiles = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Replace text-white/\d+ with text-white
    const newContent = content.replace(/text-white\/\d+/g, 'text-white');
    
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        changedFiles++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Updated ${changedFiles} files.`);
