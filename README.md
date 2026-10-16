# Matheus Moraes · Advocacia e Assessoria Jurídica

Site institucional de página única do advogado Matheus Moraes (Santos, SP), publicado em https://matheus-moraes.vercel.app.

Prototipado no Claude Design como HTML estático e migrado para Next.js (App Router) + Tailwind CSS v4.

## Como rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Identidade visual

Herdada do protótipo (o HTML de referência foi removido do repositório; está no histórico, commit `15328a0`).

- **Cores:** fundos `#0f1117` / `#141620` / `#0b0d12` (navy/preto), dourado `#c8a862` (hover `#ddc48a`), texto `#eae7e0` / `#f6f3ec`, texto secundário `#9d9a91` / `#c3bfb5`.
- **Tipografia:** Playfair Display (títulos, 500–700) e Jost (corpo, 400–600), via `next/font`.
- **Formas:** botões retos (raio 2 px), linhas finas douradas entre cards, hachura diagonal discreta no Hero e no Contato.
- **Assets:** `public/assets/mm-logo-white.png` é a marca "MM" recortada do logo original, em branco sobre fundo transparente. `public/assets/matheus-oval.png` é a foto com máscara oval esmaecida (fundo de estúdio removido por gradiente). Se houver foto com fundo transparente de verdade, substituir mantendo o nome.

## Avaliações do Google

A nota e o total de avaliações vêm da [Places API (New)](https://developers.google.com/maps/documentation/places/web-service/place-details) — Place Details, campos `rating`, `userRatingCount` e `googleMapsUri` — num Server Component com revalidação de 24 h.

- Chave: variável de servidor `GOOGLE_PLACES_API_KEY` (nunca `NEXT_PUBLIC_`).
- Place ID: `site.google.placeId` em `src/lib/site.ts`.
- Sem chave, sem Place ID ou com falha da API, a página usa os últimos valores salvos em `data/google-reviews.json`.
