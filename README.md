# Travel Deals Platform

A platform for travel agents to post and manage flight deals.

## Features

- Search and filter flight deals
- Guest post functionality for travel agents
- Rich text editor for deal descriptions
- Image upload support
- Deal preview functionality
- Currency conversion (INR to USD)
- Responsive design

## Tech Stack

- React 18.3
- TypeScript
- Vite
- Tailwind CSS
- TinyMCE Editor
- Lucide React Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

## Project Structure

```
src/
├── components/         # React components
├── data/              # Static data (cities, airlines)
├── styles/            # CSS modules
└── types/             # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request