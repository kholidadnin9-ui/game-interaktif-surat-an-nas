export type Verse = {
  no: number;
  arab: string;
  latin: string;
  arti: string;
};

export const SURAH_META = {
  nama: "Surah An-Nas",
  arabName: "سُورَةُ النَّاس",
  artiNama: "Manusia",
  nomor: 114,
  jumlahAyat: 6,
  golongan: "Makkiyah (turun di Kota Mekah)",
  kandungan:
    "Berlindung kepada Allah dari bisikan setan yang membisikkan kejahatan ke dalam dada manusia.",
};

export const VERSES: Verse[] = [
  {
    no: 1,
    arab: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    latin: "Qul a'ūżu birabbin-nās",
    arti: 'Katakanlah, "Aku berlindung kepada Tuhan manusia,"',
  },
  {
    no: 2,
    arab: "مَلِكِ النَّاسِ",
    latin: "Malikin-nās",
    arti: "Raja manusia",
  },
  {
    no: 3,
    arab: "إِلَٰهِ النَّاسِ",
    latin: "Ilāhin-nās",
    arti: "Sembahan manusia",
  },
  {
    no: 4,
    arab: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
    latin: "Min syarril-waswāsil-khannās",
    arti: "Dari kejahatan (bisikan) setan yang bersembunyi",
  },
  {
    no: 5,
    arab: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
    latin: "Allażī yuwaswisu fī ṣudūrin-nās",
    arti: "Yang membisikkan (kejahatan) ke dalam dada manusia",
  },
  {
    no: 6,
    arab: "مِنَ الْجِنَّةِ وَالنَّاسِ",
    latin: "Minal-jinnati wan-nās",
    arti: "Dari (golongan) jin dan manusia",
  },
];

/** Kata-kata penting untuk permainan menjodohkan level mudah */
export const WORD_PAIRS: { arab: string; arti: string }[] = [
  { arab: "النَّاس", arti: "Manusia" },
  { arab: "رَبّ", arti: "Tuhan / Pemilik" },
  { arab: "مَلِك", arti: "Raja" },
  { arab: "إِلَٰه", arti: "Sembahan" },
  { arab: "الْوَسْوَاس", arti: "Setan pembisik" },
  { arab: "الْخَنَّاس", arti: "Yang bersembunyi" },
  { arab: "الْجِنَّة", arti: "Jin" },
];

export type MCQuestion = {
  id: number;
  question: string;
  arab?: string;
  options: string[];
  answer: number;
  fact: string;
};

export const MC_QUESTIONS: MCQuestion[] = [
  {
    id: 1,
    question: "Surah An-Nas adalah surah ke berapa dalam Al-Qur'an?",
    options: ["Surah ke-112", "Surah ke-113", "Surah ke-114"],
    answer: 2,
    fact: "Surah An-Nas adalah surah ke-114 dan surah paling akhir dalam Al-Qur'an.",
  },
  {
    id: 2,
    question: "Berapa jumlah ayat pada Surah An-Nas?",
    options: ["3 ayat", "6 ayat", "9 ayat"],
    answer: 1,
    fact: "Surah An-Nas terdiri atas 6 ayat yang pendek dan mudah dihafal.",
  },
  {
    id: 3,
    question: "Kata 'An-Nas' (النَّاس) artinya adalah ....",
    options: ["Manusia", "Raja", "Jin"],
    answer: 0,
    fact: "Kata An-Nas artinya manusia. Kata ini muncul 5 kali dalam surah ini.",
  },
  {
    id: 4,
    question: "Perhatikan ayat berikut. Arti ayat di atas adalah ....",
    arab: "مَلِكِ النَّاسِ",
    options: [
      "Raja manusia",
      "Sembahan manusia",
      "Dada manusia",
    ],
    answer: 0,
    fact: "Ayat 2, مَلِكِ النَّاسِ artinya Raja manusia.",
  },
  {
    id: 5,
    question: "Kata 'رَبّ' pada ayat pertama Surah An-Nas artinya ....",
    options: ["Raja", "Tuhan / Pemilik", "Sembahan"],
    answer: 1,
    fact: "رَبّ artinya Tuhan sekaligus Pemilik dan Pemelihara seluruh alam.",
  },
  {
    id: 6,
    question: "Arti ayat مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ adalah ....",
    options: [
      "Dari kejahatan (bisikan) setan yang bersembunyi",
      "Ke dalam dada manusia",
      "Dari (golongan) jin dan manusia",
    ],
    answer: 0,
    fact: "Itu adalah ayat ke-4: memohon perlindungan dari bisikan setan yang bersembunyi.",
  },
  {
    id: 7,
    question: "Setan pembisik yang bersembunyi disebut juga ....",
    options: ["الْوَسْوَاسِ الْخَنَّاسِ", "الْجِنَّةِ وَالنَّاسِ", "فِي صُدُورِ النَّاسِ"],
    answer: 0,
    fact: "Al-Waswas al-Khannas artinya setan pembisik yang bersembunyi.",
  },
  {
    id: 8,
    question: "Ayat ke-5 Surah An-Nas berbunyi ....",
    options: ["إِلَٰهِ النَّاسِ", "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "مِنَ الْجِنَّةِ وَالنَّاسِ"],
    answer: 1,
    fact: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ artinya setan membisikkan kejahatan ke dada manusia.",
  },
  {
    id: 9,
    question: "Saat kita terganggu bisikan setan, kita boleh memohon perlindungan dengan ....",
    options: ["Membaca Surah An-Nas", "Membaca Surah Al-Kautsar saja", "Tidak perlu berlindung"],
    answer: 0,
    fact: "Surah An-Nas dan Al-Falaq dibaca untuk berlindung, keduanya disebut Al-Mu'awwidzatain.",
  },
  {
    id: 10,
    question: "Ayat terakhir Surah An-Nas, مِنَ الْجِنَّةِ وَالنَّاسِ, artinya ....",
    options: [
      "Dari (golongan) jin dan manusia",
      "Kepada Tuhan manusia",
      "Raja manusia",
    ],
    answer: 0,
    fact: "Bisikan jahat bisa datang dari setan jin maupun dari manusia.",
  },
  {
    id: 11,
    question: "Kata 'إِلَٰه' artinya adalah ....",
    options: ["Sembahan", "Pembisik", "Manusia"],
    answer: 0,
    fact: "إِلَٰه artinya sembahan, sesuatu yang kita sembah hanya Allah.",
  },
  {
    id: 12,
    question: "Surah An-Nas termasuk golongan surah ....",
    options: ["Madaniyah", "Makkiyah", "Panjang"],
    answer: 1,
    fact: "Surah An-Nas adalah surah Makkiyah, yaitu turun di Kota Mekah.",
  },
  {
    id: 13,
    question: "Perhatikan ayat berikut. Arti ayat di atas adalah ....",
    arab: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    options: [
      'Katakanlah, "Aku berlindung kepada Tuhan manusia,"',
      "Raja manusia",
      "Sembahan manusia",
    ],
    answer: 0,
    fact: "Ayat 1 artinya: Katakanlah, \"Aku berlindung kepada Tuhan manusia,\"",
  },
  {
    id: 14,
    question: "Perhatikan ayat berikut. Arti ayat di atas adalah ....",
    arab: "إِلَٰهِ النَّاسِ",
    options: [
      "Raja manusia",
      "Sembahan manusia",
      "Dari (golongan) jin dan manusia",
    ],
    answer: 1,
    fact: "Ayat 3, إِلَٰهِ النَّاسِ artinya Sembahan manusia.",
  },
  {
    id: 15,
    question: "Perhatikan ayat berikut. Arti ayat di atas adalah ....",
    arab: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
    options: [
      "Yang membisikkan (kejahatan) ke dalam dada manusia",
      "Dari kejahatan (bisikan) setan yang bersembunyi",
      "Raja manusia",
    ],
    answer: 0,
    fact: "Ayat 5 artinya: Yang membisikkan (kejahatan) ke dalam dada manusia.",
  },
];

/** Soal menjodohkan: ayat <-> arti */
export const MATCH_VERSE_PAIRS = VERSES.map((v) => ({ id: `v${v.no}`, arab: v.arab, arti: v.arti }));

/** Soal menjodohkan: kata <-> arti (level mudah) */
export const MATCH_WORD_PAIRS = WORD_PAIRS.slice(0, 5).map((w, i) => ({ id: `w${i}`, ...w }));

export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
