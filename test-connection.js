/**
 * Simple script to test backend connection
 * Run with: node test-connection.js
 */

const http = require('http');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function testConnection() {
  console.log(`${colors.blue}Testing Backend Connection...${colors.reset}\n`);

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`${colors.green}✅ Backend is running!${colors.reset}`);
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Response: ${data}\n`);

      if (res.statusCode === 401 || res.statusCode === 400) {
        console.log(
          `${colors.green}✅ Server is responding correctly (401/400 expected for login without credentials)${colors.reset}`
        );
      } else if (res.statusCode === 200) {
        console.log(
          `${colors.yellow}⚠️  Unexpected 200 status - check if this is correct${colors.reset}`
        );
      }

      // Test CORS headers
      if (res.headers['access-control-allow-origin']) {
        console.log(
          `${colors.green}✅ CORS is configured: ${res.headers['access-control-allow-origin']}${colors.reset}`
        );
      } else {
        console.log(
          `${colors.yellow}⚠️  CORS headers not found in response${colors.reset}`
        );
      }
    });
  });

  req.on('error', (error) => {
    console.log(`${colors.red}❌ Connection Failed!${colors.reset}`);
    console.log(`${colors.red}Error: ${error.message}${colors.reset}\n`);
    console.log(`${colors.yellow}Troubleshooting:${colors.reset}`);
    console.log('1. Make sure backend server is running: cd backend && npm run dev');
    console.log('2. Check if port 5000 is available');
    console.log('3. Verify backend/server.js is configured correctly');
  });

  // Send empty body to test connection
  req.write(JSON.stringify({}));
  req.end();
}

// Run the test
testConnection();
