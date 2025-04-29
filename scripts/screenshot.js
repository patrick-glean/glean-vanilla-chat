const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshot() {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Set viewport size to match chat container
        await page.setViewport({
            width: 400,
            height: 600
        });

        // Load the local file
        const filePath = `file:${path.join(__dirname, '../dist/index.html')}`;
        console.log('Loading file:', filePath);
        await page.goto(filePath, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Wait for the chat container to be visible
        await page.waitForSelector('.chat-container', { visible: true, timeout: 5000 });
        
        // Wait a bit for the welcome message
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Take screenshot
        const screenshotPath = path.join(__dirname, '../dist/screenshot.png');
        console.log('Taking screenshot to:', screenshotPath);
        await page.screenshot({
            path: screenshotPath,
            clip: {
                x: 0,
                y: 0,
                width: 400,
                height: 600
            }
        });
        console.log('Screenshot taken successfully');

    } catch (error) {
        console.error('Error taking screenshot:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

takeScreenshot().catch(error => {
    console.error('Failed to take screenshot:', error);
    process.exit(1);
}); 