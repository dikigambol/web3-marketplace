# Web3 Marketplace

A decentralized marketplace built with Next.js, TypeScript, and Mesh SDK for Cardano blockchain integration. This application allows users to list, buy, and sell digital assets in a Web3 environment.

## Features

- **User Profiles**: Create and manage user profiles with wallet integration
- **Asset Listings**: List digital assets (images, audio) for sale
- **Marketplace**: Browse and search available listings
- **Wallet Integration**: Connect Cardano wallets using Mesh SDK
- **Responsive Design**: Built with Tailwind CSS for mobile-first design

## Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Web3**: Mesh SDK for Cardano integration
- **Icons**: Heroicons
- **UI Components**: Headless UI

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Cardano wallet (for Web3 features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dikigambol/web3-marketplace.git
   cd web3-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_APP_NAME=Web3 Marketplace
   # Add other required environment variables
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── components/          # React components
├── lib/                # Utility libraries (axios, marketplace, mongodb)
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   └── [user]/        # Dynamic user pages
├── public/            # Static assets
├── styles/            # Global styles
├── type/              # TypeScript type definitions
└── utils/             # Utility functions
```

## API Endpoints

- `GET /api/getListings` - Get all marketplace listings
- `POST /api/addListing` - Add new listing
- `GET /api/getProfile` - Get user profile
- `POST /api/addUser` - Create new user
- And more...

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Web3 integration using [Mesh SDK](https://meshjs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)