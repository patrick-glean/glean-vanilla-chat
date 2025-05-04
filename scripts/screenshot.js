import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function takeScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const filePath = join(__dirname, '..', 'dist', 'index.html');
    await page.goto(`file://${filePath}`);
    
    // Wait for the chat container to be visible
    await page.waitForSelector('#chat-container');
    
    // Take screenshot
    await page.screenshot({ 
        path: join(__dirname, '..', 'dist', 'screenshot.png'),
        fullPage: true
    });
    
    await browser.close();
}

takeScreenshot().catch(console.error); 