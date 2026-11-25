(() => {
  const C = window.CONFIG, CATS = window.CATEGORIAS;
  const PRODS = window.PRODUTOS.filter(p => p.ativo !== false);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc_ = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const D = C.desconto && C.desconto.ativo ? C.desconto : null;
  const cupomTxt = D ? `\n\nÉ a minha primeira compra: quero usar o cupom ${D.cupom} (${D.percentual}% de desconto).` : "";
  const wa = msg => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg + cupomTxt)}`;
  const msgProduto = nome => `Oi! Vim pelo site e quero um orçamento de: ${nome} ✉️`;
  const img = (nome, w) => `img/${nome}-${w}.webp`;

  // ---------- opções e preços ----------
  const reais = v => "R$ " + (Number.isInteger(v) ? String(v) : v.toFixed(2).replace(".", ","));
  const temOpcoes = p => Array.isArray(p.opcoes) && p.opcoes.length > 0;
  const escPadrao = p => (p.opcoes || []).map(() => 0);
  const escolhidos = (p, esc) => (p.opcoes || []).map((g, gi) => g.itens[esc[gi]] || g.itens[0]);
  const precoUnit = (p, esc) => escolhidos(p, esc).reduce((t, it) => t + (it.preco || 0) + (it.mais || 0), 0);
  const resumo = (p, esc) => escolhidos(p, esc).map(it => it.nome).join(" · ");
  // camadas da árvore: tronco (pela cor), luzes e base
  const camadas = (p, esc) => {
    const c = { tronco: "verde", luzes: false, base: "", escala: 1, tam: null };
    escolhidos(p, esc).forEach(it => {
      if (it.tronco) c.tronco = it.tronco;
      if (it.luzes) c.luzes = true;
      if (it.base) c.base = it.base;
      if (it.escala) { c.escala = it.escala; c.tam = it; }
    });
    return c;
  };
  const fotoArvore = (p, esc) => `img/arvore-tronco-${camadas(p, esc).tronco}.webp`;
  const rotuloPreco = it => it.preco != null ? reais(it.preco) : it.mais ? `+ ${reais(it.mais)}` : (it.mais === 0 ? "incluso" : "");
  // desenha os grupos de escolha (usado na seção "Monte sua árvore" e na janela do produto)
  const desenharOpcoes = (alvo, p, esc, prefixo) => {
    alvo.innerHTML = p.opcoes.map((g, gi) => `
      <fieldset class="opc opc-${esc_(g.id)}">
        <legend><span class="opc-n">${gi + 1}</span>${esc_(g.nome)}</legend>
        <div class="opc-itens" data-n="${g.itens.length}">
          ${g.itens.map((it, ii) => `
          <label class="opc-item">
            <input type="radio" name="${prefixo}-${esc_(g.id)}" value="${ii}" data-g="${gi}"${esc[gi] === ii ? " checked" : ""}>
            <span class="opc-cx">
              ${it.amostra ? `<span class="opc-amostra" aria-hidden="true">${it.amostra.map(c => `<i style="background:${esc_(c)}"></i>`).join("")}</span>` : ""}
              <span class="opc-nome">${esc_(it.nome)}</span>
              ${it.detalhe ? `<span class="opc-det">${esc_(it.detalhe)}</span>` : ""}
              ${rotuloPreco(it) && !it.amostra ? `<span class="opc-preco">${esc_(rotuloPreco(it))}</span>` : ""}
            </span>
          </label>`).join("")}
        </div>
        ${g.nota ? `<p class="opc-nota">${esc_(g.nota)}</p>` : ""}
      </fieldset>`).join("");
  };

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
  $$(".js-endereco").forEach(li => (li.innerHTML = end.map(esc_).join("<br>")));

  // oferta de primeira compra
  if (D) {
    const faixa = $(".js-faixa-topo");
    faixa.hidden = false;
    faixa.innerHTML = `<span class="brilho" aria-hidden="true">✦</span> Sua primeira compra tem <strong>${D.percentual}% de desconto</strong> <span class="sep">·</span> <span class="faixa-cupom">cupom ${esc_(D.cupom)}</span>`;
    const ro = $(".js-rodape-oferta");
    ro.hidden = false;
    ro.innerHTML = `<strong>Primeira compra?</strong> Ganhe ${D.percentual}% de desconto com o cupom <span>${esc_(D.cupom)}</span>. Ele já vai escrito na sua mensagem.`;
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
    chips.insertAdjacentHTML("beforeend", `<a class="chip" href="#cat-${cat.id}" data-cat="${cat.id}">${esc_(cat.nome)}</a>`);
    faixas.insertAdjacentHTML("beforeend", `
      <section class="faixa" id="cat-${cat.id}" aria-labelledby="h-${cat.id}">
        <div class="faixa-cab">
          <div><h3 id="h-${cat.id}">${esc_(cat.nome)}</h3>${cat.nota ? `<p class="nota">${esc_(cat.nota)}</p>` : ""}</div>
          <div class="setas">
            <button class="seta-btn" type="button" data-dir="-1" aria-label="Ver anteriores em ${esc_(cat.nome)}">${seta(0)}</button>
            <button class="seta-btn" type="button" data-dir="1" aria-label="Ver mais em ${esc_(cat.nome)}">${seta(1)}</button>
          </div>
        </div>
        <div class="trilho" tabindex="0" role="list" aria-label="${esc_(cat.nome)}">
          ${itens.map(p => `
          <article class="card" role="listitem">
            <button class="card-abrir" type="button" data-id="${p.id}" aria-label="Ver detalhes: ${esc_(p.nome)}">
              <div class="card-foto"><img src="${img(p.foto, 480)}" srcset="${img(p.foto, 480)} 480w, ${img(p.foto, 800)} 800w" sizes="280px" alt="${esc_(p.nome)}" width="480" height="600" loading="lazy" decoding="async"></div>
              ${p.selo ? `<span class="selo">${esc_(p.selo)}</span>` : ""}
              <div class="card-txt"><h4>${esc_(p.nome)}</h4><p>${esc_(p.curta)}</p></div>
            </button>
            <div class="card-rodape">
              <p class="preco">a partir de <strong>${esc_(p.preco)}</strong>${esc_(p.unidade || "")}</p>
              <div class="card-acoes">
                <a class="btn btn-tinta" href="${wa(msgProduto(p.nome))}" target="_blank" rel="noopener">
                  <svg class="ico-wa" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg><span>Pedir no WhatsApp</span>
                </a>
                <button class="btn-mais js-add" type="button" data-id="${p.id}" aria-label="Adicionar ${esc_(p.nome)} à comanda"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg></button>
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
  const mOpc = $(".js-m-opcoes");
  let atual = null, mEsc = [];
  const msgEscolha = (p, esc) => `Oi! Vim pelo site e quero um orçamento de: ${p.nomeComanda || p.nome} (${resumo(p, esc)}, ${reais(precoUnit(p, esc))}) ✉️`;
  const atualizaModal = () => {
    const p = atual, com = temOpcoes(p);
    $(".js-m-apartir").hidden = com;
    $(".js-m-preco").textContent = com ? reais(precoUnit(p, mEsc)) : p.preco + (p.unidade || "");
    $(".js-m-wa").href = wa(com ? msgEscolha(p, mEsc) : msgProduto(p.nome));
  };
  const abrir = p => {
    if (p.montador) { irMontador(); return; }
    atual = p; mEsc = escPadrao(p);
    const cat = CATS.find(c => c.id === p.categoria);
    $(".js-m-img").src = img(p.foto, 800);
    $(".js-m-img").alt = p.nome;
    $(".js-m-cat").textContent = cat ? cat.nome : "";
    $(".js-m-nome").textContent = p.nome;
    $(".js-m-desc").textContent = p.descricao;
    $(".js-m-prazo").textContent = p.prazo;
    $(".js-m-min").textContent = p.minimo;
    $(".js-m-tags").innerHTML = (p.personaliza || []).map(t => `<li>${esc_(t)}</li>`).join("");
    mOpc.hidden = !temOpcoes(p);
    if (temOpcoes(p)) desenharOpcoes(mOpc, p, mEsc, "m");
    atualizaModal();
    modal.showModal();
    modal.scrollTop = 0;
    history.pushState({ modal: p.id }, "", "#" + p.id);
  };
  mOpc.addEventListener("change", e => {
    if (!e.target.matches("input[type=radio]")) return;
    mEsc[+e.target.dataset.g] = +e.target.value;
    atualizaModal();
  });
  const fechar = () => { if (modal.open) modal.close(); };
  faixas.addEventListener("click", e => {
    const b = e.target.closest(".card-abrir");
    if (b) abrir(PRODS.find(p => p.id === b.dataset.id));
  });
  $(".js-fechar").addEventListener("click", fechar);
  modal.addEventListener("click", e => { if (e.target === modal) fechar(); });
  modal.addEventListener("close", () => { if (history.state && history.state.modal) history.back(); });
  window.addEventListener("popstate", () => { if (modal.open) modal.close(); });
  $(".js-m-add").addEventListener("click", () => { if (atual) { adicionar(atual.id, temOpcoes(atual) ? mEsc.slice() : null); fechar(); } });

  // ---------- monte sua árvore ----------
  const ARV = PRODS.find(p => p.montador && temOpcoes(p));
  const secMontar = $("#monte-sua-arvore");
  let aEsc = ARV ? escPadrao(ARV) : [];
  function irMontador() {
    if (!secMontar || secMontar.hidden) return;
    secMontar.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  // ----- palco animado: cada escolha entra pela direita e encaixa na árvore -----
  const calmo = matchMedia("(prefers-reduced-motion: reduce)");
  const ENTRA = [
    { transform: "translateX(150%) rotate(10deg) scale(.9)", opacity: 0 },
    { transform: "translateX(-5%) rotate(-2deg) scale(1.02)", opacity: 1, offset: .72 },
    { transform: "none", opacity: 1 },
  ];
  const SAI = [{ transform: "none", opacity: 1 }, { transform: "translateX(-150%) rotate(-10deg) scale(.9)", opacity: 0 }];
  const mover = (el, quadros, ms, depois) => {
    if (calmo.matches || !el.animate) { if (depois) depois(); return; }
    const an = el.animate(quadros, { duration: ms, easing: "cubic-bezier(.22,.8,.25,1)", fill: "both" });
    an.onfinish = () => { if (depois) depois(); an.cancel(); };
  };
  const faiscas = () => {
    if (calmo.matches) return;
    const box = $(".js-faiscas");
    box.innerHTML = Array.from({ length: 8 }, (_, i) => `<i style="--a:${i * 45 + Math.random() * 20}deg;--d:${50 + Math.random() * 40}px;--t:${Math.round(Math.random() * 120)}ms">✦</i>`).join("");
    box.classList.remove("on"); void box.offsetWidth; box.classList.add("on");
  };
  const quica = el => { el.classList.remove("quica"); void el.offsetWidth; el.classList.add("quica"); };
  let cenaAnt = null;
  const atualizaMontador = () => {
    const c = camadas(ARV, aEsc), cena = $(".js-cena"), arv = $(".js-cena-arvore"), slot = $(".js-cena-base");
    const tam = c.tam || escolhidos(ARV, aEsc)[0];
    cena.style.setProperty("--escala", c.escala);
    arv.style.setProperty("--alto", c.base === "madeira" ? "3px" : c.base === "noel" ? "2px" : "82px");
    const novoCorpo = () => {
      const d = document.createElement("div");
      d.className = "cena-corpo";
      d.innerHTML = `<img src="img/arvore-tronco-${c.tronco}.webp" alt="" width="293" height="528"><img class="cena-luzes${c.luzes ? " acesa" : ""}" src="img/arvore-luzes.webp" alt="" width="293" height="528">`;
      return d;
    };
    if (!cenaAnt) {                                   // primeira vez: monta sem animação
      arv.replaceChildren(novoCorpo());
      if (c.base) slot.innerHTML = `<img class="cena-base-${c.base}" src="img/arvore-base-${c.base}.webp" alt="">`;
    } else {
      const corpoAtual = arv.lastElementChild;
      if (c.tronco !== cenaAnt.tronco) {               // cor nova: a árvore nova entra, a antiga sai
        [...arv.children].forEach(el => { if (el !== corpoAtual) el.remove(); });
        const novo = novoCorpo(); arv.append(novo);
        mover(corpoAtual, SAI, 420, () => corpoAtual.remove());
        mover(novo, ENTRA, 680, faiscas);
      } else if (c.luzes !== cenaAnt.luzes) {          // pisca-pisca entra voando ou sai
        const lz = $(".cena-luzes", corpoAtual);
        if (c.luzes) { lz.classList.add("acesa"); mover(lz, ENTRA, 680, faiscas); }
        else mover(lz, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateX(150%) rotate(10deg)" }], 380, () => lz.classList.remove("acesa"));
      }
      if (c.base !== cenaAnt.base) {                   // base: a nova chega pela direita e a árvore sobe nela
        [...slot.children].forEach(el => mover(el, SAI, 420, () => el.remove()));
        if (c.base) {
          slot.insertAdjacentHTML("beforeend", `<img class="cena-base-${c.base}" src="img/arvore-base-${c.base}.webp" alt="">`);
          mover(slot.lastElementChild, ENTRA, 680, faiscas);
        }
      }
      if (c.escala !== cenaAnt.escala) faiscas();
    }
    cenaAnt = c;
    const etiqueta = $(".js-mt-tam"), etTxt = `${tam.nome} · ${tam.detalhe || ""}`;
    if (etiqueta.textContent !== etTxt) { etiqueta.textContent = etTxt; quica(etiqueta); }
    $(".js-mt-resumo").textContent = resumo(ARV, aEsc);
    const tot = $(".js-mt-total"), novoTxt = reais(precoUnit(ARV, aEsc));
    if (tot.textContent !== novoTxt) { tot.textContent = novoTxt; quica(tot); }
    $(".js-mt-wa").href = wa(msgEscolha(ARV, aEsc));
  };
  if (ARV && secMontar) {
    secMontar.hidden = false;
    $$(".js-link-montar").forEach(a => (a.hidden = false));
    // pré-carrega as camadas
    ARV.opcoes.flatMap(g => g.itens).forEach(it => {
      const src = it.tronco ? `img/arvore-tronco-${it.tronco}.webp` : it.base ? `img/arvore-base-${it.base}.webp` : it.luzes ? "img/arvore-luzes.webp" : "";
      if (src) { const i = new Image(); i.src = src; }
    });
    desenharOpcoes($(".js-mt-opcoes"), ARV, aEsc, "mt");
    $(".js-mt-opcoes").addEventListener("change", e => {
      if (!e.target.matches("input[type=radio]")) return;
      aEsc[+e.target.dataset.g] = +e.target.value;
      atualizaMontador();
    });
    $(".js-mt-add").addEventListener("click", () => {
      adicionar(ARV.id, aEsc.slice());
      quica($(".js-cena-pulo")); faiscas();
    });
    atualizaMontador();
  }

  // abrir direto por link (ex.: site/#bola-foto)
  const inicial = PRODS.find(p => "#" + p.id === location.hash);
  if (inicial) { history.replaceState(null, "", location.pathname); abrir(inicial); }

  // ---------- comanda ----------
  const CHAVE = "gramatura-comanda";
  let comanda = [];
  try {
    comanda = JSON.parse(localStorage.getItem(CHAVE) || "[]").filter(i => PRODS.some(p => p.id === i.id));
    comanda.forEach(i => { const p = PRODS.find(x => x.id === i.id); if (temOpcoes(p) && !Array.isArray(i.esc)) i.esc = escPadrao(p); });
  } catch (e) { comanda = []; }
  const salvar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(comanda)); } catch (e) {} };
  const minimo = p => (temOpcoes(p) ? 1 : parseInt(p.minimo, 10) || 1);
  const passo = p => (minimo(p) >= 20 ? 10 : 1);
  const mesmo = (a, b) => a.id === b.id && (a.esc || []).join() === (b.esc || []).join();
  const lista = $(".js-comanda-lista"), vazia = $(".js-comanda-vazia"), totalEl = $(".js-comanda-total");
  const pilula = $(".js-pilula"), aviso = $(".js-aviso");
  let avisoT;
  const avisar = txt => {
    aviso.textContent = txt; aviso.classList.add("on");
    clearTimeout(avisoT); avisoT = setTimeout(() => aviso.classList.remove("on"), 2200);
  };

  const desenhar = () => {
    lista.innerHTML = comanda.map((i, n) => {
      const p = PRODS.find(x => x.id === i.id), com = temOpcoes(p);
      const foto = p.montador ? `<img class="item-arv" src="${fotoArvore(p, i.esc)}" alt="" width="48" height="60" loading="lazy">` : `<img src="${img(p.foto, 480)}" alt="" width="56" height="70" loading="lazy">`;
      return `<li class="item" data-i="${n}">
        ${foto}
        <div class="item-txt"><strong>${esc_(p.nomeComanda || p.nome)}</strong>${com
          ? `<span>${esc_(resumo(p, i.esc))}</span><span class="item-preco">${reais(precoUnit(p, i.esc))}${i.qtd > 1 ? " cada" : ""}</span>`
          : `<span>a partir de ${esc_(p.preco)}${esc_(p.unidade || "")}</span>`}</div>
        <div class="qtd" role="group" aria-label="Quantidade de ${esc_(p.nome)}">
          <button type="button" data-acao="menos" aria-label="Diminuir"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12"/></svg></button>
          <input type="number" inputmode="numeric" min="${minimo(p)}" step="${passo(p)}" value="${i.qtd}" aria-label="Quantidade">
          <button type="button" data-acao="mais" aria-label="Aumentar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg></button>
        </div>
        <button class="item-tirar" type="button" data-acao="tirar" aria-label="Tirar ${esc_(p.nome)} da comanda"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg></button>
      </li>`;
    }).join("");
    const n = comanda.length;
    const comPreco = comanda.filter(i => temOpcoes(PRODS.find(x => x.id === i.id)));
    const total = comPreco.reduce((t, i) => t + precoUnit(PRODS.find(x => x.id === i.id), i.esc) * i.qtd, 0);
    totalEl.hidden = comPreco.length === 0;
    totalEl.innerHTML = `<span>Total ${comPreco.length < n ? "das peças com preço definido" : "estimado"}</span><strong>${reais(Math.round(total * 100) / 100)}</strong>${comPreco.length < n ? `<small>Os demais itens são orçados no WhatsApp.</small>` : ""}`;
    vazia.hidden = n > 0;
    $(".js-limpar").hidden = n === 0;
    pilula.hidden = n === 0;
    $(".js-pilula-n").textContent = n;
    $$(".js-add").forEach(b => b.classList.toggle("na-comanda", comanda.some(i => i.id === b.dataset.id)));
    salvar();
  };

  const adicionar = (id, esc) => {
    const p = PRODS.find(x => x.id === id);
    const novo = { id, qtd: minimo(p) };
    if (esc) novo.esc = esc;
    const it = comanda.find(i => mesmo(i, novo));
    if (it) it.qtd += passo(p); else comanda.push(novo);
    desenhar();
    pilula.classList.remove("pulo"); void pilula.offsetWidth; pilula.classList.add("pulo");
    avisar(`${p.nomeComanda || p.nome} na comanda ✓`);
  };

  faixas.addEventListener("click", e => {
    const b = e.target.closest(".js-add"); if (!b) return;
    const p = PRODS.find(x => x.id === b.dataset.id);
    if (temOpcoes(p)) abrir(p); else adicionar(p.id);   // com opções: primeiro escolhe
  });

  lista.addEventListener("click", e => {
    const b = e.target.closest("button[data-acao]"); if (!b) return;
    const n = +b.closest(".item").dataset.i, it = comanda[n], p = PRODS.find(x => x.id === it.id);
    if (b.dataset.acao === "tirar") comanda.splice(n, 1);
    if (b.dataset.acao === "mais") it.qtd += passo(p);
    if (b.dataset.acao === "menos") {
      if (it.qtd - passo(p) < minimo(p)) comanda.splice(n, 1);
      else it.qtd -= passo(p);
    }
    desenhar();
  });
  lista.addEventListener("change", e => {
    if (!e.target.matches("input")) return;
    const it = comanda[+e.target.closest(".item").dataset.i], p = PRODS.find(x => x.id === it.id);
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
      let total = 0, comPreco = 0;
      comanda.forEach(i => {
        const p = PRODS.find(x => x.id === i.id);
        if (temOpcoes(p)) {
          const u = precoUnit(p, i.esc); total += u * i.qtd; comPreco++;
          linhas.push(`• ${i.qtd}x ${p.nomeComanda || p.nome}: ${resumo(p, i.esc)} (${reais(u)}${i.qtd > 1 ? " cada" : ""})`);
        } else linhas.push(`• ${i.qtd}x ${p.nome}`);
      });
      if (comPreco) linhas.push("", `Total ${comPreco < comanda.length ? "das peças com preço definido" : "estimado"}: ${reais(Math.round(total * 100) / 100)}`);
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
