
const fs = require('fs');

function checkTags(filename, tagName) {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Remove strings and comments
    content = content.replace(/\/\/.*$/gm, '');
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    const stack = [];
    const lines = content.split('\n');
    const tagRegex = new RegExp(`<${tagName}([^>]*)|</${tagName}>`, 'g');
    
    lines.forEach((line, i) => {
        const lineNum = i + 1;
        let match;
        while ((match = tagRegex.exec(line)) !== null) {
            const token = match[0];
            if (token.startsWith('</')) {
                if (stack.length === 0) {
                    console.log(`Error: Unexpected closing </${tagName}> at line ${lineNum}`);
                } else {
                    stack.pop();
                }
            } else if (!token.endsWith('/>')) {
                // Check if it's a self-closing tag (ends with /> in the full tag content)
                // The regex above only gets the start of the tag.
                // Let's improve the regex to get the full opening tag.
                const fullTagMatch = line.slice(match.index).match(/^<[^>]+>/);
                if (fullTagMatch && fullTagMatch[0].endsWith('/>')) {
                    continue;
                }
                stack.push(lineNum);
            }
        }
    });
    
    stack.forEach(startLine => {
        console.log(`Error: Unclosed <${tagName}> at line ${startLine}`);
    });
}

console.log("Checking <div> tags...");
checkTags('src/components/Dashboard.tsx', 'div');
console.log("\nChecking <Card> tags...");
checkTags('src/components/Dashboard.tsx', 'Card');
