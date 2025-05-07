import http from 'http';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({});
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
        secure: false
    });
});

server.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
}); 