import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Target, Users, Volume2, CheckCircle, XCircle, RotateCcw, ChevronDown, ChevronUp, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

interface QuizQuestion {
  word: string;
  options: string[];
  correct: number;
  explanation: string;
}

const klinkerQuizQuestions: QuizQuestion[] = [
  {
    word: "man",
    options: ["manen", "mannen"],
    correct: 1,
    explanation: "'Man' has a short 'a', so we double the 'n' to keep it short: mannen"
  },
  {
    word: "maan",
    options: ["manen", "maanen"],
    correct: 0,
    explanation: "'Maan' has a long 'aa', so we drop one 'a' in plural: manen"
  },
  {
    word: "bot",
    options: ["boten", "botten"],
    correct: 1,
    explanation: "'Bot' has a short 'o', so we double the 't' to keep it short: botten"
  },
  {
    word: "boot",
    options: ["boten", "booten"],
    correct: 0,
    explanation: "'Boot' has a long 'oo', so we drop one 'o' in plural: boten"
  },
  {
    word: "vis",
    options: ["visen", "vissen"],
    correct: 1,
    explanation: "'Vis' has a short 'i', so we double the 's' to keep it short: vissen"
  }
];

interface VerbQuizQuestion {
  sentence: string;
  verb: string;
  subject: string;
  options: string[];
  correct: number;
  explanation: string;
}

const verbQuizQuestions: VerbQuizQuestion[] = [
  {
    sentence: "Ik ___ naar school.",
    verb: "fietsen",
    subject: "ik",
    options: ["fiets", "fietst", "fietsen"],
    correct: 0,
    explanation: "With 'ik' we use the stem form: fiets"
  },
  {
    sentence: "Jij ___ hard.",
    verb: "werken",
    subject: "jij",
    options: ["werk", "werkt", "werken"],
    correct: 1,
    explanation: "With 'jij' we add 't' to the stem: werkt"
  },
  {
    sentence: "Hij ___ een boek.",
    verb: "hebben",
    subject: "hij",
    options: ["heb", "hebt", "heeft"],
    correct: 2,
    explanation: "'Hebben' is irregular: hij heeft"
  },
  {
    sentence: "Wij ___ thuis.",
    verb: "zijn",
    subject: "wij",
    options: ["ben", "bent", "zijn"],
    correct: 2,
    explanation: "'Zijn' is irregular: wij zijn"
  },
  {
    sentence: "___ jij een auto?",
    verb: "hebben",
    subject: "jij",
    options: ["Heb", "Hebt", "Heeft"],
    correct: 0,
    explanation: "In questions with 'jij/je' after the verb, drop the 't': Heb jij?"
  }
];

interface StemQuizQuestion {
  infinitive: string;
  options: string[];
  correct: number;
  explanation: string;
}

const stemQuizQuestions: StemQuizQuestion[] = [
  {
    infinitive: "lopen",
    options: ["lop", "loop", "lopen"],
    correct: 1,
    explanation: "Long vowel: 'lopen' → stem 'lop' → ik-vorm 'loop' (add extra 'o')"
  },
  {
    infinitive: "rennen",
    options: ["renn", "ren", "renne"],
    correct: 1,
    explanation: "Short vowel: 'rennen' → stem 'renn' → ik-vorm 'ren' (remove double consonant)"
  },
  {
    infinitive: "verhuizen",
    options: ["verhuiz", "verhuis", "verhuizen"],
    correct: 1,
    explanation: "V/Z rule: 'verhuizen' → stem 'verhuiz' → ik-vorm 'verhuis' (z becomes s)"
  },
  {
    infinitive: "verven",
    options: ["verv", "verf", "verven"],
    correct: 1,
    explanation: "V/Z rule: 'verven' → stem 'verv' → ik-vorm 'verf' (v becomes f)"
  },
  {
    infinitive: "blazen",
    options: ["blaz", "blaas", "blazen"],
    correct: 1,
    explanation: "V/Z rule + long vowel: 'blazen' → stem 'blaz' → ik-vorm 'blaas' (z→s + double 'a')"
  }
];

interface SentenceQuizQuestion {
  sentence: string;
  isCorrect: boolean;
  correction?: string;
  explanation: string;
}

const sentenceQuizQuestions: SentenceQuizQuestion[] = [
  {
    sentence: "Ik lopen naar de winkel.",
    isCorrect: false,
    correction: "Ik loop naar de winkel.",
    explanation: "'Ik' needs the ik-vorm: loop"
  },
  {
    sentence: "Wij gaat morgen naar het feest.",
    isCorrect: false,
    correction: "Wij gaan morgen naar het feest.",
    explanation: "'Wij' needs the infinitive: gaan"
  },
  {
    sentence: "De vrouw speelt graag piano.",
    isCorrect: true,
    explanation: "Correct! 'De vrouw' (zij) needs ik-vorm + t: speelt"
  },
  {
    sentence: "De jongen wil een mooie film ziet.",
    isCorrect: false,
    correction: "De jongen wil een mooie film zien.",
    explanation: "After modal verbs like 'wil', use infinitive: zien"
  },
  {
    sentence: "Hij kijken naar de sterren.",
    isCorrect: false,
    correction: "Hij kijkt naar de sterren.",
    explanation: "'Hij' needs ik-vorm + t: kijkt"
  }
];

interface TwoVerbQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
}

const twoVerbQuizQuestions: TwoVerbQuizQuestion[] = [
  {
    sentence: "Ik ___ zaterdag ___.",
    options: ["ga, sporten", "gaan, sport", "ga, sport"],
    correct: 0,
    explanation: "Two verbs: first verb conjugated (ga), second verb infinitive (sporten) at the end"
  },
  {
    sentence: "Pieter ___ koffie ___.",
    options: ["wil, drinken", "willen, drink", "wilt, drinkt"],
    correct: 0,
    explanation: "Modal verb 'wil' + infinitive 'drinken' at the end"
  },
  {
    sentence: "De kinderen ___ heel goed ___.",
    options: ["kunnen, voetballen", "kan, voetbal", "kunnen, voetbal"],
    correct: 0,
    explanation: "'De kinderen' (zij) + modal verb 'kunnen' + infinitive 'voetballen'"
  }
];

interface PositionVerbQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
}

const positionVerbQuizQuestions: PositionVerbQuizQuestion[] = [
  {
    sentence: "De lamp ___ op de kast.",
    options: ["staat", "ligt", "zit"],
    correct: 0,
    explanation: "Vertical position: lamp stands (staat) on the cabinet"
  },
  {
    sentence: "Het boek ___ op de tafel.",
    options: ["staat", "ligt", "hangt"],
    correct: 1,
    explanation: "Horizontal position: book lies (ligt) on the table"
  },
  {
    sentence: "De sleutels ___ in mijn tas.",
    options: ["staan", "liggen", "zitten"],
    correct: 2,
    explanation: "'Inside' position: keys sit (zitten) in the bag"
  }
];

interface SeparableVerbQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
}

const separableVerbQuizQuestions: SeparableVerbQuizQuestion[] = [
  {
    sentence: "De trein ___ om 10.00 uur ___.",
    options: ["komt, aan", "aankomt", "komt, aankomen"],
    correct: 0,
    explanation: "Separable verb 'aankomen': 'komt' (conjugated) + 'aan' (prefix at end)"
  },
  {
    sentence: "Peter ___ straks ___.",
    options: ["wil, weggaan", "gaat, weg", "wil, weg gaan"],
    correct: 0,
    explanation: "Two verbs with separable: modal 'wil' + infinitive 'weggaan' (not separated)"
  },
  {
    sentence: "___ je de deur ___?",
    options: ["Doe, dicht", "Dichtdoe, je", "Doet, dicht"],
    correct: 0,
    explanation: "Question with separable verb: 'Doe' (conjugated) + 'dicht' (prefix at end)"
  }
];

interface NegationQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  type: 'niet' | 'geen';
}

interface SentenceStructureQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  parts: {
    subject: string;
    verb: string;
    time?: string;
    object?: string;
    place?: string;
  };
}

interface SentenceOrderQuizQuestion {
  scrambled: string[];
  correct: string;
  explanation: string;
}

interface ConjunctionQuizQuestion {
  sentence1: string;
  sentence2: string;
  options: string[];
  correct: number;
  explanation: string;
  conjunctionType: 'en' | 'maar' | 'want' | 'dus' | 'of';
}

interface InversieQuizQuestion {
  normalSentence: string;
  options: string[];
  correct: number;
  explanation: string;
  inversionType: 'time' | 'place' | 'object';
}

interface AdjectiveQuizQuestion {
  sentence: string;
  adjective: string;
  options: string[];
  correct: number;
  explanation: string;
  type: 'comparative' | 'superlative' | 'irregular';
}

interface AdjectiveInflectionQuizQuestion {
  phrase: string;
  options: string[];
  correct: number;
  explanation: string;
  wordType: 'de-word' | 'het-word';
  articleType: 'definite' | 'indefinite' | 'demonstrative';
}

interface ReferenceWordQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  type: 'subject' | 'object';
  wordType: 'de-word' | 'het-word' | 'plural';
}

interface SubordinateClauseQuizQuestion {
  mainClause: string;
  subordinateClause: string;
  options: string[];
  correct: number;
  explanation: string;
  type: 'omdat' | 'als' | 'dat';
}

interface ImperfectumQuizQuestion {
  infinitive: string;
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  type: 'regular';
}

interface PerfectumQuizQuestion {
  infinitive: string;
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  type: 'regular' | 'irregular' | 'auxiliary';
}

interface NounQuizQuestion {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  type: 'de-het' | 'plural' | 'diminutive';
}

const negationQuizQuestions: NegationQuizQuestion[] = [
  {
    sentence: "Peter is groot. → Peter ___ groot.",
    options: ["is niet", "is geen", "niet is"],
    correct: 0,
    explanation: "'Niet' comes before adjectives: Peter is niet groot",
    type: 'niet'
  },
  {
    sentence: "Johan kan sporten. → Johan ___ sporten.",
    options: ["kan niet", "niet kan", "kan geen"],
    correct: 0,
    explanation: "'Niet' comes before the second verb (infinitive): Johan kan niet sporten",
    type: 'niet'
  },
  {
    sentence: "Julia koopt een fiets. → Julia koopt ___ fiets.",
    options: ["niet een", "geen", "niet"],
    correct: 1,
    explanation: "'Geen' replaces 'een' (indefinite article): Julia koopt geen fiets",
    type: 'geen'
  },
  {
    sentence: "Ik hou van pasta. → Ik hou ___ van pasta.",
    options: ["niet", "geen", "niet een"],
    correct: 0,
    explanation: "'Niet' comes before prepositions: Ik hou niet van pasta",
    type: 'niet'
  },
  {
    sentence: "Wij hebben katten. → Wij hebben ___ katten.",
    options: ["niet", "geen", "niet een"],
    correct: 1,
    explanation: "'Geen' is used with indefinite nouns (plural): Wij hebben geen katten",
    type: 'geen'
  }
];

const sentenceStructureQuizQuestions: SentenceStructureQuizQuestion[] = [
  {
    sentence: "Mark fietst naar zijn werk",
    options: ["Subject: Mark, Verb: fietst, Place: naar zijn werk", "Subject: fietst, Verb: Mark, Place: werk", "Subject: Mark, Verb: naar, Place: fietst"],
    correct: 0,
    explanation: "Mark (who) fietst (verb) naar zijn werk (where)",
    parts: { subject: "Mark", verb: "fietst", place: "naar zijn werk" }
  }
];

const sentenceOrderQuizQuestions: SentenceOrderQuizQuestion[] = [
  {
    scrambled: ["naar", "Ik", "ga", "school"],
    correct: "Ik ga naar school",
    explanation: "Subject (Ik) + Verb (ga) + Rest (naar school)"
  }
];

const conjunctionQuizQuestions: ConjunctionQuizQuestion[] = [
  {
    sentence1: "De docent drinkt koffie",
    sentence2: "de cursisten drinken thee",
    options: ["en", "maar", "want"],
    correct: 0,
    explanation: "'En' connects two similar actions - both drinking something",
    conjunctionType: 'en'
  },
  {
    sentence1: "Ik wil graag tv kijken",
    sentence2: "de tv is kapot",
    options: ["en", "maar", "dus"],
    correct: 1,
    explanation: "'Maar' shows contrast - wanting to watch TV but it's broken",
    conjunctionType: 'maar'
  },
  {
    sentence1: "Ik ga naar de dokter",
    sentence2: "ik heb pijn",
    options: ["maar", "want", "dus"],
    correct: 1,
    explanation: "'Want' gives a reason - going to doctor because of pain",
    conjunctionType: 'want'
  },
  {
    sentence1: "Het is mooi weer",
    sentence2: "we kunnen een wandeling maken",
    options: ["want", "dus", "maar"],
    correct: 1,
    explanation: "'Dus' shows result - nice weather so we can walk",
    conjunctionType: 'dus'
  },
  {
    sentence1: "Je kunt naar buiten gaan",
    sentence2: "je kunt binnen blijven",
    options: ["en", "of", "want"],
    correct: 1,
    explanation: "'Of' shows choice - either go outside or stay inside",
    conjunctionType: 'of'
  }
];

const inversieQuizQuestions: InversieQuizQuestion[] = [
  {
    normalSentence: "Ik eet straks een boterham met kaas",
    options: ["Straks eet ik een boterham met kaas", "Straks ik eet een boterham met kaas", "Eet straks ik een boterham met kaas"],
    correct: 0,
    explanation: "Time first: Straks + verb + subject + rest",
    inversionType: 'time'
  },
  {
    normalSentence: "Sandra gaat zaterdag sporten",
    options: ["Zaterdag Sandra gaat sporten", "Zaterdag gaat Sandra sporten", "Gaat zaterdag Sandra sporten"],
    correct: 1,
    explanation: "Time first: Zaterdag + verb + subject + rest",
    inversionType: 'time'
  },
  {
    normalSentence: "Veel mensen wonen in India",
    options: ["In India veel mensen wonen", "In India wonen veel mensen", "Wonen in India veel mensen"],
    correct: 1,
    explanation: "Place first: In India + verb + subject",
    inversionType: 'place'
  },
  {
    normalSentence: "Hij eet die hamburger in 1 minuut op",
    options: ["Die hamburger hij eet in 1 minuut op", "Die hamburger eet hij in 1 minuut op", "Eet die hamburger hij in 1 minuut op"],
    correct: 1,
    explanation: "Object first: Die hamburger + verb + subject + rest",
    inversionType: 'object'
  },
  {
    normalSentence: "Ik ga morgen met mijn moeder naar het park",
    options: ["Morgen ik ga met mijn moeder naar het park", "Morgen ga ik met mijn moeder naar het park", "Ga morgen ik met mijn moeder naar het park"],
    correct: 1,
    explanation: "Time first: Morgen + verb + subject + rest",
    inversionType: 'time'
  }
];

const adjectiveQuizQuestions: AdjectiveQuizQuestion[] = [
  {
    sentence: "Paul is oud. Yusuf is ___ dan Paul.",
    adjective: "oud",
    options: ["ouder", "oudst", "het oudst"],
    correct: 0,
    explanation: "Comparative: oud + -er = ouder (than)",
    type: 'comparative'
  },
  {
    sentence: "Yassin is klein. Sanne is kleiner dan Yassin. Johan is ___.",
    adjective: "klein",
    options: ["kleiner", "het kleinst", "kleinst"],
    correct: 1,
    explanation: "Superlative: het + klein + -st = het kleinst",
    type: 'superlative'
  },
  {
    sentence: "Dit eten is lekker. Dat eten is ___ dan dit eten.",
    adjective: "lekker",
    options: ["lekkerder", "lekker", "het lekkerst"],
    correct: 0,
    explanation: "Comparative with 'r' ending: lekker + -der = lekkerder",
    type: 'comparative'
  },
  {
    sentence: "Hij speelt goed voetbal. Zij speelt ___ dan hij.",
    adjective: "goed",
    options: ["goeder", "beter", "het best"],
    correct: 1,
    explanation: "Irregular: goed → beter (comparative)",
    type: 'irregular'
  },
  {
    sentence: "Ik heb veel geld. Jij hebt ___ geld dan ik.",
    adjective: "veel",
    options: ["veeler", "meer", "het meest"],
    correct: 1,
    explanation: "Irregular: veel → meer (comparative)",
    type: 'irregular'
  },
  {
    sentence: "Van alle studenten werkt Anna ___.",
    adjective: "goed",
    options: ["beter", "het best", "goedst"],
    correct: 1,
    explanation: "Irregular superlative: goed → het best",
    type: 'irregular'
  }
];

const adjectiveInflectionQuizQuestions: AdjectiveInflectionQuizQuestion[] = [
  {
    phrase: "___ aardige man (de man)",
    options: ["De aardige", "De aardig", "Een aardige"],
    correct: 0,
    explanation: "De-word + definite article: always add -e",
    wordType: 'de-word',
    articleType: 'definite'
  },
  {
    phrase: "___ aardig man (de man)",
    options: ["Een aardige", "Een aardig", "De aardige"],
    correct: 0,
    explanation: "De-word + indefinite article: always add -e",
    wordType: 'de-word',
    articleType: 'indefinite'
  },
  {
    phrase: "___ mooi huis (het huis)",
    options: ["Het mooie", "Het mooi", "Een mooie"],
    correct: 0,
    explanation: "Het-word + definite article: always add -e",
    wordType: 'het-word',
    articleType: 'definite'
  },
  {
    phrase: "___ mooi huis (het huis)",
    options: ["Een mooi", "Een mooie", "Het mooi"],
    correct: 0,
    explanation: "Het-word + 'een': NO -e (only exception!)",
    wordType: 'het-word',
    articleType: 'indefinite'
  },
  {
    phrase: "___ kleine baby (deze/die)",
    options: ["Deze kleine", "Deze klein", "Dit kleine"],
    correct: 0,
    explanation: "After deze/die/dit/dat: always add -e",
    wordType: 'de-word',
    articleType: 'demonstrative'
  },
  {
    phrase: "___ kleine kindje (dit/dat)",
    options: ["Dit kleine", "Dit klein", "Deze kleine"],
    correct: 0,
    explanation: "After deze/die/dit/dat: always add -e",
    wordType: 'het-word',
    articleType: 'demonstrative'
  }
];

const referenceWordQuizQuestions: ReferenceWordQuizQuestion[] = [
  {
    sentence: "De borden zijn schoon. ___ staan in de kast.",
    options: ["Hij", "Ze", "Het"],
    correct: 1,
    explanation: "'De borden' is plural, so we use 'ze'",
    type: 'subject',
    wordType: 'plural'
  },
  {
    sentence: "Ik ga een broek kopen, maar ___ moet niet te lang zijn.",
    options: ["hij", "ze", "het"],
    correct: 0,
    explanation: "'De broek' is a de-word singular, so we use 'hij'",
    type: 'subject',
    wordType: 'de-word'
  },
  {
    sentence: "Mijn ouders wonen in een appartement. ___ is groot, maar lelijk.",
    options: ["Hij", "Het", "Ze"],
    correct: 1,
    explanation: "'Het appartement' is a het-word, so we use 'het'",
    type: 'subject',
    wordType: 'het-word'
  },
  {
    sentence: "Ik zoek mijn laptop. Ik kan ___ niet vinden.",
    options: ["hem", "het", "ze"],
    correct: 0,
    explanation: "'De laptop' is a de-word, so object form is 'hem'",
    type: 'object',
    wordType: 'de-word'
  },
  {
    sentence: "Het spel ligt in de kast. Heb jij ___ al eens gespeeld?",
    options: ["hem", "het", "ze"],
    correct: 1,
    explanation: "'Het spel' is a het-word, so object form is 'het'",
    type: 'object',
    wordType: 'het-word'
  },
  {
    sentence: "Ik zoek mijn spullen. Heb je ___ weggegooid?",
    options: ["hem", "het", "ze"],
    correct: 2,
    explanation: "'De spullen' is plural, so object form is 'ze'",
    type: 'object',
    wordType: 'plural'
  }
];

const perfectumQuizQuestions: PerfectumQuizQuestion[] = [
  {
    infinitive: "werken",
    sentence: "Ik ___ vandaag hard ___.",
    options: ["heb gewerkt", "ben gewerkt", "heb werken"],
    correct: 0,
    explanation: "'Werken' → stem 'werk' → ik-vorm 'werk' → last letter 'k' is in 'sexy softketchup' → ge + werk + t = gewerkt. Use 'hebben' as auxiliary.",
    type: 'regular'
  },
  {
    infinitive: "reizen",
    sentence: "Wij ___ naar Amsterdam ___.",
    options: ["hebben gereisd", "zijn gereisd", "hebben reizen"],
    correct: 1,
    explanation: "'Reizen' → ik-vorm 'reis' → last letter 's' not in 'sexy softketchup' → ge + reis + d = gereisd. Use 'zijn' because of movement to a place (naar Amsterdam).",
    type: 'regular'
  },
  {
    infinitive: "vertellen",
    sentence: "Hij ___ het verhaal ___.",
    options: ["heeft geverteld", "heeft verteld", "is verteld"],
    correct: 1,
    explanation: "'Vertellen' starts with 'ver-' so no 'ge-' prefix → ik-vorm 'vertel' → last letter 'l' not in 'sexy softketchup' → vertel + d = verteld.",
    type: 'regular'
  },
  {
    infinitive: "zetten",
    sentence: "Zij ___ de tafel ___.",
    options: ["heeft gezett", "heeft gezet", "is gezet"],
    correct: 1,
    explanation: "'Zetten' → ik-vorm 'zet' (already ends in 't') → no extra 't' added → ge + zet = gezet.",
    type: 'regular'
  },
  {
    infinitive: "eten",
    sentence: "Wij ___ pizza ___.",
    options: ["hebben geëten", "hebben gegeten", "zijn gegeten"],
    correct: 1,
    explanation: "'Eten' is irregular → voltooid deelwoord is 'gegeten' (must be memorized). Use 'hebben' as auxiliary.",
    type: 'irregular'
  },
  {
    infinitive: "komen",
    sentence: "Jullie ___ te laat ___.",
    options: ["hebben gekomen", "zijn gekomen", "hebben komen"],
    correct: 1,
    explanation: "'Komen' is irregular → voltooid deelwoord is 'gekomen'. Always use 'zijn' with 'komen' (movement verb).",
    type: 'irregular'
  }
];

const imperfectumQuizQuestions: ImperfectumQuizQuestion[] = [
  {
    infinitive: "werken",
    sentence: "Ik ___ gisteren in de tuin.",
    options: ["werkte", "werkde", "werken"],
    correct: 0,
    explanation: "'Werken' → stem 'werk' → ik-vorm 'werk' → last letter 'k' is in 'sexy softketchup' → add 'te' → werkte",
    type: 'regular'
  },
  {
    infinitive: "fietsen",
    sentence: "Hij ___ naar Utrecht.",
    options: ["fietste", "fietse", "fietsde"],
    correct: 0,
    explanation: "'Fietsen' → stem 'fiets' → ik-vorm 'fiets' → last letter 's' is in 'sexy softketchup' → add 'te' → fietste",
    type: 'regular'
  },
  {
    infinitive: "reizen",
    sentence: "Wij ___ vorig jaar naar Spanje.",
    options: ["reisden", "reizten", "reisde"],
    correct: 0,
    explanation: "'Reizen' → stem 'reiz' → ik-vorm 'reis' (z→s) → last letter 's' not in 'sexy softketchup' → add 'de' → reisde → plural 'den' → reisden",
    type: 'regular'
  },
  {
    infinitive: "verven",
    sentence: "Zij ___ de muur wit.",
    options: ["verfde", "vervde", "verfte"],
    correct: 0,
    explanation: "'Verven' → stem 'verv' → ik-vorm 'verf' (v→f) → last letter 'f' is in 'sexy softketchup' but ik-vorm ends in 'f' not stem → add 'de' → verfde",
    type: 'regular'
  },
  {
    infinitive: "maken",
    sentence: "Ik ___ mijn huiswerk.",
    options: ["maakte", "makete", "maakde"],
    correct: 0,
    explanation: "'Maken' → stem 'mak' → ik-vorm 'maak' (long vowel) → last letter 'k' is in 'sexy softketchup' → add 'te' → maakte",
    type: 'regular'
  },
  {
    infinitive: "leren",
    sentence: "Wij ___ Nederlands.",
    options: ["leerden", "lerten", "leerde"],
    correct: 0,
    explanation: "'Leren' → stem 'ler' → ik-vorm 'leer' (long vowel) → last letter 'r' not in 'sexy softketchup' → add 'de' → leerde → plural 'den' → leerden",
    type: 'regular'
  }
];

const subordinateClauseQuizQuestions: SubordinateClauseQuizQuestion[] = [
  {
    mainClause: "Ik ben moe, omdat",
    subordinateClause: "(ik ben laat naar bed gegaan)",
    options: ["ik laat naar bed gegaan ben", "ik ben laat naar bed gegaan", "ik laat naar bed ben gegaan"],
    correct: 0,
    explanation: "In subordinate clauses, all verbs go to the end: 'gegaan ben'",
    type: 'omdat'
  },
  {
    mainClause: "Ik drink een glas water als",
    subordinateClause: "(ik heb dorst)",
    options: ["ik dorst heb", "ik heb dorst", "dorst ik heb"],
    correct: 0,
    explanation: "In subordinate clauses with 'als', the verb goes to the end: 'dorst heb'",
    type: 'als'
  },
  {
    mainClause: "Petra zegt dat",
    subordinateClause: "(Mark is ziek)",
    options: ["Mark ziek is", "Mark is ziek", "ziek Mark is"],
    correct: 0,
    explanation: "In subordinate clauses with 'dat', the verb goes to the end: 'ziek is'",
    type: 'dat'
  },
  {
    mainClause: "Ik ga naar de garage als",
    subordinateClause: "(mijn auto is kapot)",
    options: ["mijn auto kapot is", "mijn auto is kapot", "kapot mijn auto is"],
    correct: 0,
    explanation: "In subordinate clauses, the verb goes to the end: 'kapot is'",
    type: 'als'
  },
  {
    mainClause: "Ik denk dat",
    subordinateClause: "(het morgen gaat regenen)",
    options: ["het morgen gaat regenen", "het morgen regenen gaat", "het gaat morgen regenen"],
    correct: 1,
    explanation: "With two verbs in subordinate clauses, both go to the end: 'regenen gaat'",
    type: 'dat'
  },
  {
    mainClause: "Het is hier koud, omdat",
    subordinateClause: "(het raam staat open)",
    options: ["het raam open staat", "het raam staat open", "open het raam staat"],
    correct: 0,
    explanation: "In subordinate clauses, the verb goes to the end: 'open staat'",
    type: 'omdat'
  }
];

const nounQuizQuestions: NounQuizQuestion[] = [
  {
    sentence: "___ huis is groot.",
    options: ["De", "Het", "Een"],
    correct: 1,
    explanation: "'Huis' is a het-word, so we use 'het huis'",
    type: 'de-het'
  },
  {
    sentence: "___ auto staat buiten.",
    options: ["De", "Het", "Een"],
    correct: 0,
    explanation: "'Auto' is a de-word, so we use 'de auto'",
    type: 'de-het'
  },
  {
    sentence: "Ik heb twee ___.",
    options: ["kind", "kinderen", "kinds"],
    correct: 1,
    explanation: "The plural of 'kind' is 'kinderen' (irregular plural)",
    type: 'plural'
  },
  {
    sentence: "De ___ zijn mooi.",
    options: ["bloem", "bloemen", "bloems"],
    correct: 1,
    explanation: "The plural of 'bloem' is 'bloemen' (add -en)",
    type: 'plural'
  },
  {
    sentence: "Het ___ is schattig.",
    options: ["hond", "hondje", "honds"],
    correct: 1,
    explanation: "'Hondje' is the diminutive form of 'hond' (add -je)",
    type: 'diminutive'
  },
  {
    sentence: "___ water is koud.",
    options: ["De", "Het", "Een"],
    correct: 1,
    explanation: "'Water' is a het-word, so we use 'het water'",
    type: 'de-het'
  },
  {
    sentence: "Ik zie veel ___.",
    options: ["kat", "katten", "kats"],
    correct: 1,
    explanation: "The plural of 'kat' is 'katten' (double consonant + -en)",
    type: 'plural'
  },
  {
    sentence: "Het kleine ___ speelt.",
    options: ["meisje", "meisjes", "meisjen"],
    correct: 0,
    explanation: "'Meisje' is already a diminutive form (ends in -je)",
    type: 'diminutive'
  }
];

export default function Grammar() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizType, setQuizType] = useState<'basic' | 'stem' | 'sentence' | 'twoverb' | 'position' | 'separable' | 'negation' | 'structure' | 'order' | 'conjunction' | 'inversie' | 'adjective' | 'inflection' | 'referencewords' | 'subordinateclauses' | 'imperfectum' | 'perfectum' | 'nouns'>('basic');
  const [showDutchText, setShowDutchText] = useState<{[key: string]: boolean}>({});

  const toggleDutchText = (key: string) => {
    setShowDutchText(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getCurrentQuestions = () => {
    if (selectedTopic === 'klinkers') return klinkerQuizQuestions;
    if (selectedTopic === 'werkwoorden') {
      if (quizType === 'stem') return stemQuizQuestions;
      if (quizType === 'sentence') return sentenceQuizQuestions;
      if (quizType === 'twoverb') return twoVerbQuizQuestions;
      if (quizType === 'position') return positionVerbQuizQuestions;
      if (quizType === 'separable') return separableVerbQuizQuestions;
      return verbQuizQuestions;
    }
    if (selectedTopic === 'negation') {
      return negationQuizQuestions;
    }
    if (selectedTopic === 'hoofdzinnen') {
      if (quizType === 'structure') return sentenceStructureQuizQuestions;
      if (quizType === 'order') return sentenceOrderQuizQuestions;
      if (quizType === 'conjunction') return conjunctionQuizQuestions;
      return sentenceStructureQuizQuestions;
    }
    if (selectedTopic === 'inversie') {
      return inversieQuizQuestions;
    }
    if (selectedTopic === 'adjectives') {
      if (quizType === 'inflection') return adjectiveInflectionQuizQuestions;
      return adjectiveQuizQuestions;
    }
    if (selectedTopic === 'referencewords') {
      return referenceWordQuizQuestions;
    }
    if (selectedTopic === 'subordinateclauses') {
      return subordinateClauseQuizQuestions;
    }
    if (selectedTopic === 'imperfectum') {
      return imperfectumQuizQuestions;
    }
    if (selectedTopic === 'perfectum') {
      return perfectumQuizQuestions;
    }
    if (selectedTopic === 'nouns') {
      return nounQuizQuestions;
    }
    return verbQuizQuestions;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const currentQuestions = getCurrentQuestions();
    if (answerIndex === currentQuestions[currentQuiz].correct) {
      setScore(score + 1);
      toast.success("Correct!");
    } else {
      toast.error("Try again!");
    }
  };

  const handleNextQuestion = () => {
    const currentQuestions = getCurrentQuestions();
    if (currentQuiz < currentQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      toast.success(`Quiz completed! Score: ${score + (selectedAnswer === currentQuestions[currentQuiz].correct ? 1 : 0)}/${currentQuestions.length}`);
    }
  };

  const resetQuizWithType = (type: 'basic' | 'stem' | 'sentence' | 'twoverb' | 'position' | 'separable' | 'structure' | 'order' | 'conjunction' | 'inversie' | 'adjective' | 'inflection' | 'referencewords' | 'subordinateclauses' | 'imperfectum' | 'perfectum' | 'nouns') => {
    setQuizType(type);
    resetQuiz();
  };

  const handleSubtopicSelect = (subtopic: string) => {
    setSelectedSubtopic(subtopic);
  };

  const handleBackToSubtopics = () => {
    setSelectedSubtopic(null);
    resetQuiz();
  };

  if (selectedTopic === 'werkwoorden') {
    if (!selectedSubtopic) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Topics
                </Button>
                <h1 className="text-2xl font-bold">Werkwoorden (Verbs)</h1>
                <div className="w-32" />
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose a Verb Topic
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn Dutch verbs step by step, from basic conjugation to advanced structures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('basic')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    1. Basic Conjugation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn verb forms, stem formation, and basic conjugation rules.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('twoverbs')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    2. Two Verb Sentences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn to make sentences with modal verbs and infinitives.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('position')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    3. Position Verbs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn staan, liggen, zitten, hangen instead of 'zijn'.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('separable')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    4. Separable Verbs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn verbs that split: aankomen, meebrengen, dichtdoen.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToSubtopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Verb Topics
              </Button>
              <h1 className="text-2xl font-bold">
                {selectedSubtopic === 'basic' && 'Basic Conjugation'}
                {selectedSubtopic === 'twoverbs' && 'Two Verb Sentences'}
                {selectedSubtopic === 'position' && 'Position Verbs'}
                {selectedSubtopic === 'separable' && 'Separable Verbs'}
              </h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          {selectedSubtopic === 'basic' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    What is a Verb?
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('verb-intro')}
                      className="ml-auto"
                    >
                      {showDutchText['verb-intro'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['verb-intro'] && (
                    <p className="text-sm text-muted-foreground">Wat is een werkwoord?</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Verbs are the backbone of Dutch sentences. They express actions, states, or occurrences and must agree with their subject in number and person. Understanding verb conjugation is essential because Dutch verbs change their form depending on who is performing the action and when it happens.
                  </p>
                  {showDutchText['verb-intro'] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Werkwoorden zijn de ruggengraat van Nederlandse zinnen. Ze drukken acties, toestanden of gebeurtenissen uit en moeten overeenkomen met hun onderwerp in getal en persoon.
                    </p>
                  )}
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Characteristics of Verbs:</h3>
                    {showDutchText['verb-intro'] && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Belangrijke kenmerken van werkwoorden:</p>
                    )}
                    <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Express actions (cycling, working, walking)</li>
                      <li>• Change form based on subject (I work vs. he works)</li>
                      <li>• Indicate time (present, past, future)</li>
                      <li>• Can be regular or irregular in conjugation</li>
                      <li>• Form the core of sentence structure</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Verb Forms and Stem
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('verb-forms')}
                      className="ml-auto"
                    >
                      {showDutchText['verb-forms'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['verb-forms'] && (
                    <p className="text-sm text-muted-foreground">Werkwoordvormen en Stam</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Finding the Stem:</h3>
                    {showDutchText['verb-forms'] && (
                      <p className="text-xs text-green-600 dark:text-green-400 mb-2">De stam vinden:</p>
                    )}
                    <p className="text-sm mb-2">Remove '-en' from the infinitive to get the stem:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold mb-1">Examples:</p>
                        <ul className="text-sm space-y-1">
                          <li>• werk<strong>en</strong> → werk</li>
                          <li>• fietsen → fiets</li>
                          <li>• lopen → lop</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Special cases:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Double consonant → single</li>
                          <li>• V/Z rule applies</li>
                          <li>• Long vowel rules</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Conjugation Pattern:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Subject</th>
                            <th className="text-left p-2">Verb Form</th>
                            <th className="text-left p-2">Example (werken)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">ik</td>
                            <td className="p-2">stem</td>
                            <td className="p-2 text-primary font-bold">ik werk</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">jij/je</td>
                            <td className="p-2">stem + t</td>
                            <td className="p-2 text-primary font-bold">jij werkt</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">hij/zij/het</td>
                            <td className="p-2">stem + t</td>
                            <td className="p-2 text-primary font-bold">hij werkt</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">wij/jullie/zij</td>
                            <td className="p-2">infinitive</td>
                            <td className="p-2 text-primary font-bold">wij werken</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Basic Conjugation Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {verbQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{verbQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Complete the sentence:</p>
                        <p className="text-2xl font-bold text-primary">{verbQuizQuestions[currentQuiz].sentence}</p>
                        <p className="text-sm text-muted-foreground">Verb: {verbQuizQuestions[currentQuiz].verb}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {verbQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === verbQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === verbQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === verbQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== verbQuizQuestions[currentQuiz].correct && (
                              <XCircle className="w-5 h-5 mr-2" />
                            )}
                            {option}
                          </Button>
                        ))}
                      </div>

                      {showResult && (
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="font-semibold mb-2">Explanation:</p>
                            <p>{verbQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < verbQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{verbQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('basic')} className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {selectedSubtopic === 'twoverbs' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Making Sentences with Two Verbs
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('two-verbs')}
                      className="ml-auto"
                    >
                      {showDutchText['two-verbs'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['two-verbs'] && (
                    <p className="text-sm text-muted-foreground">Hoofdzinnen maken met twee werkwoorden</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Dutch sentence structure becomes more complex when using two verbs together. This construction is very common and essential for expressing intentions, abilities, and obligations. The key rule is that only the first verb is conjugated, while the second verb remains in its infinitive form and moves to the end of the sentence.
                  </p>
                  {showDutchText['two-verbs'] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Nederlandse zinsstructuur wordt complexer bij het gebruik van twee werkwoorden samen. Deze constructie is zeer gebruikelijk en essentieel voor het uitdrukken van intenties, vaardigheden en verplichtingen.
                    </p>
                  )}
                  
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Sentence Structure:</h3>
                    {showDutchText['two-verbs'] && (
                      <p className="text-xs text-green-600 dark:text-green-400 mb-2">Zinsstructuur:</p>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">1. Subject</th>
                            <th className="text-left p-2">2. 1e werkwoord</th>
                            <th className="text-left p-2">3A. Tijd</th>
                            <th className="text-left p-2">3B. Object/Manier</th>
                            <th className="text-left p-2">3C. Plaats</th>
                            <th className="text-left p-2">4. 2e werkwoord</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">Ik</td>
                            <td className="p-2 text-primary font-bold">ga</td>
                            <td className="p-2">zaterdag</td>
                            <td className="p-2"></td>
                            <td className="p-2"></td>
                            <td className="p-2 text-red-600 font-bold">sporten</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">Pieter</td>
                            <td className="p-2 text-primary font-bold">wil</td>
                            <td className="p-2"></td>
                            <td className="p-2">koffie</td>
                            <td className="p-2"></td>
                            <td className="p-2 text-red-600 font-bold">drinken</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">De kinderen</td>
                            <td className="p-2 text-primary font-bold">kunnen</td>
                            <td className="p-2"></td>
                            <td className="p-2">heel goed</td>
                            <td className="p-2"></td>
                            <td className="p-2 text-red-600 font-bold">voetballen</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Modal Verbs (no 'te' needed):</h3>
                    {showDutchText['two-verbs'] && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Modale werkwoorden (geen 'te'):</p>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold mb-1">Modal verbs:</p>
                        <ul className="text-sm space-y-1">
                          <li>• want (willen), will (zullen), may (mogen)</li>
                          <li>• can (kunnen), must (moeten)</li>
                        </ul>
                        {showDutchText['two-verbs'] && (
                          <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                            <li>• willen, zullen, mogen</li>
                            <li>• kunnen, moeten</li>
                          </ul>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Other verbs:</p>
                        <ul className="text-sm space-y-1">
                          <li>• stay (blijven), go (gaan), see (zien)</li>
                          <li>• hear (horen), feel (voelen), find (vinden)</li>
                        </ul>
                        {showDutchText['two-verbs'] && (
                          <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                            <li>• blijven, gaan, zien</li>
                            <li>• horen, voelen, vinden</li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Two Verb Practice Quiz
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('quiz-two-verbs')}
                      className="ml-auto"
                    >
                      {showDutchText['quiz-two-verbs'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['quiz-two-verbs'] && (
                    <p className="text-sm text-muted-foreground">Oefenquiz Twee Werkwoorden</p>
                  )}
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {twoVerbQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{twoVerbQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Complete the sentence:</p>
                        <p className="text-3xl font-bold text-primary">{twoVerbQuizQuestions[currentQuiz].sentence}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {twoVerbQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === twoVerbQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === twoVerbQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === twoVerbQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== twoVerbQuizQuestions[currentQuiz].correct && (
                              <XCircle className="w-5 h-5 mr-2" />
                            )}
                            {option}
                          </Button>
                        ))}
                      </div>

                      {showResult && (
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="font-semibold mb-2">Explanation:</p>
                            <p>{twoVerbQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < twoVerbQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{twoVerbQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('twoverb')} className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {selectedSubtopic === 'position' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Position Verbs
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('position-verbs')}
                      className="ml-auto"
                    >
                      {showDutchText['position-verbs'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['position-verbs'] && (
                    <p className="text-sm text-muted-foreground">Positiewerkwoorden</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Position verbs are a unique feature of Dutch that often confuses English speakers. Instead of simply saying something 'is' somewhere, Dutch requires you to specify HOW the object is positioned in that location. This creates more precise and vivid descriptions of spatial relationships and is essential for natural-sounding Dutch.
                  </p>
                  {showDutchText['position-verbs'] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Positiewerkwoorden zijn een uniek kenmerk van het Nederlands dat Engelstaligen vaak verwarrt. In plaats van simpelweg te zeggen dat iets ergens 'is', vereist het Nederlands dat je specificeert HOE het object op die locatie gepositioneerd is.
                    </p>
                  )}
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-blue-50 dark:bg-blue-950">
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-800 dark:text-blue-200">STAAN (to stand)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">Vertical position:</p>
                        <ul className="text-sm space-y-1">
                          <li>• De lamp staat op de kast</li>
                          <li>• Het glas staat op tafel</li>
                          <li>• De boom staat in de tuin</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-green-50 dark:bg-green-950">
                      <CardHeader>
                        <CardTitle className="text-lg text-green-800 dark:text-green-200">LIGGEN (to lie)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">Horizontal position:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Het boek ligt op de tafel</li>
                          <li>• De krant ligt op de bank</li>
                          <li>• De sleutels liggen hier</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-red-50 dark:bg-red-950">
                      <CardHeader>
                        <CardTitle className="text-lg text-red-800 dark:text-red-200">ZITTEN (to sit)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">Inside/attached:</p>
                        <ul className="text-sm space-y-1">
                          <li>• De sleutels zitten in mijn tas</li>
                          <li>• Het geld zit in mijn portemonnee</li>
                          <li>• De knoop zit aan mijn jas</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-yellow-50 dark:bg-yellow-950">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-800 dark:text-yellow-200">HANGEN (to hang)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">Hanging position:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Het schilderij hangt aan de muur</li>
                        <li>• Mijn jas hangt in de kast</li>
                        <li>• De lamp hangt boven de tafel</li>
                      </ul>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Position Verbs Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {positionVerbQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{positionVerbQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Choose the correct position verb:</p>
                        <p className="text-2xl font-bold text-primary">{positionVerbQuizQuestions[currentQuiz].sentence}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {positionVerbQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === positionVerbQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === positionVerbQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === positionVerbQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== positionVerbQuizQuestions[currentQuiz].correct && (
                              <XCircle className="w-5 h-5 mr-2" />
                            )}
                            {option}
                          </Button>
                        ))}
                      </div>

                      {showResult && (
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="font-semibold mb-2">Explanation:</p>
                            <p>{positionVerbQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < positionVerbQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{positionVerbQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('position')} className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}

          {selectedSubtopic === 'separable' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Volume2 className="w-6 h-6" />
                    Separable Verbs
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleDutchText('separable-verbs')}
                      className="ml-auto"
                    >
                      {showDutchText['separable-verbs'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      Dutch
                    </Button>
                  </CardTitle>
                  {showDutchText['separable-verbs'] && (
                    <p className="text-sm text-muted-foreground">Scheidbare werkwoorden</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Separable verbs are compound verbs that literally 'separate' in certain sentence constructions. They consist of a prefix (like 'aan', 'mee', 'op') attached to a base verb. In main clauses, these verbs split apart: the main verb is conjugated and stays in the second position, while the prefix jumps to the very end of the sentence. This creates a 'verbal bracket' that frames the sentence.
                  </p>
                  {showDutchText['separable-verbs'] && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Scheidbare werkwoorden zijn samengestelde werkwoorden die letterlijk 'scheiden' in bepaalde zinsconstructies. Ze bestaan uit een voorvoegsel dat aan een basiswerkwoord is gehecht.
                    </p>
                  )}
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Common Separable Verbs:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="text-sm space-y-1">
                          <li>• aankomen (to arrive)</li>
                          <li>• meebrengen (to bring along)</li>
                          <li>• dichtdoen (to close)</li>
                          <li>• opbellen (to call)</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="text-sm space-y-1">
                          <li>• weggaan (to go away)</li>
                          <li>• uitnodigen (to invite)</li>
                          <li>• terugkomen (to come back)</li>
                          <li>• voorstellen (to introduce)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-green-800 dark:text-green-200">Examples:</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>aankomen:</strong> De trein komt om 10.00 uur aan.</p>
                      <p className="text-sm"><strong>meebrengen:</strong> Ik breng mijn vriend mee.</p>
                      <p className="text-sm"><strong>dichtdoen:</strong> Doe je de deur dicht?</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">With Two Verbs:</h3>
                    <p className="text-sm mb-2">When using modal verbs, the separable verb stays together:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Peter wil straks weggaan. (not: Peter wil straks weg gaan)</li>
                      <li>• Ik kan je morgen opbellen. (not: Ik kan je morgen op bellen)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Separable Verbs Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {separableVerbQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{separableVerbQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Complete the sentence:</p>
                        <p className="text-2xl font-bold text-primary">{separableVerbQuizQuestions[currentQuiz].sentence}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {separableVerbQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === separableVerbQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === separableVerbQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === separableVerbQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== separableVerbQuizQuestions[currentQuiz].correct && (
                              <XCircle className="w-5 h-5 mr-2" />
                            )}
                            {option}
                          </Button>
                        ))}
                      </div>

                      {showResult && (
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="font-semibold mb-2">Explanation:</p>
                            <p>{separableVerbQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < separableVerbQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{separableVerbQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('separable')} className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    );
  }

  if (selectedTopic === 'hoofdzinnen') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">HoofdZinnen (Main Clauses)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Basic Structure (1-2-3)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                A hoofdzin (main clause) is a complete sentence that can stand alone. The basic structure follows a simple 1-2-3 pattern that forms the foundation of Dutch sentence construction.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 bg-green-100 dark:bg-green-900">1. Wie of wat</th>
                        <th className="text-left p-2 bg-blue-100 dark:bg-blue-900">2. Werkwoord</th>
                        <th className="text-left p-2 bg-yellow-100 dark:bg-yellow-900">3. Rest</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-green-700">Mark</td>
                        <td className="p-2 font-semibold text-blue-700">fietst</td>
                        <td className="p-2 font-semibold text-yellow-700">naar zijn werk</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-green-700">Ik</td>
                        <td className="p-2 font-semibold text-blue-700">slaap</td>
                        <td className="p-2 font-semibold text-yellow-700">'s nachts</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-green-700">Oma</td>
                        <td className="p-2 font-semibold text-blue-700">loopt</td>
                        <td className="p-2 font-semibold text-yellow-700">in het park</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Detailed Structure (1-2-3A-3B-3C-4)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">1. Subject</th>
                        <th className="text-left p-2">2. 1e werkwoord</th>
                        <th className="text-left p-2">3A. Tijd</th>
                        <th className="text-left p-2">3B. Object/Manier</th>
                        <th className="text-left p-2">3C. Plaats</th>
                        <th className="text-left p-2">4. 2e werkwoord</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">Aleksandra</td>
                        <td className="p-2 text-primary font-bold">wil</td>
                        <td className="p-2">nu</td>
                        <td className="p-2"></td>
                        <td className="p-2">naar bed</td>
                        <td className="p-2 text-red-600 font-bold">gaan</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">Tom</td>
                        <td className="p-2 text-primary font-bold">reist</td>
                        <td className="p-2">elke ochtend</td>
                        <td className="p-2">met de bus</td>
                        <td className="p-2">naar zijn werk</td>
                        <td className="p-2"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                Connecting Main Clauses (EN, MAAR, WANT, DUS, OF)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-blue-800 dark:text-blue-200">EN (and)</h3>
                    <p className="text-sm mb-2 text-blue-600 dark:text-blue-400">Addition</p>
                    <p className="text-xs">De docent drinkt koffie <strong>en</strong> de cursisten drinken thee.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-red-50 dark:bg-red-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-red-800 dark:text-red-200">MAAR (but)</h3>
                    <p className="text-sm mb-2 text-red-600 dark:text-red-400">Contrast</p>
                    <p className="text-xs">Ik wil graag tv kijken, <strong>maar</strong> de tv is kapot.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 dark:bg-green-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-green-800 dark:text-green-200">WANT (because)</h3>
                    <p className="text-sm mb-2 text-green-600 dark:text-green-400">Reason</p>
                    <p className="text-xs">Ik ga naar de dokter, <strong>want</strong> ik heb pijn.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-yellow-50 dark:bg-yellow-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">DUS (so)</h3>
                    <p className="text-sm mb-2 text-yellow-600 dark:text-yellow-400">Result</p>
                    <p className="text-xs">Het is mooi weer, <strong>dus</strong> we kunnen een wandeling maken.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50 dark:bg-purple-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-200">OF (or)</h3>
                    <p className="text-sm mb-2 text-purple-600 dark:text-purple-400">Choice</p>
                    <p className="text-xs">Je kunt naar buiten gaan <strong>of</strong> je kunt binnen blijven.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Conjunction Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {conjunctionQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{conjunctionQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Choose the correct conjunction:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary mb-2">{conjunctionQuizQuestions[currentQuiz].sentence1}</p>
                      <p className="text-lg">___</p>
                      <p className="text-xl font-bold text-primary mt-2">{conjunctionQuizQuestions[currentQuiz].sentence2}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {conjunctionQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === conjunctionQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === conjunctionQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === conjunctionQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== conjunctionQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{conjunctionQuizQuestions[currentQuiz].explanation}</p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < conjunctionQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{conjunctionQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('conjunction')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (selectedTopic === 'inversie') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Inversie (Word Order Inversion)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <RotateCcw className="w-6 h-6" />
                What is Inversie?
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('inversie-intro')}
                  className="ml-auto"
                >
                  {showDutchText['inversie-intro'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['inversie-intro'] && (
                <p className="text-sm text-muted-foreground">Wat is inversie?</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Inversie means you don't always have to start a main clause with the subject! You can begin a sentence with time, place, or even the object. When you do this, the subject moves to right after the first verb, while the rest of the sentence stays the same. This makes Dutch more flexible and natural-sounding.
              </p>
              {showDutchText['inversie-intro'] && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Inversie betekent dat je een hoofdzin niet altijd met het onderwerp hoeft te beginnen! Je kunt een zin beginnen met tijd, plaats, of zelfs het object. Het onderwerp komt dan direct na het eerste werkwoord.
                </p>
              )}
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Normal vs Inversie Structure:</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Normal Order:</p>
                    <div className="bg-white/50 dark:bg-black/20 p-3 rounded">
                      <p className="font-mono">Subject + Verb + Rest</p>
                      <p className="text-sm text-muted-foreground">Ik eet straks een boterham met kaas</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">With Inversie:</p>
                    <div className="bg-white/50 dark:bg-black/20 p-3 rounded">
                      <p className="font-mono">Time/Place/Object + Verb + Subject + Rest</p>
                      <p className="text-sm text-muted-foreground">Straks eet ik een boterham met kaas</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Starting with Time
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('time-inversie')}
                  className="ml-auto"
                >
                  {showDutchText['time-inversie'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['time-inversie'] && (
                <p className="text-sm text-muted-foreground">Beginnen met tijd</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Starting with time expressions is very common in Dutch. It emphasizes when something happens and makes the sentence flow more naturally in conversation.
              </p>
              
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Examples:</h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-1 text-green-700 dark:text-green-300">Normal:</p>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Ik eet straks een boterham met kaas</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-green-700 dark:text-green-300">With Inversie:</p>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded"><strong>Straks</strong> eet ik een boterham met kaas</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Sandra gaat zaterdag sporten</p>
                    </div>
                    <div>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded"><strong>Zaterdag</strong> gaat Sandra sporten</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Ik ga morgen met mijn moeder naar het park</p>
                    </div>
                    <div>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded"><strong>Morgen</strong> ga ik met mijn moeder naar het park</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Starting with Place
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('place-inversie')}
                  className="ml-auto"
                >
                  {showDutchText['place-inversie'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['place-inversie'] && (
                <p className="text-sm text-muted-foreground">Beginnen met plaats</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Starting with place expressions emphasizes location and is often used to contrast different places or to set the scene.
              </p>
              
              <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Examples:</h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-1 text-yellow-700 dark:text-yellow-300">Normal:</p>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Veel mensen wonen in India</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-yellow-700 dark:text-yellow-300">With Inversie:</p>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded"><strong>In India</strong> wonen veel mensen</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Je ziet veel planten in het park</p>
                    </div>
                    <div>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded"><strong>In het park</strong> zie je veel planten</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Starting with Object
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('object-inversie')}
                  className="ml-auto"
                >
                  {showDutchText['object-inversie'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['object-inversie'] && (
                <p className="text-sm text-muted-foreground">Beginnen met object</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Starting with the object is less common but very effective for emphasis. It's often used to express strong feelings or to highlight what you're talking about.
              </p>
              
              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Examples:</h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-1 text-red-700 dark:text-red-300">Normal:</p>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Hij eet die hamburger in 1 minuut op!</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-red-700 dark:text-red-300">With Inversie:</p>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded"><strong>Die hamburger</strong> eet hij in 1 minuut op!</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Ik wil die vervelende vrouw een klap geven</p>
                    </div>
                    <div>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded"><strong>Die vervelende vrouw</strong> wil ik een klap geven</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs mt-3 text-red-700 dark:text-red-300">Note: Object inversie is often used for emphasis or strong emotions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Detailed Structure Schema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">Inversie Structure:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 bg-purple-100 dark:bg-purple-900">Tijd/Plaats/Object</th>
                        <th className="text-left p-2 bg-blue-100 dark:bg-blue-900">1e werkwoord</th>
                        <th className="text-left p-2 bg-green-100 dark:bg-green-900">Subject</th>
                        <th className="text-left p-2 bg-yellow-100 dark:bg-yellow-900">Tijd</th>
                        <th className="text-left p-2 bg-orange-100 dark:bg-orange-900">Object/Manier</th>
                        <th className="text-left p-2 bg-pink-100 dark:bg-pink-900">Plaats</th>
                        <th className="text-left p-2 bg-red-100 dark:bg-red-900">2e werkwoord</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-purple-700">'s Middags</td>
                        <td className="p-2 font-semibold text-blue-700">eet</td>
                        <td className="p-2 font-semibold text-green-700">ik</td>
                        <td className="p-2">om drie uur</td>
                        <td className="p-2">een boterham met kaas</td>
                        <td className="p-2"></td>
                        <td className="p-2"></td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-purple-700">Zaterdag</td>
                        <td className="p-2 font-semibold text-blue-700">gaat</td>
                        <td className="p-2 font-semibold text-green-700">Sandra</td>
                        <td className="p-2"></td>
                        <td className="p-2"></td>
                        <td className="p-2"></td>
                        <td className="p-2 text-red-600 font-bold">sporten</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold text-purple-700">In India</td>
                        <td className="p-2 font-semibold text-blue-700">wonen</td>
                        <td className="p-2 font-semibold text-green-700">veel mensen</td>
                        <td className="p-2"></td>
                        <td className="p-2"></td>
                        <td className="p-2"></td>
                        <td className="p-2"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Inversie Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {inversieQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{inversieQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Transform this sentence using inversie:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary">{inversieQuizQuestions[currentQuiz].normalSentence}</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {inversieQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === inversieQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg text-left justify-start ${
                          showResult && index === inversieQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === inversieQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== inversieQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{inversieQuizQuestions[currentQuiz].explanation}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Type: {inversieQuizQuestions[currentQuiz].inversionType === 'time' ? 'Time inversion' : 
                                inversieQuizQuestions[currentQuiz].inversionType === 'place' ? 'Place inversion' : 'Object inversion'}
                        </p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < inversieQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{inversieQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('inversie')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (selectedTopic === 'adjectives') {
    if (!selectedSubtopic) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Topics
                </Button>
                <h1 className="text-2xl font-bold">Adjectives (Bijvoeglijke Naamwoorden)</h1>
                <div className="w-32" />
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose an Adjective Topic
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn Dutch adjectives step by step, from comparisons to inflection rules.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('comparisons')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    1. Comparisons (Vergelijken)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn comparative and superlative forms: kleiner, het kleinst.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleSubtopicSelect('inflection')}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    2. Inflection (Buigings-e)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn when to add -e to adjectives before nouns: de kleine man, een mooi huis.
                  </p>
                  <Button className="w-full">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToSubtopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Adjective Topics
              </Button>
              <h1 className="text-2xl font-bold">
                {selectedSubtopic === 'comparisons' && 'Comparisons (Vergelijken)'}
                {selectedSubtopic === 'inflection' && 'Inflection (Buigings-e)'}
              </h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          {selectedSubtopic === 'comparisons' && (
            <>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                What are Comparisons?
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('adjective-intro')}
                  className="ml-auto"
                >
                  {showDutchText['adjective-intro'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['adjective-intro'] && (
                <p className="text-sm text-muted-foreground">Wat zijn vergelijkingen?</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                When you want to compare people or things and express differences, Dutch uses specific forms of adjectives. There are two main types: comparative (vergrotende trap) for comparing two things, and superlative (overtreffende trap) for expressing the highest degree among three or more.
              </p>
              {showDutchText['adjective-intro'] && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Als je mensen of dingen wilt vergelijken en je wilt zeggen wat het verschil is, gebruikt het Nederlands specifieke vormen van bijvoeglijke naamwoorden.
                </p>
              )}
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Three Forms of Adjectives:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Basic Form</h4>
                    <p className="text-sm mb-1">Positief</p>
                    <p className="font-mono bg-white/50 dark:bg-black/20 p-2 rounded">klein</p>
                    <p className="text-xs mt-1">Paul is klein</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Comparative</h4>
                    <p className="text-sm mb-1">Vergrotende trap</p>
                    <p className="font-mono bg-white/50 dark:bg-black/20 p-2 rounded">kleiner</p>
                    <p className="text-xs mt-1">Yusuf is kleiner</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Superlative</h4>
                    <p className="text-sm mb-1">Overtreffende trap</p>
                    <p className="font-mono bg-white/50 dark:bg-black/20 p-2 rounded">het kleinst</p>
                    <p className="text-xs mt-1">Peter is het kleinst</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Regular Adjectives (Regelmatig)
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('regular-adjectives')}
                  className="ml-auto"
                >
                  {showDutchText['regular-adjectives'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['regular-adjectives'] && (
                <p className="text-sm text-muted-foreground">Regelmatige bijvoeglijke naamwoorden</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Most Dutch adjectives follow regular patterns. For the comparative, add '-er' to the adjective. For the superlative, add 'het' + adjective + '-st'.
              </p>
              
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Regular Pattern: Add -er and -st</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Adjectief</th>
                        <th className="text-left p-2">Comparatief</th>
                        <th className="text-left p-2">Superlatief</th>
                        <th className="text-left p-2">English</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">klein</td>
                        <td className="p-2 text-primary font-bold">kleiner (dan)</td>
                        <td className="p-2 text-red-600 font-bold">het kleinst</td>
                        <td className="p-2 text-muted-foreground">small</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">leuk</td>
                        <td className="p-2 text-primary font-bold">leuker (dan)</td>
                        <td className="p-2 text-red-600 font-bold">het leukst</td>
                        <td className="p-2 text-muted-foreground">nice/fun</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">groot</td>
                        <td className="p-2 text-primary font-bold">groter (dan)</td>
                        <td className="p-2 text-red-600 font-bold">het grootst</td>
                        <td className="p-2 text-muted-foreground">big</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">dik</td>
                        <td className="p-2 text-primary font-bold">dikker (dan)</td>
                        <td className="p-2 text-red-600 font-bold">het dikst</td>
                        <td className="p-2 text-muted-foreground">thick/fat</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">lief</td>
                        <td className="p-2 text-primary font-bold">liever (dan)</td>
                        <td className="p-2 text-red-600 font-bold">het liefst</td>
                        <td className="p-2 text-muted-foreground">sweet/dear</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Special Rule: Adjectives ending in 'r'</h3>
                <p className="text-sm mb-3">When the adjective ends in 'r', add '-der' instead of '-er' for the comparative:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Adjectief</th>
                        <th className="text-left p-2">Comparatief</th>
                        <th className="text-left p-2">Superlatief</th>
                        <th className="text-left p-2">English</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">lekker</td>
                        <td className="p-2 text-primary font-bold">lekkerder</td>
                        <td className="p-2 text-red-600 font-bold">het lekkerst</td>
                        <td className="p-2 text-muted-foreground">tasty</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">duur</td>
                        <td className="p-2 text-primary font-bold">duurder</td>
                        <td className="p-2 text-red-600 font-bold">het duurst</td>
                        <td className="p-2 text-muted-foreground">expensive</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                Irregular Adjectives (Onregelmatig)
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('irregular-adjectives')}
                  className="ml-auto"
                >
                  {showDutchText['irregular-adjectives'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['irregular-adjectives'] && (
                <p className="text-sm text-muted-foreground">Onregelmatige bijvoeglijke naamwoorden</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Some important adjectives don't follow the regular pattern. These irregular forms must be memorized as they change completely in their comparative and superlative forms.
              </p>
              
              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Common Irregular Adjectives:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Adjectief</th>
                        <th className="text-left p-2">Comparatief</th>
                        <th className="text-left p-2">Superlatief</th>
                        <th className="text-left p-2">English</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-white/20">
                        <td className="p-2 font-semibold">goed</td>
                        <td className="p-2 text-primary font-bold">beter dan</td>
                        <td className="p-2 text-red-600 font-bold">het best</td>
                        <td className="p-2 text-muted-foreground">good</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">veel</td>
                        <td className="p-2 text-primary font-bold">meer dan</td>
                        <td className="p-2 text-red-600 font-bold">het meest</td>
                        <td className="p-2 text-muted-foreground">much/many</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">weinig</td>
                        <td className="p-2 text-primary font-bold">minder dan</td>
                        <td className="p-2 text-red-600 font-bold">het minst</td>
                        <td className="p-2 text-muted-foreground">little/few</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">graag</td>
                        <td className="p-2 text-primary font-bold">liever dan</td>
                        <td className="p-2 text-red-600 font-bold">het liefst</td>
                        <td className="p-2 text-muted-foreground">gladly</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-3 text-red-700 dark:text-red-300">Note: These forms must be memorized - they don't follow regular patterns!</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Using Comparisons in Sentences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-3 text-blue-800 dark:text-blue-200">Comparative Examples:</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Paul is oud.</strong><br/>Yusuf is <strong>ouder dan</strong> Paul.</p>
                      <p><strong>Yassin is klein.</strong><br/>Sanne is <strong>kleiner dan</strong> Yassin.</p>
                      <p><strong>Dit boek is goed.</strong><br/>Dat boek is <strong>beter dan</strong> dit boek.</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 dark:bg-green-950">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-3 text-green-800 dark:text-green-200">Superlative Examples:</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Peter is het oudst</strong> van alle drie.</p>
                      <p><strong>Johan is het kleinst</strong> in de klas.</p>
                      <p><strong>Anna werkt het best</strong> van iedereen.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-purple-800 dark:text-purple-200">Complete Example:</h3>
                <p className="text-sm">Paul is oud. Yusuf is ouder dan Paul. Peter is het oudst.</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Basic → Comparative (+ dan) → Superlative (het + -st)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Adjective Comparison Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {adjectiveQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{adjectiveQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Complete the sentence:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary">{adjectiveQuizQuestions[currentQuiz].sentence}</p>
                      <p className="text-sm text-muted-foreground mt-2">Adjective: {adjectiveQuizQuestions[currentQuiz].adjective}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {adjectiveQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === adjectiveQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === adjectiveQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === adjectiveQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== adjectiveQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{adjectiveQuizQuestions[currentQuiz].explanation}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Type: {adjectiveQuizQuestions[currentQuiz].type === 'comparative' ? 'Comparative (vergrotende trap)' : 
                                adjectiveQuizQuestions[currentQuiz].type === 'superlative' ? 'Superlative (overtreffende trap)' : 'Irregular form'}
                        </p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < adjectiveQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{adjectiveQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('adjective')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
            </>
          )}
          
          {selectedSubtopic === 'inflection' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    What is Adjective Inflection?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    Dutch adjectives often have two versions: with and without an extra '-e'. When an adjective comes AFTER a noun, it never gets an extra '-e'. But when it comes BEFORE a noun, it usually does get an '-e', depending on the type of noun and article used.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                    <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Two Forms of Adjectives:</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Without -e (after noun):</h4>
                        <ul className="text-sm space-y-1">
                          <li>• De fiets is <strong>mooi</strong></li>
                          <li>• De relatie is <strong>serieus</strong></li>
                          <li>• De kat is <strong>dik</strong></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">With -e (before noun):</h4>
                        <ul className="text-sm space-y-1">
                          <li>• De <strong>mooie</strong> fiets</li>
                          <li>• De <strong>serieuze</strong> relatie</li>
                          <li>• De <strong>dikke</strong> kat</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    DE-words with Adjectives
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    DE-words (masculine and feminine nouns) ALWAYS get an '-e' on the adjective when it comes before the noun, regardless of whether you use 'de', 'een', or plural forms.
                  </p>
                  
                  <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                    <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">DE-words: Always add -e</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Type</th>
                            <th className="text-left p-2">Singular</th>
                            <th className="text-left p-2">Plural</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">Without adjective</td>
                            <td className="p-2">De man / Een man</td>
                            <td className="p-2">De mannen / Mannen</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">With adjective</td>
                            <td className="p-2 text-primary font-bold">De aardige man / Een aardige man</td>
                            <td className="p-2 text-primary font-bold">De aardige mannen / Aardige mannen</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <XCircle className="w-6 h-6" />
                    HET-words with Adjectives
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    HET-words (neuter nouns) follow a special rule: they get an '-e' on the adjective EXCEPT when used with 'een' in singular form. This is the only exception to remember!
                  </p>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg">
                    <h3 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">HET-words: One Exception</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Type</th>
                            <th className="text-left p-2">Singular</th>
                            <th className="text-left p-2">Plural</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">Without adjective</td>
                            <td className="p-2">Het huis / Een huis</td>
                            <td className="p-2">De huizen / Huizen</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-semibold">With adjective</td>
                            <td className="p-2">
                              <span className="text-primary font-bold">Het mooie huis</span> / 
                              <span className="text-red-600 font-bold">Een mooi huis</span>
                            </td>
                            <td className="p-2 text-primary font-bold">De mooie huizen / Mooie huizen</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 rounded">
                      <p className="text-red-800 dark:text-red-200 font-semibold">Exception: HET-word + 'een' = NO -e</p>
                      <p className="text-xs text-red-600 dark:text-red-400">Een mooi huis (not: een mooie huis)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Adjective Inflection Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizCompleted ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {adjectiveInflectionQuizQuestions.length}</h3>
                        <div className="text-sm text-muted-foreground">Score: {score}/{adjectiveInflectionQuizQuestions.length}</div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-lg">Choose the correct form:</p>
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <p className="text-xl font-bold text-primary">{adjectiveInflectionQuizQuestions[currentQuiz].phrase}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {adjectiveInflectionQuizQuestions[currentQuiz].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? 
                              (index === adjectiveInflectionQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                              "outline"
                            }
                            className={`p-4 text-lg ${
                              showResult && index === adjectiveInflectionQuizQuestions[currentQuiz].correct ? 
                              "bg-green-500 hover:bg-green-600" : ""
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                          >
                            {showResult && index === adjectiveInflectionQuizQuestions[currentQuiz].correct && (
                              <CheckCircle className="w-5 h-5 mr-2" />
                            )}
                            {showResult && selectedAnswer === index && index !== adjectiveInflectionQuizQuestions[currentQuiz].correct && (
                              <XCircle className="w-5 h-5 mr-2" />
                            )}
                            {option}
                          </Button>
                        ))}
                      </div>

                      {showResult && (
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="font-semibold mb-2">Explanation:</p>
                            <p>{adjectiveInflectionQuizQuestions[currentQuiz].explanation}</p>
                          </div>
                          <Button onClick={handleNextQuestion} className="w-full">
                            {currentQuiz < adjectiveInflectionQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                      <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                      <p className="text-lg">Final Score: {score}/{adjectiveInflectionQuizQuestions.length}</p>
                      <Button onClick={() => resetQuizWithType('inflection')} className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Try Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    );
  }

  if (selectedTopic === 'referencewords') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Reference Words (Verwijswoorden voor Dingen)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                What are Reference Words?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Reference words help avoid repetition in Dutch sentences. Instead of repeating the same noun multiple times, we use pronouns to refer back to things we've already mentioned. This makes speech and writing flow more naturally.
              </p>
              
              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Without Reference Words (repetitive):</h3>
                <p className="text-sm mb-2">Ik heb een auto. De auto is wit. Ik heb de auto al 15 jaar.</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">With Reference Words (natural):</h3>
                <p className="text-sm mb-2">Ik heb een auto. Hij is wit. Ik heb hem al 15 jaar.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Reference Words as Subject
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                When the reference word is the subject of the sentence (who or what is doing the action), we use specific forms depending on whether the original noun was a de-word, het-word, or plural.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Subject Reference Words:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Original Noun</th>
                        <th className="text-left p-2">Reference Word</th>
                        <th className="text-left p-2">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">De-words (singular)</td>
                        <td className="p-2 text-primary font-bold">hij / die</td>
                        <td className="p-2">De auto → Hij is wit / Die is wit</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">Het-words (singular)</td>
                        <td className="p-2 text-primary font-bold">het / dat</td>
                        <td className="p-2">Het boek → Het is dik / Dat is dik</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">Plural (all words)</td>
                        <td className="p-2 text-primary font-bold">ze / die</td>
                        <td className="p-2">De auto's → Ze zijn wit / Die zijn wit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                Reference Words as Object
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                When the reference word is the object of the sentence (what the action is being done to), we use different forms. The object forms are used after verbs and prepositions.
              </p>
              
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Object Reference Words:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Original Noun</th>
                        <th className="text-left p-2">Reference Word</th>
                        <th className="text-left p-2">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">De-words (singular)</td>
                        <td className="p-2 text-primary font-bold">hem</td>
                        <td className="p-2">De auto → Ik zie hem niet</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">Het-words (singular)</td>
                        <td className="p-2 text-primary font-bold">het</td>
                        <td className="p-2">Het boek → Ik zie het niet</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">Plural (all words)</td>
                        <td className="p-2 text-primary font-bold">ze</td>
                        <td className="p-2">De auto's → Ik zie ze niet</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Reference Words Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {referenceWordQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{referenceWordQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Complete the sentence with the correct reference word:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary">{referenceWordQuizQuestions[currentQuiz].sentence}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {referenceWordQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === referenceWordQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === referenceWordQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === referenceWordQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== referenceWordQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{referenceWordQuizQuestions[currentQuiz].explanation}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Type: {referenceWordQuizQuestions[currentQuiz].type === 'subject' ? 'Subject form' : 'Object form'} - 
                          {referenceWordQuizQuestions[currentQuiz].wordType === 'de-word' ? 'DE-word' : 
                           referenceWordQuizQuestions[currentQuiz].wordType === 'het-word' ? 'HET-word' : 'Plural'}
                        </p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < referenceWordQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{referenceWordQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('referencewords')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (selectedTopic === 'subordinateclauses') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Subordinate Clauses (Bijzinnen)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                What are Subordinate Clauses?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                A subordinate clause (bijzin) is a dependent clause that cannot stand alone as a complete sentence. The key difference from main clauses is that in subordinate clauses, all verbs move to the end of the clause. This creates a different word order that is essential for proper Dutch grammar.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Review: Main Clause Structure</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Subject</th>
                        <th className="text-left p-2">1st Verb</th>
                        <th className="text-left p-2">Time</th>
                        <th className="text-left p-2">Object/Manner</th>
                        <th className="text-left p-2">Place</th>
                        <th className="text-left p-2">2nd Verb</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-semibold">Ik</td>
                        <td className="p-2 text-primary font-bold">ga</td>
                        <td className="p-2">zaterdag</td>
                        <td className="p-2">met mijn vriend</td>
                        <td className="p-2">in het park</td>
                        <td className="p-2 text-red-600 font-bold">sporten</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Key Rule: Verbs at the End</h3>
                <p className="text-sm mb-3">In subordinate clauses, ALL verbs move to the very end of the clause.</p>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Main clause:</strong> Het is mooi weer.</p>
                  <p className="text-sm"><strong>Subordinate clause:</strong> ...omdat het mooi weer <strong>is</strong>.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Subordinate Clauses with 'OMDAT' (Because)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                'Omdat' introduces a subordinate clause that gives a reason. It's similar to 'want' but requires different word order. Compare the difference between coordinating conjunctions (want) and subordinating conjunctions (omdat).
              </p>
              
              <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Comparison: WANT vs OMDAT</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">With WANT (coordinating - main clause):</p>
                    <div className="space-y-1">
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Ik ga naar het park <strong>want</strong> het <strong>is</strong> mooi weer.</p>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">De toets ging goed <strong>want</strong> alle cursisten <strong>zijn</strong> slim.</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">With OMDAT (subordinating - subordinate clause):</p>
                    <div className="space-y-1">
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Ik ga naar het park <strong>omdat</strong> het mooi weer <strong>is</strong>.</p>
                      <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">De toets ging goed <strong>omdat</strong> alle cursisten slim <strong>zijn</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Two Verbs in Subordinate Clauses</h3>
                <p className="text-sm mb-3">When there are two verbs, both go to the end and can be switched:</p>
                <div className="space-y-2">
                  <p className="text-sm">Ik heb honger omdat ik niet genoeg <strong>heb gegeten</strong>.</p>
                  <p className="text-sm">Ik heb honger omdat ik niet genoeg <strong>gegeten heb</strong>.</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Both orders are correct!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                Subordinate Clauses with 'ALS' (If/When)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                'Als' introduces conditional or temporal subordinate clauses. It expresses conditions (if) or time relationships (when). The verb placement follows the same rule: all verbs go to the end.
              </p>
              
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Examples with ALS:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">Conditional (If):</p>
                    <div className="space-y-1 text-sm">
                      <p>Ik blijf binnen <strong>als</strong> het weer slecht <strong>is</strong>.</p>
                      <p>Ik ga naar de tandarts <strong>als</strong> ik kiespijn <strong>heb</strong>.</p>
                      <p>Ik ren <strong>als</strong> ik te laat <strong>ben</strong>.</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Temporal (When):</p>
                    <div className="space-y-1 text-sm">
                      <p>Ik drink water <strong>als</strong> ik dorst <strong>heb</strong>.</p>
                      <p>Ik ga naar bed <strong>als</strong> ik moe <strong>ben</strong>.</p>
                      <p>Ik was mijn handen <strong>als</strong> ze vies <strong>zijn</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Volume2 className="w-6 h-6" />
                Subordinate Clauses with 'DAT' (That)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                'Dat' introduces subordinate clauses for indirect speech and thoughts. It's used after verbs like denken, zeggen, geloven, vinden, etc. This transforms direct speech into indirect speech with proper subordinate clause word order.
              </p>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">Direct vs Indirect Speech:</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Direct Speech:</p>
                    <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Petra zegt: "Mark <strong>is</strong> ziek."</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Indirect Speech (with DAT):</p>
                    <p className="text-sm bg-white/50 dark:bg-black/20 p-2 rounded">Petra zegt <strong>dat</strong> Mark ziek <strong>is</strong>.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Common Verbs Used with DAT:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>denken</strong> - Ik denk dat het gaat regenen.</li>
                      <li>• <strong>geloven</strong> - Ik geloof dat hij komt.</li>
                      <li>• <strong>horen</strong> - Ik hoorde dat je ziek was.</li>
                      <li>• <strong>zeggen</strong> - Hij zegt dat hij moe is.</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>vinden</strong> - Ik vind dat dit moeilijk is.</li>
                      <li>• <strong>vertellen</strong> - Ze vertelt dat ze komt.</li>
                      <li>• <strong>lezen</strong> - Ik las dat het duur wordt.</li>
                      <li>• <strong>zien</strong> - Ik zie dat je een nieuwe jas hebt.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Subordinate Clauses Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {subordinateClauseQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{subordinateClauseQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Complete the subordinate clause:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary mb-2">{subordinateClauseQuizQuestions[currentQuiz].mainClause}</p>
                      <p className="text-sm text-muted-foreground">Transform: {subordinateClauseQuizQuestions[currentQuiz].subordinateClause}</p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {subordinateClauseQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === subordinateClauseQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg text-left justify-start ${
                          showResult && index === subordinateClauseQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === subordinateClauseQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== subordinateClauseQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{subordinateClauseQuizQuestions[currentQuiz].explanation}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Type: Subordinate clause with '{subordinateClauseQuizQuestions[currentQuiz].type}'
                        </p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < subordinateClauseQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{subordinateClauseQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('subordinateclauses')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (selectedTopic === 'imperfectum') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Imperfectum (Past Tense)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="w-6 h-6" />
                What is Imperfectum?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Imperfectum (onvoltooid verleden tijd) is the Dutch past tense used to describe completed actions in the past. Regular verbs follow predictable patterns with -te or -de endings, while irregular verbs like 'was' and 'ging' must be memorized separately.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Examples:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">Regular verbs:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Ik <strong>werkte</strong> gisteren</li>
                      <li>• Hij <strong>fietste</strong> naar Utrecht</li>
                      <li>• Wij <strong>leerden</strong> Nederlands</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Irregular verbs:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Ik <strong>was</strong> ziek (zijn)</li>
                      <li>• Hij <strong>ging</strong> naar huis (gaan)</li>
                      <li>• Wij <strong>hadden</strong> tijd (hebben)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Finding the Stem and Ik-vorm
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                To form the imperfectum, you need three components: the infinitive (hele werkwoord), the stem (werkwoord zonder 'en'), and the ik-vorm (stem adapted to a real word).
              </p>
              
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Step-by-step Process:</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">Example 1: werken</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Infinitief:</strong> werken</li>
                      <li>• <strong>Stam:</strong> werk (remove -en)</li>
                      <li>• <strong>Ik-vorm:</strong> werk (already a real word)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Example 2: verven</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Infinitief:</strong> verven</li>
                      <li>• <strong>Stam:</strong> verv (remove -en)</li>
                      <li>• <strong>Ik-vorm:</strong> verf (v→f, make it a real word)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                The 'Sexy Softketchup' Rule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                The key rule for regular verbs: if the last letter of the ik-vorm is in 'sexy softketchup' (x, s, f, t, k, c, h, p), add -te. For all other letters, add -de. For plural forms, add -ten or -den.
              </p>
              
              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">The Magic Letters: SEXY SOFTKETCHUP</h3>
                <div className="text-center mb-4">
                  <p className="text-2xl font-mono font-bold">X S F T K C H P</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">If last letter is in 'sexy softketchup':</p>
                    <p className="text-sm">ik-vorm + <strong>te</strong> (singular) / <strong>ten</strong> (plural)</p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• werk → werk<strong>te</strong></li>
                      <li>• fiets → fiets<strong>te</strong></li>
                      <li>• maak → maak<strong>te</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">If last letter is NOT in 'sexy softketchup':</p>
                    <p className="text-sm">ik-vorm + <strong>de</strong> (singular) / <strong>den</strong> (plural)</p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• reis → reis<strong>de</strong></li>
                      <li>• verf → verf<strong>de</strong></li>
                      <li>• leer → leer<strong>de</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                Complete Examples Table
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Step-by-step Examples:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitief</th>
                        <th className="text-left p-2">Stam</th>
                        <th className="text-left p-2">Ik-vorm</th>
                        <th className="text-left p-2">Uitgang</th>
                        <th className="text-left p-2">Imperfectum</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">werken</td>
                        <td className="p-2">werk</td>
                        <td className="p-2">werk</td>
                        <td className="p-2 text-primary font-bold">+te</td>
                        <td className="p-2 text-red-600 font-bold">werkte</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">fietsen</td>
                        <td className="p-2">fiets</td>
                        <td className="p-2">fiets</td>
                        <td className="p-2 text-primary font-bold">+te</td>
                        <td className="p-2 text-red-600 font-bold">fietste</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">reizen</td>
                        <td className="p-2">reiz</td>
                        <td className="p-2">reis</td>
                        <td className="p-2 text-green-600 font-bold">+de</td>
                        <td className="p-2 text-red-600 font-bold">reisde</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">verven</td>
                        <td className="p-2">verv</td>
                        <td className="p-2">verf</td>
                        <td className="p-2 text-green-600 font-bold">+de</td>
                        <td className="p-2 text-red-600 font-bold">verfde</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">maken</td>
                        <td className="p-2">mak</td>
                        <td className="p-2">maak</td>
                        <td className="p-2 text-primary font-bold">+te</td>
                        <td className="p-2 text-red-600 font-bold">maakte</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">leren</td>
                        <td className="p-2">ler</td>
                        <td className="p-2">leer</td>
                        <td className="p-2 text-green-600 font-bold">+de</td>
                        <td className="p-2 text-red-600 font-bold">leerde</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Imperfectum Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {imperfectumQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{imperfectumQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Complete the sentence with the correct past tense:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary">{imperfectumQuizQuestions[currentQuiz].sentence}</p>
                      <p className="text-sm text-muted-foreground mt-2">Infinitive: {imperfectumQuizQuestions[currentQuiz].infinitive}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {imperfectumQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === imperfectumQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === imperfectumQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === imperfectumQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== imperfectumQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{imperfectumQuizQuestions[currentQuiz].explanation}</p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < imperfectumQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{imperfectumQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('imperfectum')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (selectedTopic === 'nouns') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Nouns (Zelfstandige Naamwoorden)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                What are Nouns?
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('noun-intro')}
                  className="ml-auto"
                >
                  {showDutchText['noun-intro'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['noun-intro'] && (
                <p className="text-sm text-muted-foreground">Wat zijn zelfstandige naamwoorden?</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Nouns are words that name people, places, things, or ideas. In Dutch, every noun has a gender (de or het) and can be made plural or diminutive. Understanding Dutch nouns is essential because they determine which articles and adjectives to use.
              </p>
              {showDutchText['noun-intro'] && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Zelfstandige naamwoorden zijn woorden die personen, plaatsen, dingen of ideeën benoemen. In het Nederlands heeft elk zelfstandig naamwoord een geslacht (de of het) en kan het meervoud of verkleind worden gemaakt.
                </p>
              )}
              
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Features of Dutch Nouns:</h3>
                {showDutchText['noun-intro'] && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Belangrijke kenmerken van Nederlandse zelfstandige naamwoorden:</p>
                )}
                <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Have gender: de-words or het-words</li>
                  <li>• Can be made plural (meervoud)</li>
                  <li>• Can be made diminutive (verkleinwoord)</li>
                  <li>• Determine article and adjective forms</li>
                  <li>• Essential for sentence structure</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                DE-words vs HET-words
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('de-het-words')}
                  className="ml-auto"
                >
                  {showDutchText['de-het-words'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['de-het-words'] && (
                <p className="text-sm text-muted-foreground">De-woorden vs Het-woorden</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Dutch nouns are divided into two groups based on their definite article: de-words (about 75%) and het-words (about 25%). This distinction affects which articles, adjectives, and pronouns you use with the noun.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-50 dark:bg-green-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800 dark:text-green-200">DE-words (75%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Most Dutch nouns:</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>de</strong> man (the man)</li>
                      <li>• <strong>de</strong> vrouw (the woman)</li>
                      <li>• <strong>de</strong> auto (the car)</li>
                      <li>• <strong>de</strong> tafel (the table)</li>
                      <li>• <strong>de</strong> school (the school)</li>
                    </ul>
                    <p className="text-xs mt-2 text-green-600 dark:text-green-400">Indefinite: een man, een vrouw</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 dark:bg-blue-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800 dark:text-blue-200">HET-words (25%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Smaller group of nouns:</p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>het</strong> huis (the house)</li>
                      <li>• <strong>het</strong> kind (the child)</li>
                      <li>• <strong>het</strong> boek (the book)</li>
                      <li>• <strong>het</strong> water (the water)</li>
                      <li>• <strong>het</strong> meisje (the girl)</li>
                    </ul>
                    <p className="text-xs mt-2 text-blue-600 dark:text-blue-400">Indefinite: een huis, een kind</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Tips for HET-words:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Most diminutives (words ending in -je): het meisje, het hondje</li>
                  <li>• Many words ending in -um: het museum, het centrum</li>
                  <li>• Languages and metals: het Nederlands, het goud</li>
                  <li>• Many abstract concepts: het geluk, het leven</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                Plural Forms (Meervoud)
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('plural-forms')}
                  className="ml-auto"
                >
                  {showDutchText['plural-forms'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['plural-forms'] && (
                <p className="text-sm text-muted-foreground">Meervoudsvormen</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Dutch has several ways to make nouns plural. The most common endings are -en and -s, but there are also irregular plurals that must be memorized.
              </p>
              
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Common Plural Patterns:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">Add -en (most common):</p>
                    <ul className="text-sm space-y-1">
                      <li>• huis → <strong>huizen</strong></li>
                      <li>• tafel → <strong>tafels</strong></li>
                      <li>• bloem → <strong>bloemen</strong></li>
                      <li>• kat → <strong>katten</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Add -s:</p>
                    <ul className="text-sm space-y-1">
                      <li>• auto → <strong>auto's</strong></li>
                      <li>• foto → <strong>foto's</strong></li>
                      <li>• café → <strong>café's</strong></li>
                      <li>• baby → <strong>baby's</strong></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Irregular Plurals:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Singular</th>
                        <th className="text-left p-2">Plural</th>
                        <th className="text-left p-2">English</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">kind</td>
                        <td className="p-2 text-primary font-bold">kinderen</td>
                        <td className="p-2 text-muted-foreground">children</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">ei</td>
                        <td className="p-2 text-primary font-bold">eieren</td>
                        <td className="p-2 text-muted-foreground">eggs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">schip</td>
                        <td className="p-2 text-primary font-bold">schepen</td>
                        <td className="p-2 text-muted-foreground">ships</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Volume2 className="w-6 h-6" />
                Diminutives (Verkleinwoorden)
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('diminutives')}
                  className="ml-auto"
                >
                  {showDutchText['diminutives'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['diminutives'] && (
                <p className="text-sm text-muted-foreground">Verkleinwoorden</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Diminutives make nouns smaller, cuter, or more endearing. In Dutch, diminutives are very common and always become het-words, regardless of the original noun's gender. The most common ending is -je.
              </p>
              
              <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">Diminutive Patterns:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">Add -je (most common):</p>
                    <ul className="text-sm space-y-1">
                      <li>• hond → <strong>het hondje</strong></li>
                      <li>• boom → <strong>het boompje</strong></li>
                      <li>• tafel → <strong>het tafeltje</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Add -tje:</p>
                    <ul className="text-sm space-y-1">
                      <li>• auto → <strong>het autootje</strong></li>
                      <li>• ei → <strong>het eitje</strong></li>
                      <li>• baby → <strong>het babytje</strong></li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs mt-3 text-purple-600 dark:text-purple-400">Important: ALL diminutives become het-words!</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Common Diminutives:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <ul className="text-sm space-y-1">
                      <li>• het meisje (girl)</li>
                      <li>• het jongetje (little boy)</li>
                      <li>• het huisje (little house)</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm space-y-1">
                      <li>• het kopje (cup)</li>
                      <li>• het boekje (booklet)</li>
                      <li>• het kindje (little child)</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-sm space-y-1">
                      <li>• het bloemetje (little flower)</li>
                      <li>• het katje (kitten)</li>
                      <li>• het beetje (a little bit)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Noun Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {nounQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{nounQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Complete the sentence:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary">{nounQuizQuestions[currentQuiz].sentence}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {nounQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === nounQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === nounQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === nounQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== nounQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{nounQuizQuestions[currentQuiz].explanation}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Type: {nounQuizQuestions[currentQuiz].type === 'de-het' ? 'DE/HET article' : 
                                nounQuizQuestions[currentQuiz].type === 'plural' ? 'Plural form' : 'Diminutive form'}
                        </p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < nounQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{nounQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('nouns')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (selectedTopic === 'perfectum') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Perfectum (Present Perfect)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                What is Perfectum?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Perfectum (voltooid tegenwoordige tijd) is the Dutch present perfect tense. It describes actions that were completed in the past but have relevance to the present. You form it with an auxiliary verb (hebben or zijn) plus a past participle (voltooid deelwoord).
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Structure: Auxiliary + Past Participle</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">Present tense:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Ik <strong>ben</strong></li>
                      <li>• Ik <strong>eet</strong></li>
                      <li>• Ik <strong>werk</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Present perfect:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Ik <strong>ben geweest</strong></li>
                      <li>• Ik <strong>heb gegeten</strong></li>
                      <li>• Ik <strong>heb gewerkt</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Regular Past Participles (Zwakke Werkwoorden)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Regular past participles usually begin with 'ge-' and end with '-t' or '-d'. The same 'sexy softketchup' rule from imperfectum applies: if the last letter of the ik-vorm is in 'sexy softketchup', add '-t'; otherwise add '-d'.
              </p>
              
              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Formation Rule: ge- + ik-vorm + t/d</h3>
                <div className="text-center mb-4">
                  <p className="text-xl font-mono font-bold">SEXY SOFTKETCHUP: X S F T K C H P</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">If last letter is in 'sexy softketchup':</p>
                    <p className="text-sm">ge + ik-vorm + <strong>t</strong></p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• werk → <strong>gewerkt</strong></li>
                      <li>• fiets → <strong>gefietst</strong></li>
                      <li>• hoop → <strong>gehoopt</strong></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">If last letter is NOT in 'sexy softketchup':</p>
                    <p className="text-sm">ge + ik-vorm + <strong>d</strong></p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• reis → <strong>gereisd</strong></li>
                      <li>• verf → <strong>geverfd</strong></li>
                      <li>• leer → <strong>geleerd</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Special Cases for Past Participles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Case 1: Ik-vorm ends in 'd' or 't'</h3>
                <p className="text-sm mb-3">No extra 'd' or 't' is added:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitief</th>
                        <th className="text-left p-2">Ik-vorm</th>
                        <th className="text-left p-2">Past Participle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">zetten</td>
                        <td className="p-2">zet</td>
                        <td className="p-2 text-primary font-bold">gezet</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">redden</td>
                        <td className="p-2">red</td>
                        <td className="p-2 text-primary font-bold">gered</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">praten</td>
                        <td className="p-2">praat</td>
                        <td className="p-2 text-primary font-bold">gepraat</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Case 2: Verbs with prefixes (no 'ge-')</h3>
                <p className="text-sm mb-3">Verbs starting with ge-, ver-, be-, ont-, her- don't get an extra 'ge-':</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitief</th>
                        <th className="text-left p-2">Ik-vorm</th>
                        <th className="text-left p-2">Past Participle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">vertellen</td>
                        <td className="p-2">vertel</td>
                        <td className="p-2 text-primary font-bold">verteld</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">bestellen</td>
                        <td className="p-2">bestel</td>
                        <td className="p-2 text-primary font-bold">besteld</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">gebeuren</td>
                        <td className="p-2">gebeur</td>
                        <td className="p-2 text-primary font-bold">gebeurd</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="w-6 h-6" />
                Auxiliary Verbs: Hebben vs Zijn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Most verbs use 'hebben' as auxiliary, but some use 'zijn'. The choice depends on the type of action and sometimes the context of the sentence.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-blue-50 dark:bg-blue-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800 dark:text-blue-200">HEBBEN (most verbs)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Regular verbs usually take 'hebben':</p>
                    <ul className="text-sm space-y-1">
                      <li>• Ik <strong>heb gewerkt</strong></li>
                      <li>• Hij <strong>heeft gefietst</strong></li>
                      <li>• Wij <strong>hebben besteld</strong></li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50 dark:bg-green-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-800 dark:text-green-200">ZIJN (movement/change)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Verbs of movement or change of state:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Ik <strong>ben gekomen</strong></li>
                      <li>• Hij <strong>is gegaan</strong></li>
                      <li>• Wij <strong>zijn geweest</strong></li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">Special Rule: Movement to a Place</h3>
                <p className="text-sm mb-3">When 'naar' (to) appears with a place, use 'zijn':</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">With 'hebben' (general action):</p>
                    <ul className="text-sm space-y-1">
                      <li>• We <strong>hebben</strong> in de bergen gereden</li>
                      <li>• We <strong>hebben</strong> 10 km gefietst</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">With 'zijn' (to a place):</p>
                    <ul className="text-sm space-y-1">
                      <li>• We <strong>zijn</strong> naar Amsterdam gereden</li>
                      <li>• We <strong>zijn</strong> naar Zaandam gefietst</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                Irregular Past Participles (Sterke Werkwoorden)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Many common verbs have irregular past participles that must be memorized. These don't follow the regular 'sexy softketchup' rule.
              </p>
              
              <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Common Irregular Verbs (with 'hebben'):</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Infinitief</th>
                          <th className="text-left p-2">Present Perfect</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">denken</td>
                          <td className="p-2 text-primary font-bold">heb gedacht</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">doen</td>
                          <td className="p-2 text-primary font-bold">heb gedaan</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">drinken</td>
                          <td className="p-2 text-primary font-bold">heb gedronken</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">eten</td>
                          <td className="p-2 text-primary font-bold">heb gegeten</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">hebben</td>
                          <td className="p-2 text-primary font-bold">heb gehad</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">kijken</td>
                          <td className="p-2 text-primary font-bold">heb gekeken</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Infinitief</th>
                          <th className="text-left p-2">Present Perfect</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">kopen</td>
                          <td className="p-2 text-primary font-bold">heb gekocht</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">krijgen</td>
                          <td className="p-2 text-primary font-bold">heb gekregen</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">lezen</td>
                          <td className="p-2 text-primary font-bold">heb gelezen</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">lopen</td>
                          <td className="p-2 text-primary font-bold">heb gelopen</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">schrijven</td>
                          <td className="p-2 text-primary font-bold">heb geschreven</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">zien</td>
                          <td className="p-2 text-primary font-bold">heb gezien</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Irregular Verbs (with 'zijn'):</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitief</th>
                        <th className="text-left p-2">Present Perfect</th>
                        <th className="text-left p-2">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">zijn</td>
                        <td className="p-2 text-primary font-bold">ben geweest</td>
                        <td className="p-2 text-xs">Ik ben naar Frankrijk geweest</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">komen</td>
                        <td className="p-2 text-primary font-bold">ben gekomen</td>
                        <td className="p-2 text-xs">Ik ben naar Nederland gekomen</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">gaan</td>
                        <td className="p-2 text-primary font-bold">ben gegaan</td>
                        <td className="p-2 text-xs">Zijn jullie met het vliegtuig gegaan?</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">worden</td>
                        <td className="p-2 text-primary font-bold">ben geworden</td>
                        <td className="p-2 text-xs">We zijn ziek geworden</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">beginnen</td>
                        <td className="p-2 text-primary font-bold">is begonnen</td>
                        <td className="p-2 text-xs">De les is begonnen</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">blijven</td>
                        <td className="p-2 text-primary font-bold">zijn gebleven</td>
                        <td className="p-2 text-xs">Zij zijn in Nederland gebleven</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Perfectum Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {perfectumQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{perfectumQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Complete the sentence with the correct present perfect:</p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xl font-bold text-primary">{perfectumQuizQuestions[currentQuiz].sentence}</p>
                      <p className="text-sm text-muted-foreground mt-2">Infinitive: {perfectumQuizQuestions[currentQuiz].infinitive}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {perfectumQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === perfectumQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === perfectumQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === perfectumQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== perfectumQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{perfectumQuizQuestions[currentQuiz].explanation}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Type: {perfectumQuizQuestions[currentQuiz].type === 'regular' ? 'Regular verb' : 
                                perfectumQuizQuestions[currentQuiz].type === 'irregular' ? 'Irregular verb' : 'Auxiliary verb choice'}
                        </p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < perfectumQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{perfectumQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('perfectum')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (selectedTopic === 'negation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Negation (Niet & Geen)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <XCircle className="w-6 h-6" />
                Negation: Niet and Geen
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('negation-main')}
                  className="ml-auto"
                >
                  {showDutchText['negation-main'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['negation-main'] && (
                <p className="text-sm text-muted-foreground">Niet en Geen</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Negation in Dutch requires careful attention to word choice and positioning. Unlike English, which primarily uses 'not', Dutch has two main negation words: 'niet' and 'geen'. The choice between them depends on what type of word you're negating, and their position in the sentence follows specific rules that affect meaning and naturalness.
              </p>
              {showDutchText['negation-main'] && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ontkenning in het Nederlands vereist zorgvuldige aandacht voor woordkeuze en positionering. In tegenstelling tot het Engels gebruikt het Nederlands twee hoofdontkennende woorden: 'niet' en 'geen'.
                </p>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-red-50 dark:bg-red-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-800 dark:text-red-200">NIET (Not)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Used to negate verbs, adjectives, adverbs, and prepositional phrases:</p>
                    <ul className="text-sm space-y-1">
                      <li>• At end of sentence (simple negation)</li>
                      <li>• Before second verb (infinitives)</li>
                      <li>• Before prepositions</li>
                      <li>• Before adjectives/adverbs</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 dark:bg-blue-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800 dark:text-blue-200">GEEN (No/Not a)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">Used to negate nouns, especially indefinite ones:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Always directly before nouns</li>
                      <li>• Replaces 'een' (a/an)</li>
                      <li>• With indefinite plural nouns</li>
                      <li>• Think: geen = niet + een</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-yellow-50 dark:bg-yellow-950">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-800 dark:text-yellow-200">Detailed Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">NIET Examples:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Positive:</p>
                          <p>Ik werk vandaag.</p>
                          <p>Hij is groot.</p>
                          <p>Zij kan zwemmen.</p>
                          <p>Wij gaan naar huis.</p>
                        </div>
                        <div>
                          <p className="font-medium">Negative:</p>
                          <p>Ik werk vandaag <strong>niet</strong>.</p>
                          <p>Hij is <strong>niet</strong> groot.</p>
                          <p>Zij kan <strong>niet</strong> zwemmen.</p>
                          <p>Wij gaan <strong>niet</strong> naar huis.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">GEEN Examples:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Positive:</p>
                          <p>Ik heb een auto.</p>
                          <p>Er zijn studenten hier.</p>
                          <p>Hij drinkt koffie.</p>
                          <p>Wij hebben tijd.</p>
                        </div>
                        <div>
                          <p className="font-medium">Negative:</p>
                          <p>Ik heb <strong>geen</strong> auto.</p>
                          <p>Er zijn <strong>geen</strong> studenten hier.</p>
                          <p>Hij drinkt <strong>geen</strong> koffie.</p>
                          <p>Wij hebben <strong>geen</strong> tijd.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Negation Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {negationQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{negationQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">Make this sentence negative:</p>
                    <p className="text-2xl font-bold text-primary">{negationQuizQuestions[currentQuiz].sentence}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {negationQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === negationQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === negationQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === negationQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== negationQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{negationQuizQuestions[currentQuiz].explanation}</p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < negationQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{negationQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('negation')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (selectedTopic === 'klinkers') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button onClick={handleBackToTopics} variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Topics
              </Button>
              <h1 className="text-2xl font-bold">Klinkers (Vowels)</h1>
              <div className="w-32" />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Volume2 className="w-6 h-6" />
                Long and Short Vowels
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('vowels')}
                  className="ml-auto"
                >
                  {showDutchText['vowels'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['vowels'] && (
                <p className="text-sm text-muted-foreground">Lange en Korte Klinkers</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">
                Understanding vowels is crucial for Dutch pronunciation and spelling. Dutch vowels can be either long or short, and this affects how words are spelled and pronounced. The length of a vowel determines whether consonants are doubled in spelling and how plurals are formed.
              </p>
              {showDutchText['vowels'] && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Het begrijpen van klinkers is cruciaal voor Nederlandse uitspraak en spelling. Nederlandse klinkers kunnen lang of kort zijn, en dit beïnvloedt hoe woorden gespeld en uitgesproken worden.
                </p>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Vowels:</h3>
                  {showDutchText['vowels'] && (
                    <p className="text-xs text-muted-foreground mb-1">Klinkers:</p>
                  )}
                  <p className="text-lg font-mono bg-muted p-2 rounded">A, E, I, O, U</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Consonants:</h3>
                  {showDutchText['vowels'] && (
                    <p className="text-xs text-muted-foreground mb-1">Medeklinkers:</p>
                  )}
                  <p className="text-sm font-mono bg-muted p-2 rounded">B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Z</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">How to Divide Words into Syllables:</h3>
                {showDutchText['vowels'] && (
                  <p className="text-xs text-muted-foreground mb-1">Hoe woorden in lettergrepen te verdelen:</p>
                )}
                <p className="text-sm mb-2">To understand vowel length, you need to divide words into syllables. Each syllable contains one vowel sound.</p>
                <p className="font-mono bg-muted p-2 rounded">Li-sa, Ca-ro-li-na, Sil-ves-ter, Ba-naan, To-ma-ten</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Key Rules:</h3>
                {showDutchText['vowels'] && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Belangrijke regels:</p>
                )}
                <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• A vowel at the end of a syllable is long</li>
                  <li>• A vowel followed by one consonant in a closed syllable is short</li>
                  <li>• Double vowels (aa, ee, oo, uu) are always long</li>
                  <li>• This affects spelling in plurals and verb forms</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="w-6 h-6" />
                Spelling Rules Overview
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('spelling-rules')}
                  className="ml-auto"
                >
                  {showDutchText['spelling-rules'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['spelling-rules'] && (
                <p className="text-sm text-muted-foreground">Spellingsregels Overzicht</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Rule 1: Vowel at End of Syllable is Long</h3>
                {showDutchText['spelling-rules'] && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">Regel 1: Klinker aan het einde van lettergreep is lang</p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Word</th>
                        <th className="text-left p-2">Syllables</th>
                        <th className="text-left p-2">Long Vowel</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Banaan</td><td className="p-2 font-mono">Ba-naan</td><td className="p-2 text-primary font-bold">Ba (long a)</td></tr>
                      <tr className="border-b"><td className="p-2">Eten</td><td className="p-2 font-mono">E-ten</td><td className="p-2 text-primary font-bold">E (long e)</td></tr>
                      <tr className="border-b"><td className="p-2">Kopen</td><td className="p-2 font-mono">Ko-pen</td><td className="p-2 text-primary font-bold">Ko (long o)</td></tr>
                      <tr className="border-b"><td className="p-2">Praten</td><td className="p-2 font-mono">Pra-ten</td><td className="p-2 text-primary font-bold">Pra (long a)</td></tr>
                      <tr className="border-b"><td className="p-2">Tomaten</td><td className="p-2 font-mono">To-ma-ten</td><td className="p-2 text-primary font-bold">To, ma (long o, a)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-green-800 dark:text-green-200">Long Vowels: Infinitive to Ik-vorm</h3>
                {showDutchText['spelling-rules'] && (
                  <p className="text-xs text-green-600 dark:text-green-400 mb-2">Lange klinkers: van infinitief naar ik-vorm</p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitive</th>
                        <th className="text-left p-2">Syllables</th>
                        <th className="text-left p-2">Stem</th>
                        <th className="text-left p-2">Ik-vorm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Praten</td><td className="p-2 font-mono">Pra-ten</td><td className="p-2">Prat</td><td className="p-2 text-primary font-bold">Praat</td></tr>
                      <tr className="border-b"><td className="p-2">Eten</td><td className="p-2 font-mono">E-ten</td><td className="p-2">Et</td><td className="p-2 text-primary font-bold">Eet</td></tr>
                      <tr className="border-b"><td className="p-2">Lopen</td><td className="p-2 font-mono">Lo-pen</td><td className="p-2">Lop</td><td className="p-2 text-primary font-bold">Loop</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-2 text-green-700 dark:text-green-300">Note: Double the vowel in ik-vorm to keep it long</p>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-red-800 dark:text-red-200">Rule 2: No Double Consonants at Word End</h3>
                {showDutchText['spelling-rules'] && (
                  <p className="text-xs text-red-600 dark:text-red-400 mb-2">Regel 2: Geen dubbele medeklinkers aan het einde van een woord</p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitive</th>
                        <th className="text-left p-2">Stem</th>
                        <th className="text-left p-2">Ik-vorm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Zeggen</td><td className="p-2">Zegg</td><td className="p-2 text-primary font-bold">Zeg</td></tr>
                      <tr className="border-b"><td className="p-2">Zitten</td><td className="p-2">Zitt</td><td className="p-2 text-primary font-bold">Zit</td></tr>
                      <tr className="border-b"><td className="p-2">Spellen</td><td className="p-2">Spell</td><td className="p-2 text-primary font-bold">Spel</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-2 text-red-700 dark:text-red-300">Note: Remove one consonant from double consonants</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 text-yellow-800 dark:text-yellow-200">Rule 3: No V or Z at Word End</h3>
                {showDutchText['spelling-rules'] && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">Regel 3: Geen v en z aan het einde van een woord</p>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Infinitive</th>
                        <th className="text-left p-2">Stem</th>
                        <th className="text-left p-2">Ik-vorm</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="p-2">Verven</td><td className="p-2">Verv</td><td className="p-2 text-primary font-bold">Verf (v→f)</td></tr>
                      <tr className="border-b"><td className="p-2">Verhuizen</td><td className="p-2">Verhuiz</td><td className="p-2 text-primary font-bold">Verhuis (z→s)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs mt-2 text-yellow-700 dark:text-yellow-300">Note: V becomes F, Z becomes S at word end</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                Vowel Practice Quiz
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleDutchText('quiz-vowels')}
                  className="ml-auto"
                >
                  {showDutchText['quiz-vowels'] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Dutch
                </Button>
              </CardTitle>
              {showDutchText['quiz-vowels'] && (
                <p className="text-sm text-muted-foreground">Oefenquiz Klinkers</p>
              )}
            </CardHeader>
            <CardContent>
              {!quizCompleted ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Question {currentQuiz + 1} of {klinkerQuizQuestions.length}</h3>
                    <div className="text-sm text-muted-foreground">Score: {score}/{klinkerQuizQuestions.length}</div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <p className="text-lg">What is the plural of:</p>
                    <p className="text-3xl font-bold text-primary">{klinkerQuizQuestions[currentQuiz].word}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {klinkerQuizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === index ? 
                          (index === klinkerQuizQuestions[currentQuiz].correct ? "default" : "destructive") : 
                          "outline"
                        }
                        className={`p-4 text-lg ${
                          showResult && index === klinkerQuizQuestions[currentQuiz].correct ? 
                          "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                      >
                        {showResult && index === klinkerQuizQuestions[currentQuiz].correct && (
                          <CheckCircle className="w-5 h-5 mr-2" />
                        )}
                        {showResult && selectedAnswer === index && index !== klinkerQuizQuestions[currentQuiz].correct && (
                          <XCircle className="w-5 h-5 mr-2" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>

                  {showResult && (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p>{klinkerQuizQuestions[currentQuiz].explanation}</p>
                      </div>
                      <Button onClick={handleNextQuestion} className="w-full">
                        {currentQuiz < klinkerQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-lg">Final Score: {score}/{klinkerQuizQuestions.length}</p>
                  <Button onClick={() => resetQuizWithType('basic')} className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Navigation />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-primary/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Dutch Grammar
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Learn the basic rules of Dutch grammar. Perfect for beginners and advanced learners.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Basic Rules</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Examples</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Exercises</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Grammar Topics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover various grammar topics to improve your Dutch language skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('klinkers')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Klinkers (Vowels)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn about long and short vowels in Dutch, with examples and interactive quizzes.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('werkwoorden')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Werkwoorden (Verbs)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch verb conjugations, regular and irregular verbs, with sentence structure and practice quizzes.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('negation')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Negation (Niet & Geen)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn how to make negative sentences using 'niet' and 'geen' with proper positioning rules.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('hoofdzinnen')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                HoofdZinnen (Main Clauses)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch sentence structure, word order, and connecting sentences with conjunctions.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('inversie')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Inversie (Word Order Inversion)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn how to start Dutch sentences with time, place, or objects instead of the subject.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('nouns')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Nouns (Zelfstandige Naamwoorden)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch nouns: de/het articles, plural forms, and diminutives with examples and practice.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('adjectives')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Adjectives (Comparisons)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch adjective comparisons: comparative and superlative forms with regular and irregular patterns.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('referencewords')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Reference Words (Verwijswoorden)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch reference words for things: hij/hem, het, ze - avoid repetition in sentences.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('subordinateclauses')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Subordinate Clauses (Bijzinnen)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch subordinate clauses with omdat, als, and dat - verb placement at the end.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('imperfectum')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Imperfectum (Past Tense)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch past tense for regular verbs: -te/-de endings with the 'sexy softketchup' rule.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleTopicSelect('perfectum')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Perfectum (Present Perfect)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Learn Dutch present perfect: auxiliary verbs (hebben/zijn) + past participles with ge- prefix.
              </p>
              <Button className="w-full">
                Start Learning
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}