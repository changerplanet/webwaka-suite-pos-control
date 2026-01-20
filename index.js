const http = require('http');

const PORT = 5000;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebWaka Suite POS Control</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      text-align: center;
      padding: 2rem;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      background: linear-gradient(90deg, #4facfe, #00f2fe);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .module-info {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1.5rem 2rem;
      margin-top: 1.5rem;
    }
    .module-info p {
      margin: 0.5rem 0;
      color: #a0aec0;
    }
    .status {
      display: inline-block;
      background: #48bb78;
      color: #1a1a2e;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: 0.875rem;
      font-weight: 600;
      margin-top: 1rem;
    }
    .stats { margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .stat { background: rgba(79, 172, 254, 0.2); padding: 0.75rem 1.25rem; border-radius: 8px; }
    .stat-value { font-size: 1.5rem; font-weight: 700; color: #4facfe; }
    .stat-label { font-size: 0.75rem; color: #a0aec0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>WebWaka Suite POS Control</h1>
    <p>Module ID: webwaka_suite_pos_control</p>
    <div class="module-info">
      <p><strong>Class:</strong> suite</p>
      <p><strong>Version:</strong> 0.1.0</p>
      <span class="status">Phase 5A Complete</span>
    </div>
    <div class="stats">
      <div class="stat"><div class="stat-value">13</div><div class="stat-label">Capabilities</div></div>
      <div class="stat"><div class="stat-value">8</div><div class="stat-label">Entitlements</div></div>
      <div class="stat"><div class="stat-value">10</div><div class="stat-label">Feature Flags</div></div>
      <div class="stat"><div class="stat-value">5</div><div class="stat-label">Dashboard Sections</div></div>
      <div class="stat"><div class="stat-value">100%</div><div class="stat-label">Test Coverage</div></div>
    </div>
  </div>
</body>
</html>
  `);
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
