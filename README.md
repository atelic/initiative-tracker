# Initiative Tracker

A fast, lightweight D&D initiative tracker for managing combat encounters. Track initiative order, character health, armor class, and take session notes—all with a subtle fantasy aesthetic that stays out of your way.

**Live App:** https://atelic.github.io/initiative-tracker

## Features

- **Initiative Tracking** - Characters sorted by initiative, with turn advancement and round counting
- **Character Management** - Add, edit, and remove characters with name, initiative, AC, and HP
- **HP Tracking** - Visual HP bars with quick +/- buttons for damage and healing
- **Dice Roller** - Built-in dice roller with quick buttons and custom notation support (e.g., `4d6kh3`)
- **Session Notes** - Persistent notes section for tracking important details
- **Encounter Presets** - Save and load encounter templates for reuse
- **Auto-Save** - All data persists to localStorage across browser sessions

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Requires:** Node.js 20+

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS 3
- @dice-roller/rpg-dice-roller
