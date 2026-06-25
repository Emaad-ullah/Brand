const fs = require('fs');
const path = require('path');

const srcPants = 'c:/Users/Emaad/Desktop/Brand/brand-frontend/public/images/Women/unfilter -pants/Jeans for Women Pakistan- Wide Leg- Mom Fit and Culottes - 5_5_2026 4-38-20 PM/Jeans for Women Pakistan_ Wide Leg, Mom Fit and Culottes';
const srcShirts = 'c:/Users/Emaad/Desktop/Brand/brand-frontend/public/images/Women/unfilter-shirts/Buy Shirts for Women in Pakistan - Casual - Trendy Shirts - 5_5_2026 4-42-26 PM/Buy Shirts for Women in Pakistan _ Casual & Trendy Shirts';
const destPants = 'c:/Users/Emaad/Desktop/Brand/brand-frontend/public/images/Women/Women-pants';
const destShirts = 'c:/Users/Emaad/Desktop/Brand/brand-frontend/public/images/Women/Women-shirts';

if (!fs.existsSync(destPants)) fs.mkdirSync(destPants, { recursive: true });
if (!fs.existsSync(destShirts)) fs.mkdirSync(destShirts, { recursive: true });

function processDir(src, dest, prefix) {
    const files = fs.readdirSync(src).filter(f => !f.startsWith('.'));
    const groups = {};

    files.forEach(f => {
        // Group by product identifier (e.g., "14_6" or "1_abcdef")
        const base = f.split(' ')[0].split('(')[0].replace(/\.[^/.]+$/, "");
        if (!groups[base]) groups[base] = [];
        groups[base].push(f);
    });

    let count = 1;
    const mapping = [];

    Object.keys(groups).forEach(base => {
        const groupFiles = groups[base].sort();
        const front = groupFiles[0];
        const close = groupFiles.length > 1 ? groupFiles[1] : null;

        const frontDest = `${prefix}-${count}-front.jpg`;
        fs.renameSync(path.join(src, front), path.join(dest, frontDest));
        
        let closeDest = null;
        if (close) {
            closeDest = `${prefix}-${count}-close.jpg`;
            fs.renameSync(path.join(src, close), path.join(dest, closeDest));
        }

        mapping.push({ id: count, front: frontDest, close: closeDest });
        count++;

        // Clean up remaining files in group (user said Do NOT keep any images in original folders)
        for (let i = 2; i < groupFiles.length; i++) {
            try { fs.unlinkSync(path.join(src, groupFiles[i])); } catch(e) {}
        }
    });

    return mapping;
}

const pantsMap = processDir(srcPants, destPants, 'pants');
const shirtsMap = processDir(srcShirts, destShirts, 'shirt');

console.log(JSON.stringify({ pants: pantsMap, shirts: shirtsMap }, null, 2));
