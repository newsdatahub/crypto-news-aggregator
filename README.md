# Crypto News & Prices Dashboard

A Next.js application showcasing real-time cryptocurrency news and price tracking using the NewsDataHub API and CoinGecko API. 
This project demonstrates how to build a simple but useful crypto news dashboard.

You can see a production version of this app [here](https://newsdatahub.com/crypto)


## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-news-dashboard
cd crypto-news-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Configure API keys:
```bash
cp .env.example .env.local
```

Update `.env.local` with your NewsDataHub API key. You can obtain API key once you sign up for a Free NewsDataHub account [here](https://newsdatahub.com/login) (no credit card required). 
No API key needed for CoinGecko API integration.
```
NEXT_PUBLIC_NEWSDATA_API_KEY=your_newsdata_key
NEXT_PUBLIC_API_URL=https://newsdata.io/api/1/news
```

4. Start the development server:
```bash
npm run dev
```

Visit http://localhost:3000 to see your dashboard.

### Project Structure
```
crypto-news-aggregator/
├── __tests__/                    # Test files
│   ├── Home.test.tsx
│   ├── NewsCard.test.tsx
│   └── PriceTicker.test.tsx
├── app/                          # Next.js app directory
│   ├── components/               # React components
│   │   ├── news-feed/            # News-related components
│   │   │   ├── NewsCard.tsx
│   │   │   └── index.ts
│   │   └── price-ticker/         # Price ticker components
│   │       ├── PriceTicker.tsx
│   │       └── index.ts
│   ├── layout.tsx               # Root layout component
│   ├── page.module.css          # Styles for main page
│   └── page.tsx                 # Main page component
├── public/                      # Static assets
├── types/                       # TypeScript type definitions
│   ├── cache.ts
│   ├── crypto.ts
│   ├── env.d.ts
│   ├── index.ts
│ 	└── news.ts
├── .env.example                # Example environment variables
├── .env.local                  # Environment variables (gitignored)
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── eslint.config.mjs           # ESLint module configuration
├── jest.config.mjs             # Jest configuration
├── jest.setup.js               # Jest setup file
├── next-env.d.ts               # Next.js TypeScript declarations
├── next.config.js              # Next.js configuration
├── package-lock.json           # Locked dependency versions
├── package.json                # Project dependencies
├── README.md
├── tsconfig.json               # TypeScript configuration
└── types.d.ts                  # Global TypeScript declarations
```

## Features

- Real-time cryptocurrency news from NewsDataHub API
- Live price updates from CoinGecko API
- TypeScript for enhanced type safety
- Modular component architecture
- Responsive design
- Client-side caching

## Security Considerations

This project uses client-side API calls for simplicity. It is not suitable for production.

## License

MIT
