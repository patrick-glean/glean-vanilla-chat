import http from 'http';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
    buffer: false, // Disable buffering
    proxyTimeout: 0, // Disable timeout
    timeout: 0 // Disable timeout
});

const PORT = 8080;
const GLEAN_BACKEND = 'https://support-lab-be.glean.com';

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Proxy the request to Glean backend
    proxy.web(req, res, {
        target: GLEAN_BACKEND,
        changeOrigin: true,
        secure: false,
        buffer: false // Disable buffering
    });
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Proxy error occurred');
});

server.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
}); 