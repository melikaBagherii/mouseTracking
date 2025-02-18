const puppeteer = require('puppeteer');

(async () => {
    // Launch browser
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1200, height: 800 } });
    const page = await browser.newPage();

    // Navigate to the local page
    await page.goto('http://127.0.0.1:5500/index.html', { waitUntil: 'load' });

    console.log("Bot started...");

    // Type in username and password
    await page.type('#username', 'botuser', { delay: 100 });
    await page.type('#password', 'botpassword', { delay: 100 });

    // Click the login button
    await page.click('#loginButton');

    // Wait for status message to appear
    await page.waitForSelector('#status', { visible: true });

    // Extract and log the result
    const status = await page.$eval('#status', el => el.innerText);
    console.log("Login Status:", status);

    // Close the browser after a short delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    // await browser.close();
})();
