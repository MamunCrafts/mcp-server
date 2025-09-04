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

A Model Context Protocol (MCP) server that provides statistical analysis tools for sales and salary data. This server exposes business intelligence functions that can be used by AI assistants and other MCP-compatible clients.

## 🚀 Features

- **Sales Analytics**: Calculate total sales, find popular products, and analyze order patterns
- **Product Intelligence**: Identify most ordered products and highest value orders
- **Salary Statistics**: Compute salary metrics including averages, min/max values
- **MCP Compatible**: Works with Claude Desktop and other MCP clients
- **TypeScript**: Full type safety and modern development experience
- **NestJS Framework**: Built with enterprise-grade Node.js framework

## 📊 Available Tools

| Tool Name | Description | Parameters |
|-----------|-------------|------------|
| `get_total_sales` | Calculate total sales amount from all orders | None |
| `get_popular_product` | Get the most frequently ordered product | None |
| `get_most_ordered_product` | Get product with highest total quantity | None |
| `get_highest_order_amount` | Get order with the highest total amount | None |
| `get_salary_statistics` | Get salary analytics (average, min, max) | None |

## 🏗️ Project Structure

```
mcp-server/
├── src/
│   ├── statistics/
│   │   ├── statistics.service.ts    # Business logic and data operations
│   │   ├── statistics.controller.ts # REST API endpoints (NestJS)
│   │   ├── statistics.module.ts     # NestJS module configuration
│   │   └── statistics.types.ts      # TypeScript interfaces
│   ├── mcp/
│   │   └── mcp-server.ts           # MCP server implementation
│   ├── mcp-main.ts                 # MCP server entry point
│   ├── main.ts                     # NestJS application entry point
│   └── app.*                       # NestJS app configuration
├── test/                           # E2E tests
├── dist/                          # Compiled JavaScript output
├── mcp-config.json                # MCP client configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: NestJS
- **Protocol**: Model Context Protocol (MCP)
- **Testing**: Jest
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Project

```bash
npm run build
```

### 3. Start MCP Server

```bash
npm run start:mcp
# or directly:
node dist/mcp-main.js
```

### 4. Start NestJS Server (Alternative)

```bash
npm run start
# Development mode:
npm run start:dev
```

## 🔧 Configuration

### MCP Client Configuration

Add this configuration to your MCP client (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "statistics-server": {
      "command": "node",
      "args": ["/home/mamun/official/mcp-server/dist/mcp-main.js"],
      "env": {}
    }
  }
}
```

### For Claude Desktop

Add to `~/.config/claude-desktop/claude_desktop_config.json` (Linux):

```json
{
  "mcpServers": {
    "statistics-server": {
      "command": "node",
      "args": ["/home/mamun/official/mcp-server/dist/mcp-main.js"],
      "env": {}
    }
  }
}
```

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Test with MCP Inspector

```bash
npx @modelcontextprotocol/inspector dist/mcp-main.js
```

## 📡 API Endpoints (NestJS)

The server also provides REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/statistics/total-sales` | Get total sales amount |
| GET | `/statistics/popular-product` | Get most popular product |
| GET | `/statistics/most-ordered-product` | Get most ordered product |
| GET | `/statistics/highest-order-amount` | Get highest order amount |
| GET | `/statistics/salary-statistics` | Get salary statistics |

### Example API Usage

```bash
# Start the NestJS server
npm run start

# Make API requests
curl http://localhost:3000/statistics/total-sales
curl http://localhost:3000/statistics/popular-product
```

## 🔄 MCP Protocol Flow

```
1. AI Client connects to MCP server
2. Client requests available tools
3. Server responds with tool definitions
4. Client calls a specific tool (e.g., "get_total_sales")
5. Server executes the corresponding service method
6. Server returns structured result
7. AI uses the result in its response to user
```

## 📊 Sample Data

The server includes sample data for demonstration:

### Products
- Laptop ($999.99)
- Mouse ($24.99)
- Keyboard ($79.99)
- Monitor ($299.99)
- Headphones ($149.99)

### Orders
- Multiple orders with different products and quantities
- Total sales calculation across all orders

### Salaries
- Sample employee salary data for statistical analysis

## 🚀 Development

### Development Mode

```bash
npm run start:dev
```

### Build for Production

```bash
npm run build
npm run start:prod
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run start` | Start the NestJS application |
| `npm run start:dev` | Start in development mode with hot reload |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |
| `npm run start:mcp` | Start the MCP server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run end-to-end tests |

## 🏆 Best Practices Implemented

1. **Separation of Concerns**: Business logic in services, MCP logic in dedicated server
2. **Type Safety**: Full TypeScript implementation with proper interfaces
3. **Error Handling**: Comprehensive error handling in MCP tools
4. **Validation**: Input validation for all operations
5. **Documentation**: Clear documentation and examples
6. **Testing**: Unit and E2E test setup
7. **Code Quality**: ESLint configuration for consistent code style

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For questions and support:
- Create an issue in the repository
- Check the [MCP Documentation](https://modelcontextprotocol.io/)
- Review the [NestJS Documentation](https://nestjs.com/)

## 🎯 What You've Learned

By studying this project, you now understand:

- ✅ **MCP Basics**: What MCP is and how it works
- ✅ **Server Architecture**: How to structure an MCP server project
- ✅ **Tool Implementation**: How to expose business logic as MCP tools
- ✅ **Client Integration**: How AI clients connect and use your tools
- ✅ **TypeScript Development**: Modern TypeScript with NestJS
- ✅ **Testing**: How to test MCP servers
- ✅ **Deployment**: How to build and deploy MCP servers

## 🚀 Next Steps

1. **Add Authentication**: Implement security for your MCP server
2. **Database Integration**: Connect to real databases instead of sample data
3. **More Tools**: Add additional statistical analysis tools
4. **Resources**: Implement MCP resources for file/data access
5. **Prompts**: Add MCP prompts for AI interaction templates
6. **Production Deployment**: Deploy to cloud platforms
7. **Monitoring**: Add logging and monitoring capabilities

---

**Happy coding! 🎉**

This MCP server demonstrates a complete implementation from zero to hero. Use it as a foundation for building your own MCP servers!
