const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

// In-memory data store for the live session
let clients = [];
let streamCards = [];

// Helper to get local IP address on the Wi-Fi network
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const PORT = 3000;
const IP = getLocalIP();

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.md': 'text/markdown'
};

const server = http.createServer((req, res) => {
    // 1. Real-time EventSource (SSE) Endpoint
    if (req.url === '/api/stream' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        
        // Send initial historical cards
        res.write(`data: ${JSON.stringify({ type: 'init', cards: streamCards })}\n\n`);
        
        // Add client to active subscribers pool
        clients.push(res);
        
        req.on('close', () => {
            clients = clients.filter(c => c !== res);
        });
        return;
    }

    // 2. Push generated asset endpoint
    if (req.url === '/api/push' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const card = JSON.parse(body);
                streamCards.push(card);
                
                // Broadcast to all active teammates in real-time
                clients.forEach(client => {
                    client.write(`data: ${JSON.stringify({ type: 'new', card })}\n\n`);
                });
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
            }
        });
        return;
    }

    // 3. Serve Static Files
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Sorry, check with the system admin: ${error.code} ..\n`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🤖 TURBO ROBOTS: FUSION LAB SERVER RUNNING!`);
    console.log(`==================================================`);
    console.log(`📶 Wi-Fi Access: http://${IP}:${PORT}`);
    console.log(`🏠 Local Host:   http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});
