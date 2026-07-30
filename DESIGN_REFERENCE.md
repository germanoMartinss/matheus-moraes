# Handoff: Site Matheus Moraes Advocacia

## Overview
Site institucional de página única (one-page) para o advogado Matheus Moraes, com foco em transmitir confiança e credibilidade. Seções: Hero, Sobre, Áreas de Atuação, FAQ e Contato.

## Sobre os arquivos
`index.html` é uma **referência de design em HTML puro** (sem framework, sem build step) — já é código funcional e pode ser aberto direto no navegador ou publicado em qualquer hospedagem estática (Netlify, Vercel, GitHub Pages, cPanel etc). Se for integrar a um projeto existente (WordPress, Next.js, etc.), recrie estas seções usando os padrões daquele projeto, usando este arquivo como referência fiel de layout, cores e textos.

## Fidelidade
**Alta fidelidade (hifi)**: cores, tipografia, espaçamentos e textos finais já definidos. Pode ser usado tal como está.

## Stack usada
- HTML5 + CSS inline + pouco JavaScript vanilla (só para abrir/fechar o FAQ)
- Fontes: Google Fonts — Playfair Display (títulos) e Jost (texto corrido)
- Sem dependências, sem framework, sem build

## Estrutura (seções)
1. **Nav fixa**: logo + nome + links âncora (Áreas, Sobre, FAQ, Contato) + CTA "Fale Agora" (WhatsApp)
2. **Hero** (`#topo`): headline, subtexto, dois CTAs (WhatsApp e âncora Áreas), foto do advogado
3. **Sobre** (`#sobre`): bio curta + 3 números de destaque
4. **Áreas de Atuação** (`#areas`): grid de 4 cards (Família, Médico, Criminal, Concursos Públicos)
5. **FAQ** (`#faq`): acordeão de 5 perguntas (JS simples de toggle)
6. **Contato** (`#contato`): endereço, telefone, e-mail + CTA WhatsApp
7. **Footer**: logo + nome + copyright

## Design tokens
- **Cores**: fundo `#0f1117` / `#141620` / `#0b0d12` (variações de navy/preto), dourado de destaque `#c8a862`, texto claro `#eae7e0` / `#f6f3ec`, texto secundário `#9d9a91` / `#c3bfb5`
- **Tipografia**: títulos `'Playfair Display', serif` (500–700); corpo `'Jost', sans-serif` (300–600)
- **Espaçamento de seção**: `110px` vertical, `6vw` horizontal
- **Bordas**: `2px` de raio nos botões (retos, sóbrios — sem cantos muito arredondados)

## Responsividade
Breakpoint único em `860px`: hero e "sobre" viram coluna única, grid de áreas vira 2 colunas, grid de contato vira coluna única, links de navegação desktop somem (não há menu mobile implementado — recomendo adicionar um menu hambúrguer se o tráfego mobile for relevante).

## Assets
- `assets/mm-logo-white.png` — marca "MM" (moldura + letras) em branco puro, fundo transparente. Recortado a partir do logo original fornecido pelo cliente.
- `assets/matheus-oval.png` — foto do advogado com máscara oval de esmaecimento nas bordas (fundo do estúdio removido via gradiente, não é recorte perfeito de contorno). Se o cliente tiver uma foto com fundo transparente de verdade, substituir este arquivo mantendo o mesmo nome/tamanho de exibição.

## Pendências / sugestões
- Não há menu mobile (hambúrguer) — os links de navegação somem em telas pequenas, restando só o CTA.
- O formulário de contato não foi incluído (o cliente pediu CTA direto via WhatsApp/telefone); adicionar um form é uma extensão simples caso o escritório queira captar leads por e-mail.
