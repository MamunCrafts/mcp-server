#!/usr/bin/env node

import { MCPServer } from './mcp/mcp-server.js';

async function main() {
  const server = new MCPServer();
  await server.start();
}

main().catch((error) => {
  console.error('Failed to start MCP server:', error);
  process.exit(1);
});