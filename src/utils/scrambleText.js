export function handleScrambleHover(e) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    const target = e.target;
    const originalText = target.dataset.original || target.innerText;
    
    // Store original text if not already stored
    if (!target.dataset.original) {
        target.dataset.original = originalText;
    }
    
    // Clear any existing interval
    if (target.dataset.intervalId) {
        clearInterval(parseInt(target.dataset.intervalId));
    }
    
    let iteration = 0;
    
    const interval = setInterval(() => {
        target.innerText = originalText
            .split('')
            .map((char, index) => {
                if (char === ' ' || char === '\n') return char;
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        // 400ms total / 30ms interval = ~13 frames. 
        // We increment iteration by the word length / 13 every frame to reveal left to right
        iteration += originalText.length / (400 / 30);
        
        if (iteration >= originalText.length) {
            clearInterval(interval);
            target.innerText = originalText;
            target.dataset.intervalId = '';
        }
    }, 30);
    
    target.dataset.intervalId = interval.toString();
}
