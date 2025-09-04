import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { StatisticsService } from '../statistics/statistics.service.js';

export class MCPServer {
  private server: Server;
  private statisticsService: StatisticsService;

  constructor() {
    this.statisticsService = new StatisticsService();
    this.server = new Server(
      {
        name: 'statistics-mcp-server',
        version: '1.0.0',
        description: 'MCP server for statistics operations',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_total_sales',
            description: 'Get the total sales amount from all orders',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_popular_product',
            description: 'Get the most popular product (appears in most orders)',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_most_ordered_product',
            description: 'Get the product with the highest total quantity ordered',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_highest_order_amount',
            description: 'Get the order with the highest total amount',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_salary_statistics',
            description: 'Get salary statistics including average, min, and max salaries',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name } = request.params;

      try {
        switch (name) {
          case 'get_total_sales': {
            const totalSales = this.statisticsService.getTotalSales();
            return {
              content: [
                {
                  type: 'text',
                  text: `Total sales: $${totalSales}`,
                },
              ],
            };
          }

          case 'get_popular_product': {
            const product = this.statisticsService.getPopularProduct();
            return {
              content: [
                {
                  type: 'text',
                  text: product 
                    ? `Most popular product: ${product.name} (ID: ${product.id}, Price: $${product.price})`
                    : 'No popular product found',
                },
              ],
            };
          }

          case 'get_most_ordered_product': {
            const product = this.statisticsService.getMostOrderedProduct();
            return {
              content: [
                {
                  type: 'text',
                  text: product 
                    ? `Most ordered product: ${product.name} (ID: ${product.id}, Price: $${product.price})`
                    : 'No most ordered product found',
                },
              ],
            };
          }

          case 'get_highest_order_amount': {
            const order = this.statisticsService.getHighestOrderAmount();
            return {
              content: [
                {
                  type: 'text',
                  text: order 
                    ? `Highest order: Order #${order.id} with amount $${order.totalAmount}`
                    : 'No highest order found',
                },
              ],
            };
          }

          case 'get_salary_statistics': {
            const stats = this.statisticsService.getSalaryStatistics();
            return {
              content: [
                {
                  type: 'text',
                  text: stats 
                    ? `Salary Statistics - Average: $${stats.average.toFixed(2)}, Min: $${stats.min}, Max: $${stats.max}`
                    : 'No salary statistics available',
                },
              ],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error executing tool ${name}: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Statistics MCP server running on stdio');
  }
}