# Matheus Moraes · Advocacia e Assessoria Jurídica

Site institucional de página única do advogado Matheus Moraes (Santos, SP), publicado em **https://matheus-moraes.vercel.app**.

Prototipado no Claude Design como HTML estático e migrado para Next.js. A página é gerada de forma estática (SSG) e revalidada uma vez por dia, para atualizar a nota do Google.

> **Os textos do site precisam ser lidos e aprovados pelo próprio Matheus Moraes antes de cada publicação.** Veja a seção [Publicidade da advocacia (OAB)](#publicidade-da-advocacia-oab).

## Stack

| Item | Versão |
| --- | --- |
| Next.js (App Router, Turbopack) | 16.3.8 |
| React / React DOM | 19.2.4 |
| Tailwind CSS (via `@tailwindcss/postcss`) | 4.x |
| TypeScript | 5.x (`strict`) |
| ESLint (`eslint-config-next`) | 9.x / 16.3.8 |
| Fontes | Playfair Display (500–700) e Jost (400–600) via `next/font`, auto-hospedadas |

Sem bibliotecas de UI ou de animação: as animações são CSS, e só três componentes usam JavaScript no navegador (menu, sanfona do FAQ e animação de entrada).

## Como rodar

```bash
npm install
cp .env.example .env.local   # opcional: só para testar a Places API localmente
npm run dev                  # http://localhost:3000
npm run lint
npm run build && npm start   # build de produção
```

## Estrutura

```
src/
  app/          layout (fontes, metadata), page, globals.css, robots.ts,
                sitemap.ts, favicon.ico, icon.png, apple-icon.png
  components/
    layout/     Navbar (client), Footer
    sections/   Hero, AreasAtuacao, Sobre, Atendimento, GoogleReviews,
                Faq + FaqAccordion (client), Contato
    ui/         Section/Container, SectionHeading, Eyebrow, SectionTitle,
                Button, Reveal (client), ScrollToTop (client)
    icons/      ícones SVG (decorativos, aria-hidden)
    seo/        JsonLd
  data/         conteúdo: áreas, FAQ, etapas do atendimento, navegação,
                fatos do Sobre, linha de confiança, nota de fallback
  lib/          site.ts (fonte única dos dados do escritório),
                google-places.ts, structured-data.ts, cn.ts
  types/        tipos compartilhados
public/
  assets/       logo (mm-logo-white.png), foto original com máscara oval
                (matheus-oval.png; usada no JSON-LD) e retrato do Hero
                (matheus-retrato.jpg)
  og.jpg        imagem de compartilhamento 1200x630
```

Ordem da página (igual à do menu): Hero → Áreas de atuação → Sobre → Atendimento → Avaliações → Dúvidas → Contato.

## Variáveis de ambiente

| Variável | Onde | Obrigatória | Para quê |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Vercel e `.env.local` | Não (padrão `https://matheus-moraes.vercel.app`) | URL canônica, Open Graph, sitemap, robots e JSON-LD. Trocar quando houver domínio próprio. |
| `GOOGLE_PLACES_API_KEY` | Só no servidor (Vercel) | Não | Nota e total de avaliações do Google. **Nunca** usar prefixo `NEXT_PUBLIC_`, que exporia a chave no navegador. |

Sem a chave, o site funciona normalmente com os valores de `src/data/reviews.ts`.

## Como atualizar os dados

Tudo o que é dado do escritório está em **`src/lib/site.ts`**. Os componentes leem dali, e campos vazios (`""`) simplesmente não aparecem no site.

| O quê | Onde |
| --- | --- |
| Número da OAB | `site.oab.number` (ex.: `"123.456"`). Aparece no Hero, no Sobre, no rodapé e no JSON-LD. |
| Ano de início e formação | `site.practiceSince`, `site.education` (aparecem no Sobre) |
| Telefone, WhatsApp, e-mail | `site.phone`, `site.whatsapp` (inclui a mensagem padrão), `site.email` |
| Endereço, CEP, horário | `site.address` (`postalCode`), `site.openingHours` |
| Instagram, ficha do Google, Place ID | `site.instagram`, `site.google` |
| Áreas de atuação e exemplos | `src/data/areas.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Etapas do atendimento | `src/data/process.ts` |
| Fatos do Sobre / linha de confiança do Hero | `src/data/stats.ts` / `src/data/hero.ts` |
| Nota de fallback do Google | `src/data/reviews.ts` (atualizar à mão se a API ficar desligada) |

Para um link do menu novo, inclua-o em `src/data/navigation.ts` na mesma posição da seção na página.

## Avaliações do Google (Places API)

`src/lib/google-places.ts` chama a [Place Details da Places API (New)](https://developers.google.com/maps/documentation/places/web-service/place-details) pedindo só três campos (`rating`, `userRatingCount` e `googleMapsUri`), com `next: { revalidate: 86400 }` e timeout de 5 s. Sem chave, sem Place ID ou com qualquer erro, a função retorna `null`, e a seção usa o fallback, sem quebrar a página. A página exporta `revalidate = 86400`, então é regenerada no máximo uma vez por dia, mesmo se a chamada falhar.

A seção mostra a atribuição "Dados: Google Maps" e a data da última atualização, como pedem as políticas da Google Maps Platform para dados exibidos fora de um mapa.

### 1. Criar e restringir a chave

1. Acesse https://console.cloud.google.com e crie um projeto (ex.: `matheus-moraes-site`).
2. Em **Faturamento**, vincule uma conta de faturamento. A Google Maps Platform exige isso mesmo dentro da cota gratuita. Com revalidação diária, o uso fica em torno de 30 a 60 chamadas por mês; confira a tabela de preços vigente do SKU *Place Details* que inclui `rating`.
3. Em **APIs e serviços → Biblioteca**, procure **Places API (New)** e clique em **Ativar**.
4. Em **APIs e serviços → Credenciais**, clique em **Criar credenciais → Chave de API**.
5. Abra a chave criada e configure:
   - **Restrições de API:** marque *Restringir chave* e selecione **apenas Places API (New)**.
   - **Restrições de aplicativo:** deixe *Nenhuma*. A chamada sai dos servidores da Vercel, que não têm IP fixo, então restrição por IP não funciona, e restrição por referenciador HTTP só vale para chamadas feitas no navegador. A proteção vem de a chave nunca sair do servidor e de só funcionar para a Places API.
6. Em **APIs e serviços → Places API (New) → Cotas**, limite *Requests per day* (ex.: 100). Em **Faturamento → Orçamentos e alertas**, crie um alerta de orçamento baixo.
7. Na Vercel: **Project → Settings → Environment Variables**, crie `GOOGLE_PLACES_API_KEY` para *Production* e *Preview* e faça um novo deploy.

### 2. Descobrir o Place ID

O link da ficha (`https://share.google/Mtv0NExxCI1pMbFvJ`) leva a uma busca pelo nome **"Matheus Moraes Advogados e Assessoria Jurídica"** (Knowledge Graph `/g/11l68thwd_`). Esse identificador não é o Place ID, e a conversão exige a própria API. Duas formas:

- **Sem programar:** abra o [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id), busque o nome acima e copie o ID (`ChIJ…`).
- **Com a chave criada:**

  ```bash
  curl -s -X POST https://places.googleapis.com/v1/places:searchText \
    -H "Content-Type: application/json" \
    -H "X-Goog-Api-Key: $GOOGLE_PLACES_API_KEY" \
    -H "X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress" \
    -d '{"textQuery": "Matheus Moraes Advogados e Assessoria Jurídica, Santos SP"}'
  ```

Cole o ID em `site.google.placeId` (`src/lib/site.ts`), faça o commit e o deploy.

## Headers de segurança

Definidos em `next.config.ts` para todas as rotas:

| Header | Valor | Por quê |
| --- | --- | --- |
| `Content-Security-Policy` | `default-src 'self'`; scripts e estilos `'self' 'unsafe-inline'`; imagens `'self' data: blob:`; fontes `'self'`; `connect-src 'self'`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`; `upgrade-insecure-requests` | Tudo é servido pelo próprio domínio (fontes auto-hospedadas, imagens via `/_next/image`). `'unsafe-inline'` é necessário porque a página é estática: CSP com nonce forçaria renderização dinâmica (ver `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`). |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Força HTTPS por 2 anos. |
| `X-Content-Type-Options` | `nosniff` | Impede o navegador de "adivinhar" tipos de arquivo. |
| `X-Frame-Options` | `DENY` | Equivalente legado de `frame-ancestors 'none'` (anti-clickjacking). |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Não vaza caminhos completos para outros sites. |
| `Permissions-Policy` | câmera, microfone, geolocalização, pagamento, USB e `browsing-topics` desligados | O site não usa nenhum desses recursos. |

Também `poweredByHeader: false`. A chamada à Places API sai do servidor, então não passa pela CSP. Observação: nos *Preview Deployments* a barra de comentários da Vercel (`vercel.live`) fica bloqueada pela CSP; em produção ela não é usada.

## Decisões técnicas

- **Página estática com ISR de 24 h:** o site não tem conteúdo dinâmico além da nota do Google.
- **Fonte única de dados (`site.ts`) e campos vazios que não renderizam:** nenhum dado faltante é inventado nem aparece como placeholder.
- **Tailwind v4 com tokens no `@theme`:** cores, sombras e animações são tokens; não há cor hardcoded nos componentes. Todo CSS próprio está em `@layer` (CSS fora de camada vence os utilitários no v4).
- **Conteúdo nunca depende de JavaScript:** o HTML do servidor vem com tudo visível. O `Reveal` só esconde, depois da hidratação, o que ainda está abaixo da dobra. Sem JS, as respostas do FAQ ficam abertas (`@media (scripting: none)`).
- **Foto do Hero sem `preload`:** medições do Lighthouse mostraram que o LCP é o nome no cabeçalho, não a foto (ela entra com fade e fica abaixo da dobra no celular). `priority` foi descontinuado no Next 16, e a doc recomenda `preload` só para o elemento LCP. Um teste com `loading="eager"` não trouxe ganho (LCP mobile de 2,7 s em 2 de 3 rodadas, contra 2,2 s com lazy), então a foto mantém o lazy loading padrão.
- **Retrato do Hero em arco com moldura concêntrica:** `matheus-retrato.jpg` (272×476, proporção 4:7) é o maior arco que cabe na área opaca do oval de `matheus-oval.png`, recortado dos canais de cor originais, por isso preenche o arco sem borda esfumaçada. A moldura é o mesmo arco (`rounded-t-full`) ampliado 12/16 px para cada lado, então o espaçamento é igual em todo o perímetro e a linha fecha na base. Ao trocar a foto, gere um novo recorte 4:7 com o rosto no terço superior.
- **Logo continua em PNG:** não há arquivo vetorial original, e vetorizar o PNG alteraria a marca. O PNG é servido redimensionado (48/96 px). Se o cliente tiver o SVG/AI/PDF original, vale trocar.
- **Sem iframe de mapa:** o endereço tem link externo para o Google Maps, para não carregar rastreadores nem afrouxar a CSP.
- **JSON-LD `Attorney`/`LegalService` + `Person`, sem `aggregateRating`.**
- **Overrides:** `nanoid` fixado em 3.3.19 (corrigido e com mais de 2 semanas de lançamento; a 3.3.20 tinha 11 dias).

## Problemas encontrados e como foram resolvidos

| Problema (relatório inicial) | Solução |
| --- | --- |
| `metadataBase`, `og:url` e `og:image` apontavam para um domínio não registrado | `SITE_URL` em `site.ts`, lendo `NEXT_PUBLIC_SITE_URL`, com a URL da Vercel como padrão |
| `next@16.2.12` com 1 vulnerabilidade crítica e 4 altas em produção | Next 16.3.8 + override do `nanoid`; `npm audit --omit=dev`: 0 vulnerabilidades |
| Scraper do Google (viola os Termos) | Removido; Places API oficial com fallback |
| CSS fora de `@layer` | Tudo em `@theme`, `@utility`, `@layer base` ou `@layer components` |
| WhatsApp repetido 4×, 13 cores e 9 `rgba` fora do tema | `site.ts` e tokens do tema |
| FAQ inacessível por teclado, menu mobile com links focáveis quando fechado, sem `<main>` nem skip link | Sanfona com `<button aria-expanded>`, menu com `inert` e Esc, landmarks e skip link (Lighthouse Acessibilidade 89 → 100) |
| Conteúdo invisível sem JS; contador renderizava "0+" | Reveal progressivo; contador substituído por lista de fatos |
| Contraste reprovado (copyright 3,49:1; números dos cards 2,29:1) | `#827f77` (4,86:1) e `gold/75` (≈4,9:1) |
| Foto declarada 520×520 (real 452×644); OG com a foto oval | Dimensões reais + `sizes`; OG dedicada 1200×630 JPEG (77 KB) |
| Sem canonical, sitemap, robots, JSON-LD; favicon padrão do Next | Todos criados; ícones gerados a partir do logo |
| Textos com linguagem de autoengrandecimento e depoimentos com resultado | Revisados (ver abaixo) |

## Dependências de desenvolvimento

`npm audit` (incluindo dev) ainda acusa 5 alertas altos, todos na mesma cadeia: `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces` (DoS por padrões glob muito aninhados). A única "correção" oferecida é rebaixar `eslint-config-next` para a 14.2.35, incompatível com o Next 16. Como roda só no lint local, com padrões do próprio projeto, o risco é desprezível. Acompanhar uma nova versão do `eslint-config-next`.

## Publicidade da advocacia (OAB)

> A revisão abaixo é técnica, não é parecer jurídico. A responsabilidade pela publicidade é do advogado inscrito, que deve validar os textos finais.

Referências: [Provimento 205/2021 do Conselho Federal da OAB](https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021) e art. 44 do Código de Ética e Disciplina.

Trocas feitas nos textos próprios:

| Antes | Depois | Motivo |
| --- | --- | --- |
| "Com anos de experiência, o escritório…" | "Assessoria jurídica em … com atendimento presencial em Santos e online em todo o país." | Qualificação sem número não é comprovável (art. 4º, § 1º); o ano entra por `site.practiceSince` |
| "…compromisso com resultados sólidos." | "…atenção individual em todas as etapas do caso." | Evita sugerir resultado (art. 6º) |
| "Assessoria jurídica completa, com foco na defesa dos melhores interesses de cada cliente." | "Conheça as áreas em que o escritório atua e alguns exemplos das questões mais comuns em cada uma." | Autoengrandecimento (art. 3º, IV) |
| "100% Atendimento Personalizado" (e "4+") | Lista de fatos: sede, formas de atendimento, abrangência | Número retórico sem base |
| "Fale Agora" | "Agendar conversa" / "Agendar uma conversa" | Menos imperativo de contratação (art. 3º, § 1º) |
| "Estamos aqui para lhe ajudar…" | "Atendimento presencial em Santos e online. Escolha o canal de sua preferência para agendar uma conversa." | Tom informativo |
| 6 depoimentos de clientes | Só nota, total e link para a ficha do Google | Alguns citavam resultado ou convidavam à contratação ("obtivemos sucesso", "chame-o já", "resolveu tudo"), os demais traziam "recomendo"/"indico", e nenhum tinha data absoluta |

### Checklist antes de publicar

- [ ] Número de inscrição na OAB preenchido em `site.oab.number` (**principal pendência**)
- [ ] Textos das áreas, exemplos, etapas do atendimento e FAQ lidos e aprovados pelo advogado
- [ ] Nenhuma promessa ou menção a resultado, nenhum caso concreto
- [ ] Nenhuma menção a valores, descontos ou gratuidade
- [ ] Nenhuma especialidade anunciada sem título que a comprove
- [ ] Títulos e qualificações (formação, ano de início) verdadeiros e comprováveis
- [ ] Sem depoimentos de clientes; nota do Google sem `aggregateRating` no JSON-LD
- [ ] Aviso de caráter informativo no rodapé

## Pendências que dependem do cliente

- Número da OAB.
- Place ID da ficha do Google e chave da Places API (passo a passo acima).
- CEP, horário de atendimento, ano de início na advocacia e formação.
- Foto em alta resolução: o retrato do Hero é um recorte de 272×476 px (do original de 452×644) exibido com até 340 px de largura, então fica ampliado mesmo em telas comuns. Pedir a foto original sem a máscara oval, com pelo menos **1000×1750 px** (proporção 4:7, ou maior para recortar), retrato vertical, fundo neutro e espaço acima da cabeça.
- Logo em formato vetorial (SVG, AI ou PDF), se existir.
- Domínio próprio (quando houver: configurar na Vercel e definir `NEXT_PUBLIC_SITE_URL`).
- Validação de todos os textos.
