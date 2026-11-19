(() => {
  const C = window.CONFIG, CATS = window.CATEGORIAS;
  const PRODS = window.PRODUTOS.filter(p => p.ativo !== false);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const D = C.desconto && C.desconto.ativo ? C.desconto : null;
  const cupomTxt = D ? `\n\nÉ a minha primeira compra: quero usar o cupom ${D.cupom} (${D.percentual}% de desconto).` : "";
  const wa = msg => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg + cupomTxt)}`;
  const msgProduto = nome => `Oi! Vim pelo site e quero um orçamento de: ${nome} ✉️`;
  const img = (nome, w) => `img/${nome}-${w}.webp`;

  // links gerais
  $$(".js-wa-geral").forEach(a => (a.href = wa(C.mensagemGeral)));
  $$(".js-ig").forEach(a => (a.href = `https://instagram.com/${C.instagram}`));
  $$(".js-tt").forEach(a => (a.href = `https://www.tiktok.com/@${C.tiktok}`));

  // número do WhatsApp formatado no rodapé
  const n = C.whatsapp.replace(/^55/, "");
  $$(".js-wa-numero").forEach(a => (a.textContent = `WhatsApp (${n.slice(0, 2)}) ${n.slice(2, -4)}-${n.slice(-4)}`));

  // endereço no rodapé
  const E = C.endereco || {};
  const end = [[E.cidade, E.estado].filter(Boolean).join(" · "), E.cep && `CEP ${E.cep}`, E.complemento].filter(Boolean);
  $$(".js-endereco").forEach(li => (li.innerHTML = end.map(esc).join("<br>")));

  // oferta de primeira compra
  if (D) {
    const faixa = $(".js-faixa-topo");
    faixa.hidden = false;
    faixa.innerHTML = `<span class="brilho" aria-hidden="true">✦</span> Sua primeira compra tem <strong>${D.percentual}% de desconto</strong> <span class="sep">·</span> <span class="faixa-cupom">cupom ${esc(D.cupom)}</span>`;
    const ro = $(".js-rodape-oferta");
    ro.hidden = false;
    ro.innerHTML = `<strong>Primeira compra?</strong> Ganhe ${D.percentual}% de desconto com o cupom <span>${esc(D.cupom)}</span>. Ele já vai escrito na sua mensagem.`;
  }

  // aviso de Natal com contagem
  const fim = new Date(C.prazoNatal + "T23:59:59");
  const dias = Math.ceil((fim - new Date()) / 864e5);
  if (dias >= 0) {
    const el = $(".js-natal");
    el.hidden = false;
    $(".js-natal-txt").textContent = dias === 0
      ? "Hoje é o último dia para pedidos de Natal"
      : `Pedidos de Natal até ${fim.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} · faltam ${dias} ${dias === 1 ? "dia" : "dias"}`;
  }

  // ---------- catálogo ----------
  const chips = $(".js-chips"), faixas = $(".js-faixas");
  const seta = d => `<svg viewBox="0 0 24 24"><path d="${d ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"}"/></svg>`;

  CATS.forEach(cat => {
    const itens = PRODS.filter(p => p.categoria === cat.id);
    if (!itens.length) return;
    chips.insertAdjacentHTML("beforeend", `<a class="chip" href="#cat-${cat.id}" data-cat="${cat.id}">${esc(cat.nome)}</a>`);
    faixas.insertAdjacentHTML("beforeend", `
      <section class="faixa" id="cat-${cat.id}" aria-labelledby="h-${cat.id}">
        <div class="faixa-cab">
          <div><h3 id="h-${cat.id}">${esc(cat.nome)}</h3>${cat.nota ? `<p class="nota">${esc(cat.nota)}</p>` : ""}</div>
          <div class="setas">
            <button class="seta-btn" type="button" data-dir="-1" aria-label="Ver anteriores em ${esc(cat.nome)}">${seta(0)}</button>
            <button class="seta-btn" type="button" data-dir="1" aria-label="Ver mais em ${esc(cat.nome)}">${seta(1)}</button>
          </div>
        </div>
        <div class="trilho" tabindex="0" role="list" aria-label="${esc(cat.nome)}">
          ${itens.map(p => `
          <article class="card" role="listitem">
            <button class="card-abrir" type="button" data-id="${p.id}" aria-label="Ver detalhes: ${esc(p.nome)}">
              <div class="card-foto"><img src="${img(p.foto, 480)}" srcset="${img(p.foto, 480)} 480w, ${img(p.foto, 800)} 800w" sizes="280px" alt="${esc(p.nome)}" width="480" height="600" loading="lazy" decoding="async"></div>
              ${p.selo ? `<span class="selo">${esc(p.selo)}</span>` : ""}
              <div class="card-txt"><h4>${esc(p.nome)}</h4><p>${esc(p.curta)}</p></div>
            </button>
            <div class="card-rodape">
              <p class="preco">a partir de <strong>${esc(p.preco)}</strong>${esc(p.unidade || "")}</p>
              <div class="card-acoes">
                <a class="btn btn-tinta" href="${wa(msgProduto(p.nome))}" target="_blank" rel="noopener">
                  <svg class="ico-wa" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg><span>Pedir no WhatsApp</span>
                </a>
                <button class="btn-mais js-add" type="button" data-id="${p.id}" aria-label="Adicionar ${esc(p.nome)} à comanda"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg></button>
              </div>
            </div>
          </article>`).join("")}
        </div>
      </section>`);
  });

  // setas das faixas (computador)
  $$(".faixa").forEach(f => {
    const t = $(".trilho", f), [ant, prox] = $$(".seta-btn", f);
    const atualiza = () => {
      ant.disabled = t.scrollLeft < 8;
      prox.disabled = t.scrollLeft + t.clientWidth >= t.scrollWidth - 8;
    };
    $$(".seta-btn", f).forEach(b => b.addEventListener("click", () =>
      t.scrollBy({ left: +b.dataset.dir * t.clientWidth * 0.85, behavior: "smooth" })));
    t.addEventListener("scroll", atualiza, { passive: true });
    window.addEventListener("resize", atualiza);
    atualiza();
  });

  // chip ativo conforme a rolagem
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id.replace("cat-", "");
    $$(".chip").forEach(c => {
      const on = c.dataset.cat === id;
      c.setAttribute("aria-current", on);
      if (on) chips.scrollTo({ left: c.offsetLeft - 16, behavior: "smooth" }); // so rola as abas, nunca a pagina
    });
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$(".faixa").forEach(f => io.observe(f));

  // ---------- modal ----------
  const modal = $(".js-modal");
  let atual = null;
  const abrir = p => {
    atual = p;
    const cat = CATS.find(c => c.id === p.categoria);
    $(".js-m-img").src = img(p.foto, 800);
    $(".js-m-img").alt = p.nome;
    $(".js-m-cat").textContent = cat ? cat.nome : "";
    $(".js-m-nome").textContent = p.nome;
    $(".js-m-preco").textContent = p.preco + (p.unidade || "");
    $(".js-m-desc").textContent = p.descricao;
    $(".js-m-prazo").textContent = p.prazo;
    $(".js-m-min").textContent = p.minimo;
    $(".js-m-tags").innerHTML = (p.personaliza || []).map(t => `<li>${esc(t)}</li>`).join("");
    $(".js-m-wa").href = wa(msgProduto(p.nome));
    modal.showModal();
    modal.scrollTop = 0;
    history.pushState({ modal: p.id }, "", "#" + p.id);
  };
  const fechar = () => { if (modal.open) modal.close(); };
  faixas.addEventListener("click", e => {
    const b = e.target.closest(".card-abrir");
    if (b) abrir(PRODS.find(p => p.id === b.dataset.id));
  });
  $(".js-fechar").addEventListener("click", fechar);
  modal.addEventListener("click", e => { if (e.target === modal) fechar(); });
  modal.addEventListener("close", () => { if (history.state && history.state.modal) history.back(); });
  window.addEventListener("popstate", () => { if (modal.open) modal.close(); });
  $(".js-m-add").addEventListener("click", () => { if (atual) { adicionar(atual.id); fechar(); } });
  // abrir direto por link (ex.: site/#bola-foto)
  const inicial = PRODS.find(p => "#" + p.id === location.hash);
  if (inicial) { history.replaceState(null, "", location.pathname); abrir(inicial); }

  // ---------- comanda ----------
  const CHAVE = "gramatura-comanda";
  let comanda = [];
  try { comanda = JSON.parse(localStorage.getItem(CHAVE) || "[]").filter(i => PRODS.some(p => p.id === i.id)); } catch (e) { comanda = []; }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(comanda)); } catch (e) {} };
  const minimo = p => parseInt(p.minimo, 10) || 1;
  const passo = p => (minimo(p) >= 20 ? 10 : 1);
  const lista = $(".js-comanda-lista"), vazia = $(".js-comanda-vazia");
  const pilula = $(".js-pilula"), aviso = $(".js-aviso");
  let avisoT;
  const avisar = txt => {
    aviso.textContent = txt; aviso.classList.add("on");
    clearTimeout(avisoT); avisoT = setTimeout(() => aviso.classList.remove("on"), 2200);
  };

  const desenhar = () => {
    lista.innerHTML = comanda.map(i => {
      const p = PRODS.find(x => x.id === i.id);
      return `<li class="item" data-id="${p.id}">
        <img src="${img(p.foto, 480)}" alt="" width="56" height="70" loading="lazy">
        <div class="item-txt"><strong>${esc(p.nome)}</strong><span>a partir de ${esc(p.preco)}${esc(p.unidade || "")}</span></div>
        <div class="qtd" role="group" aria-label="Quantidade de ${esc(p.nome)}">
          <button type="button" data-acao="menos" aria-label="Diminuir"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"/></svg></button>
          <input type="number" inputmode="numeric" min="${minimo(p)}" step="${passo(p)}" value="${i.qtd}" aria-label="Quantidade">
          <button type="button" data-acao="mais" aria-label="Aumentar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg></button>
        </div>
        <button class="item-tirar" type="button" data-acao="tirar" aria-label="Tirar ${esc(p.nome)} da comanda"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg></button>
      </li>`;
    }).join("");
    const n = comanda.length;
    vazia.hidden = n > 0;
    $(".js-limpar").hidden = n === 0;
    pilula.hidden = n === 0;
    $(".js-pilula-n").textContent = n;
    $$(".js-add").forEach(b => b.classList.toggle("na-comanda", comanda.some(i => i.id === b.dataset.id)));
    salvar();
  };

  const adicionar = id => {
    const p = PRODS.find(x => x.id === id);
    const it = comanda.find(i => i.id === id);
    if (it) it.qtd += passo(p); else comanda.push({ id, qtd: minimo(p) });
    desenhar();
    pilula.classList.remove("pulo"); void pilula.offsetWidth; pilula.classList.add("pulo");
    avisar(`${p.nome} na comanda ✓`);
  };

  faixas.addEventListener("click", e => {
    const b = e.target.closest(".js-add");
    if (b) adicionar(b.dataset.id);
  });

  lista.addEventListener("click", e => {
    const b = e.target.closest("button[data-acao]"); if (!b) return;
    const id = b.closest(".item").dataset.id, p = PRODS.find(x => x.id === id);
    const it = comanda.find(i => i.id === id);
    if (b.dataset.acao === "tirar") comanda = comanda.filter(i => i.id !== id);
    if (b.dataset.acao === "mais") it.qtd += passo(p);
    if (b.dataset.acao === "menos") {
      if (it.qtd - passo(p) < minimo(p)) comanda = comanda.filter(i => i.id !== id);
      else it.qtd -= passo(p);
    }
    desenhar();
  });
  lista.addEventListener("change", e => {
    if (!e.target.matches("input")) return;
    const id = e.target.closest(".item").dataset.id, p = PRODS.find(x => x.id === id);
    const it = comanda.find(i => i.id === id);
    it.qtd = Math.max(minimo(p), parseInt(e.target.value, 10) || minimo(p));
    desenhar();
  });
  $(".js-limpar").addEventListener("click", () => { comanda = []; desenhar(); });
  // esconde o botao da comanda quando a propria comanda esta na tela
  new IntersectionObserver(([e]) => document.body.classList.toggle("vendo-comanda", e.isIntersecting), { threshold: 0.15 }).observe($("#pedido"));

  $(".js-form").addEventListener("submit", e => {
    e.preventDefault();
    const ideia = (new FormData(e.target).get("ideia") || "").toString().trim();
    if (!comanda.length && !ideia) {
      vazia.classList.remove("chama"); void vazia.offsetWidth; vazia.classList.add("chama");
      avisar("Adicione um produto ou conte a sua ideia");
      return;
    }
    const linhas = ["Oi! Vim pelo site e quero um orçamento ✉️"];
    if (comanda.length) {
      linhas.push("", "Minha comanda:");
      comanda.forEach(i => { const p = PRODS.find(x => x.id === i.id); linhas.push(`• ${i.qtd}x ${p.nome}`); });
    }
    if (ideia) linhas.push("", `Minha ideia: ${ideia}`);
    location.href = wa(linhas.join("\n"));
  });
  desenhar();

  // topo com sombra ao rolar
  const topo = $("#topo");
  const onScroll = () => topo.classList.toggle("rolou", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

})();
