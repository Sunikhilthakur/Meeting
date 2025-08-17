# Server (Express API)

## Run
- `npm install`
- copy `.env.example` to `.env` and fill values
- `npm run dev`

Endpoints:
- `POST /api/summarize` { instruction, transcript } -> { id, summary }
- `GET  /api/summary/:id` -> summary document
- `POST /api/share` { id, editedSummary, recipients[] } -> { ok }
