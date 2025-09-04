

## 🎯 What is MCP (Model Context Protocol)?

MCP is a protocol that allows AI assistants to connect to external tools and data sources securely. Think of it as a bridge between AI models and your applications.

## 📚 Step 1: Understanding the Basics

### What MCP Enables:
- **Tools**: Functions the AI can call (like your statistics functions)
- **Resources**: Data the AI can read (files, databases, etc.)
- **Prompts**: Templates for AI interactions

### Your Project Structure:
```
mcp-server/
├── src/
│   ├── statistics/
│   │   ├── statistics.service.ts    ← Business logic
│   │   ├── statistics.controller.ts ← MCP tool handlers
│   │   ├── statistics.module.ts     ← NestJS module
│   │   └── statistics.types.ts      ← Type definitions
│   └── mcp-main.ts                  ← MCP server entry point
├── mcp-config.json                  ← Client configuration
└── package.json                     ← Dependencies
```

## 🔧 Step 2: Core Components Explained

### 1. **Types (statistics.types.ts)**
```typescript
// These define your data structures
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  products: { product: Product; quantity: number }[];
  totalAmount: number;
}
```

### 2. **Service Layer (statistics.service.ts)**
Your service contains the business logic - the actual functions that do the work:

````typescript
// This is your existing service - it's perfect!
// It contains pure business logic without MCP concerns

@Injectable()
export class StatisticsService {
  // Sample data
  private readonly orders: Order[] = [...];
  private readonly salaries: Salary[] = [...];

  // Business methods
  getTotalSales(): number { /* your logic */ }
  getPopularProduct(): Product | null { /* your logic */ }
  // ... other methods
}
````

### 3. **Controller Layer (statistics.controller.ts)**
This is where MCP magic happens - it exposes your service methods as MCP tools:

````typescript
import { McpTool } from '@modelcontextprotocol/sdk/types.js';

@Injectable()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // Define available MCP tools
  getTools(): McpTool[] {
    return [
      {
        name: 'get_total_sales',
        description: 'Calculate total sales amount from all orders',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      // ... other tools
    ];
  }

  // Handle tool execution
  async handleToolCall(name: string, args: any): Promise<any> {
    switch (name) {
      case 'get_total_sales':
        return this.statisticsService.getTotalSales();
      // ... other cases
    }
  }
}
````

## 🚀 Step 3: MCP Server Setup

### Main Server File (mcp-main.ts)
```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Create MCP server
const server = new Server(
  {
    name: 'statistics-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {}, // Enable tools capability
    },
  }
);

// Register your tools and handlers
// Connect with your NestJS app
```

## 🎨 Step 4: Let's Build This Step by Step

### Step 4.1: Create a Simple MCP Tool

Let's add a new simple tool to understand the flow:

````typescript
// ...existing code...

// Add this new method to your service
getOrderCount(): number {
  return this.orders.length;
}
````

### Step 4.2: Expose it as MCP Tool

````typescript
// ...existing code...

getTools(): McpTool[] {
  return [
    // ...existing tools...
    {
      name: 'get_order_count',
      description: 'Get the total number of orders',
      inputSchema: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  ];
}

async handleToolCall(name: string, args: any): Promise<any> {
  switch (name) {
    // ...existing cases...
    case 'get_order_count':
      return {
        count: this.statisticsService.getOrderCount(),
        message: `Total orders: ${this.statisticsService.getOrderCount()}`
      };
  }
}
````

## 🔄 Step 5: MCP Protocol Flow

```
1. AI Client connects to your MCP server
2. Client asks: "What tools are available?"
3. Server responds with tool list (from getTools())
4. Client calls a tool: "get_total_sales"
5. Server executes handleToolCall("get_total_sales", {})
6. Server returns result to client
7. AI uses the result in its response
```

## ⚙️ Step 6: Configuration and Connection

### Your mcp-config.json:
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

This tells MCP clients how to start your server.

## 🧪 Step 7: Testing Your MCP Server

### Build and Run:
```bash
npm run build
node dist/mcp-main.js
```

### Test with MCP Inspector:
```bash
npx @modelcontextprotocol/inspector dist/mcp-main.js
```

## 🎯 Step 8: Advanced Features

### Adding Parameters to Tools:

````typescript
// Add a method with parameters
getOrdersByMinAmount(minAmount: number): Order[] {
  return this.orders.filter(order => order.totalAmount >= minAmount);
}
````

````typescript
// Expose it with input validation
{
  name: 'get_orders_by_min_amount',
  description: 'Get orders with minimum total amount',
  inputSchema: {
    type: 'object',
    properties: {
      minAmount: {
        type: 'number',
        description: 'Minimum order amount'
      }
    },
    required: ['minAmount'],
  },
}

// Handle it
case 'get_orders_by_min_amount':
  const { minAmount } = args;
  return this.statisticsService.getOrdersByMinAmount(minAmount);
````

## 🏆 Step 9: Best Practices

1. **Separation of Concerns**: Keep business logic in services, MCP logic in controllers
2. **Type Safety**: Use TypeScript interfaces for everything
3. **Error Handling**: Wrap tool calls in try-catch blocks
4. **Validation**: Validate inputs in your tools
5. **Documentation**: Clear descriptions for all tools

## 🎓 Step 10: What You've Learned

You now understand:
- ✅ What MCP is and why it's useful
- ✅ How to structure an MCP server project
- ✅ How to expose business logic as MCP tools
- ✅ How AI clients connect and use your tools
- ✅ How to build, test, and deploy MCP servers

## 🚀 Next Steps

1. **Add more tools** to your statistics service
2. **Add resources** (file reading, database access)
3. **Add prompts** for AI interaction templates
4. **Connect to real databases** instead of hardcoded data
5. **Deploy your MCP server** for production use

Your statistics MCP server is a perfect example of a real-world MCP implementation! You've gone from zero to hero! 🎉