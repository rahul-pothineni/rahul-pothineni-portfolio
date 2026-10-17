# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website for Rahul Pothineni. Nature-inspired aesthetic with a pastel green background and darker green falling leaves animation.

## Tech Stack

- **Frontend**: React + TypeScript, bundled with Vite
- **Backend**: Python + FastAPI
- **Hosting**: AWS (future)
- **Package manager**: npm

## Project Structure

- `frontend/` — Vite + React + TypeScript app
- `backend/` — Python FastAPI server

## Development Commands

### Frontend
```bash
cd frontend
npm install        # install dependencies
npm run dev        # start dev server (default: http://localhost:5173)
npm run build      # production build to dist/
npm run preview    # preview production build
```

### Backend
```bash
cd backend
python -m venv venv                    # create virtual environment
source venv/bin/activate               # activate venv (macOS/Linux)
pip install -r requirements.txt        # install dependencies
uvicorn app.main:app --reload          # start dev server (default: http://localhost:8000)
```

## Design Direction

- Organic / botanical / soft nature aesthetic
- Pastel green background with darker green falling leaf SVGs as the signature visual
- Distinctive serif typography (not generic fonts like Inter/Roboto/Arial)
- CSS-only leaf animations for performance
