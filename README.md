# Church Media Portal

A React + Express web portal for uploading and managing church sermon videos with Google Drive storage.

## Features
- Video upload to Google Drive
- Sermon gallery
- Category organization (Sermons, Worship, Events)
- JWT authentication for admin access

## Setup

### Prerequisites
- Node.js 18+
- Google Drive API credentials

### Installation

1. Clone the repo
git clone https://github.com/YOUR_USERNAME/church-media-portal.git
cd church-media-portal

2. Install server dependencies
cd server
npm install

3. Install client dependencies
cd ../client
npm install

4. Configure environment
cp server/.env.example server/.env
# Edit server/.env with your values

5. Add Google credentials
# Place your credentials.json in server/
# Run OAuth setup: node server/setupAuth.js

### Running the app

Terminal 1 - Backend:
cd server && node index.js

Terminal 2 - Frontend:
cd client && npm start

Open http://localhost:3000
