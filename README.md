<div align="center">
  <h1>⚡ agent</h1>
  <p>AI Agent powered by <a href="https://voltagent.dev">VoltAgent</a></p>
  
  <p>
    <a href="https://github.com/voltagent/voltagent"><img src="https://img.shields.io/badge/built%20with-VoltAgent-blue" alt="Built with VoltAgent" /></a>
    <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D22-brightgreen" alt="Node Version" /></a>
  </p>
</div>

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- Git
- OpenAI API Key (optional - can configure later)
  - Get your key at: https://platform.openai.com/api-keys

### Installation

```bash
# Clone the repository (if not created via create-voltagent-app)
git clone <your-repo-url>
cd agent

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Configuration

Edit `.env` file with your API keys:

```env
OPENAI_API_KEY=your-api-key-here

# VoltOps Platform (Optional)
# Get your keys at https://console.voltagent.dev/tracing-setup
# VOLTAGENT_PUBLIC_KEY=your-public-key
# VOLTAGENT_SECRET_KEY=your-secret-key
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## 🎯 Features

This VoltAgent application includes:

- **AI Agent**: Powered by OpenAI (GPT-4o-mini)
- **Workflows**: Pre-configured expense approval workflow
- **Memory**: Built-in conversation history
- **Tools**: Extensible tool system
- **Type Safety**: Full TypeScript support

## 🔍 VoltOps Platform

### Local Development
The VoltOps Platform provides real-time observability for your agents during development:

1. **Start your agent**: Run `npm run dev`
2. **Open console**: Visit [console.voltagent.dev](https://console.voltagent.dev)
3. **Auto-connect**: The console connects to your local agent at `http://localhost:3141`

Features:
- 🔍 Real-time execution visualization
- 🐛 Step-by-step debugging
- 📊 Performance insights
- 💾 No data leaves your machine

### Production Monitoring
For production environments, configure VoltOpsClient:

1. **Create a project**: Sign up at [console.voltagent.dev/tracing-setup](https://console.voltagent.dev/tracing-setup)
2. **Get your keys**: Copy your Public and Secret keys
3. **Add to .env**:
   ```env
   VOLTAGENT_PUBLIC_KEY=your-public-key
   VOLTAGENT_SECRET_KEY=your-secret-key
   ```
4. **Configure in code**: The template already includes VoltOpsClient setup!

## 📁 Project Structure

```
agent/
├── src/
│   ├── index.ts          # Main agent configuration
│   ├── tools/            # Custom tools
│   │   ├── index.ts      # Tool exports
│   │   └── weather.ts    # Weather tool example
│   └── workflows/        # Workflow definitions
│       └── index.ts      # Expense approval workflow
├── dist/                 # Compiled output (after build)
├── .env                  # Environment variables
├── .voltagent/           # Agent memory storage
├── Dockerfile            # Production deployment
├── package.json
└── tsconfig.json
```

## 🧪 Testing Workflows

The included expense approval workflow has test scenarios:

### Scenario 1: Auto-approved (< $500)
```json
{
  "employeeId": "EMP-123",
  "amount": 250,
  "category": "office-supplies",
  "description": "New laptop mouse and keyboard"
}
```

### Scenario 2: Manager approval required ($500-$5000)
```json
{
  "employeeId": "EMP-456",
  "amount": 3500,
  "category": "travel",
  "description": "Conference registration and hotel"
}
```

### Scenario 3: Director approval required (> $5000)
```json
{
  "employeeId": "EMP-789",
  "amount": 15000,
  "category": "equipment",
  "description": "New server hardware"
}
```

## 🐳 Docker Deployment

Build and run with Docker:

```bash
# Build image
docker build -t agent .

# Run container
docker run -p 3141:3141 --env-file .env agent

# Or use docker-compose
docker-compose up
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run volt` - VoltAgent CLI tools

### Adding Custom Tools

Create new tools in `src/tools/`:

```typescript
import { createTool } from '@voltagent/core';
import { z } from 'zod';

export const myTool = createTool({
  name: 'myTool',
  description: 'Description of what this tool does',
  input: z.object({
    param: z.string(),
  }),
  output: z.string(),
  handler: async ({ param }) => {
    // Tool logic here
    return `Result: ${param}`;
  },
});
```

### Creating New Workflows

Add workflows in `src/workflows/`:

```typescript
import { createWorkflowChain } from '@voltagent/core';
import { z } from 'zod';

export const myWorkflow = createWorkflowChain({
  id: "my-workflow",
  name: "My Custom Workflow",
  purpose: "Description of what this workflow does",
  input: z.object({
    data: z.string(),
  }),
  result: z.object({
    output: z.string(),
  }),
})
  .andThen({
    id: "process-data",
    execute: async ({ data }) => {
      // Process the input
      const processed = data.toUpperCase();
      return { processed };
    },
  })
  .andThen({
    id: "final-step",
    execute: async ({ data }) => {
      // Final transformation
      return { output: `Result: ${data.processed}` };
    },
  });
```

## 📚 Resources

- **Documentation**: [voltagent.dev/docs](https://voltagent.dev/docs/)
- **Examples**: [github.com/VoltAgent/voltagent/tree/main/examples](https://github.com/VoltAgent/voltagent/tree/main/examples)
- **Discord**: [Join our community](https://s.voltagent.dev/discord)
- **Blog**: [voltagent.dev/](https://voltagent.dev/blog/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

---

<div align="center">
  <p>Built with ❤️ using <a href="https://voltagent.dev">VoltAgent</a></p>
</div>