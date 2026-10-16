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

## Conteúdo e publicidade (OAB)

> **Os textos do site precisam ser lidos e aprovados pelo próprio Matheus Moraes antes de cada publicação.** A revisão abaixo é técnica, não é parecer jurídico; a responsabilidade pela publicidade é do advogado inscrito.

Referências: [Provimento 205/2021 do Conselho Federal da OAB](https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021) e art. 44 do Código de Ética e Disciplina.

- **Número da OAB:** obrigatório na publicidade. Preencher `site.oab.number` em `src/lib/site.ts`; ele passa a aparecer no Hero, no Sobre, no rodapé e no JSON-LD. Enquanto estiver vazio, o site não cumpre essa exigência.
- **Tom informativo:** foram removidas expressões de autoengrandecimento ou que sugerem resultado ("100%", "compromisso com resultados sólidos", "assessoria jurídica completa", "Fale Agora", "anos de experiência" sem número).
- **Avaliações:** o site mostra só a nota média, o total de avaliações e o link para a ficha do Google. Depoimentos individuais não são exibidos: entre os disponíveis, os que citavam resultado ou convidavam à contratação ("obtivemos sucesso", "chame-o já", "resolveu tudo") eram vedados (art. 4º, § 2º, e art. 3º, § 1º), os demais traziam "recomendo"/"indico", e nenhum tinha data absoluta.
- **JSON-LD sem `aggregateRating`:** a nota não é enviada aos buscadores como dado estruturado.
- **Sem preços:** honorários são citados só como "definidos após a análise do caso".
