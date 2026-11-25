/* =========================================================
   ATELIÊ GRAMATURA² · CATÁLOGO
   Este é o ÚNICO arquivo que você precisa editar no dia a dia.
   - Troque o número do WhatsApp em CONFIG.whatsapp (só números, com 55 + DDD).
   - Para mudar um produto: edite nome, preço, prazo etc. entre as aspas.
   - Para trocar a foto: coloque a nova imagem na pasta img/ com dois tamanhos
     (nome-480.webp e nome-800.webp) e escreva o "nome" no campo foto.
   - Para tirar um produto: apague o bloco { ... }, inclusive a vírgula.
   - Para esconder sem apagar: mude ativo: true para ativo: false.
   - Produtos com "opcoes" mostram escolhas (tamanho, kit...) e somam o preço
     na comanda. O valor de cada escolha fica em preco ou mais.
   ========================================================= */

window.CONFIG = {
  whatsapp: "5547988442699",           // <- TROQUE AQUI: 55 + DDD + número, só dígitos
  instagram: "ateliegramatura",
  tiktok: "ateliegramatura",
  prazoNatal: "2026-12-13",            // último dia para pedidos de Natal (ano-mês-dia)
  mensagemGeral: "Oi! Vim pelo site e quero um orçamento ✉️",

  // Oferta de primeira compra (aparece na faixa do topo, no rodapé e vai escrita na mensagem do WhatsApp).
  // Para desligar: ativo: false. Para mudar o valor: troque percentual e cupom.
  desconto: { ativo: true, percentual: 10, cupom: "PRIMEIRA10" },

  // Endereço mostrado no rodapé. Deixe "" no que não quiser mostrar.
  endereco: { cidade: "Brusque", estado: "Santa Catarina", cep: "88354-000", complemento: "" },
};

window.CATEGORIAS = [
  { id: "natal",      nome: "Natal",                   destaque: "Natal",    nota: "pedidos até 13/12" },
  { id: "festa",      nome: "Festa infantil 3D",       destaque: "Festa",    nota: "no tema da sua festa" },
  { id: "convites",   nome: "Convites",                destaque: "Convites", nota: "casamento e save the date" },
  { id: "embalagens", nome: "Embalagens e lembrancinhas", destaque: "Mimos", nota: "para presentear" },
];

window.PRODUTOS = [
  {
    id: "monte-arvore", categoria: "natal", ativo: true, selo: "Monte a sua",
    nome: "Monte sua árvore de chenille", nomeComanda: "Árvore de chenille",
    curta: "Escolha tamanho, cores, pisca-pisca e base. O preço aparece na hora.",
    descricao: "Árvore de chenille montada do seu jeito: você escolhe o tamanho, as cores, se leva pisca-pisca e qual base. Acompanha laço e enfeites, e as cores exatas você combina com a gente no WhatsApp.",
    preco: "R$ 12,90", unidade: "", prazo: "5 a 7 dias", minimo: "1 unidade",
    personaliza: ["Tamanho", "Cores", "Pisca-pisca", "Base"],
    foto: "natal-arvores-chenille-cores",
    montador: true,   // abre a seção "Monte sua árvore" em vez da janela comum
    // As fotos da árvore são camadas em img/arvore-*.webp (tronco por cor, luzes, bases).
    // OPÇÕES: "preco" é o valor do tamanho; "mais" é o que soma por cima. Para mudar um valor, troque o número (use ponto: 12.90).
    opcoes: [
      { id: "tamanho", nome: "Tamanho", itens: [
        { nome: "Mini",   detalhe: "12 a 15 cm", preco: 12.90, escala: 0.62 },
        { nome: "Média",  detalhe: "25 cm",      preco: 24.90, escala: 0.8 },
        { nome: "Grande", detalhe: "40 cm",      preco: 44.90, escala: 1 },
      ]},
      { id: "cor", nome: "Cores da árvore", nota: "As cores exatas você combina com a gente no WhatsApp.", itens: [
        { nome: "Uma cor", tronco: "uma",       amostra: ["#2F7D4F"] },
        { nome: "2 cores", tronco: "duas",       amostra: ["#2F7D4F", "#B8322E"] },
        { nome: "3 cores", tronco: "tres",       amostra: ["#2F7D4F", "#B8322E", "#F2EEE4"] },
        { nome: "Tons de verde", tronco: "verde", amostra: ["#1F5E3A", "#4E9A5B", "#9CC36A"] },
        { nome: "Tons de azul", tronco: "azul",  amostra: ["#1E3461", "#5E7BA8", "#A9BAD3"] },
        { nome: "Tons de rosa", tronco: "rosa",  amostra: ["#C2577A", "#E79BB4", "#F6D3DF"] },
      ]},
      { id: "pisca", nome: "Pisca-pisca", itens: [
        { nome: "Sem pisca-pisca", detalhe: "tronco de chenille", mais: 0 },
        { nome: "Com pisca-pisca", detalhe: "LED a pilha",        mais: 12, luzes: true },
      ]},
      { id: "base", nome: "Base", itens: [
        { nome: "Sem base",          detalhe: "tronco de chenille", mais: 0 },
        { nome: "Base de madeira",   detalhe: "tronco redondo",     mais: 6, base: "madeira" },
        { nome: "Base Papai Noel",   detalhe: "vermelha com cinto", mais: 9, base: "noel" },
      ]},
    ],
  },
  {
    id: "bola-foto", categoria: "natal", ativo: true, selo: "Mais pedido",
    nome: "Bola de acrílico com foto",
    curta: "Sua foto dentro de uma bola de 6,5 cm, com laço à escolha.",
    descricao: "Uma bola transparente de 6,5 cm com a foto que você escolher: o pet, a família, o primeiro Natal do bebê. Finalizada com laço de cetim e tag com nome. Em kit, cada bola sai mais em conta.",
    preco: "R$ 18", unidade: "", prazo: "5 a 7 dias", minimo: "1 unidade",
    personaliza: ["Foto", "Nome e ano", "Cor do laço", "Frase curta"],
    foto: "natal-bola-acrilico-com-foto",
    opcoes: [
      { id: "kit", nome: "Quantidade", itens: [
        { nome: "1 bola",       detalhe: "unidade",        preco: 18 },
        { nome: "Kit 3 bolas",  detalhe: "R$ 16 cada",     preco: 48 },
        { nome: "Kit 5 bolas",  detalhe: "R$ 15 cada",     preco: 75 },
        { nome: "Kit 10 bolas", detalhe: "R$ 13 cada",     preco: 130 },
      ]},
    ],
  },
  {
    id: "arvore-laco", categoria: "natal", ativo: false,
    nome: "Árvore de chenille com laço",
    curta: "Modelos com laço rosa, azul ou do seu jeito.",
    descricao: "A nossa árvore de chenille com laço em destaque. Escolha uma das cores da vitrine ou peça a combinação da sua decoração.",
    preco: "R$ 35", unidade: "", prazo: "5 a 7 dias", minimo: "1 unidade",
    personaliza: ["Cor do laço", "Cor da árvore", "Tamanho", "Tag com nome"],
    foto: "natal-arvores-chenille-lacos",
  },
  {
    id: "guirlanda", categoria: "natal", ativo: true,
    nome: "Guirlanda de chenille",
    curta: "Guirlanda com laço e enfeites para a porta ou a parede.",
    descricao: "Guirlanda de chenille com laço e enfeites, leve e delicada. Pode levar o sobrenome da família ou uma frase de boas-vindas.",
    preco: "R$ 60", unidade: "", prazo: "5 a 7 dias", minimo: "1 unidade",
    personaliza: ["Cores", "Laço", "Nome da família", "Enfeites"],
    foto: "natal-guirlanda-chenille",
  },
  {
    id: "noel-boneco", categoria: "natal", ativo: false,
    nome: "Noel e boneco de neve",
    curta: "Bonecos de chenille para enfeitar a mesa ou presentear.",
    descricao: "Papai Noel e boneco de neve feitos em chenille, perfeitos para a mesa de Natal, kits de presente ou lembrancinhas de amigo secreto.",
    preco: "R$ 30", unidade: "", prazo: "5 a 7 dias", minimo: "1 unidade",
    personaliza: ["Personagem", "Cores do cachecol", "Tag com nome"],
    foto: "natal-noel-e-boneco-de-neve",
  },
  {
    id: "topo-3d", categoria: "festa", ativo: true, selo: "Qualquer tema",
    nome: "Topo de bolo 3D",
    curta: "Camadas recortadas com o nome e a idade, em qualquer tema.",
    descricao: "Topo de bolo em camadas, com profundidade de verdade: nome, idade e os elementos do tema montados em relevo. Você aprova a prévia antes da produção.",
    preco: "R$ 45", unidade: "", prazo: "7 a 10 dias", minimo: "1 unidade",
    personaliza: ["Tema", "Nome", "Idade", "Paleta de cores"],
    foto: "festa-topo-3d-chapeuzinho",
  },
  {
    id: "kit-festa", categoria: "festa", ativo: true,
    nome: "Kit festa (topo + caixinhas)",
    curta: "Topo 3D e caixinhas combinando para a mesa.",
    descricao: "O topo de bolo 3D e as caixinhas da mesa criados juntos, na mesma arte. A mesa fica coesa e você resolve tudo em um pedido só.",
    preco: "R$ 120", unidade: "", prazo: "7 a 10 dias", minimo: "1 kit",
    personaliza: ["Tema", "Nome e idade", "Modelos de caixinha", "Quantidade"],
    foto: "festa-topo-3d-princesa",
  },
  {
    id: "caixinhas", categoria: "festa", ativo: true,
    nome: "Caixinhas personalizadas",
    curta: "Milk, pirâmide, sacolinha ou bala, no tema da festa.",
    descricao: "Caixinhas para doces e lembrancinhas nos modelos milk, pirâmide, sacolinha ou bala, com a arte da sua festa.",
    preco: "R$ 6", unidade: "/un", prazo: "7 a 10 dias", minimo: "20 unidades",
    personaliza: ["Modelo", "Tema", "Nome e idade", "Cores"],
    foto: "festa-topo-3d-princesa",
  },
  {
    id: "convite-casamento", categoria: "convites", ativo: true, selo: "Casamento",
    nome: "Convite de casamento com lacre",
    curta: "Papel texturizado, fita de cetim, lacre de cera e borlas.",
    descricao: "Convite em papel texturizado com fita de cetim, lacre de cera e borla. Criamos a arte com os nomes, a data e a paleta do casamento, e você aprova antes da impressão.",
    preco: "R$ 14", unidade: "/un", prazo: "20 a 30 dias", minimo: "50 unidades",
    personaliza: ["Nomes e data", "Paleta", "Cor do lacre", "Fita e borla", "Envelope"],
    foto: "convite-casamento-azul",
  },
  {
    id: "save-the-date", categoria: "convites", ativo: true,
    nome: "Save the date",
    curta: "Cartão ou tag com lacre, combinando com o convite.",
    descricao: "Cartão ou tag para avisar a data com antecedência, no mesmo estilo do convite. Pode ser entregue junto com uma lembrancinha.",
    preco: "R$ 4", unidade: "/un", prazo: "10 dias", minimo: "30 unidades",
    personaliza: ["Nomes e data", "Formato", "Cor do lacre"],
    foto: "convite-casamento-azul",
  },
  {
    id: "embalagens-natal", categoria: "embalagens", ativo: true,
    nome: "Embalagens de Natal",
    curta: "Sacolinha com janela, cone, caixinha xadrez e tag \"com amor\".",
    descricao: "Embalagens prontas para presentear: sacolinha com janela, cone, caixinha xadrez e tag. Ideais para doces, biscoitos e kits de fim de ano.",
    preco: "R$ 8", unidade: "/un", prazo: "5 a 7 dias", minimo: "10 unidades",
    personaliza: ["Modelo", "Tag com nome", "Frase", "Cores"],
    foto: "embalagens-natal",
  },
  {
    id: "caixa-presente", categoria: "embalagens", ativo: true,
    nome: "Caixa presente",
    curta: "Caixa com dedicatória, para kits de Natal ou de empresa.",
    descricao: "Caixa personalizada com dedicatória, pensada para kits de Natal, presentes de clientes e mimos de empresa. Pode levar a sua marca.",
    preco: "R$ 25", unidade: "", prazo: "7 a 10 dias", minimo: "1 unidade",
    personaliza: ["Dedicatória", "Logo da empresa", "Cores", "Tamanho"],
    foto: "embalagens-natal",
  },
];
