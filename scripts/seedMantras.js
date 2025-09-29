// scripts/seedMantras.js
import "dotenv/config";
import dbConnect from "../lib/dbConnect.js";
import Mantra from "../models/Mantra.js";

await dbConnect();
await Mantra.deleteMany({});

await Mantra.insertMany([
  {
    title: "Om Mani Padme Hum",
    slug: "om-mani-padme-hum",
    excerpt: "Compaixão e sabedoria unificadas.",
    script: "ॐ मणि पद्मे हूँ",
    translit: "Om Mani Padme Hum",
    meaning:
      "Invocação de Avalokiteshvara (Chenrezig). Cultiva compaixão e clareza.",
    cover: "/covers/mantras/om-mani-padme-hum.png",
    audioUrl: "https://archive.org/details/OmManiPadmeHum_201808",
    reps: 108,
  },
  {
    title: "Gayatri Mantra",
    slug: "gayatri-mantra",
    excerpt: "Iluminação do intelecto.",
    script:
      "ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥",
    translit:
      "Om Bhur Bhuvah Svah | Tat Savitur Vareṇyaṁ Bhargo Devasya Dhīmahi | Dhiyo Yo Naḥ Prachodayāt",
    meaning: "Meditação na luz divina que desperta discernimento e retidão.",
    cover: "/covers/mantras/gayatri-mantra.png",
    audioUrl:
      "https://archive.org/details/famous-powerful-gayatri-mantra-108-times-om-bhur-bhuva-swaha",
    reps: 108,
  },
  {
    title: "Om Namah Shivaya",
    slug: "om-namah-shivaya",
    excerpt: "Entrega e transformação interior.",
    script: "ॐ नमः शिवाय",
    translit: "Om Namaḥ Śivāya",
    meaning: "Saudação a Shiva: dissolução do ego, purificação e paz.",
    cover: "/covers/mantras/om-namah-shivaya.png",
    audioUrl:
      "https://archive.org/details/om-namah-shivaya-108-times-chanting-432-hz-60-min",
    reps: 108,
  },
  {
    title: "Maha Mrityunjaya",
    slug: "maha-mrityunjaya",
    excerpt: "Cura profunda, longevidade e superação do medo.",
    script:
      "त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मा अमृतात् ॥",
    translit:
      "Tryambakaṁ Yajāmahe Sugandhiṁ Puṣṭi-Vardhanam | Urvārukamiva Bandhanān Mṛtyor Mukṣīya Mā’mṛtāt",
    meaning:
      "Invocação a Shiva como o tríplice-olhar; liberta dos apegos e do medo da morte.",
    cover: "/covers/mantras/maha-mrityunjaya.png",
    audioUrl: "https://archive.org/details/ShivMahaMrityunjayaMantra2",
    reps: 108,
  },
  {
    title: "Om Gam Ganapataye Namaha",
    slug: "om-gam-ganapataye-namaha",
    excerpt: "Remoção de obstáculos.",
    script: "ॐ गं गणपतये नमः",
    translit: "Om Gaṁ Gaṇapataye Namaḥ",
    meaning:
      "Saudação a Ganesha para clarear caminhos e iniciar projetos com boa fortuna.",
    cover: "/covers/mantras/om-gam-ganapataye-namaha.png",
    audioUrl: "https://archive.org/details/OmGamGanapatayeNamaha_814",
    reps: 108,
  },
  {
    title: "Om Dum Durgayei Namaha",
    slug: "om-dum-durgayei-namaha",
    excerpt: "Proteção, coragem e força.",
    script: "ॐ दूँ दुर्गायै नमः",
    translit: "Om Dūṁ Durgāyai Namaḥ",
    meaning:
      "Invocação a Durga para proteção, foco e superação de inimigos internos.",
    cover: "/covers/mantras/om-dum-durgayei-namaha.png",
    audioUrl: "https://archive.org/details/DurgaKavachMantras1",
    reps: 108,
  },
  {
    title: "Om Tare Tuttare Ture Soha",
    slug: "om-tare-tuttare-ture-soha",
    excerpt: "Libertação de medos e rápida compaixão.",
    script: "ॐ तारे तुत्तारे तुरे स्वाहा",
    translit: "Om Tāre Tuttāre Ture Svāhā",
    meaning:
      "Invocação à Tara Verde para proteção, agilidade e compaixão em ação.",
    cover: "/covers/mantras/om-tare-tuttare-ture-soha.png",
    audioUrl:
      "https://archive.org/details/Tara-FemaleBuddhaOfCompassionInActionVen.RobinaCourtin",
    reps: 108,
  },
  {
    title: "Om Namo Bhagavate Vasudevaya",
    slug: "om-namo-bhagavate-vasudevaya",
    excerpt: "Entrega ao Ser supremo (Vishnu/Krishna).",
    script: "ॐ नमो भगवते वासुदेवाय",
    translit: "Om Namo Bhagavate Vāsudevāya",
    meaning: "Rende-se ao Absoluto que permeia e sustenta toda a existência.",
    cover: "/covers/mantras/om-namo-bhagavate-vasudevaya.png",
    audioUrl: "https://archive.org/details/om-namo-bhagavate-vasudevaya",
    reps: 108,
  },
  {
    title: "Om Namo Narayanaya",
    slug: "om-namo-narayanaya",
    excerpt: "Devoção e paz profunda.",
    script: "ॐ नमो नारायणाय",
    translit: "Om Namo Nārāyaṇāya",
    meaning:
      "Entrega ao princípio preservador do universo; repouso no coração.",
    cover: "/covers/mantras/om-namo-narayanaya.png",
    audioUrl: "https://archive.org/details/OmNamoNarayanayaChanting",
    reps: 108,
  },
  {
    title: "Om Shri Mahalakshmyai Namaha",
    slug: "om-shri-mahalakshmyai-namaha",
    excerpt: "Abundância com ética e beleza.",
    script: "ॐ श्रीं महालक्ष्म्यै नमः",
    translit: "Om Śrīṁ Mahālakṣmyai Namaḥ",
    meaning: "Invoca Lakshmi para prosperidade, harmonia e plenitude justa.",
    cover: "/covers/mantras/om-shri-mahalakshmyai-namaha.png",
    audioUrl: "https://archive.org/details/MantrasFromVedasSlokas",
    reps: 108,
  },
  {
    title: "Om Aim Saraswatyai Namaha",
    slug: "om-aim-saraswatyai-namaha",
    excerpt: "Criatividade, estudo e eloquência.",
    script: "ॐ ऐं सरस्वत्यै नमः",
    translit: "Om Aiṁ Sarasvatyai Namaḥ",
    meaning: "Foco e inspiração mental sob a graça de Saraswati.",
    cover: "/covers/mantras/om-aim-saraswatyai-namaha.png",
    audioUrl: "https://archive.org/details/MantrasFromVedasSlokas",
    reps: 108,
  },
  {
    title: "Om Klim Krishnaya Govindaya Gopijanavallabhaya Swaha",
    slug: "om-klim-krishnaya-govindaya-gopijanavallabhaya-swaha",
    excerpt: "Devoção amorosa e magnetismo divino.",
    script: "ॐ क्लीं कृष्णाय गोविन्दाय गोपीजनवल्लभाय स्वाहा",
    translit: "Om Klīṁ Kṛṣṇāya Govindāya Gopījana-Vallabhāya Svāhā",
    meaning: "Conecta ao amor divino de Krishna, atraindo virtude e alegria.",
    cover:
      "/covers/mantras/om-klim-krishnaya-govindaya-gopijanavallabhaya-swaha.png",
    audioUrl:
      "https://archive.org/details/SriVenkateswaraAndMahaVishnuListenOnSaturday",
    reps: 108,
  },
  {
    title: "Om Ram Ramaya Namaha",
    slug: "om-ram-ramaya-namaha",
    excerpt: "Coragem, retidão e proteção.",
    script: "ॐ राम रामाय नमः",
    translit: "Om Rāma Rāmāya Namaḥ",
    meaning: "Força moral e proteção sob a vibração de Rama.",
    cover: "/covers/mantras/om-ram-ramaya-namaha.png",
    audioUrl:
      "https://archive.org/stream/21-upanishads-dedicated-to-lord-ram-and-their-spiritual-philosophy/21%3DUpanishads%20Dedicated%20to%20Lord%20Ram%20and%20their%20Spiritual%20Philosophy_djvu.txt",
    reps: 108,
  },
  {
    title: "Om Hanumate Namah",
    slug: "om-hanumate-namah",
    excerpt: "Energia, serviço e destemor.",
    script: "ॐ हनुमते नमः",
    translit: "Om Hanumate Namaḥ",
    meaning: "Invoca Hanuman para remover negatividade e dar vigor incansável.",
    cover: "/covers/mantras/om-hanumate-namah.png",
    audioUrl: "https://archive.org/details/HanumanMantra_201709",
    reps: 108,
  },
  {
    title: "Lokah Samastah Sukhino Bhavantu",
    slug: "lokah-samastah-sukhino-bhavantu",
    excerpt: "Que todos os seres sejam felizes e livres.",
    script: "लोकाः समस्ताः सुखिनो भवन्तु ॥",
    translit: "Lokāḥ Samastāḥ Sukhino Bhavantu",
    meaning: "Prece universal de benevolência e serviço desinteressado.",
    cover: "/covers/mantras/lokah-samastah-sukhino-bhavantu.png",
    audioUrl: "https://archive.org/details/001LokahSamastahSukhinoBhavantu",
    reps: 108,
  },
  {
    title: "Sarvesham Svastir Bhavatu",
    slug: "sarvesham-svastir-bhavatu",
    excerpt: "Bênção de paz, plenitude e bem-estar a todos.",
    script:
      "सर्वेषां स्वस्तिर्भवतु । सर्वेषां शान्तिर्भवतु । सर्वेषां पूर्णं भवतु । सर्वेषां मङ्गलं भवतु ॥",
    translit:
      "Sarveṣāṁ Svastir Bhavatu | Sarveṣāṁ Śāntir Bhavatu | Sarveṣāṁ Pūṛṇaṁ Bhavatu | Sarveṣāṁ Maṅgalaṁ Bhavatu",
    meaning: "Vibração de paz, prosperidade e integridade para o coletivo.",
    cover: "/covers/mantras/sarvesham-svastir-bhavatu.png",
    audioUrl: "https://archive.org/details/TheHareKrishnaMahaMantra2",
    reps: 108,
  },
  {
    title: "So Hum",
    slug: "so-hum",
    excerpt: "Não-dualidade: eu sou Isso.",
    script: "सोऽहं",
    translit: "So ’Ham",
    meaning:
      "Recorda a identidade essencial com a Consciência; respiração meditativa.",
    cover: "/covers/mantras/so-hum.png",
    audioUrl: "https://archive.org/details/KundaliniSongs1-179",
    reps: 108,
  },
  {
    title: "Om Shanti Shanti Shantih",
    slug: "om-shanti-shanti-shantih",
    excerpt: "Paz no corpo, mente e espírito.",
    script: "ॐ शान्तिः शान्तिः शान्तिः",
    translit: "Om Śāntiḥ Śāntiḥ Śāntiḥ",
    meaning: "Tríplice invocação de paz: pessoal, coletiva e cósmica.",
    cover: "/covers/mantras/om-shanti-shanti-shantih.png",
    audioUrl: "https://archive.org/details/TantricOceanLove",
    reps: 108,
  },
  {
    title: "Mul Mantra (Sikh)",
    slug: "mul-mantra-sikh",
    excerpt: "Essência do Único: verdade e destemor.",
    script:
      "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥",
    translit:
      "Ik Oṅkār Sat Nāmu Kartā Purakhu Nirbhau Nirvair Akāl Mūrat Ajūnī Saibhaṅ Gurprasād",
    meaning:
      "Afirma a unidade divina, a verdade e a presença além do tempo e do medo.",
    cover: "/covers/mantras/mul-mantra-sikh.png",
    audioUrl: "https://archive.org/details/KundaliniSongs1-179",
    reps: 108,
  },
  {
    title: "Waheguru Simran",
    slug: "waheguru-simran",
    excerpt: "Nome que dissolve a escuridão.",
    script: "ਵਾਹਿਗੁਰੂ",
    translit: "Wāheguru",
    meaning:
      "Repetição do Nome em devoção; clareia a mente e acende o coração.",
    cover: "/covers/mantras/waheguru-simran.png",
    audioUrl: "https://archive.org/details/SikhDevotionalSongs2",
    reps: 108,
  },
]);

console.log("OK");
process.exit(0);
