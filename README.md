# Tools Project

A full-stack web application providing various utility tools including text processing, image manipulation, code formatting, and data analysis tools.

## Project Structure

```
tools-project/
├── tools-api/         # Backend API server
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── services/ # Business logic
│   │   └── utils/    # Utility functions
│   └── package.json
│
├── tools-web/         # Frontend React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/     # Page components
│   │   ├── styles/    # Styled components
│   │   └── data/      # Data and types
│   └── package.json
│
└── package.json       # Root package.json for monorepo
```

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tools-project
```

2. Install dependencies for both frontend and backend:
```bash
# Install root dependencies
npm install

# Install API dependencies
cd tools-api
npm install

# Install web dependencies
cd ../tools-web
npm install
```

## Workspace Setup

This project uses npm workspaces to manage the monorepo structure. This allows you to:
- Install dependencies for all packages with a single command
- Run scripts across all workspaces
- Manage dependencies more efficiently

### Configuring Workspaces

The root `package.json` should include the following workspace configuration:

```json
{
  "name": "tools-project",
  "version": "1.0.0",
  "workspaces": [
    "tools-api",
    "tools-web"
  ],
  "scripts": {
    "start:api": "npm run dev --workspace=tools-api",
    "start:web": "npm run dev --workspace=tools-web",
    "start:all": "npm-run-all --parallel start:api start:web",
    "build:api": "npm run build --workspace=tools-api",
    "build:web": "npm run build --workspace=tools-web",
    "build:all": "npm-run-all build:api build:web"
  },
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```

### Using Workspaces

With workspaces configured, you can:

1. Install all dependencies at once:
```bash
npm install
```

2. Run scripts for specific workspaces:
```bash
# Start API server
npm run start:api

# Start web app
npm run start:web

# Start both simultaneously
npm run start:all
```

3. Add dependencies to specific workspaces:
```bash
# Add a dependency to the API
npm install express --workspace=tools-api

# Add a dependency to the web app
npm install react-router-dom --workspace=tools-web

# Add a dev dependency to all workspaces
npm install typescript -D -w
```

## Development

### Starting the Development Servers

1. Start the API server:
```bash
cd tools-api
npm run dev
```
The API server will run on http://localhost:5000

2. Start the web application:
```bash
cd tools-web
npm run dev
```
The web application will run on http://localhost:5173

### Available Scripts

#### API Server (tools-api)
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm test`: Run tests

#### Web Application (tools-web)
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm test`: Run tests

## Features

### Text Tools
- Text case conversion
- Text formatting
- Character counting
- More coming soon...

### Image Tools
- Image resizing
- Format conversion
- Basic editing
- More coming soon...

### Code Tools
- Code formatting
- Syntax highlighting
- More coming soon...

### Data Tools
- CSV processing
- JSON formatting
- More coming soon...

## Environment Variables

### API Server (.env)
```
PORT=5000
NODE_ENV=development
```

### Web Application (.env)
```
VITE_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 