import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Create a simple HTTP server
function createLocalServer(port) {
    return new Promise((resolve, reject) => {
        const server = createServer((req, res) => {
            // Remove query parameters from URL
            const url = req.url?.split('?')[0] || '/';
            const filePath = join(__dirname, '..', 'dist', url === '/' ? 'index.html' : url);
            
            try {
                const stat = statSync(filePath);
                if (stat.isFile()) {
                    const content = readFileSync(filePath);
                    const ext = filePath.split('.').pop();
                    const contentType = {
                        'html': 'text/html',
                        'js': 'text/javascript',
                        'css': 'text/css',
                        'png': 'image/png',
                        'svg': 'image/svg+xml',
                        'ico': 'image/x-icon'
                    }[ext] || 'text/plain';
                    
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                } else {
                    res.writeHead(404);
                    res.end('Not found');
                }
            } catch (error) {
                console.error(`Error serving ${filePath}:`, error);
                res.writeHead(404);
                res.end('Not found');
            }
        });

        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
            resolve(server);
        });

        server.on('error', reject);
    });
}

async function takeScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let server;
    
    try {
        // Start local server
        server = await createLocalServer(3000);
        
        // Enable console logging from the page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        
        // Set viewport to 1400x900 for full app capture
        await page.setViewport({ width: 1400, height: 900 });
        
        // Set up local storage before loading the page
        await page.evaluateOnNewDocument(() => {
            localStorage.setItem('glean_token', 'demo-token');
            localStorage.setItem('glean_backend_url', 'http://localhost:3000');
        });
        
        // Load the page through the local server
        await page.goto('http://localhost:3000');
        
        // Wait for the page to be fully loaded
        await page.waitForFunction(() => {
            return document.readyState === 'complete';
        });
        
        // Wait for JavaScript initialization
        await page.waitForFunction(() => {
            return window.messageManager !== undefined;
        });
        
        console.log('Waiting for UI to stabilize...');
        await delay(3000);
        
        // Debug: Log the current state of the page
        const pageState = await page.evaluate(() => {
            return {
                tokenManager: !!document.getElementById('token-manager-container'),
                chatContainer: !!document.getElementById('chat-container'),
                mockContainer: !!document.getElementById('mock-container'),
                messageManager: !!window.messageManager,
                configPanel: !!document.querySelector('.config-panel'),
                messages: !!document.getElementById('messages'),
                messageInput: !!document.getElementById('message-input'),
                sendButton: !!document.getElementById('send-button')
            };
        });
        console.log('Page state:', pageState);
        
        // Take screenshot
        await page.screenshot({ 
            path: join(__dirname, '..', 'dist', 'screenshot.png'),
            fullPage: true,
            type: 'png'
        });
        
        console.log('Screenshot captured successfully!');
    } catch (error) {
        console.error('Error taking screenshot:', error);
        throw error;
    } finally {
        await browser.close();
        if (server) {
            server.close();
        }
    }
}

takeScreenshot().catch(error => {
    console.error('Failed to take screenshot:', error);
    process.exit(1);
}); 