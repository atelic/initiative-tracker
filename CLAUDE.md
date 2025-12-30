# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Initiative Tracker is a React 18 + TypeScript single-page application for managing D&D/RPG initiative order during gameplay. It tracks character initiative, armor class, and hit points, with an integrated dice roller and encounter preset system.

**Live app**: https://atelic.github.io/initiative-tracker

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server with hot reload (localhost:5173)
npm run build        # TypeScript check + production build to /dist
npm run lint         # ESLint
npm run preview      # Preview production build locally
npm run deploy       # Build and deploy to gh-pages
```

**Node version**: 20+ (specified in .nvmrc)

## Architecture

### Tech Stack
- React 18 with TypeScript 5
- Vite 6 for build tooling
- Tailwind CSS 3 with custom fantasy theme
- React Context + useReducer for state management
- localStorage for persistence
- @dice-roller/rpg-dice-roller for dice rolling

### State Management

State is managed via React Context with useReducer in `src/context/EncounterContext.tsx`.

**State shape** (`src/types/index.ts`):
```typescript
interface EncounterState {
  characters: Character[]
  notes: string
  currentTurnIndex: number
  roundNumber: number
  presets: EncounterPreset[]
}

interface Character {
  id: string              // UUID
  name: string
  armorClass?: number
  hp?: number
  maxHp?: number
  initiative: number
  isNPC?: boolean
}
```

**Key hooks**:
- `useEncounter()` - Access state, dispatch, sortedCharacters, and activeCharacter

### Component Structure

```
src/
├── components/
│   ├── InitiativeTracker.tsx  # Main tracker with turn controls
│   ├── CharacterCard.tsx      # Individual character (inline editing, HP bar)
│   ├── CharacterForm.tsx      # Add new character form
│   ├── DiceRoller.tsx         # Dice rolling interface
│   ├── Notes.tsx              # Session notes with debounced save
│   └── PresetManager.tsx      # Save/load encounter presets
├── context/
│   └── EncounterContext.tsx   # State management with reducer
├── types/
│   └── index.ts               # TypeScript interfaces
├── App.tsx                    # Main layout
├── main.tsx                   # Entry point
└── index.css                  # Tailwind + custom component classes
```

### Design System

Fantasy parchment theme defined in `tailwind.config.ts`:
- **Colors**: `parchment.*` (backgrounds), `ink.*` (text), `accent.*` (gold, copper, ruby, emerald), `combat.*` (active, damage, heal)
- **Fonts**: Cinzel (display), Crimson Text (body), Fira Code (mono)
- **Component classes**: `.card`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.input`, `.label` (defined in `src/index.css`)

Use `@/` path alias for imports (maps to `src/`).
