<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Statistics MCP Server

This is a Model Context Protocol (MCP) server that provides statistics tools for analyzing sales data and salary information. It can be connected to AI editors like Cursor, Claude Desktop, and other MCP-compatible applications.

## Features

The MCP server exposes the following tools:

- **get_total_sales**: Calculate total sales amount from all orders
- **get_popular_product**: Find the most popular product (appears in most orders)
- **get_most_ordered_product**: Get the product with highest total quantity ordered
- **get_highest_order_amount**: Find the order with the highest total amount
- **get_salary_statistics**: Get salary statistics (average, min, max)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

## Running the Server

### As HTTP API (NestJS)
```bash
npm run start:dev
```
The HTTP API will be available at `http://localhost:3000/statistics`

### As MCP Server
```bash
npm run start:mcp
```

For development with auto-reload:
```bash
npm run start:mcp:dev
```

## Connecting to Editors

### Cursor IDE

1. Open Cursor settings (Cmd/Ctrl + ,)
2. Search for "MCP" or go to Extensions > Model Context Protocol
3. Add a new server configuration:
   - **Name**: Statistics Server
   - **Command**: `node`
   - **Args**: `["/absolute/path/to/your/project/dist/mcp-main.js"]`
   - **Working Directory**: `/absolute/path/to/your/project`

### Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "statistics-server": {
      "command": "node",
      "args": ["/absolute/path/to/your/project/dist/mcp-main.js"],
      "env": {}
    }
  }
}
```

**Location of config file:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### Other MCP-Compatible Editors

Use the provided `mcp-config.json` file as a reference and adapt the configuration format as needed for your specific editor.

## Usage Examples

Once connected, you can ask your AI assistant to:

- "What are the total sales?"
- "Which product is most popular?"
- "Show me salary statistics"
- "What's the highest order amount?"

The MCP server will execute the appropriate tools and return the results.

## Development

The project structure:
- `src/mcp/mcp-server.ts` - MCP server implementation
- `src/mcp-main.ts` - MCP server entry point
- `src/statistics/` - Business logic and data
- `mcp-config.json` - Example MCP configuration

## Troubleshooting

1. **Build errors**: Make sure all TypeScript files compile correctly with `npm run build`
2. **Connection issues**: Verify the absolute path to `dist/mcp-main.js` in your editor configuration
3. **Permission errors**: Ensure the compiled JavaScript files have execute permissions

## API Endpoints (HTTP Mode)

When running as HTTP API:
- `GET /statistics/total-sales`
- `GET /statistics/popular-product`
- `GET /statistics/most-ordered-product`
- `GET /statistics/highest-order-amount`
- `GET /statistics/salary-statistics`

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
