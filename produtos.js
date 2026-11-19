/* =========================================================
   ATELIÊ GRAMATURA² · CATÁLOGO
   Este é o ÚNICO arquivo que você precisa editar no dia a dia.
   - Troque o número do WhatsApp em CONFIG.whatsapp (só números, com 55 + DDD).
   - Para mudar um produto: edite nome, preço, prazo etc. entre as aspas.
   - Para trocar a foto: coloque a nova imagem na pasta img/ com dois tamanhos
     (nome-480.webp e nome-800.webp) e escreva o "nome" no campo foto.
   - Para tirar um produto: apague o bloco { ... }, inclusive a vírgula.
   - Para esconder sem apagar: mude ativo: true para ativo: false.
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
    id: "bola-foto", categoria: "natal", ativo: true, selo: "Mais pedido",
    nome: "Bola de acrílico com foto",
    curta: "Sua foto dentro de uma bola de 8 cm, com laço à escolha.",
    descricao: "Uma bola transparente de 8 cm com a foto que você escolher: o pet, a família, o primeiro Natal do bebê. Finalizada com laço de cetim e tag com nome. Um presente que vira tradição na árvore.",
    preco: "R$ 25", unidade: "", prazo: "5 a 7 dias", minimo: "1 unidade",
    personaliza: ["Foto", "Nome e ano", "Cor do laço", "Frase curta"],
    foto: "natal-bola-acrilico-com-foto",
  },
  {
    id: "arvore-chenille", categoria: "natal", ativo: true,
    nome: "Árvore de chenille",
    curta: "Mini árvore com laço e enfeites na cor que você escolher.",
    descricao: "Mini árvore de chenille sobre base de madeira, com laço e pequenos enfeites. Fica linda em mesa posta, escrivaninha ou como lembrança de fim de ano.",
    preco: "R$ 35", unidade: "", prazo: "5 a 7 dias", minimo: "1 unidade",
    personaliza: ["Cor da árvore", "Cor do laço", "Enfeites", "Tag com nome"],
    foto: "natal-arvores-chenille-cores",
  },
  {
    id: "arvore-laco", categoria: "natal", ativo: true,
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
    id: "noel-boneco", categoria: "natal", ativo: true,
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
