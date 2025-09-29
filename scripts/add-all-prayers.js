// scripts/add-all-prayers.js
import "dotenv/config";
import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect.js";
import Collection from "../models/Collection.js";
import Prayer from "../models/Prayer.js";

// util: slug estável (title + collectionSlug)
const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// (debug rápido)
console.log("[Collection fields]", Object.keys(Collection.schema.paths));
console.log("[Prayer fields]", Object.keys(Prayer.schema.paths));

const COLLECTIONS = [
  {
    name: "Orações da Manhã",
    slug: "oracoes-da-manha",
    description: "Inicie o dia com serenidade e presença.",
    cover: "/covers/oracao-da-manha.png",
    accent1: "#22d3ee",
    accent2: "#60a5fa",
  },
  {
    name: "Orações da Tarde",
    slug: "oracoes-da-tarde",
    description: "Recolha-se e reoriente o coração no meio do dia.",
    cover: "/covers/oracao-da-tarde.png",
    accent1: "#f59e0b",
    accent2: "#f472b6",
  },
  {
    name: "Orações da Noite",
    slug: "oracoes-da-noite",
    description: "Feche o dia em confiança, proteção e gratidão.",
    cover: "/covers/oracao-da-noite.png",
    accent1: "#7c3aed",
    accent2: "#22d3ee",
  },
  {
    name: "Orações aos Santos",
    slug: "oracoes-aos-santos",
    description: "Com a intercessão dos santos e da Santíssima Virgem.",
    cover: "/covers/oracao-aos-santos.png",
    accent1: "#10b981",
    accent2: "#60a5fa",
  },
  {
    name: "Orações aos Anjos",
    slug: "oracoes-aos-anjos",
    description: "Anjos e Arcanjos: auxílio, proteção e combate espiritual.",
    cover: "/covers/oracao-aos-anjos.png",
    accent1: "#a78bfa",
    accent2: "#22d3ee",
  },
  {
    name: "Orações de Outras Tradições",
    slug: "oracoes-outras-tradicoes",
    description: "Preces, afirmações e pedidos espirituais não católicos.",
    cover: "/covers/outras-tradicoes.png",
    accent1: "#f59e0b",
    accent2: "#10b981",
  },
  {
    name: "Orações de Libertação",
    slug: "oracoes-de-libertacao",
    description:
      "Rompimento de maldições, pragas, encantos e feitiços em Cristo.",
    cover: "/covers/oracoes-de-libertacao.png",
    accent1: "#ef4444",
    accent2: "#0ea5e9",
  },
];

const PRAYERS = [
  // =========================================
  // MANHÃ — 20 ITENS (sem salmos/mantras)
  // =========================================
  {
    title: "Pai-Nosso",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "clássica"],
    content:
      "Pai nosso que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",
  },
  {
    title: "Ave-Maria",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "mariana"],
    content:
      "Ave-Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.",
  },
  {
    title: "Oferecimento Diário (Apostolado da Oração)",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "oferecimento"],
    content:
      "Divino Coração de Jesus, eu vos ofereço, por meio do Imaculado Coração de Maria, as orações, obras, alegrias e sofrimentos deste dia, em reparação dos pecados, pela salvação de todos os homens e pela santificação do clero, segundo as intenções do Santo Padre. Amém.",
  },
  {
    title: "Vinde, Espírito Santo",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "espírito-santo"],
    content:
      "Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor. Enviai, Senhor, o vosso Espírito, e tudo será criado. E renovareis a face da terra.\n\nOremos: Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo, Senhor nosso. Amém.",
  },
  {
    title: "Ato de Fé",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "virtudes"],
    content:
      "Meu Deus, creio firmemente em tudo o que revelastes e que a Santa Igreja nos ensina, porque vós sois a própria Verdade. Nisso quero viver e morrer. Amém.",
  },
  {
    title: "Ato de Esperança",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "virtudes"],
    content:
      "Meu Deus, espero, com firme confiança, que, pelos merecimentos de Jesus Cristo, me dareis a vida eterna e as graças necessárias para a alcançar, porque sois infinitamente poderoso, fiel e misericordioso. Amém.",
  },
  {
    title: "Ato de Caridade",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "virtudes"],
    content:
      "Meu Deus, eu vos amo sobre todas as coisas, de todo o meu coração, de toda a minha alma, de todo o meu entendimento e com todas as minhas forças, por serdes vós tão infinitamente bom e digno de ser amado; e, por amor de vós, amo o meu próximo como a mim mesmo. Amém.",
  },
  {
    title: "Ângelus (manhã/meio-dia/tarde)",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "meio-dia", "tarde", "mariana"],
    content:
      "O Anjo do Senhor anunciou a Maria. E ela concebeu do Espírito Santo. Ave-Maria…\nEis aqui a serva do Senhor. Faça-se em mim segundo a tua palavra. Ave-Maria…\nE o Verbo se fez carne. E habitou entre nós. Ave-Maria…\nRogai por nós, santa Mãe de Deus. Para que sejamos dignos das promessas de Cristo.\n\nOremos: Infundi, Senhor, em nossas almas a vossa graça; para que, conhecendo pela anunciação do Anjo a encarnação de Jesus Cristo, vosso Filho, cheguemos, por sua paixão e cruz, à glória da ressurreição. Por Cristo, Senhor nosso. Amém.",
  },
  {
    title: "Consagração ao Sagrado Coração de Jesus",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "consagração"],
    content:
      "Sagrado Coração de Jesus, eu vos consagro minha pessoa, minha família, minhas ações, dores e alegrias deste dia. Seja vosso coração meu refúgio e caminho, hoje e sempre. Amém.",
  },
  {
    title: "Oração da Manhã — Eu Vos adoro, meu Deus",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "oferecimento", "tradicional"],
    content:
      "Eu Vos adoro, meu Deus, e Vos amo de todo o coração. Dou-Vos graças por me terdes criado, feito cristão e conservado nesta noite. Ofereço-Vos as ações deste dia; fazei que sejam todas segundo a Vossa santa vontade, para maior glória Vossa. Preservai-me do pecado e de todo o mal. A Vossa graça seja sempre comigo e com todos os que me são caros. Amém.",
  },
  {
    title: "Cântico de Zacarias (Benedictus)",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "bíblica", "laudes"],
    content:
      "Bendito seja o Senhor, Deus de Israel, porque visitou e redimiu o seu povo; ... para iluminar os que jazem nas trevas e na sombra da morte, e dirigir os nossos passos no caminho da paz. Amém.",
  },
  {
    title: "Oração ao Espírito Santo (Santo Agostinho)",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "espírito-santo", "santidade"],
    content:
      "Respirai em mim, Espírito Santo, para que todos os meus pensamentos sejam santos. Movei-me, Espírito Santo, para que também o meu trabalho seja santo. Atraí o meu coração, Espírito Santo... Guardai-me, Espírito Santo, para que eu jamais perca o que é santo. Amém.",
  },
  {
    title: "Oferenda da Manhã (Santa Teresinha do Menino Jesus)",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "oferecimento", "santa-teresinha"],
    content:
      "Ó meu Deus, ofereço-Te todas as minhas ações deste dia pelas intenções e pela glória do Sagrado Coração de Jesus... para que possamos um dia estar contigo no Céu por toda a eternidade. Amém.",
  },
  {
    title: "Senhor, no silêncio deste dia…",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "virtudes", "paz"],
    content:
      "Senhor, no silêncio deste dia que amanhece, venho pedir-Te força, sabedoria e paz... Reveste-me de Tua beleza, Senhor, e que no decurso deste dia eu Te revele a todos. Amém.",
  },
  {
    title: "Oração Matinal (tradição oriental/caldeia)",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "louvor", "confiança"],
    content:
      "Ao amanhecer, louvamos-Te, Senhor, porque salvaste toda a tua criação... ampara os fracos e guarda os fortes; sara os doentes e perdoa os pecados de toda a humanidade. Amém.",
  },
  {
    title: "Acorda-me para a Tua Vontade",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "discernimento"],
    content:
      "Senhor, ao despertar, abre meus ouvidos à Tua Palavra, ilumina meus passos e orienta minhas escolhas. Que eu viva este dia em Tua presença e cumpra com amor a Tua vontade. Amém.",
  },
  {
    title: "Oferta do Trabalho Matinal",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "trabalho"],
    content:
      "Jesus, ofereço-Te meu trabalho, estudo e serviço deste dia: que sejam retos, úteis e feitos com caridade. Santo José Operário, intercedei por mim. Amém.",
  },
  {
    title: "Consagração do Dia a Maria",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "mariana", "consagração"],
    content:
      "Ó Maria, Mãe de Jesus e minha Mãe, consagro-Te este dia: pensamentos, palavras e obras. Guarda-me sob Teu manto e conduz-me a Cristo. Amém.",
  },
  {
    title: "Preces da Manhã (estrutura das Laudes)",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "laudes", "estrutura"],
    content:
      "Estrutura: louvor a Deus; ação de graças; pedidos pela Igreja, família, trabalho e necessitados; Pai-Nosso; conclusão com bênção breve.",
  },
  {
    title: "Ato de Humildade e Sinceridade",
    collectionSlug: "oracoes-da-manha",
    tags: ["manhã", "virtudes"],
    content:
      "Senhor, livra-me da soberba e da mentira. Dá-me coração humilde, mente clara e língua que edifique. Que eu prefira servir a ser servido. Amém.",
  },

  // =========================================
  // TARDE — 20 ITENS
  // =========================================
  {
    title: "Credo (Símbolo dos Apóstolos)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "profissão-de-fé"],
    content:
      "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos; foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos; creio no Espírito Santo; na Santa Igreja Católica; na comunhão dos santos; na remissão dos pecados; na ressurreição da carne; na vida eterna. Amém.",
  },
  {
    title: "Glória ao Pai (Doxologia)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "doxologia"],
    content:
      "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
  },
  {
    title: "Anima Christi (Alma de Cristo)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "eucarística"],
    content:
      "Alma de Cristo, santificai-me. Corpo de Cristo, salvai-me... para que vos louve com os vossos santos, por todos os séculos dos séculos. Amém.",
  },
  {
    title: "Veni Creator Spiritus (Vinde, Criador Espírito)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "espírito-santo"],
    content:
      "Vinde, Espírito Criador, visitai as almas dos vossos fiéis... e unção espiritual. Amém.",
  },
  {
    title: "Regina Caeli (tempo pascal)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "tempo-pascal", "mariana"],
    content:
      "Alegrai-vos, Rainha do céu, aleluia... Porque o Senhor ressuscitou verdadeiramente, aleluia. Amém.",
  },
  {
    title: "Terço da Misericórdia (estrutura das 15h)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "misericórdia", "3pm"],
    content: `Reza-se, se possível, às 15h.
Início: Sinal da Cruz; (opcional) “Ó Sangue e Água...”
Contas grandes: “Eterno Pai, eu Vos ofereço...”
Contas pequenas (10x): “Pela sua dolorosa Paixão...”
Final (3x): “Deus Santo, Deus Forte, Deus Imortal...”
Conclusão: “Jesus, eu confio em Vós!”`,
  },
  {
    title: "Oração da Hora da Misericórdia (3 da tarde)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "misericórdia", "3pm", "breve"],
    content:
      "Ó Sangue e Água, que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós! Jesus, eu confio em Vós!",
  },
  {
    title: "Veni Sancte Spiritus (Sequência de Pentecostes)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "espírito-santo", "sequência"],
    content:
      "Vinde, Espírito Santo... Dai-lhes o mérito da virtude, o bom êxito da graça, o dom da alegria eterna. Amém.",
  },
  {
    title: "Bênção do Almoço (antes da refeição)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "refeição", "bênção"],
    content:
      "Abençoai, Senhor, a nós e a estes alimentos que por vossa bondade vamos tomar... Por Cristo, Nosso Senhor. Amém.",
  },
  {
    title: "Ação de Graças após a Refeição",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "refeição", "ação-de-graças"],
    content:
      "Nós vos damos graças, Deus onipotente, por todos os vossos benefícios. Vós que viveis e reinais pelos séculos dos séculos. Amém. — Deus seja louvado!",
  },
  {
    title: "Oração ao Espírito Santo (Cardeal Mercier)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "espírito-santo", "santificação"],
    content:
      "Ó Espírito Santo, alma da minha alma, eu vos adoro... Fazei-me somente conhecer a vossa vontade. Amém.",
  },
  {
    title: "Oração ao Preciosíssimo Sangue de Jesus (oferecimento)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "preciosíssimo-sangue", "reparação"],
    content:
      "Eterno Pai, eu vos ofereço o Preciosíssimo Sangue de Jesus Cristo, em expiação dos meus pecados, pelas necessidades da Santa Igreja e pelas almas do purgatório. Amém.",
  },
  {
    title: "Oração a São José Operário (pelo trabalho da tarde)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "trabalho", "São José"],
    content:
      "Glorioso São José, modelo de todos os que se dedicam ao trabalho... para a maior glória de Deus e o bem das almas. Amém.",
  },
  {
    title: "Ato de Confiança e Entrega (Pe. Dolindo)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "providência", "confiança"],
    content:
      "Jesus, eu me abandono em Vós, cuidai de tudo! Tirai de mim o medo do futuro... Eu confio e espero: cuidai Vós. Amém.",
  },
  {
    title: "Magnificat (Cântico de Maria)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "bíblica", "vésperas"],
    content:
      "A minha alma engrandece o Senhor e meu espírito exulta em Deus, meu Salvador... conforme prometera a nossos pais, em favor de Abraão e de sua descendência, para sempre. Amém.",
  },
  {
    title: "Oração a Nossa Senhora do Perpétuo Socorro",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "mariana", "auxílio"],
    content:
      "Ó Mãe do Perpétuo Socorro, olhai benignamente para mim e alcançai-me as graças de que necessito (pedidos). Guardai-me no bem, fortalecei-me na fé e conduzi-me a Jesus. Amém.",
  },
  {
    title: "Oferenda das Obras da Tarde",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "oferecimento", "trabalho"],
    content:
      "Senhor, ofereço-Te as obras desta tarde: encontros, decisões e tarefas. Concede-me espírito de serviço, justiça e paciência. Amém.",
  },
  {
    title: "Ladainha do Sagrado Coração (estrutura breve)",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "sagrado-coração", "ladainha", "estrutura"],
    content:
      "Estrutura: invocações a Jesus, Sagrado Coração de Jesus, tende piedade de nós; súplicas por santidade, reparação e confiança; conclusão com oração final.",
  },
  {
    title: "Oração pela Caridade no Trabalho",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "trabalho", "caridade"],
    content:
      "Jesus, manso e humilde de coração, fazei meu coração semelhante ao vosso: que eu seja justo, honesto e caridoso em cada entrega e decisão. Amém.",
  },
  {
    title: "Protegei-nos nesta Tarde",
    collectionSlug: "oracoes-da-tarde",
    tags: ["tarde", "proteção"],
    content:
      "Deus fiel, guardai-nos nesta tarde: livrai-nos do mal, dai-nos prudência e serenidade. Que tudo concorra para a vossa glória. Amém.",
  },

  // =========================================
  // NOITE — 20 ITENS
  // =========================================
  {
    title: "Sub Tuum Praesidium (Sob Vossa Proteção)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "proteção", "mariana"],
    content:
      "Sob a vossa proteção nos refugiamos, santa Mãe de Deus; não desprezeis as nossas súplicas em nossas necessidades, mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita. Amém.",
  },
  {
    title: "Salve Rainha",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "mariana"],
    content:
      "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!... Rogai por nós, santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.",
  },
  {
    title: "Ato de Contrição",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "exame-de-consciência"],
    content:
      "Meu Deus, porque sois infinitamente bom, tenho profundo pesar de Vos ter ofendido. Detesto todos os meus pecados e proponho firmemente, com a vossa graça, não mais pecar... Amém.",
  },
  {
    title: "Cântico de Simeão (Nunc Dimittis)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "bíblica", "completas"],
    content:
      "Agora, Senhor, podeis despedir em paz o vosso servo... luz para iluminar as nações e glória de Israel, vosso povo. Amém.",
  },
  {
    title: "Visita, Senhor, esta casa (Oração de Completas)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "completas", "proteção"],
    content:
      "Visitai, Senhor, esta casa, e afastai para longe dela as ciladas do inimigo; que os vossos santos Anjos nela habitem para nos guardar em paz; e a vossa bênção permaneça sempre conosco. Amém.",
  },
  {
    title: "Confiteor (Eu confesso a Deus todo-poderoso)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "arrependimento", "penitencial"],
    content:
      "Eu confesso a Deus todo-poderoso e a vós, irmãos e irmãs, que pequei muitas vezes por pensamentos e palavras, atos e omissões, por minha culpa, minha tão grande culpa. E peço à Virgem Maria, aos Anjos e Santos, e a vós, irmãos e irmãs, que rogueis por mim a Deus, Nosso Senhor",
  },
  {
    title: "Em vossas mãos entrego o meu espírito",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "entrega", "confiança"],
    content:
      "Em vossas mãos, Senhor, entrego o meu espírito. Redimistes-me, Senhor, Deus fiel. Protegei-me como a pupila dos olhos; guardai-me à sombra de vossas asas, e concedei-me repousar em paz. Amém.",
  },
  {
    title: "Alma Redemptoris Mater (Advento–Natal)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "mariana", "antífona"],
    content:
      "Santa Mãe do Redentor, és acesso e porta do céu, estrela do mar, socorre ao povo caído, que se esforça para se levantar do abismo da culpa. Tu que, com a admiração da natureza, geraste teu santo Criador; Virgem antes e depois, que acolheste a saudação Ave da boca do Anjo Gabriel: tem piedade de nós, pecadores. ",
  },
  {
    title: "Ave Regina Caelorum (Quaresma)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "mariana", "antífona"],
    content:
      "Ave, Rainha dos Céus, ave, Senhora dos Anjos; porta e raiz da nossa salvação... roga a Cristo por nós.",
  },
  {
    title: "Boa noite, meu Jesus",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "devoção-popular", "infantil"],
    content:
      "Boa noite, meu Jesus. A Ti entrego o meu coração. Abençoa minha família, guarda meu descanso... Que eu acorde disposto a fazer a tua vontade. Amém.",
  },
  {
    title: "Agradecimento pelo Dia",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "gratidão"],
    content:
      "Senhor, agradeço-Te por tudo o que hoje vivi: graças recebidas, encontros e aprendizados. Perdoa o que foi mal e confirma o bem. Em Ti descanso. Amém.",
  },
  {
    title: "Exame de Consciência (estrutura)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "exame", "estrutura"],
    content:
      "Estrutura: pedir luz do Espírito Santo; rever pensamentos, palavras, atos e omissões; pedir perdão; propósito de emenda; oração breve de entrega.",
  },
  {
    title: "Entrega da Noite à Providência",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "providência"],
    content:
      "Deus de bondade, a vós entrego esta noite: minhas fadigas e alegrias. Velai por mim, guardai minha casa e renovai minhas forças para vos servir. Amém.",
  },
  {
    title: "Oração pelos Falecidos (no silêncio da noite)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "sufrágio"],
    content:
      "Senhor, concedei aos falecidos o repouso eterno e a luz perpétua os ilumine. Dai-lhes, Senhor, o descanso e a paz. Amém.",
  },
  {
    title: "Oração pela Família antes de Dormir",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "família"],
    content:
      "Jesus, Maria e José, abençoai nossa família. Guardai-nos do mal, fortalecei nossos laços e concedei-nos um sono sereno. Amém.",
  },
  {
    title: "Jaculatórias Noturnas (conjunto breve)",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "jaculatórias"],
    content:
      "“Jesus, manso e humilde de coração, fazei meu coração semelhante ao vosso.” — “Meu Jesus, misericórdia.” — “Jesus, Maria, eu vos amo, salvai almas.”",
  },
  {
    title: "Ato de Perdão e Reconciliação",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "perdão"],
    content:
      "Senhor, eu perdoo quem me feriu hoje e peço perdão a quem magoei. Cura as memórias, pacifica o coração e reata laços em tua caridade. Amém.",
  },
  {
    title: "Bênção sobre o Lar",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "bênção"],
    content:
      "Visita, Senhor, este lar: afasta toda treva e discórdia; derrama tua paz, sustenta os cansados e guarda-nos no teu amor. Amém.",
  },
  {
    title: "Oração de Abandono da Noite",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "abandono"],
    content:
      "Jesus, eu confio em Ti. Aceito o que não pude mudar e entrego o que virá. Cuida de mim e dos que amo. Em Ti repouso. Amém.",
  },
  {
    title: "Pedi aos Anjos o Meu Repouso",
    collectionSlug: "oracoes-da-noite",
    tags: ["noite", "anjos"],
    content:
      "Santo Anjo da Guarda, velai pelo meu sono; conduzi meus pensamentos à paz, guardai minha mente e meus sonhos. Amém.",
  },

  // =========================================
  // SANTOS — 20 ITENS (COMPLETAS)
  // =========================================
  {
    title: "Consagração a Nossa Senhora (São Luís de Montfort)",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "mariana", "consagração"],
    content: `Ó minha Senhora e minha Mãe, eu me ofereço todo a vós;
e, em prova da minha devoção para convosco, vos consagro,
neste dia, meus olhos, meus ouvidos, minha boca, meu coração,
inteiramente todo o meu ser.
E porque assim sou vosso, ó incomparável Mãe,
guardai-me e defendei-me como propriedade e possessão vossa. Amém.`,
  },
  {
    title: "Memorare (Lembrai-vos)",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "mariana", "confiança"],
    content: `Lembrai-vos, ó piedosíssima Virgem Maria, que nunca se ouviu dizer
que algum daqueles que recorreram à vossa proteção,
imploraram o vosso auxílio e invocaram o vosso patrocínio
fosse por vós desamparado.
Animado, pois, de igual confiança, a vós recorro, Virgem das virgens, minha Mãe;
a vós venho, diante de vós me prostro, gemendo e pecador.
Não desprezeis as minhas súplicas, ó Mãe do Verbo encarnado,
mas dignai-vos ouvi-las propícia e alcançar o que vos peço. Amém.`,
  },
  {
    title: "A vós, São José",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São José", "proteção"],
    content: `A vós, São José, recorremos em nossa tribulação,
e, depois de implorar o auxílio de vossa santíssima Esposa,
cheios de confiança solicitamos também o vosso patrocínio.
Por esse amor que vos uniu à Imaculada Mãe de Deus
e pelo paterno afeto com que abraçastes o Menino Jesus,
humildemente vos suplicamos que lanceis um olhar benigno
para a herança que Jesus Cristo conquistou com o seu sangue
e nos socorrais em nossas necessidades. Amém.`,
  },
  {
    title: "Oração de São Bento (cruz de São Bento)",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Bento", "proteção"],
    content: `A cruz sagrada seja a minha luz; não seja o dragão meu guia.
Retira-te, Satanás! Nunca me aconselhes coisas vãs.
É mal o que me ofereces; bebe tu mesmo o teu veneno.
São Bento, rogai por nós. Amém.`,
  },
  {
    title: "Oração de São Francisco",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Francisco", "paz"],
    content: `Senhor, fazei de mim instrumento de vossa paz:
onde houver ódio, que eu leve o amor;
onde houver ofensa, o perdão;
onde houver discórdia, a união;
onde houver dúvida, a fé;
onde houver erro, a verdade;
onde houver desespero, a esperança;
onde houver tristeza, a alegria;
onde houver trevas, a luz.
Ó Mestre, fazei que eu procure mais consolar que ser consolado,
compreender que ser compreendido, amar que ser amado;
pois é dando que se recebe, é perdoando que se é perdoado,
e é morrendo que se vive para a vida eterna. Amém.`,
  },
  {
    title: "Consagração a São Miguel Arcanjo",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Miguel", "consagração", "combate-espiritual"],
    content: `São Miguel Arcanjo, Príncipe da Milícia Celeste,
consagro-vos a minha mente, meu coração e todo o meu viver.
Defendei-me no combate, amparai-me nas tentações,
livrai-me das ciladas do inimigo e conduzi-me na fidelidade a Cristo,
para que eu persevere no bem até o fim. Amém.`,
  },
  {
    title: "Oração a São Judas Tadeu (necessidades urgentes)",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Judas Tadeu", "urgente"],
    content: `São Judas Tadeu, apóstolo e mártir, grande intercessor nas causas difíceis,
venho pedir vosso auxílio nas minhas necessidades (dizer intenções).
Peço-me graça, coragem e serenidade para cumprir a vontade de Deus.
Prometo propagar a vossa devoção e agir com gratidão. Amém.`,
  },
  {
    title: "Oração a Santo Expedito",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "Santo Expedito", "causas-urgentes"],
    content: `Santo Expedito, das causas justas e urgentes,
intercedei por mim junto a Deus.
Alcançai-me força no combate, paz nas decisões
e solução rápida para aquilo que vos apresento (intenção).
Ajudai-me a viver com retidão e confiança. Amém.`,
  },
  {
    title: "Oração a Santa Rita de Cássia (casos impossíveis)",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "Santa Rita", "casos-impossíveis"],
    content: `Ó Santa Rita, advogada dos impossíveis,
olhai para a minha dor e apresentai-a a Jesus.
Se for para a glória de Deus e bem da minha alma,
alcançai-me esta graça (pedido).
Ensinai-me a paciência, a fé e a caridade. Amém.`,
  },
  {
    title: "Fica, Senhor, comigo (São Pio de Pietrelcina)",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Padre Pio", "adoração"],
    content: `Fica, Senhor, comigo, pois é necessário ter-Te presente para não Te esquecer.
Fica, Senhor, comigo, porque sou fraco e preciso da tua força;
sou pobre e preciso de Ti.
Fica, Senhor, comigo, para que eu Te ouça, Te siga e Te ame sempre.
Fica, Senhor, comigo, nesta noite e em todas as noites,
até que, no Céu, eu descanse em Ti. Amém.`,
  },
  {
    title: "Oração a Santa Teresinha — Chuva de Rosas",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "Santa Teresinha", "confiança"],
    content: `Santa Teresinha do Menino Jesus, mestra do caminho da confiança,
ensina-me a simplicidade do amor que tudo entrega.
Peço um sinal do teu cuidado e intercessão (pedido),
para que eu cresça na humildade, na paciência e na esperança.
Faze chover rosas de graça sobre mim e minha família. Amém.`,
  },
  {
    title: "Oração a São Rafael Arcanjo (cura e viagens)",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Rafael", "cura", "viagem"],
    content: `São Rafael Arcanjo, medicina de Deus,
protegei os viajantes, amparai os enfermos,
confortai os aflitos e guiai os que buscam discernimento.
Acompanhai-nos nos caminhos e conduzi-nos em segurança. Amém.`,
  },
  {
    title: "Oração a São Gabriel Arcanjo (anúncio e discernimento)",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Gabriel", "discernimento"],
    content: `São Gabriel, portador das boas novas,
iluminai meu coração para acolher a vontade de Deus.
Purificai meus lábios e minhas intenções,
para que minhas palavras gerem vida e esperança.
Ajudai-me a dizer com Maria: “Faça-se em mim segundo a tua palavra”. Amém.`,
  },
  {
    title: "Oração a Nossa Senhora Aparecida",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "mariana", "Aparecida", "Brasil"],
    content: `Ó Senhora Aparecida, Mãe de Deus e nossa Mãe,
acolhei-me sob o vosso manto.
Alcançai-me as graças de que preciso (pedido) e conduzi-me sempre a Jesus.
Guardai as famílias, protegei os pobres e amparai os que sofrem.
Vossa é a minha confiança. Amém.`,
  },
  {
    title: "Oração a Santo Antônio",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "Santo Antônio", "caridade"],
    content: `Santo Antônio, amigo dos pobres e aflitos,
alcançai-me a graça de viver a caridade e a pureza.
Ajudai-me nas minhas necessidades (pedido)
e ensinai-me a buscar primeiro o Reino de Deus.
Que eu seja sinal de bondade onde eu estiver. Amém.`,
  },
  {
    title: "Oração a São Sebastião",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Sebastião", "saúde", "coragem"],
    content: `Glorioso mártir São Sebastião, soldado de Cristo,
alcançai-nos saúde do corpo e da alma,
coragem nas provações e perseverança na fé.
Dai-nos firmeza contra todo mal. Amém.`,
  },
  {
    title: "Oração a Santa Luzia",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "Santa Luzia", "saúde dos olhos"],
    content: `Santa Luzia, protetora dos olhos,
livrai-nos das enfermidades da visão e iluminai nossa mente,
para contemplarmos a verdade e seguirmos a Cristo.
Socorrei os que sofrem das vistas e os profissionais da saúde.
Rogai por nós. Amém.`,
  },
  {
    title: "Oração a São Roque",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "São Roque", "saúde pública"],
    content: `São Roque, protetor contra pestes e epidemias,
intercedei pelos doentes, pelos profissionais de saúde
e por todos os que sofrem.
Alcançai-nos confiança, prudência e caridade ativa. Amém.`,
  },
  {
    title: "Suscipe — Santo Inácio de Loyola",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "Santo Inácio", "entrega"],
    content: `Tomai, Senhor, e recebei toda a minha liberdade,
a minha memória, o meu entendimento e toda a minha vontade.
Tudo o que tenho e possuo, de vós recebi; a vós, Senhor, o devolvo.
Tudo é vosso: disponde de tudo segundo a vossa inteira vontade.
Dai-me o vosso amor e a vossa graça, que isto me basta. Amém.`,
  },
  {
    title: "Oração a Santa Mônica",
    collectionSlug: "oracoes-aos-santos",
    tags: ["santos", "Santa Mônica", "família"],
    content: `Santa Mônica, modelo de mãe perseverante,
ensinai-me a rezar com fé pela minha família e a esperar em Deus.
Alcançai-nos conversão, reconciliação e firmeza no bem.
Que nossa casa seja lugar de oração, diálogo e serviço. Amém.`,
  },

  // =========================================
  // ANJOS — 20 ITENS (COMPLETOS)
  // =========================================
  {
    title: "Oração do Anjo da Guarda",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "proteção", "clássica"],
    content: `Santo Anjo do Senhor, meu zeloso guardador,
se a ti me confiou a piedade divina,
sempre me rege, me guarda, me governa e me ilumina. Amém.`,
  },
  {
    title: "São Miguel Arcanjo (defendei-nos no combate)",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Miguel", "combate-espiritual", "clássica"],
    content: `São Miguel Arcanjo, defendei-nos no combate,
sede o nosso refúgio contra as maldades e ciladas do demônio.
Ordene-lhe Deus, instantemente o pedimos.
E vós, Príncipe da Milícia Celeste,
pelo poder divino, precipitai no inferno a Satanás
e a todos os espíritos malignos
que andam pelo mundo para perder as almas. Amém.`,
  },
  {
    title: "Consagração ao Santo Anjo da Guarda",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "anjo-da-guarda", "consagração"],
    content: `Santo Anjo do Senhor, guardião da minha alma,
a vós me consagro e confio, em união com Maria e São José.
Peço luz para o pensamento, pureza para o coração,
firmeza para a vontade e caridade nas palavras e obras.
Guiai-me nos perigos, corrigí-me nas quedas,
fortalecei-me nas tentações e conduzi-me pelos caminhos de Deus,
até a casa do Pai. Amém.`,
  },
  {
    title: "Súplica aos Nove Coros dos Anjos",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "nove-coros", "louvor"],
    content: `Santos Anjos de Deus, Serafins e Querubins,
Tronos e Dominações, Virtudes e Potestades,
Principados, Arcanjos e Anjos,
louvai ao Senhor conosco e intercedei por nós!
Que, por vosso ministério, a fé seja preservada,
a esperança fortalecida e a caridade inflamadas em nossos corações.
Guardai-nos na verdade de Cristo. Amém.`,
  },
  {
    title: "Quem como Deus? (Clamor a São Miguel)",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Miguel", "combate-espiritual"],
    content: `São Miguel, “Quem como Deus?”
Revesti-me da armadura divina:
o cinto da verdade, a couraça da justiça,
o escudo da fé, o capacete da salvação
e a espada da Palavra.
Que eu resista ao mal, persevere no bem
e vença pela cruz de Cristo. Amém.`,
  },
  {
    title: "Oração a São Rafael Arcanjo (cura e guia)",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Rafael", "cura", "viagem"],
    content: `São Rafael Arcanjo, medicina de Deus,
alcançai-nos cura do corpo e da alma.
Guardai os viajantes, protegei os lares,
confortai os enfermos e orientai os profissionais de saúde.
Conduzi-nos com segurança pelos caminhos da vida
e ensinai-nos a fazer a vontade do Altíssimo. Amém.`,
  },
  {
    title: "Oração a São Gabriel Arcanjo (anúncio e pureza)",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Gabriel", "discernimento", "pureza"],
    content: `São Gabriel, mensageiro do Altíssimo,
purificai meus lábios e meu coração,
para proclamar a verdade com humildade e coragem.
Ajudai-me a discernir a vontade de Deus
e a responder com prontidão: “Faça-se em mim segundo a tua palavra”.
Sede meu auxílio na luta pela pureza e pela fidelidade. Amém.`,
  },
  {
    title: "Coroa (Rosário) de São Miguel — guia de oração",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Miguel", "devoção", "estrutura"],
    content: `Como rezar:
1) Sinal da Cruz.
2) Ato inicial: “Deus vinde em meu auxílio… Glória ao Pai…”
3) Em honra de cada Coro angélico:
   • 1 Pai-Nosso + 3 Ave-Marias.
   Ordem: Serafins, Querubins, Tronos, Dominações, Potestades,
          Virtudes, Principados, Arcanjos, Anjos.
4) Ao final:
   • 1 Pai-Nosso a São Miguel, São Gabriel, São Rafael e ao Anjo da Guarda.
5) Oração final (sugestão):
   “Glorioso São Miguel, defendei-nos no combate,
    sede nosso auxílio contra as forças das trevas,
    para que, servindo a Deus com fidelidade, alcancemos a vida eterna. Amém.”`,
  },
  {
    title: "Triságio Angélico — guia de oração",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "louvor", "trisagio", "estrutura"],
    content: `Como rezar:
• “Santo Deus, Santo Forte, Santo Imortal, tende piedade de nós!” (3x)
• Glória ao Pai.
• Invocações: São Miguel, São Gabriel e São Rafael, rogai por nós.
• Preces pela Igreja, pelos governantes, pelas famílias, pelos enfermos
  e pela paz.
• Conclusão com a oração a São Miguel ou outra oração breve.`,
  },
  {
    title: "Anjos da Guarda da Família",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "família", "proteção"],
    content: `Santos Anjos da Guarda, protegei nossa família.
Guardai a fé, a unidade e a paz em nossa casa.
Livrai-nos da mentira, da discórdia e do desânimo.
Inspirai-nos palavras de conforto e gestos de caridade.
Conduzi-nos a Cristo, caminho, verdade e vida. Amém.`,
  },
  {
    title: "Discernimento com São Gabriel",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Gabriel", "discernimento"],
    content: `São Gabriel, luz para as decisões,
afastai confusões e temores que obscurecem a mente.
Pedi por mim a graça de escutar, ponderar e cumprir
o que Deus deseja em cada passo.
Que minhas palavras gerem vida e esperança. Amém.`,
  },
  {
    title: "Cura com São Rafael",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Rafael", "cura"],
    content: `São Rafael, medicina de Deus,
tocai minhas feridas visíveis e ocultas.
Curai lembranças dolorosas, desatando nós interiores.
Dai-me sobriedade, equilíbrio e perseverança no bem.
Acompanhai os que sofrem e os que cuidam. Amém.`,
  },
  {
    title: "Proteção dos Ambientes com São Miguel",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Miguel", "ambientes", "proteção"],
    content: `São Miguel Arcanjo, colocamos nossa casa e trabalho sob vossa guarda.
Expulsai toda influência maligna, mentira e confusão.
Firmái-nos na verdade do Evangelho
e estabelecei paz, ordem e caridade entre nós. Amém.`,
  },
  {
    title: "Anjos dos Viajantes",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "viagem", "proteção"],
    content: `Santos Anjos, guardai-nos em nossos caminhos:
preservai-nos de acidentes, distrações e imprudências.
Conduzi-nos com serenidade e prudência,
e fazei-nos regressar em paz.
Acompanhei também os que partem em missão de serviço. Amém.`,
  },
  {
    title: "Pelos Filhos ao Anjo da Guarda",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "filhos", "família"],
    content: `Santo Anjo da Guarda de (NOME),
protegei-o(a), iluminai seus passos,
inspirai boas amizades e preservai-o(a) de todo mal.
Despertai nele(a) o amor à verdade, ao bem e à oração.
Conduzi-o(a) sempre a Jesus. Amém.`,
  },
  {
    title: "Paz Interior sob Guarda dos Anjos",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "paz", "interior"],
    content: `Santos Anjos, guardai meu coração da agitação e do medo.
Silenciai pensamentos de desespero,
fortalecei minha confiança em Deus
e sustentai-me na vigilância e na oração.
Que a paz de Cristo reine em mim. Amém.`,
  },
  {
    title: "Consagração breve a São Miguel",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Miguel", "consagração"],
    content: `São Miguel Arcanjo, consagro-me a vós.
Defendei-me hoje e sempre, protegei minha família,
fortalecei minha fé, esperança e caridade,
para que eu persevere no bem até o fim. Amém.`,
  },
  {
    title: "Louvor com os Anjos",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "louvor", "glória-a-deus"],
    content: `Com os Anjos proclamamos: “Glória a Deus nas alturas,
e paz na terra aos homens por Ele amados!”
Que nossa vida seja louvor constante,
nossas obras testemunhem o Evangelho
e nossa esperança se firme nas promessas de Cristo. Amém.`,
  },
  {
    title: "Anjos Custódios da Igreja",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "Igreja", "proteção"],
    content: `Anjos do Senhor, guardiões da Santa Igreja,
protegei os pastores e fiéis, iluminai decisões,
defendei-nos da divisão e do erro.
Que a verdade e a caridade caminhem juntas
e o Evangelho seja anunciado com coragem. Amém.`,
  },
  {
    title: "Entrega a São Miguel nas Provações",
    collectionSlug: "oracoes-aos-anjos",
    tags: ["anjos", "São Miguel", "provações"],
    content: `São Miguel, nas tentações e tribulações,
sustentai-me no combate, livrai-me do desânimo
e conduzi-me à vitória em Cristo.
Que eu não ceda ao mal, mas persevere no bem,
com olhar fixo em Jesus. Amém.`,
  },

  // =========================================
  // OUTRAS TRADIÇÕES — 20 ITENS (COMPLETAS)
  // Cole no array PRAYERS.
  // =========================================
  {
    title: "Oração de Maitreya (afirmação de compaixão)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "compaixão", "afirmações"],
    content: `Que o amor-meiguice floresça em mim.
Que eu veja em cada ser um mestre e um irmão.
Que eu alivie dores, enxugue lágrimas e escute com presença.
Que eu seja ponte onde houver abismo, abrigo onde houver frio,
água onde houver sede e silêncio onde houver ruído.
Que meus pensamentos gerem bondade, minhas palavras curem,
e minhas ações façam diferença real.
Que todos os seres encontrem causas de alegria, saúde e liberdade. Assim seja.`,
  },
  {
    title: "Oração da Prosperidade (afirmação ética)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "prosperidade", "afirmações"],
    content: `Abençoo os recursos que chegam e os que partem.
Escolho prosperar com honestidade, serviço e reciprocidade.
Que meu trabalho gere valor útil, justo e sustentável.
Que eu compartilhe com generosidade e administre com prudência.
Renuncio à ganância e à comparação que corrói.
Acolho a simplicidade, celebro cada pequena conquista
e faço da riqueza um instrumento de cuidado e bem comum.`,
  },
  {
    title: "Prece de Proteção (universal)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "proteção"],
    content: `Luz diante de mim, luz atrás de mim,
luz à minha direita e à minha esquerda,
luz acima e luz abaixo, luz dentro e ao redor.
Onde houver medo, acende coragem;
onde houver confusão, dá discernimento;
onde houver sombra, instala paz.
Guarda meus passos, limpa meus caminhos,
e faz do meu corpo um templo de serenidade.
Que o bem me envolva e transborde para todos.`,
  },
  {
    title: "Oração contra pragas e maldições (universal)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "purificação"],
    content: `Corto agora todo laço de palavras duras, invejas e pragas.
Desfaço pensamentos que me diminuem e culpas que me aprisionam.
Purifico memória, olhar e intenção.
Escolho a verdade que liberta, a justiça que pacifica,
a compaixão que restaura.
Abençoo quem me feriu e sigo em frente leve, firme e inteiro.
Que a vida me encontre disponível para o bem.`,
  },
  {
    title: "Oração ao Anjo da Guarda (ecumênica)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "anjo", "proteção"],
    content: `Guardião da minha jornada, amigo sutil do meu silêncio,
inspira a palavra certa, guarda-me de atalhos fáceis,
afasta distrações e acalma tempestades internas.
Quando eu hesitar, dá-me lucidez;
quando eu cansar, dá-me esperança;
quando eu avançar, dá-me humildade.
Caminha comigo e recorda-me o essencial.`,
  },
  {
    title: "Afirmações de Cura e Ascensão",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "cura", "afirmações"],
    content: `Eu acolho a cura integral do corpo, mente e espírito.
Respiro profundo e libero pesos antigos.
Perdoo e me perdoo, aprendendo com cada queda.
Minha respiração organiza meus pensamentos,
minha presença harmoniza meu corpo,
minha intenção alinha minhas escolhas.
Eu me levanto para servir com alegria.`,
  },
  {
    title: "Oração do Empreendedor (ecumênica)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "trabalho", "empreendedorismo"],
    content: `Dá-me visão para ver necessidades reais e coragem para resolvê-las.
Que meu produto seja honesto, meu serviço confiável,
minhas relações leais e meus números transparentes.
Ensina-me a decidir com dados e sabedoria,
a liderar com exemplo, a lucrar com ética
e a distribuir com justiça.
Nos tempos difíceis, resiliência; nos bons, gratidão.
Que meu negócio gere dignidade e impacto social.`,
  },
  {
    title: "Oração da Serenidade (versão universal)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "serenidade"],
    content: `Serenidade para aceitar o que não posso mudar.
Coragem para mudar o que posso.
Sabedoria para discernir a diferença.
Paciência com os processos, presença no agora,
alegria nas pequenas coisas, constância no bem.`,
  },
  {
    title: "Gratidão ao Amanhecer (universal)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "gratidão"],
    content: `Pelo milagre de abrir os olhos, gratidão.
Pelo teto, pelo pão e pelos afetos, gratidão.
Pelos desafios que me amadurecem, gratidão.
Pelas chances de recomeçar, gratidão.
Que hoje eu fale menos e escute mais,
julgue menos e sirva mais,
reclame menos e agradeça mais.`,
  },
  {
    title: "Prece pela Terra (cuidado comum)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "ecologia", "criação"],
    content: `Terra-mãe que nos sustenta,
ensina-nos a moderar o consumo, reparar danos e regenerar solos.
Abençoa sementes, chuvas e mãos que plantam.
Protege rios, florestas e oceanos.
Desperta em nós respeito, ciência a serviço da vida
e políticas que preservem o amanhã.
Que cada escolha honre as futuras gerações.`,
  },
  {
    title: "Compromisso com a Verdade",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "verdade", "ética"],
    content: `Assumo a verdade como caminho e critério.
Renuncio à mentira que facilita e à meia-verdade que confunde.
Peço retidão na intenção, limpidez na fala
e coerência entre o que creio e o que faço.
Se eu errar, que eu repare; se eu acertar, que eu não me exalte.
Que minha palavra seja confiável.`,
  },
  {
    title: "Perdão e Reconciliação (universal)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "perdão", "reconciliação"],
    content: `Escolho interromper círculos de ofensa.
Peço perdão pelo que fiz, disse ou deixei de fazer.
Concedo perdão a quem me feriu.
Que a verdade venha à luz sem humilhar,
que a justiça repare sem vingar,
que a reconciliação floresça onde parecia impossível.`,
  },
  {
    title: "Círculo de Luz pela Família",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "família", "proteção"],
    content: `Traço um círculo de luz ao redor da minha família.
Dentro dele, respeito, diálogo e cuidado.
Que as palavras sejam ponte e não pedra,
que a escuta seja larga e a paciência diária.
Protege crianças, sustenta idosos, fortalece os que provêm.
Onde houver ferida, cura; onde houver distância, aproxima.`,
  },
  {
    title: "Compaixão por Todos os Seres",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "compaixão", "universal"],
    content: `Que todos os seres estejam a salvo do medo.
Que todos os seres tenham o que comer e onde dormir.
Que todos os seres encontrem mãos amigas e caminhos justos.
Que minha vida seja bênção discreta e constante.
Que eu nunca me acostume com a dor alheia.`,
  },
  {
    title: "Serenidade nas Decisões",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "discernimento"],
    content: `Silencio por dentro.
Alinho intenção com valor.
Escuto fatos, contextos e pessoas.
Peço clareza para escolher o que é certo e não só o conveniente.
Se eu me enganar, que eu corrija sem demora.
Que minhas decisões sirvam ao bem comum.`,
  },
  {
    title: "Intenção de Cura Coletiva",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "cura", "coletivo"],
    content: `Uno minha prece aos que sofrem e aos que cuidam.
Pelos doentes, alívio e tratamento.
Pelos enlutados, consolo e rede de apoio.
Pelos profissionais, vigor, reconhecimento e descanso.
Pelos gestores, sabedoria e responsabilidade.
Que a solidariedade se torne prática diária.`,
  },
  {
    title: "Agradecimento ao Encerrar o Dia",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "gratidão", "noite"],
    content: `Encerrando este dia, agradeço o que aprendi e o que ainda não entendi.
Entrego as pendências e descanso a mente.
Peço sonhos que organizem e um sono que refaça.
Se feri, que eu repare; se fui ferido, que eu libere.
Amanhã recomeço melhor.`,
  },
  {
    title: "Paz Mundial (universal)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "paz", "justiça"],
    content: `Que a paz nasça dentro de nós e alcance fronteiras.
Que líderes dialoguem, que armas se calem,
que a justiça trate causas e não só sintomas.
Que refugiados encontrem casa, que crianças estudem,
que a dignidade seja inegociável.
Faz-nos artesãos de pontes.`,
  },
  {
    title: "Foco e Presença (afirmação)",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "atenção-plena"],
    content: `Estou aqui, inteiro.
Respiro, percebo, escolho.
Solto o que distrai, acolho o que importa.
Faço uma coisa por vez com capricho e calma.
Meu melhor agora alimenta os resultados de amanhã.`,
  },
  {
    title: "Confiança no Processo",
    collectionSlug: "oracoes-outras-tradicoes",
    tags: ["outras-tradicoes", "confiança", "esperança"],
    content: `Confio nos tempos da vida.
Aceito pausas e desvios como parte da estrada.
Faço a minha parte com coragem e serenidade.
Quando for hora, avancem as portas; quando não, que eu saiba esperar.
Nada que é verdadeiro se perde.
Sigo em frente com fé prática e alegria sóbria.`,
  },

  // =========================================
  // LIBERTAÇÃO — 20 ITENS (COMPLETAS)
  // Cole no array PRAYERS.
  // =========================================
  {
    title: "Renúncia a Maldições e Pactos",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "renúncia", "quebra"],
    content: `Em nome de Jesus Cristo, Senhor do céu e da terra,
renuncio a toda maldição, palavra de morte, praga e desejo de mal
lançados por mim, sobre mim ou pelos meus antepassados.
Renuncio a pactos, alianças e votos contrários ao Evangelho,
conscientes ou inconscientes.
Rompei, Senhor, toda corrente espiritual e psicológica
que me prenda ao pecado, ao medo e à mentira.
Pelo sangue de Jesus e pela força do Espírito Santo,
declaro-me livre para viver como filho(a) de Deus.
Glória ao Pai, ao Filho e ao Espírito Santo. Amém.`,
  },
  {
    title: "Quebra de Palavras Negativas",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "palavras", "quebra"],
    content: `Senhor Jesus, revogo e desautorizo, agora,
toda palavra de humilhação, de condenação e de praga
que ouvi, disse ou acreditei a meu respeito.
Lavai minha mente e coração; curai memórias feridas.
Revesti-me da vossa verdade: sou amado(a), chamado(a) e enviado(a).
Declaro nula a força de palavras tóxicas e
escolho abençoar quem me amaldiçoou.
Em vós, sigo adiante na liberdade. Amém.`,
  },
  {
    title: "Cobertura do Preciosíssimo Sangue de Jesus",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "proteção", "sangue-de-jesus"],
    content: `Jesus, eu me coloco sob o vosso Preciosíssimo Sangue.
Cobri minha mente, afetos, corpo e espírito.
Cobri minha família, casa, trabalho, finanças e projetos.
Onde houver ferida, lavai; onde houver brecha, selai;
onde houver medo, infundi paz.
Guardai-nos do mal visível e invisível
e conduzi-nos no vosso caminho. Amém.`,
  },
  {
    title: "Quebra de Encantos e Feitiços",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "feitiços", "encantos"],
    content: `Em nome de Jesus Cristo, desfaço agora
encantos, feitiços, simpatias, trabalhos, ligações e invocações
dirigidos contra mim e minha família.
Corto toda seta enviada, toda inveja alimentada,
todo laço com ocultismo e superstição.
Que tudo seja levado à cruz de Cristo,
e que o Espírito Santo encha este lugar com sua luz. Amém.`,
  },
  {
    title: "Desligamento de Laços Espirituais Indevidos",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "laços", "cura"],
    content: `Senhor, apresento-vos vínculos afetivos, lembranças e histórias
que não nasceram da vossa vontade.
Peço libertação de dependências emocionais, manipulações e culpas.
Cortai laços que me prendem ao passado
e curai, com ternura, as feridas que permaneceram.
Restaurai minha liberdade para amar com verdade. Amém.`,
  },
  {
    title: "Armadura de Deus (oração guiada)",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "arma-espiritual", "estrutura"],
    content: `Revisto-me da armadura de Deus (Ef 6):
cinge-me, Senhor, com o cinto da verdade;
reveste-me com a couraça da justiça;
calça meus pés com o zelo do Evangelho da paz;
coloco o escudo da fé contra setas inflamadas do maligno;
ponho o capacete da salvação sobre minha mente;
empunho a espada do Espírito, que é a Palavra de Deus;
permaneço em oração perseverante no Espírito.
Firmado(a) em vós, permaneço de pé. Amém.`,
  },
  {
    title: "Libertação de Inveja e Olho Gordo",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "inveja", "proteção"],
    content: `Deus fiel, quebrai sobre mim toda inveja e comparação tóxica.
Rasgai velhos ciúmes, ressentimentos e disputas.
Dai-me coração grato, olhar puro e mãos generosas.
Coloco meus bens, dons e resultados sob vossa autoridade.
Que nada roube a alegria da vossa providência. Amém.`,
  },
  {
    title: "Cancelamento de Heranças Espirituais Nocivas",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "linhagem", "cura"],
    content: `Pai, apresento minha linhagem paterna e materna.
Em Jesus, corto heranças espirituais nocivas:
padrões de violência, vícios, traições, miséria e idolatrias.
Purificai a memória da família e abençoai as gerações futuras.
Que, a partir de mim, floresçam bênçãos, sobriedade e serviço. Amém.`,
  },
  {
    title: "Quebra de Maldições Financeiras",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "finanças", "provisão"],
    content: `Senhor, renuncio à desordem e à maldição nas finanças.
Quebram-se desperdícios, injustiças e enganos.
Concedei-me trabalho digno, prudência, disciplina e generosidade.
Abençoai minhas fontes de renda e livrai-me de dívidas opressoras.
Fazei-me administrador(a) fiel do que me confiais. Amém.`,
  },
  {
    title: "Proteção do Lar contra Pragas Espirituais",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "lar", "proteção"],
    content: `Visita, Senhor, esta casa.
Expulsai trevas, intrigas e desuniões.
Guardai portas e janelas com vossos Anjos.
Estabelecei paz, perdão e alegria.
Se algo aqui não vos pertence, seja removido.
Que este lar seja lugar de luz, descanso e oração. Amém.`,
  },
  {
    title: "Renúncia a Opressões Noturnas",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "noite", "opressão"],
    content: `Em nome de Jesus, renuncio a pesadelos, paralisias e perturbações noturnas.
Consagro meu sono ao Senhor, minha mente e meus sonhos à sua paz.
Cobri meu repouso com o vosso Sangue e cercai minha casa de Anjos.
Que eu acorde renovado(a), forte e sereno(a) para o bem. Amém.`,
  },
  {
    title: "Libertação de Medos e Ameaças",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "medo", "coragem"],
    content: `Senhor, corto o poder do medo que paralisa e das ameaças que intimidam.
Dai-me coragem, domínio próprio e prudência.
Que a vossa palavra seja lâmpada nos meus passos
e a vossa alegria, a minha força.
Eu não caminho sozinho(a); vós estais comigo. Amém.`,
  },
  {
    title: "Quebra de Maldições por Autocondenação",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "autocondenação", "cura-interna"],
    content: `Perdão, Senhor, pelas palavras duras contra mim mesmo(a):
autocríticas destrutivas, rótulos e comparações.
Cancelo toda sentença que proferi sobre mim.
Alinho minha identidade à vossa verdade: amado(a), perdoado(a), capaz de recomeçar.
Dai-me humildade sem humilhação e firmeza sem dureza. Amém.`,
  },
  {
    title: "Desfazimento de Laços com Ocultismo",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "ocultismo", "renúncia"],
    content: `Renuncio a consultas, adivinhações, pactos, objetos consagrados
e a toda prática contrária à fé cristã.
Fecho, em nome de Jesus, portas abertas ao inimigo
e quebro alianças feitas por ignorância, medo ou curiosidade.
Vós sois meu único Senhor e Salvador. Amém.`,
  },
  {
    title: "Súplica a São Miguel na Batalha",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "São Miguel", "combate-espiritual"],
    content: `São Miguel Arcanjo, defendei-me no combate.
Cortai laços de mentira, confusão e opressão.
Protegei minha família e trabalho, iluminai minhas decisões,
firmando-me na verdade de Cristo.
Que eu persevere até a vitória que vem de Deus. Amém.`,
  },
  {
    title: "Perdão e Quebra de Círculos de Ofensa",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "perdão", "reconciliação"],
    content: `Eu escolho perdoar quem me feriu e peço perdão a quem magoei.
Em Jesus, quebro ciclos de ofensa, humilhação e vingança.
Que a verdade apareça sem destruir,
que a justiça repare sem vingar,
que a reconciliação se torne possível.
Libertai-nos para recomeçar. Amém.`,
  },
  {
    title: "Bênção sobre Objetos e Ambientes",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "bênção", "purificação"],
    content: `Senhor, abençoai estes objetos e este ambiente.
Que sejam apenas instrumentos de bem, serviço e beleza.
Purificai e consagrai este espaço ao vosso nome.
Afaste-se toda energia de discórdia, desonestidade e medo.
Reine aqui a vossa paz. Amém.`,
  },
  {
    title: "Quebra de Votos Negativos e Juras Malditas",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "votos", "renúncia"],
    content: `Em Cristo, revogo votos, promessas e juramentos
feitos na dor, raiva ou ignorância
que me limitam, escravizam ou me afastam da vossa vontade.
Substituo-os por obediência amorosa e livre a Deus.
Selai, Senhor, minha língua e meu coração na verdade. Amém.`,
  },
  {
    title: "Libertação de Dependências e Amarras",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "dependências", "cura"],
    content: `Jesus, quebrai vícios e dependências que me escravizam:
substâncias, telas, relações, hábitos e pensamentos.
Dai-me sobriedade, apoio fraterno e perseverança.
Reordenai desejos e motivações, curai a raiz das fugas
e conduzi-me à verdadeira liberdade. Amém.`,
  },
  {
    title: "Selo de Paz e Autoridade em Cristo",
    collectionSlug: "oracoes-de-libertacao",
    tags: ["libertação", "autoridade", "paz"],
    content: `Eu me coloco sob a autoridade de Cristo.
Selo minha mente com a paz, minha boca com a verdade,
meus passos com a caridade.
Declaro que pertenço ao Senhor e que nada
poderá separar-me do seu amor.
Permaneço em Cristo. Amém.`,
  },
];

// ----------------- UPSERT COLEÇÕES -----------------
async function ensureCollections() {
  const map = {};
  for (const c of COLLECTIONS) {
    const update = {
      name: c.name,
      description: c.description ?? null,
      cover: c.cover ?? null,
      accent1: c.accent1 ?? null,
      accent2: c.accent2 ?? null,
    };
    const doc = await Collection.findOneAndUpdate(
      { slug: c.slug },
      { $set: update, $setOnInsert: { slug: c.slug } },
      { new: true, upsert: true }
    );
    map[c.slug] = doc._id;
  }
  const missing = COLLECTIONS.filter((c) => !map[c.slug]).map((c) => c.slug);
  if (missing.length) {
    throw new Error("Falha ao mapear coleções: " + missing.join(", "));
  }
  return map;
}

// ----------------- RUN -----------------
async function run() {
  await dbConnect();

  const idsBySlug = await ensureCollections();
  console.log("✔ Coleções mapeadas:", idsBySlug);

  let created = 0,
    updated = 0;

  for (const p of PRAYERS) {
    const colId = idsBySlug[p.collectionSlug];
    if (!colId) throw new Error(`Coleção ausente no mapa: ${p.collectionSlug}`);

    const slug = slugify(`${p.title}-${p.collectionSlug}`);

    const doc = await Prayer.findOne({ slug });
    if (doc) {
      doc.title = p.title;
      doc.content = p.content;
      doc.tags = p.tags || [];
      doc.category = "oração";
      doc.collection = colId;
      await doc.save();
      updated++;
    } else {
      await Prayer.create({
        title: p.title,
        content: p.content,
        tags: p.tags || [],
        category: "oração",
        collection: colId,
        slug,
      });
      created++;
    }
  }

  console.log(
    `✅ Seed OK: ${created} orações inseridas, ${updated} atualizadas.`
  );
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (err) => {
  console.error("❌ Seed falhou:", err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
