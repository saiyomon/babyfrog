# Valeria's Froggy Friend

An interactive web application featuring a cute pixel art frog character that displays random pictures and personalized messages for your loved one. Built with React, Express, PostgreSQL, and lots of love!

## Features

- 🐸 Interactive frog character that responds to clicks
- 🌸 Falling cherry blossoms animation effect
- 📱 Responsive design for all devices
- 🖼️ Custom image upload through a secret interface
- 💌 Custom message creation with tabbed interface
- 🎮 Pokémon-style message display boxes
- 🔄 Non-repeating content system
- 💾 Persistent storage with PostgreSQL database

## Live Demo

Visit [site-url-here](https://your-site-url.com) to see the application in action!

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Environment Variables

Create a `.env` file in the root directory based on the `.env.example`:

```
# Database connection
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Database pool configuration for handling large datasets
PG_MAX_CONNECTIONS=20

# File upload configuration
UPLOAD_MAX_FILE_SIZE=10485760   # 10MB limit for image uploads
UPLOAD_MAX_FILES=500            # Maximum number of files the app can store

# Port configuration (optional, defaults to 5000)
PORT=5000

# Node environment 
NODE_ENV=development
```

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Push database schema:
   ```
   npm run db:push
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5000`

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deployment Options

#### Docker Compose (Recommended)

```bash
# Clone repository
git clone <repository-url>

# Create necessary directories
mkdir -p pgdata uploads logs backups
chmod 777 pgdata uploads logs backups

# Start the application stack
docker-compose up -d
```

#### Cloud Service Providers

1. Connect your GitHub repository to your preferred platform (Render/Vercel/Railway/Heroku)
2. Configure environment variables in the platform settings
3. Set the build command to `npm run build`
4. Set the start command to `npm start`
5. Make sure PostgreSQL is configured

#### Replit Deployment

1. Fork this repository to your Replit account
2. Create a PostgreSQL database in Replit
3. Set up environment variables in the Secrets tab
4. Run the application

## Usage Guide

- 🐸 Click on the frog to see a random image and message
- 🔄 Click "Show Another" for more content
- 🔒 Click on "smol dumplings safe zone" text at the bottom to access the upload interface
- 📊 Use the tabbed interface to upload images or add sweet messages
- 🔙 Click "Done" when finished to return to the main view

## Customization

You can customize colors and themes by editing the `theme.json` file in the root directory.

## License

MIT License

## Acknowledgements

- Built with React, Express, and PostgreSQL
- Designed with love for Valeria