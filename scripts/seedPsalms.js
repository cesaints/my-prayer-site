// scripts/seedPsalms.js (execute via node)
import "dotenv/config";
import dbConnect from "../lib/dbConnect.js";
import Psalm from "../models/Psalm.js";

await dbConnect();

// zera a coleção
await Psalm.deleteMany({});

// insere 20 salmos (tradução original livre – sem direitos autorais de terceiros)
await Psalm.insertMany([
  {
    number: 1,
    title: "Salmo 1 — Os dois caminhos",
    slug: "salmo-1",
    excerpt: "Feliz quem não segue o conselho dos ímpios...",
    content: `Feliz aquele que não caminha segundo o conselho dos ímpios,
não se detém no caminho dos pecadores,
nem se assenta com os zombadores;
antes, tem prazer na lei do Senhor
e nela medita dia e noite.

Será como árvore plantada junto às águas,
que dá fruto no tempo certo,
cuja folhagem não murcha;
tudo o que fizer prosperará.

Não assim os ímpios: são como palha ao vento.
Por isso não prevalecerão no juízo,
nem os pecadores na assembleia dos justos.
Pois o Senhor conhece o caminho dos justos,
mas o caminho dos ímpios perecerá.`,
  },
  {
    number: 4,
    title: "Salmo 4 — Paz ao deitar",
    slug: "salmo-4",
    excerpt: "Em paz me deito e logo adormeço...",
    content: `Responde-me quando clamo, Deus da minha justiça!
Na aflição me deste alívio; tem compaixão de mim e ouve a minha oração.

Até quando, filhos dos homens, transformareis a minha honra em vergonha?
Até quando amareis a vaidade e buscareis a mentira?

Sabei: o Senhor separou para si o piedoso;
o Senhor me ouve quando eu clamo a ele.
Tremei e não pequeis; meditai no vosso coração, no silêncio, sobre o vosso leito.
Oferecei sacrifícios de justiça e confiai no Senhor.

Muitos dizem: “Quem nos mostrará o bem?”
Faze brilhar sobre nós a luz do teu rosto, Senhor!
Puseste no meu coração alegria maior
do que a deles quando o trigo e o vinho se multiplicam.

Em paz me deito e logo adormeço,
porque só tu, Senhor, me fazes habitar em segurança.`,
  },
  {
    number: 8,
    title: "Salmo 8 — Majestade do Criador",
    slug: "salmo-8",
    excerpt: "Senhor, Senhor nosso, quão majestoso é o teu nome...",
    content: `Senhor, Senhor nosso,
quão majestoso é o teu nome em toda a terra!
Ergueste a tua glória acima dos céus.

Da boca de crianças e lactentes estabeleceste louvor
por causa dos teus adversários,
para fazer calar inimigos e vingadores.

Quando contemplo os teus céus, obra dos teus dedos,
a lua e as estrelas que fixaste,
que é o homem para dele te lembrares,
o filho de Adão para com ele te importares?

Tu o fizeste um pouco menor que os seres celestes
e de glória e honra o coroaste.
Deste-lhe domínio sobre as obras das tuas mãos;
tudo puseste debaixo de seus pés:
ovelhas e bois, todos eles,
e também os animais do campo,
as aves do céu e os peixes do mar,
tudo o que percorre as veredas dos mares.

Senhor, Senhor nosso,
quão majestoso é o teu nome em toda a terra!`,
  },
  {
    number: 15,
    title: "Salmo 15(14) — Quem habita no teu santuário",
    slug: "salmo-15",
    excerpt: "Senhor, quem habitará no teu tabernáculo?",
    content: `Senhor, quem habitará no teu tabernáculo?
Quem morará no teu santo monte?

O que anda com integridade e pratica a justiça,
e de coração fala a verdade;
não difama com a língua, não faz mal ao próximo,
nem lança afronta contra o seu vizinho;
aos seus olhos o reprovável é desprezado,
mas honra os que temem o Senhor.
Se jura com dano próprio, não volta atrás;
não empresta o seu dinheiro com usura
nem aceita suborno contra o inocente.

Quem assim procede jamais será abalado.`,
  },
  {
    number: 18,
    title: "Salmo 18(17) — O Senhor, minha fortaleza",
    slug: "salmo-18",
    excerpt: "Eu te amo, Senhor, força minha...",
    content: `Eu te amo, Senhor, força minha.
O Senhor é minha rocha, fortaleza e libertador;
meu Deus é o rochedo em que me refugio,
meu escudo, o chifre da minha salvação, meu alto refúgio.

Clamei ao Senhor, digno de louvor,
e fui salvo dos meus inimigos.
Ondas de morte me cercaram,
torrentes de impiedade me atemorizaram.
Atado pelas cordas do Sheol, vi-me em angústia.

No meu aperto invoquei o Senhor;
do seu templo ele ouviu minha voz,
meu clamor chegou aos seus ouvidos.

Então a terra estremeceu e tremeu,
os fundamentos dos montes se abalaram,
porque ele se irou.
Do seu nariz subiu fumaça,
da sua boca fogo devorador.

Ele inclinou os céus e desceu,
trevas espessas debaixo de seus pés.
Montou num querubim e voou;
pairou sobre as asas do vento.
Das alturas estendeu a mão e me tomou,
tirou-me das muitas águas;
livrou-me do inimigo poderoso
e dos que me odiavam, pois eram mais fortes do que eu.

O Senhor foi meu amparo;
pôs-me em lugar espaçoso,
livrou-me porque se agradou de mim.

O caminho de Deus é perfeito,
a palavra do Senhor é provada;
ele é escudo para todos os que nele confiam.
Pois quem é Deus além do Senhor?
E quem é rocha senão o nosso Deus?

Ele me cinge de força e torna perfeito o meu caminho;
faz os meus pés como os da corça
e me põe nos lugares altos.

Vivo seja o Senhor! Bendita seja a minha rocha!
Exaltado seja o Deus da minha salvação. Amém.`,
  },
  {
    number: 19,
    title: "Salmo 19(18) — Os céus proclamam a glória",
    slug: "salmo-19",
    excerpt: "Os céus proclamam a glória de Deus...",
    content: `Os céus proclamam a glória de Deus,
o firmamento anuncia a obra das suas mãos.
Um dia derrama palavra a outro dia,
uma noite revela conhecimento a outra noite.
Sem discurso, sem palavras, sem se ouvir a sua voz,
por toda a terra se faz ouvir a sua linha,
e até aos confins do mundo as suas palavras.

A lei do Senhor é perfeita e restaura a alma;
o testemunho do Senhor é fiel e dá sabedoria aos simples;
os preceitos do Senhor são retos e alegram o coração;
o mandamento do Senhor é puro e ilumina os olhos;
o temor do Senhor é limpo e permanece para sempre;
os juízos do Senhor são verdadeiros e todos igualmente justos.

Mais desejáveis do que o ouro, muito ouro puro,
mais doces do que o mel que escorre dos favos.
Por eles o teu servo é advertido;
em guardá-los há grande recompensa.

Quem pode discernir os próprios erros?
Purifica-me dos que me são ocultos.
Também guarda o teu servo da soberba;
que ela não me domine.
Então serei íntegro e ficarei limpo de grande transgressão.

Sejam agradáveis as palavras da minha boca
e a meditação do meu coração perante ti,
Senhor, minha rocha e meu redentor.`,
  },
  {
    number: 23,
    title: "Salmo 23 — O Senhor é meu Pastor",
    slug: "salmo-23",
    excerpt: "O Senhor é o meu pastor; nada me faltará.",
    content: `O Senhor é o meu pastor; nada me faltará.
Em verdes pastos me faz repousar,
e me conduz às águas de descanso.
Restaura-me a alma e guia-me pelas veredas da justiça por amor do seu nome.

Ainda que eu ande pelo vale da sombra da morte,
não temerei mal algum, porque tu estás comigo;
o teu bordão e o teu cajado me consolam.

Preparas uma mesa para mim na presença dos meus adversários;
unges-me a cabeça com óleo; meu cálice transborda.
Bondade e misericórdia me seguirão todos os dias da minha vida,
e habitarei na casa do Senhor por longos dias. Amém.`,
  },
  {
    number: 24,
    title: "Salmo 24(23) — Do Senhor é a terra",
    slug: "salmo-24",
    excerpt: "Do Senhor é a terra e tudo o que nela há...",
    content: `Do Senhor é a terra e tudo o que nela há,
o mundo e os que nele habitam.
Ele a fundou sobre os mares,
a firmou sobre as correntes.

Quem subirá ao monte do Senhor?
Quem permanecerá no seu santo lugar?
O que tem mãos limpas e coração puro,
que não entrega a alma à mentira nem jura enganosamente.

Levantai, ó portas, as vossas cabeças!
Levantai-vos, ó entradas eternas,
e entrará o Rei da glória!
Quem é este Rei da glória?
O Senhor forte e poderoso,
o Senhor poderoso nas batalhas.

Levantai, ó portas, as vossas cabeças!
Levantai-vos, ó entradas eternas,
e entrará o Rei da glória!
Quem é este Rei da glória?
O Senhor dos Exércitos; ele é o Rei da glória.`,
  },
  {
    number: 27,
    title: "Salmo 27(26) — O Senhor é minha luz",
    slug: "salmo-27",
    excerpt: "O Senhor é minha luz e salvação; de quem terei medo?",
    content: `O Senhor é minha luz e salvação; de quem terei medo?
O Senhor é a fortaleza da minha vida; a quem temerei?

Quando malfeitores me sobrevêm para me devorar a carne,
meus adversários e inimigos tropeçam e caem.
Ainda que um exército se acampe contra mim,
não se atemoriza o meu coração.

Uma coisa peço ao Senhor, e a buscarei:
que eu possa morar na casa do Senhor todos os dias da minha vida,
para contemplar a beleza do Senhor e meditar no seu templo.

Ouve, Senhor, a minha voz quando clamo;
tem compaixão de mim e responde-me.
Meu coração te diz: “Buscai o meu rosto”;
o teu rosto, Senhor, eu buscarei.

Creio que verei a bondade do Senhor
na terra dos viventes.
Espera no Senhor; sê forte!
Fortifique-se o teu coração; espera, pois, no Senhor!`,
  },
  {
    number: 34,
    title: "Salmo 34(33) — Bendirei ao Senhor",
    slug: "salmo-34",
    excerpt: "Bendirei ao Senhor em todo tempo...",
    content: `Bendirei ao Senhor em todo tempo;
o seu louvor estará sempre nos meus lábios.
Engrandecei comigo ao Senhor, e juntos exaltemos o seu nome.

Busquei o Senhor e ele me respondeu,
livrou-me de todos os meus temores.
O anjo do Senhor acampa-se ao redor dos que o temem e os livra.

Provai e vede que o Senhor é bom;
bem-aventurado o homem que nele se refugia.
Temei o Senhor, vós, seus santos,
pois nada falta aos que o temem.

Os olhos do Senhor estão sobre os justos,
e seus ouvidos, atentos ao seu clamor.
Perto está o Senhor dos que têm o coração quebrantado
e salva os de espírito oprimido.

Muitas são as aflições do justo,
mas de todas o Senhor o livra.
O Senhor resgata a alma dos seus servos,
e nenhum dos que nele se refugiam será condenado.`,
  },
  {
    number: 37,
    title: "Salmo 37(36) — Confia no Senhor e faze o bem",
    slug: "salmo-37",
    excerpt:
      "Confia no Senhor e faze o bem; habita a terra e alimenta-te da fidelidade.",
    content: `Não te irrites por causa dos malfeitores,
nem tenhas inveja dos que praticam a injustiça.
Eles logo murcharão como a erva
e secarão como a relva verde.

Confia no Senhor e faze o bem;
habita a terra e alimenta-te da fidelidade.
Agrada-te do Senhor, e ele satisfará os desejos do teu coração.
Entrega o teu caminho ao Senhor, confia nele, e o mais ele fará.

Cessa a ira e abandona o furor; não te irrites, pois isso só leva ao mal.
Os mansos herdarão a terra
e se deleitarão na abundância de paz.
A salvação dos justos vem do Senhor;
ele é a sua fortaleza no tempo da angústia.`,
  },
  {
    number: 40,
    title: "Salmo 40(39) — Esperei confiantemente",
    slug: "salmo-40",
    excerpt:
      "Esperei confiantemente pelo Senhor, e ele se inclinou para mim...",
    content: `Esperei confiantemente pelo Senhor,
e ele se inclinou para mim e ouviu o meu clamor.
Tirou-me de um poço de perdição, de um charco de lama;
colocou os meus pés sobre a rocha e firmou os meus passos.
Pôs um novo cântico na minha boca, um hino ao nosso Deus.

Sacrifícios e ofertas não desejas; abriste os meus ouvidos.
Holocaustos e expiações pelo pecado não exigiste.
Então eu disse: “Eis-me aqui; no rolo do livro está escrito ao meu respeito.
Tenho prazer em fazer a tua vontade, ó meu Deus;
a tua lei está no fundo do meu coração.”

Não retenhas de mim as tuas misericórdias, Senhor;
guarde-me continuamente a tua graça e a tua fidelidade.
Tu és o meu auxílio e o meu libertador; não te demores, ó meu Deus!`,
  },
  {
    number: 46,
    title: "Salmo 46(45) — Deus, nosso refúgio",
    slug: "salmo-46",
    excerpt:
      "Deus é nosso refúgio e fortaleza, socorro bem presente na angústia.",
    content: `Deus é nosso refúgio e fortaleza,
socorro bem presente na angústia.
Portanto não temeremos,
ainda que a terra se transtorne e os montes se abalem no coração dos mares;
ainda que as águas rujam e espumem
e os montes estremeçam.

Há um rio cujas correntes alegram a cidade de Deus,
o santuário das moradas do Altíssimo.
Deus está no meio dela; não será abalada.
Deus a ajudará ao romper da manhã.

O Senhor dos Exércitos está conosco;
o Deus de Jacó é o nosso alto refúgio.
Aquietai-vos e sabei que eu sou Deus;
serei exaltado entre as nações, serei exaltado na terra.`,
  },
  {
    number: 51,
    title: "Salmo 51(50) — Miserere",
    slug: "salmo-51",
    excerpt: "Tem piedade de mim, ó Deus, segundo a tua misericórdia...",
    content: `Tem piedade de mim, ó Deus, segundo a tua misericórdia;
apaga as minhas transgressões segundo a abundância da tua compaixão.
Lava-me completamente da minha iniquidade
e purifica-me do meu pecado.

Cria em mim um coração puro, ó Deus,
e renova dentro de mim um espírito firme.
Não me lances fora da tua presença
nem retires de mim o teu Espírito Santo.
Restitui-me a alegria da tua salvação
e sustém-me com um espírito voluntário.

Ó Deus, sacrifícios não te agradam, senão o espírito quebrantado;
um coração quebrantado e contrito não desprezarás.`,
  },
  {
    number: 63,
    title: "Salmo 63(62) — Sede de Deus",
    slug: "salmo-63",
    excerpt: "Ó Deus, tu és o meu Deus; eu te busco ansiosamente...",
    content: `Ó Deus, tu és o meu Deus; eu te busco ansiosamente.
Minha alma tem sede de ti, minha carne te deseja,
numa terra seca e exausta, sem água.
Assim te contemplo no santuário,
para ver o teu poder e a tua glória.
Porque a tua benignidade é melhor do que a vida,
os meus lábios te louvarão.

Em meu leito de ti me lembro,
em ti medito nas vigílias da noite.
Pois tu foste o meu auxílio
e à sombra das tuas asas eu canto jubiloso.
A minha alma se apega a ti;
a tua destra me sustém.`,
  },
  {
    number: 84,
    title: "Salmo 84(83) — Quão amáveis são teus tabernáculos",
    slug: "salmo-84",
    excerpt: "Quão amáveis são as tuas moradas, Senhor dos Exércitos!",
    content: `Quão amáveis são as tuas moradas, Senhor dos Exércitos!
A minha alma suspira e desfalece pelos átrios do Senhor;
meu coração e minha carne exultam pelo Deus vivo.

Bem-aventurados os que habitam na tua casa;
eles te louvam sem cessar.
Bem-aventurado o homem cuja força está em ti,
em cujo coração estão os caminhos aplanados.
Vão indo de força em força,
cada um deles comparece perante Deus em Sião.

Porque vale mais um dia nos teus átrios do que mil em outro lugar;
prefiro estar à porta da casa do meu Deus
a habitar nas tendas da maldade.
O Senhor Deus é sol e escudo; graça e glória ele dá;
nenhum bem sonega aos que andam na retidão.`,
  },
  {
    number: 91,
    title: "Salmo 91(90) — A sombra do Altíssimo",
    slug: "salmo-91",
    excerpt: "Aquele que habita no esconderijo do Altíssimo...",
    content: `Aquele que habita no esconderijo do Altíssimo
e descansa à sombra do Onipotente
diz ao Senhor: “Meu refúgio e minha fortaleza,
meu Deus, em quem confio”.

Ele te livrará do laço do caçador
e da peste perniciosa.
Com suas penas te cobrirá, e debaixo das suas asas acharás refúgio;
sua fidelidade é escudo e broquel.

Não temerás o terror da noite
nem a seta que voa de dia,
nem a peste que se propaga nas trevas,
nem a mortandade que assola ao meio-dia.

Porque aos seus anjos dará ordens ao teu respeito,
para te guardarem em todos os teus caminhos;
eles te sustentarão nas mãos, para não tropeçares em pedra alguma.
“Porque a mim se apegou com amor, eu o livrarei;
pô-lo-ei a salvo, porque conhece o meu nome.
Quando me invocar, eu lhe responderei;
na angústia estarei com ele; livrá-lo-ei e o glorificarei;
com longura de dias o saciarei e lhe mostrarei a minha salvação.”`,
  },
  {
    number: 103,
    title: "Salmo 103(102) — Bendize, ó minha alma",
    slug: "salmo-103",
    excerpt:
      "Bendize, ó minha alma, ao Senhor, e tudo o que há em mim ao seu santo nome.",
    content: `Bendize, ó minha alma, ao Senhor,
e tudo o que há em mim, ao seu santo nome.
Ele perdoa todas as tuas culpas,
cura todas as tuas doenças,
resgata da cova a tua vida
e te coroa de graça e misericórdia.

O Senhor é compassivo e clemente,
tardio em irar-se e grande em amor.
Não nos trata segundo os nossos pecados,
nem nos retribui conforme as nossas culpas.
Quanto o oriente está longe do ocidente,
assim afasta de nós as nossas transgressões.
Como um pai se compadece dos filhos,
assim o Senhor se compadece dos que o temem,
pois ele conhece a nossa estrutura;
lembra-se de que somos pó.

O trono do Senhor estabeleceu-se nos céus,
e seu reino domina sobre tudo.
Bendizei ao Senhor, vós, seus anjos poderosos;
bendizei, todas as suas obras, em todo lugar do seu domínio.
Bendize, ó minha alma, ao Senhor!`,
  },
  {
    number: 121,
    title: "Salmo 121(120) — Elevo os olhos",
    slug: "salmo-121",
    excerpt: "Elevo os meus olhos para os montes; de onde me virá o socorro?",
    content: `Elevo os meus olhos para os montes; de onde me virá o socorro?
O meu socorro vem do Senhor, que fez o céu e a terra.
Ele não permitirá que o teu pé vacile;
aquele que te guarda não dormitará.

O Senhor é quem te guarda;
o Senhor é a tua sombra à tua direita.
De dia o sol não te ferirá, nem a lua de noite.
O Senhor te guardará de todo mal;
guardará a tua alma.
O Senhor guardará a tua saída e a tua entrada,
desde agora e para sempre.`,
  },
  {
    number: 130,
    title: "Salmo 130(129) — Das profundezas",
    slug: "salmo-130",
    excerpt: "Das profundezas clamo a ti, Senhor.",
    content: `Das profundezas clamo a ti, Senhor.
Senhor, ouve a minha voz!
Se observares as iniquidades, Senhor, quem subsistirá?
Mas contigo está o perdão, para que sejas temido.

Aguardo o Senhor, a minha alma o aguarda,
e espero na sua palavra.
Mais do que os guardas pela manhã,
espere Israel pelo Senhor,
pois com o Senhor há graça,
e com ele, abundante redenção.
Ele redimirá Israel de todas as suas iniquidades.`,
  },
  {
    number: 131,
    title: "Salmo 131(130) — Coração aquietado",
    slug: "salmo-131",
    excerpt:
      "Não se elevou o meu coração, nem se ergueram altivos os meus olhos...",
    content: `Senhor, não se elevou o meu coração,
nem se ergueram altivos os meus olhos;
não ando à procura de grandezas, nem de coisas maravilhosas demais para mim.
Pelo contrário: fiz calar e aquietei a minha alma,
como criança desmamada no colo da mãe;
assim está em mim a minha alma.

Espera, Israel, no Senhor,
desde agora e para sempre.`,
  },
  {
    number: 139,
    title: "Salmo 139(138) — Sonda-me, ó Deus",
    slug: "salmo-139",
    excerpt: "Tu me sondas e me conheces...",
    content: `Senhor, tu me sondas e me conheces.
Sabes quando me sento e quando me levanto;
de longe entendes o meu pensar.
Esquadrinhas o meu andar e o meu deitar
e estás familiarizado com todos os meus caminhos.
Antes que a palavra me chegue à língua, eis que, ó Senhor, tudo conheces.

Para onde irei do teu Espírito?
Para onde fugirei da tua presença?
Se subo aos céus, lá estás;
se faço a minha cama no abismo, também lá estás.
Se tomo as asas da aurora e vou habitar nos confins do mar,
ainda ali a tua mão me guiará, e a tua destra me susterá.

Tu formaste o meu íntimo,
tecendo-me no ventre de minha mãe.
Eu te louvo, porque me fizeste de modo assombroso e maravilhoso;
as tuas obras são admiráveis, e minha alma o sabe muito bem.

Sonda-me, ó Deus, e conhece o meu coração;
prova-me e conhece os meus pensamentos.
Vê se há em mim algum caminho mau
e guia-me pelo caminho eterno.`,
  },
]);

console.log("OK");
process.exit(0);
