const puppeteer = require('puppeteer');

// Function to generate a random delay
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Ease function for smooth mouse movement
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Simulate human-like mouse movement
async function moveMouseSmoothly(page, startX, startY, endX, endY, steps = 50) {
    for (let i = 0; i <= steps; i++) {
        let t = easeInOutQuad(i / steps);
        let x = startX + (endX - startX) * t;
        let y = startY + (endY - startY) * t;
        await page.mouse.move(x, y, { steps: 1 });

        await new Promise(resolve => setTimeout(resolve, getRandomDelay(5, 15)));
    }
}

// Main function
(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1200, height: 800 } });
    const page = await browser.newPage();

    console.log("Bot started...");

    // Navigate to the page
    await page.goto('http://127.0.0.1:5500/index.html', { waitUntil: 'load' });

    // Move mouse and interact with elements
    await moveMouseSmoothly(page, 100, 150, 300, 400, 80);
    await moveMouseSmoothly(page, 300, 400, 500, 600, 70);
    await moveMouseSmoothly(page, 500, 600, 700, 450, 60);
    await moveMouseSmoothly(page, 700, 450, 350, 250, 40);

    // Random delay before typing
    await new Promise(resolve => setTimeout(resolve, getRandomDelay(500, 1500)));

    // Type username and password
    await page.type('#username', 'botuser', { delay: getRandomDelay(30, 120) });
    await new Promise(resolve => setTimeout(resolve, getRandomDelay(300, 700)));
    await page.type('#password', 'botpassword', { delay: getRandomDelay(50, 150) });

    // Move to login button and click
    await moveMouseSmoothly(page, 350, 250, 400, 320, 30);
    await new Promise(resolve => setTimeout(resolve, getRandomDelay(100, 500)));
    await page.click('button', { delay: getRandomDelay(50, 200) });

    // Wait for results
    await page.waitForSelector('#status', { visible: true });
    await page.waitForSelector('#mousemoveDataLength', { visible: true });

    // Retrieve data
    const result = await page.$eval('#status', el => el.innerText);
    const mouseMoves = await page.$eval('#mousemoveDataLength', el => el.innerText);


    console.log("Mouse Moves:", mouseMoves);
    console.log("Detection Result:", result);


    // Keep the browser open for debugging
    // await browser.close();
})();
