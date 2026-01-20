import * as si from 'react-icons/si';
import * as lucide from 'lucide-react';

const iconsToCheck = [
    'SiC', 'SiCplusplus', 'SiJava', 'SiPython', 'SiJavascript', 'SiDart',
    'SiReact', 'SiNodedotjs', 'SiExpress', 'SiSpringboot', 'SiFlutter',
    'SiMongodb', 'SiMysql',
    'SiScikitlearn', 'SiGit', 'SiLinux', 'SiPostman'
];

const lucideToCheck = ['Brain', 'Network', 'Terminal', 'Database', 'Code2', 'AppWindow'];

console.log('--- Checking React Icons ---');
iconsToCheck.forEach(icon => {
    if (!si[icon]) console.log(`MISSING: ${icon}`);
    else console.log(`OK: ${icon}`);
});

console.log('--- Checking Lucide Icons ---');
lucideToCheck.forEach(icon => {
    if (!lucide[icon]) console.log(`MISSING: ${icon}`);
    else console.log(`OK: ${icon}`);
});
