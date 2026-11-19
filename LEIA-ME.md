# Site de pedidos · Ateliê Gramatura²

**No ar em:** https://gramatura-atelie.github.io (repositório github.com/gramatura-atelie/gramatura-atelie.github.io, com os arquivos do site direto na raiz)

Site de uma página para o link na bio. HTML, CSS e JS puros, sem instalação.

## Arquivos
- `index.html`: a página
- `produtos.js`: **o único arquivo que você edita no dia a dia** (número do WhatsApp, produtos, preços, prazos, fotos)
- `styles.css` e `app.js`: visual e funcionamento
- `img/`: fotos em WebP (cada produto em dois tamanhos: `nome-480.webp` e `nome-800.webp`)

## Antes de publicar
Abra `produtos.js` e troque `5547XXXXXXXXX` pelo número do WhatsApp (55 + DDD + número, só dígitos).

## Como editar um produto
No `produtos.js`, cada produto é um bloco `{ ... }`. Mude o texto entre aspas e salve.
- Esconder sem apagar: `ativo: false`
- Selo no cartão: `selo: "Mais pedido"` (ou apague a linha)
- Trocar foto: salve `minha-foto-480.webp` e `minha-foto-800.webp` em `img/` e escreva `foto: "minha-foto"`
- Link direto para um produto: `seusite/#bola-foto` (o `id` do produto) abre o produto já aberto. Bom para stories.

## Publicar grátis (sem domínio)
**GitHub Pages:** suba a pasta para um repositório público, vá em Settings → Pages → Branch `main` / pasta raiz → Save. Em 1 minuto fica no ar em `https://USUARIO.github.io/NOME-DO-REPO/`.

**Netlify (alternativa):** crie conta grátis, abra app.netlify.com/drop e arraste a pasta. Depois, em Site configuration → Change site name, use `ateliegramatura` → `https://ateliegramatura.netlify.app`.

## Trocar para um domínio próprio depois
1. Registre o domínio (ex.: `ateliegramatura.com.br` no registro.br, cerca de R$ 40 por ano).
2. **GitHub Pages:** Settings → Pages → Custom domain → digite o domínio. No registro.br, em DNS, crie:
   - 4 registros `A` para `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - 1 registro `CNAME` para `www` → `gramatura-atelie.github.io`
   Marque "Enforce HTTPS" quando aparecer.
3. **Netlify:** Domain management → Add a domain, e siga os registros que ele mostrar.
4. Troque o link na bio do Instagram e do TikTok. O endereço antigo continua funcionando.
