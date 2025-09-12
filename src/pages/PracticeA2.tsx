import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PenTool, Headphones, Mic, GraduationCap, Clock, Target, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import heroImage from '@/assets/dutch-hero.jpg';

export default function PracticeA2() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [currentExam, setCurrentExam] = useState<{section: string, examNumber: number} | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examInProgress, setExamInProgress] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examCompleted, setExamCompleted] = useState(false);
  const [score, setScore] = useState<{correct: number, total: number, percentage: number, points: number} | null>(null);

  // Timer effect
  useEffect(() => {
    if (examInProgress && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && examInProgress) {
      handleSubmitExam();
    }
  }, [timeLeft, examInProgress]);

  // Add missing dependency for handleSubmitExam
  const handleSubmitExam = () => {
    if (!currentExam) return;
    
    const questions = getExamQuestions(currentExam.section, currentExam.examNumber);
    let correct = 0;
    
    questions.forEach(q => {
      if (q.type === 'multiple' || q.type === 'text' || q.type === 'audio') {
        if (answers[q.id] === q.options?.[q.correct]?.toString() || parseInt(answers[q.id]) === q.correct) {
          correct++;
        }
      } else if (q.type === 'writing' || q.type === 'speaking') {
        // For writing/speaking, give partial credit if answered
        if (answers[q.id] && answers[q.id].length > 10) {
          correct += 0.8; // 80% credit for attempting
        }
      }
    });
    
    const percentage = (correct / questions.length) * 100;
    const points = Math.round(200 + (percentage / 100) * 600); // Scale to 200-800
    
    setScore({
      correct: Math.round(correct),
      total: questions.length,
      percentage: Math.round(percentage),
      points
    });
    
    setExamInProgress(false);
    setExamCompleted(true);
  };

  const getExamQuestions = (section: string, examNumber: number) => {
    const questionSets = {
      reading: {
        1: [
          {
            id: 1,
            type: 'text',
            text: "Het is december. Paulo krijgt van de gemeente een folder met informatie over het afsteken van vuurwerk.\n\nWanneer mag u vuurwerk afsteken?\nU mag vuurwerk afsteken tussen 31 december 18.00 uur en 1 januari 02.00 uur. U kunt een boete van € 100 krijgen als u vuurwerk afsteekt buiten deze tijden.\n\nVuurwerkverbod op bepaalde plekken\nIn onze gemeente is op sommige plekken het afsteken van vuurwerk verboden: in het winkelcentrum, in de buurt van het Maxima-ziekenhuis en bij alle kinderboerderijen.\n\nVeilig vuurwerk afsteken\nGaat u tijdens de jaarwisseling vuurwerk afsteken of buiten naar het vuurwerk kijken? Dan kunt u het beste uw ogen beschermen met een vuurwerkbril.",
            question: "Paulo wil vuurwerk afsteken met oud & nieuw. Wanneer mag dat precies?",
            options: ["Alleen op 31 december de hele dag.", "Alleen op 1 januari de hele dag.", "Van 31 december om 18 uur 's avonds tot 1 januari om 2 uur 's nachts.", "Op 31 december & op 1 januari de hele dag."],
            correct: 2
          },
          {
            id: 2,
            type: 'text',
            text: "Het is december. Paulo krijgt van de gemeente een folder met informatie over het afsteken van vuurwerk.\n\nWanneer mag u vuurwerk afsteken?\nU mag vuurwerk afsteken tussen 31 december 18.00 uur en 1 januari 02.00 uur. U kunt een boete van € 100 krijgen als u vuurwerk afsteekt buiten deze tijden.\n\nVuurwerkverbod op bepaalde plekken\nIn onze gemeente is op sommige plekken het afsteken van vuurwerk verboden: in het winkelcentrum, in de buurt van het Maxima-ziekenhuis en bij alle kinderboerderijen.",
            question: "Paulo wil vuurwerk afsteken. Waar mag hij dat doen?",
            options: ["Dichtbij het ziekenhuis.", "In het winkelcentrum.", "Niet bij het ziekenhuis en ook niet in het winkelcentrum."],
            correct: 2
          },
          {
            id: 3,
            type: 'text',
            text: "Veilig vuurwerk afsteken\nGaat u tijdens de jaarwisseling vuurwerk afsteken of buiten naar het vuurwerk kijken? Dan kunt u het beste uw ogen beschermen met een vuurwerkbril.",
            question: "Paolo koopt een vuurwerkbril. Waarom koopt hij die speciale bril?",
            options: ["Die bril beschermt zijn ogen.", "Met die bril kan hij het vuurwerk beter zien.", "De vuurwerkbril is verplicht."],
            correct: 0
          },
          {
            id: 4,
            type: 'text',
            text: "Hoi Nanda\nHoe gaat het met je? Met ons is alles goed. Het is druk in onze kaaswinkel en ook bij ons thuis. Dit weekend hebben we een afspraak met je. We hadden afgesproken, dat we zaterdagochtend om 10 uur bij jou zijn. We gaan je trakteren op een dagje uit. We komen, maar we moeten in de ochtend nog werken in onze winkel. Dus 10 uur redden we niet. Het wordt iets later, we denken half 12. We sturen je een foto mee van het bootje, dat we gehuurd hebben. Daarmee gaan we zaterdagmiddag samen het water op. Leuk, toch?\nWij slapen van zaterdag op zondag in een Bed & Breakfast, dichtbij jouw huis.",
            question: "Nanda krijgt bezoek. Wanneer komen Adriaan en Olivier aan?",
            options: ["Op zaterdagochtend om 10 uur.", "Op zaterdagochtend om half 12.", "Op zondagochtend om 10 uur.", "Zaterdagmiddag."],
            correct: 1
          },
          {
            id: 5,
            type: 'text',
            text: "Hoi Nanda\nHoe gaat het met je? Met ons is alles goed. Het is druk in onze kaaswinkel en ook bij ons thuis. Dit weekend hebben we een afspraak met je. We hadden afgesproken, dat we zaterdagochtend om 10 uur bij jou zijn. We gaan je trakteren op een dagje uit. We komen, maar we moeten in de ochtend nog werken in onze winkel. Dus 10 uur redden we niet.",
            question: "Moeten Adriaan en Olivier op zaterdag werken?",
            options: ["Ja, zij moeten eerst werken op hun boot.", "Ja, zij moeten eerst werken in hun winkel.", "Ja, zij hebben een Bed & Breakfast-bedrijf.", "Nee, zij staan vroeg op en gaan extra vroeg naar Nanda."],
            correct: 1
          },
          {
            id: 6,
            type: 'text',
            text: "Geachte heer, mevrouw,\n\nWij hebben uw vraag over schadevergoeding ontvangen. U heeft schade aan uw nieuwe auto. U wilt dat wij deze schade vergoeden. U hebt ons alle informatie gestuurd over de schade.\n\nOp basis van de informatie die u ons heeft gegeven, kunnen we u het volgende meedelen: u hebt recht op een schadevergoeding, maar u hebt ook een eigen risico van € 250. U moet, zoals ook in de polis staat, uw auto laten repareren bij uw eigen Toyota-garage.\n\nWij wensen u na deze reparatie weer veel schadevrije kilometers!\n\nMet vriendelijke groet,\nARAG Autoverzekeringen",
            question: "Hoeveel schadevergoeding krijgt Fatima?",
            options: ["De schade aan de nieuwe auto wordt 100% vergoed.", "Zij zal € 250 euro schadevergoeding krijgen van de verzekering.", "Zij krijgt een vergoeding, maar zij moet € 250 zelf betalen.", "De garage weet hoeveel schadevergoeding Fatima zal krijgen."],
            correct: 2
          },
          {
            id: 7,
            type: 'text',
            text: "U moet, zoals ook in de polis staat, uw auto laten repareren bij uw eigen Toyota-garage.",
            question: "Wie gaat de auto repareren?",
            options: ["Fatima heeft de auto zelf gerepareerd.", "De ARAG repareert de auto van Fatima.", "De Toyota-garage gaat de auto van Fatima repareren."],
            correct: 2
          },
          {
            id: 8,
            type: 'text',
            text: "Storyplus –magazine – speciaal voor u!\n\nStoryplus –magazine is al tientallen jaren het belangrijkste tijdschrift voor iedereen die alles wil weten van de Nederlandse televisiesterren en de leden van het koninklijk huis. En zegt u nu zelf: wie wil dat niet?\n\nStoryplus –magazine verschijnt wekelijks. Wij hebben voor u een speciaal aanbod: U betaalt niet € 82,95, maar slechts € 49,75 voor een jaarabonnement. Dat is een korting van 40%. U betaalt minder dan 1 euro per week!",
            question: "Wat voor soort tijdschrift is Storyplus –magazine?",
            options: ["Een dagblad.", "Een maandblad.", "Een weekblad."],
            correct: 2
          },
          {
            id: 9,
            type: 'text',
            text: "Storyplus –magazine is al tientallen jaren het belangrijkste tijdschrift voor iedereen die alles wil weten van de Nederlandse televisiesterren en de leden van het koninklijk huis.",
            question: "Wat voor nieuws kan Maxima lezen in Storyplus –magazine?",
            options: ["Nieuws over het koninklijk huis.", "Nieuws over belangrijke politieke zaken.", "Nieuws over kleding die je met 40% korting kunt kopen."],
            correct: 0
          },
          {
            id: 10,
            type: 'text',
            text: "Laat deze unieke kans niet lopen: bel uiterlijk vóór 31 december naar 0900 – 244.62 44 of vul (vóór 31 december) het formulier in op www.storyplus.nl",
            question: "Maxima wil een jaarabonnement nemen op Storyplus –magazine. Hoe kan zij gebruik maken van deze aanbieding van 40% korting?",
            options: ["Zij moet deze week € 49,75 betalen aan Storyplus –magazine.", "Zij moet deze maand € 49,75 betalen aan Storyplus –magazine.", "Zij moet vóór 31 december bellen of een formulier invullen."],
            correct: 2
          },
          {
            id: 11,
            type: 'text',
            text: "De mensen in Nederland worden ouder en ouder.\n\nVergrijzing\nEr komen steeds meer oude mensen in Nederland. In 2018 waren er 2.9 miljoen 65-plussers. In 2040 zullen dat er 4,7 miljoen zijn. Tot 2060 blijft dat aantal ongeveer hetzelfde. Vanaf 2025 komen er snel meer 80-plussers.\n\nIn 2040 is ongeveer 26 procent van de bevolking 65-plusser. Bijna 10% van de Nederlanders is in 2040 ouder dan 80 jaar. In 2012 waren er 686.227 mensen van 80 jaar of ouder, in 2040 zijn dat er 1.554.742.",
            question: "Hoeveel 80-plussers zullen er in 2040 in Nederland wonen?",
            options: ["2.900.000.", "4.700.000.", "1.554.742."],
            correct: 2
          },
          {
            id: 12,
            type: 'text',
            text: "In 2040 is ongeveer 26 procent van de bevolking 65-plusser. Bijna 10% van de Nederlanders is in 2040 ouder dan 80 jaar.",
            question: "Hoeveel procent van de Nederlandse bevolking is in 2040 ouder dan 65 jaar?",
            options: ["26%.", "10%.", "Minder dan 10%.", "Veel meer dan 26%."],
            correct: 0
          },
          {
            id: 13,
            type: 'text',
            text: "In 2040 zullen dat er 4,7 miljoen zijn. Tot 2060 blijft dat aantal ongeveer hetzelfde.",
            question: "Hoeveel 65-plussers zijn er in 2060 ongeveer in Nederland?",
            options: ["Hierover staat niets in deze tekst.", "Ongeveer 4,7 miljoen.", "Ongeveer 2,9 miljoen.", "Ongeveer 1,5 miljoen."],
            correct: 1
          },
          {
            id: 14,
            type: 'text',
            text: "Beste Karel de Schone,\n\nIk schrijf u deze mail om u te vertellen dat ik stop met het werk bij het bedrijf De Schone B.V.\n\nIk heb twee jaar lang bij u gewerkt, maar u wilt mij geen vast contract geven. Ook vind ik het salaris onvoldoende. Daarom ga ik weg.\n\nIk heb met plezier het werk gedaan en ik heb fijne collega's gehad, maar ik kan bij een andere werkgever een beter contract krijgen.",
            question: "Waarom stopt Clara met werken bij De Schone B.V.?",
            options: ["Zij is ontevreden over haar salaris en over haar contract.", "Zij vindt dat werk niet leuk.", "Zij heeft ruzie met haar collega's Maria en Carolien."],
            correct: 0
          },
          {
            id: 15,
            type: 'text',
            text: "Ik wil per direct stoppen. Ik kom dus morgen ook niet werken.",
            question: "Wanneer stopt Clara precies met het werk bij De Schone B.V.?",
            options: ["Over twee jaar.", "Overmorgen.", "Over een week.", "Vandaag."],
            correct: 3
          },
          {
            id: 16,
            type: 'text',
            text: "Werken in de zorg.\n\nIn Nederland hebben in 2019 ruim 1 miljoen mensen betaald werk in de zorg. Ruim een derde van hen (36%) werkt in de verpleging, verzorging en thuiszorg (VVT), een kwart (27%) werkt in een ziekenhuis. Tussen 2013 en 2019 hebben steeds minder mensen een betaalde baan in de zorg gevonden.\n\nWel zijn er veel meer vrijwilligers in de zorg gaan werken. Dat heet mantelzorg: zieke en oude mensen worden verzorgd door hun familie of door een bekende.\n\nHet aantal mantelzorgers is tussen de drie en vier miljoen.",
            question: "Ivan leest dat veel Nederlanders actief zijn in de zorgsector. Hoeveel Nederlanders hebben een betaalde baan in de zorg?",
            options: ["Meer dan 1 miljoen.", "370.000", "Tussen de drie en vier miljoen.", "280.000"],
            correct: 0
          },
          {
            id: 17,
            type: 'text',
            text: "Wel zijn er veel meer vrijwilligers in de zorg gaan werken. Dat heet mantelzorg: zieke en oude mensen worden verzorgd door hun familie of door een bekende.",
            question: "Wat is een mantelzorger volgens deze tekst?",
            options: ["Iemand die werkt met gehandicapten.", "Iemand die werkt in een ziekenhuis.", "Iemand die vrijwilligerswerk doet."],
            correct: 2
          },
          {
            id: 18,
            type: 'text',
            text: "'Fit voor de bevalling'\n\nJe krijgt binnenkort een kindje. Spannend!\n\nGeef je nu op voor de zwangerschapscursus 'Fit voor de bevalling'. Tijdens de cursus die begint op 1 maart, krijg je veel informatie over de zwangerschap en je doet ook wekelijks yoga-oefeningen in Het Buurtcentrum in Kollum.\n\nDeze oefeningen zijn belangrijk als na 9 maanden de baby komt! Met speciale ademhaling kun je in deze periode tot en met de geboorte van je kindje fit blijven.\n\nDe cursus bestaat uit 7 lessen à 90 minuten en vindt plaats in kleine groepen (maximaal 10 deelnemers).",
            question: "Manou wil graag fit blijven in de periode van de zwangerschap. Wat gaat zij doen?",
            options: ["Zij gaat 7 weken lang meedoen aan een cursus zwangerschapsyoga.", "Zij gaat 9 maanden lang meedoen aan de cursus zwangerschapsyoga.", "Zij gaat 18 weken lang meedoen aan de cursus zwangerschapsyoga."],
            correct: 0
          },
          {
            id: 19,
            type: 'text',
            text: "Tijdens de cursus die begint op 1 maart, krijg je veel informatie over de zwangerschap en je doet ook wekelijks yoga-oefeningen in Het Buurtcentrum in Kollum.",
            question: "Manou wil meedoen aan deze cursus. Wat krijgt zij tijdens de cursus?",
            options: ["Een kindje.", "Betere ademhaling.", "Zij krijgt veel informatie en zij gaat veel yoga-oefeningen doen."],
            correct: 2
          },
          {
            id: 20,
            type: 'text',
            text: "De cursus bestaat uit 7 lessen à 90 minuten en vindt plaats in kleine groepen (maximaal 10 deelnemers).",
            question: "Hoe lang duurt één les?",
            options: ["1 uur.", "1,5 uur.", "Dat staat niet in deze tekst."],
            correct: 1
          },
          {
            id: 21,
            type: 'text',
            text: "FEESTJE NA RENOVATIE ROORDASTRAAT BOERHAAVEWIJK\n\nIn de Roordastraat was het feest op donderdagmiddag 18 mei 2019. Bewoners van de Roordastraat vierden samen met hun woningbouwvereniging Elan Wonen de renovatie van de flat in hun straat.\n\nDe renovatie heeft ongeveer 18 maanden geduurd, van januari 2018 tot augustus 2019.",
            question: "In welke periode zijn de woningen gerenoveerd?",
            options: ["In de periode 2018-2019.", "Op 18 mei 2019.", "In het jaar 2019.", "In het jaar 2018."],
            correct: 0
          },
          {
            id: 22,
            type: 'text',
            text: "De entree en de balkons zijn gemoderniseerd. Ook de liften in het gebouw zijn vernieuwd. Tenslotte zijn alle kozijnen en buitendeuren gerenoveerd.\n\nDe huurprijzen veranderen in 2019 voor de bewoners niet. De huurprijzen in de Roordastraat zijn gelijk gebleven.",
            question: "Wat is niet veranderd bij de renovatie van de Roordastraat?",
            options: ["De liften.", "De kozijnen en de buitendeuren.", "De huurprijs."],
            correct: 2
          },
          {
            id: 23,
            type: 'text',
            text: "Bewoners van de Roordastraat vierden samen met hun woningbouwvereniging Elan Wonen de renovatie van de flat in hun straat.",
            question: "Wie is de eigenaar van de woning van Ahmed in de Roordastraat?",
            options: ["Ahmed.", "De wethouder van de gemeente.", "De vereniging Elan Wonen."],
            correct: 2
          },
          {
            id: 24,
            type: 'text',
            text: "Hoi Ineke\n\nHet is nu zondagavond en ik stuur je even een e-mailtje.\nHoe was je vakantie? Ik hoop dat je goed uitgerust bent …\n\nWelkom terug en succes morgen! Er is veel te doen …\n\nGa je met mij mee naar de HEMA morgen of op dinsdag? We kopen daar dan spullen voor het afscheidsfeest van Ad. Dat feest is over twee weken, op 2 september.",
            question: "Wat wil Marleen graag met Ineke afspreken?",
            options: ["Zij wil graag met Ineke naar de HEMA.", "Zij wil graag met Ineke naar Ad.", "Zij wil graag met Ineke op vakantie.", "Zij wil graag met Ineke naar een feest."],
            correct: 0
          },
          {
            id: 25,
            type: 'text',
            text: "Op donderdag kom ik weer werken.\n\nAls je dus morgen of overmorgen met mij naar de HEMA wil, stuur me dan even een bericht of bel me!",
            question: "Wanneer gaat Marleen weer naar haar werk?",
            options: ["Op 2 september.", "Op maandag.", "Op dinsdag.", "Op donderdag."],
            correct: 3
          }
        ]
      },
      writing: {
        1: [
          {
            id: 1,
            type: 'writing',
            task: "Schrijf een brief aan je buurman. Je hebt een probleem met lawaai. Gebruik minimaal 50 woorden.",
            prompt: "Punten om te vermelden:\n- Stel jezelf voor\n- Leg het probleem uit\n- Vraag om een oplossing\n- Bedank voor begrip",
            minWords: 50
          },
          {
            id: 2,
            type: 'writing',
            task: "Vul het formulier in voor een bibliotheekpas.",
            fields: [
              {name: "Voornaam", required: true},
              {name: "Achternaam", required: true},
              {name: "Adres", required: true},
              {name: "Telefoonnummer", required: true},
              {name: "E-mailadres", required: false}
            ]
          },
          {
            id: 3,
            type: 'writing',
            task: "Schrijf een e-mail aan je werkgever. Je bent ziek en kunt niet werken. Gebruik minimaal 40 woorden.",
            prompt: "Punten om te vermelden:\n- Je bent ziek\n- Je kunt niet komen werken\n- Wanneer je weer komt\n- Excuses",
            minWords: 40
          }
        ]
      },
      listening: {
        1: [
          {
            id: 1,
            type: 'audio',
            audioText: "Goedemorgen, u spreekt met de praktijk van dokter Smit. We zijn vandaag gesloten vanwege ziekte. Voor spoedeisende gevallen kunt u bellen naar 112.",
            question: "Waarom is de praktijk gesloten?",
            options: ["Vakantie", "Ziekte", "Reparatie", "Feestdag"],
            correct: 1
          },
          {
            id: 2,
            type: 'audio',
            audioText: "De trein naar Amsterdam vertrekt van spoor 3 om 14:25. Let op: de trein heeft 10 minuten vertraging.",
            question: "Hoe laat vertrekt de trein nu?",
            options: ["14:15", "14:25", "14:35", "14:45"],
            correct: 2
          },
          {
            id: 3,
            type: 'audio',
            audioText: "Welkom bij de supermarkt. Vandaag hebben we een speciale aanbieding: alle appels voor €1 per kilo. Normaal €2 per kilo.",
            question: "Hoeveel kosten de appels vandaag?",
            options: ["€0,50 per kilo", "€1 per kilo", "€1,50 per kilo", "€2 per kilo"],
            correct: 1
          },
          {
            id: 4,
            type: 'audio',
            audioText: "Het weer voor morgen: 's ochtends bewolkt met kans op regen. 's Middags wordt het zonnig met 18 graden.",
            question: "Hoe is het weer 's middags?",
            options: ["Bewolkt", "Regenachtig", "Zonnig", "Winderig"],
            correct: 2
          },
          {
            id: 5,
            type: 'audio',
            audioText: "Bus lijn 12 naar het centrum rijdt vandaag niet vanwege wegwerkzaamheden. Gebruik lijn 15 als alternatief.",
            question: "Welke bus kun je gebruiken in plaats van lijn 12?",
            options: ["Lijn 10", "Lijn 13", "Lijn 15", "Lijn 20"],
            correct: 2
          }
        ]
      },
      speaking: {
        1: [
          {
            id: 1,
            type: 'speaking',
            task: "Stel jezelf voor",
            prompt: "Vertel over jezelf: naam, leeftijd, waar je woont, wat je doet. Spreek 1-2 minuten.",
            timeLimit: 120
          },
          {
            id: 2,
            type: 'speaking',
            task: "Beschrijf je dagelijkse routine",
            prompt: "Vertel wat je elke dag doet: opstaan, ontbijt, werk/studie, vrije tijd. Spreek 2 minuten.",
            timeLimit: 120
          },
          {
            id: 3,
            type: 'speaking',
            task: "Rollenspel: In de winkel",
            prompt: "Je bent in een kledingwinkel. Je zoekt een jas. Vraag naar de prijs, maat en kleur. Spreek 2 minuten.",
            timeLimit: 120
          }
        ]
      },
      knm: {
        1: Array.from({length: 30}, (_, i) => {
          const questions = [
            {
              id: i + 1,
              type: 'multiple',
              question: "Wat is de hoofdstad van Nederland?",
              options: ["Rotterdam", "Amsterdam", "Den Haag", "Utrecht"],
              correct: 1
            },
            {
              id: i + 1,
              type: 'multiple',
              question: "Welke kleur heeft de Nederlandse vlag?",
              options: ["Rood, wit, blauw", "Rood, wit, groen", "Oranje, wit, blauw", "Rood, geel, blauw"],
              correct: 0
            },
            {
              id: i + 1,
              type: 'multiple',
              question: "Hoe heet de Nederlandse koning?",
              options: ["Willem-Alexander", "Beatrix", "Juliana", "Máxima"],
              correct: 0
            },
            {
              id: i + 1,
              type: 'multiple',
              question: "Wat moet je doen als je 18 wordt in Nederland?",
              options: ["Trouwen", "Stemmen", "Inschrijven GBA", "Rijbewijs halen"],
              correct: 2
            },
            {
              id: i + 1,
              type: 'multiple',
              question: "Welke feestdag vieren Nederlanders op 5 mei?",
              options: ["Koningsdag", "Sinterklaas", "Bevrijdingsdag", "Nieuwjaar"],
              correct: 2
            }
          ];
          return questions[i % questions.length];
        })
      }le',
            question: "Welke kleur heeft de Nederlandse vlag?",
            options: ["Rood, wit, blauw", "Rood, wit, groen", "Oranje, wit, blauw", "Rood, geel, blauw"],
            correct: 0
          },
          {
            id: 3,
            type: 'multiple',
            question: "Hoe heet de Nederlandse koning?",
            options: ["Willem-Alexander", "Beatrix", "Juliana", "Máxima"],
            correct: 0
          },
          {
            id: 4,
            type: 'multiple',
            question: "Wat moet je doen als je 18 wordt in Nederland?",
            options: ["Trouwen", "Stemmen", "Inschrijven GBA", "Rijbewijs halen"],
            correct: 2
          },
          {
            id: 5,
            type: 'multiple',
            question: "Welke feestdag vieren Nederlanders op 5 mei?",
            options: ["Koningsdag", "Sinterklaas", "Bevrijdingsdag", "Nieuwjaar"],
            correct: 2
          }
        ]
      }
    };
    return questionSets[section]?.[examNumber] || [];
  };

  const startExam = () => {
    if (!currentExam) return;
    
    const questions = getExamQuestions(currentExam.section, currentExam.examNumber);
    if (questions.length === 0) return;
    
    const section = sections.find(s => s.id === currentExam.section);
    const timeInSeconds = (section?.actualMinutes || 65) * 60;
    
    setTimeLeft(timeInSeconds);
    setExamInProgress(true);
    setCurrentQuestion(0);
    setAnswers({});
    setExamCompleted(false);
    setScore(null);
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({...prev, [questionId]: answer}));
  };

  const handleSubmitExam = () => {
    if (!currentExam) return;
    
    const questions = getExamQuestions(currentExam.section, currentExam.examNumber);
    let correct = 0;
    
    questions.forEach(q => {
      if (q.type === 'multiple' || q.type === 'text' || q.type === 'audio') {
        if (answers[q.id] === q.options?.[q.correct]?.toString() || parseInt(answers[q.id]) === q.correct) {
          correct++;
        }
      } else if (q.type === 'writing' || q.type === 'speaking') {
        // For writing/speaking, give partial credit if answered
        if (answers[q.id] && answers[q.id].length > 10) {
          correct += 0.8; // 80% credit for attempting
        }
      }
    });
    
    const percentage = (correct / questions.length) * 100;
    const points = Math.round(200 + (percentage / 100) * 600); // Scale to 200-800
    
    setScore({
      correct: Math.round(correct),
      total: questions.length,
      percentage: Math.round(percentage),
      points
    });
    
    setExamInProgress(false);
    setExamCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetExam = () => {
    setExamStarted(false);
    setExamInProgress(false);
    setExamCompleted(false);
    setCurrentExam(null);
    setCurrentQuestion(0);
    setAnswers({});
    setScore(null);
  };

  const sections = [
    {
      id: 'reading',
      title: 'Lezen (Reading)',
      icon: BookOpen,
      description: 'Practice reading comprehension with A2 level texts',
      duration: '65 minutes',
      questions: '30 questions',
      actualMinutes: 65,
      actualQuestions: 30,
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      id: 'writing',
      title: 'Schrijven (Writing)',
      icon: PenTool,
      description: 'Practice writing skills with formal and informal texts',
      duration: '90 minutes',
      questions: '3 tasks',
      actualMinutes: 90,
      actualQuestions: 3,
      color: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
      iconColor: 'text-green-600'
    },
    {
      id: 'listening',
      title: 'Luisteren (Listening)',
      icon: Headphones,
      description: 'Practice listening comprehension with audio materials',
      duration: '30 minutes',
      questions: '30 questions',
      actualMinutes: 30,
      actualQuestions: 30,
      color: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
      iconColor: 'text-purple-600'
    },
    {
      id: 'speaking',
      title: 'Spreken (Speaking)',
      icon: Mic,
      description: 'Practice speaking skills with interactive exercises',
      duration: '15 minutes',
      questions: '3 tasks',
      actualMinutes: 15,
      actualQuestions: 3,
      color: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
      iconColor: 'text-orange-600'
    },
    {
      id: 'knm',
      title: 'KNM (Kennis Nederlandse Maatschappij)',
      icon: GraduationCap,
      description: 'Knowledge of Dutch Society practice tests',
      duration: '45 minutes',
      questions: '30 questions',
      actualMinutes: 45,
      actualQuestions: 30,
      color: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
      iconColor: 'text-red-600'
    }
  ];

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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Practice A2 Inburgering
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Complete practice exams for the Dutch A2 Inburgering test. Realistic exam conditions with detailed feedback.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>A2 Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Timed Practice</span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Real Exam Format</span>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Information Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About the A2 Inburgering Exam
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the Dutch A2 Inburgering examination
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* What is Inburgering */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">What is Inburgering?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-blue-700 dark:text-blue-300">
                Inburgering is the Dutch integration process for newcomers. It includes learning Dutch language 
                and knowledge about Dutch society to help you participate fully in Dutch life.
              </p>
              <div className="bg-white/70 dark:bg-black/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Who needs to take it?</h4>
                <ul className="text-sm space-y-1">
                  <li>• Non-EU citizens aged 18-65</li>
                  <li>• EU citizens applying for Dutch citizenship</li>
                  <li>• Some family reunification cases</li>
                  <li>• Certain work permit holders</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Exam Structure */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-2xl text-green-800 dark:text-green-200">Exam Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-green-700 dark:text-green-300">
                The A2 Inburgering exam consists of 4 language skills + knowledge of Dutch society.
              </p>
              <div className="space-y-3">
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Reading (Lezen)</span>
                    <span className="text-sm">65 min</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Writing (Schrijven)</span>
                    <span className="text-sm">90 min</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Listening (Luisteren)</span>
                    <span className="text-sm">30 min</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Speaking (Spreken)</span>
                    <span className="text-sm">15 min</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">KNM</span>
                    <span className="text-sm">45 min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* How to Apply */}
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-xl text-purple-800 dark:text-purple-200">How to Apply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Register at inburgeren.nl</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                  <span>Complete intake assessment</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                  <span>Choose exam location</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                  <span>Schedule exam date</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">5</span>
                  <span>Pay exam fees (€350)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passing Requirements */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="text-xl text-orange-800 dark:text-orange-200">Passing Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Reading</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Writing</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Listening</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>Speaking</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
                <div className="bg-white/70 dark:bg-black/30 p-2 rounded">
                  <div className="flex justify-between">
                    <span>KNM</span>
                    <span className="font-bold">≥ 500 points</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                All sections must be passed individually. Scale: 200-800 points.
              </p>
            </CardContent>
          </Card>

          {/* Important Dates */}
          <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 border-teal-200 dark:border-teal-800">
            <CardHeader>
              <CardTitle className="text-xl text-teal-800 dark:text-teal-200">Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Exam Fee:</span>
                  <span className="ml-2">€350 (all sections)</span>
                </div>
                <div>
                  <span className="font-medium">Retake Fee:</span>
                  <span className="ml-2">€70 per section</span>
                </div>
                <div>
                  <span className="font-medium">Valid ID Required:</span>
                  <span className="ml-2">Passport or ID card</span>
                </div>
                <div>
                  <span className="font-medium">Results:</span>
                  <span className="ml-2">Available within 6 weeks</span>
                </div>
                <div>
                  <span className="font-medium">Booking:</span>
                  <span className="ml-2">3 months in advance</span>
                </div>
              </div>
              <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded mt-4">
                <p className="text-xs text-teal-700 dark:text-teal-300">
                  <strong>Tip:</strong> Practice regularly and take mock exams to improve your chances of success.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preparation Timeline */}
        <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-yellow-200 dark:border-yellow-800 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-yellow-800 dark:text-yellow-200">Recommended Preparation Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">3-6</div>
                <h4 className="font-semibold mb-2">Months Before</h4>
                <p className="text-sm text-muted-foreground">Start intensive Dutch lessons, focus on A2 level grammar and vocabulary</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">2-3</div>
                <h4 className="font-semibold mb-2">Months Before</h4>
                <p className="text-sm text-muted-foreground">Take practice exams, identify weak areas, study Dutch society and culture</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                <h4 className="font-semibold mb-2">Month Before</h4>
                <p className="text-sm text-muted-foreground">Intensive practice, mock exams, review KNM materials, book exam date</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                <h4 className="font-semibold mb-2">Week Before</h4>
                <p className="text-sm text-muted-foreground">Final review, relax, prepare documents, get good rest</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            A2 Inburgering Practice Sections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice all components of the Dutch A2 Inburgering exam with realistic timing and difficulty.
          </p>
        </div>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card 
                key={section.id}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                  selectedSection === section.id ? 'ring-2 ring-primary' : ''
                } ${section.color}`}
                onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 bg-white/50 dark:bg-black/20`}>
                    <IconComponent className={`w-8 h-8 ${section.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl text-center">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{section.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Duration:</span>
                      <span>{section.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Questions:</span>
                      <span>{section.questions}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById(`${section.id}-section`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full"
                  >
                    Start Practice
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Practice Exams for each section */}
        {sections.map((section) => (
          <section key={section.id} id={`${section.id}-section`} className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {section.title} Practice Exams
              </h3>
              <p className="text-lg text-muted-foreground">
                Three complete practice exams following the official A2 Inburgering format
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((examNumber) => (
                <Card key={examNumber} className={`${section.color} border-2`}>
                  <CardHeader>
                    <CardTitle className="text-center">
                      Practice Exam {examNumber}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-4">
                      <div className="bg-white/70 dark:bg-black/30 p-4 rounded-lg">
                        <div className="flex items-center justify-center mb-2">
                          <Clock className="w-5 h-5 mr-2" />
                          <span className="font-semibold">{section.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{section.questions}</p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Difficulty:</span>
                          <span className="font-medium">A2 Level</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Format:</span>
                          <span className="font-medium">Official</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Feedback:</span>
                          <span className="font-medium">Detailed</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        onClick={() => {
                          setCurrentExam({section: section.id, examNumber});
                          setExamStarted(true);
                        }}
                      >
                        Start Exam {examNumber}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* Exam Information */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">About A2 Inburgering Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-lg mb-4">Exam Features</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Realistic exam timing and conditions</li>
                  <li>• Questions based on official A2 standards</li>
                  <li>• Immediate scoring and feedback</li>
                  <li>• Detailed explanations for wrong answers</li>
                  <li>• Pass probability assessment</li>
                  <li>• Study recommendations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4">After Each Practice</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Complete score breakdown</li>
                  <li>• Percentage chance to pass real exam</li>
                  <li>• Detailed explanation of incorrect answers</li>
                  <li>• Correct answers with reasoning</li>
                  <li>• Personalized study recommendations</li>
                  <li>• Areas for improvement identification</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
                Official A2 Inburgering Standards
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                All practice exams follow the official Dutch A2 Inburgering exam format as specified by inburgeren.nl. 
                The timing, question types, and difficulty levels match the real examination conditions to give you 
                the most accurate practice experience possible.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Exam Interface */}
      {examStarted && currentExam && !examCompleted && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  {sections.find(s => s.id === currentExam.section)?.title} - Practice Exam {currentExam.examNumber}
                </CardTitle>
                <Button 
                  variant="outline" 
                  onClick={resetExam}
                >
                  Exit Exam
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded">
                  <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-500' : 'text-primary'}`} />
                  <span className={`font-mono text-lg font-bold ${
                    timeLeft < 300 ? 'text-red-500 animate-pulse' : 
                    timeLeft < 600 ? 'text-orange-500' : 'text-primary'
                  }`}>
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-sm text-muted-foreground">remaining</span>
                </div>
                <div>
                  Question {currentQuestion + 1} of {getExamQuestions(currentExam.section, currentExam.examNumber).length}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {!examInProgress ? (
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg border border-primary/20">
                    <h3 className="text-2xl font-bold mb-4">Exam Starting Soon...</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      You are about to start the {sections.find(s => s.id === currentExam.section)?.title} practice exam.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/50 dark:bg-black/20 p-4 rounded">
                        <h4 className="font-semibold mb-2">Exam Instructions</h4>
                        <ul className="text-sm text-left space-y-1">
                          <li>• Read all questions carefully</li>
                          <li>• Manage your time effectively</li>
                          <li>• You can review answers before submitting</li>
                          <li>• No external help is allowed</li>
                        </ul>
                      </div>
                      <div className="bg-white/50 dark:bg-black/20 p-4 rounded">
                        <h4 className="font-semibold mb-2">Technical Requirements</h4>
                        <ul className="text-sm text-left space-y-1">
                          <li>• Stable internet connection</li>
                          <li>• Quiet environment</li>
                          <li>• Full screen recommended</li>
                          <li>• Do not refresh the page</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Button 
                        size="lg" 
                        className="w-full md:w-auto px-8"
                        onClick={startExam}
                      >
                        Begin Exam
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        By clicking "Begin Exam", you confirm that you are ready to start the timed practice exam.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {(() => {
                    const questions = getExamQuestions(currentExam.section, currentExam.examNumber);
                    const question = questions[currentQuestion];
                    if (!question) return null;

                    return (
                      <div className="space-y-6">
                        <div className="bg-muted/50 p-6 rounded-lg">
                          {question.type === 'text' && (
                            <div className="space-y-4">
                              <div className="bg-white dark:bg-gray-800 p-4 rounded border">
                                <pre className="whitespace-pre-wrap font-sans text-sm">{question.text}</pre>
                              </div>
                              <h3 className="text-lg font-semibold">{question.question}</h3>
                              <div className="space-y-2">
                                {question.options?.map((option, index) => (
                                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={index}
                                      checked={answers[question.id] === index.toString()}
                                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                                      className="w-4 h-4"
                                    />
                                    <span>{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {question.type === 'multiple' && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">{question.question}</h3>
                              <div className="space-y-2">
                                {question.options?.map((option, index) => (
                                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={index}
                                      checked={answers[question.id] === index.toString()}
                                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                                      className="w-4 h-4"
                                    />
                                    <span>{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {question.type === 'audio' && (
                            <div className="space-y-4">
                              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border">
                                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">🔊 Audio Fragment:</p>
                                <p className="italic">"{question.audioText}"</p>
                                <Button size="sm" className="mt-2">▶ Play Audio</Button>
                              </div>
                              <h3 className="text-lg font-semibold">{question.question}</h3>
                              <div className="space-y-2">
                                {question.options?.map((option, index) => (
                                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={index}
                                      checked={answers[question.id] === index.toString()}
                                      onChange={(e) => handleAnswer(question.id, e.target.value)}
                                      className="w-4 h-4"
                                    />
                                    <span>{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {question.type === 'writing' && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">{question.task}</h3>
                              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded border">
                                <pre className="whitespace-pre-wrap text-sm">{question.prompt}</pre>
                              </div>
                              {question.fields ? (
                                <div className="space-y-3">
                                  {question.fields.map((field, index) => (
                                    <div key={index}>
                                      <label className="block text-sm font-medium mb-1">
                                        {field.name} {field.required && <span className="text-red-500">*</span>}
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        value={answers[`${question.id}-${index}`] || ''}
                                        onChange={(e) => handleAnswer(`${question.id}-${index}`, e.target.value)}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <textarea
                                  className="w-full h-32 p-3 border rounded"
                                  placeholder="Schrijf hier je antwoord..."
                                  value={answers[question.id] || ''}
                                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                                />
                              )}
                              {question.minWords && (
                                <p className="text-sm text-muted-foreground">
                                  Minimaal {question.minWords} woorden. Huidige: {(answers[question.id] || '').split(' ').length}
                                </p>
                              )}
                            </div>
                          )}

                          {question.type === 'speaking' && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">{question.task}</h3>
                              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded border">
                                <p className="text-sm">{question.prompt}</p>
                                <p className="text-xs text-muted-foreground mt-2">Tijd: {question.timeLimit} seconden</p>
                              </div>
                              <div className="text-center space-y-4">
                                <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
                                  <p className="text-sm text-red-700 dark:text-red-300">🎤 Spreek je antwoord in</p>
                                  <Button className="mt-2">Start Opname</Button>
                                </div>
                                <textarea
                                  className="w-full h-20 p-3 border rounded"
                                  placeholder="Of typ je antwoord hier (voor oefening)..."
                                  value={answers[question.id] || ''}
                                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between">
                          <Button 
                            variant="outline"
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                          >
                            Previous
                          </Button>
                          
                          {currentQuestion < questions.length - 1 ? (
                            <Button 
                              onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            >
                              Next
                            </Button>
                          ) : (
                            <Button 
                              onClick={handleSubmitExam}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Submit Exam
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })()
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Exam Results */}
      {examCompleted && score && currentExam && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Exam Results</CardTitle>
                <Button variant="outline" onClick={resetExam}>Close</Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Score Overview */}
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${
                    score.points >= 500 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {score.points}
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold">
                      {score.points >= 500 ? '🎉 PASSED!' : '❌ Not Passed'}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {score.correct} out of {score.total} correct ({score.percentage}%)
                    </p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className={score.points >= 500 ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Score:</span>
                          <span className="font-bold">{score.points}/800</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pass Threshold:</span>
                          <span>500/800</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Accuracy:</span>
                          <span>{score.percentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pass Probability:</span>
                          <span className="font-bold">
                            {score.correct >= 23 ? '95%' : 
                             score.correct >= 18 ? '65%' : 
                             score.correct >= 13 ? '35%' : '15%'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Study Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {score.points < 500 && (
                          <>
                            <p>• Focus on basic A2 grammar and vocabulary</p>
                            <p>• Practice reading comprehension daily</p>
                            <p>• Take more practice exams</p>
                          </>
                        )}
                        {score.points >= 500 && score.points < 600 && (
                          <>
                            <p>• Review complex sentence structures</p>
                            <p>• Practice formal writing tasks</p>
                            <p>• Improve time management</p>
                          </>
                        )}
                        {score.points >= 600 && (
                          <>
                            <p>• Excellent performance! Keep practicing</p>
                            <p>• Focus on maintaining consistency</p>
                            <p>• Review any missed questions</p>
                          </>
                        )}
                        <p>• Study Dutch society and culture for KNM</p>
                        <p>• Practice speaking with native speakers</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Question Review */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Question Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getExamQuestions(currentExam.section, currentExam.examNumber).map((q, index) => {
                        const userAnswer = answers[q.id];
                        const isCorrect = q.type === 'multiple' || q.type === 'text' || q.type === 'audio' ? 
                          (parseInt(userAnswer) === q.correct || userAnswer === q.options?.[q.correct]) :
                          userAnswer && userAnswer.length > 10;
                        
                        return (
                          <div key={q.id} className={`p-4 rounded border ${
                            isCorrect ? 'bg-green-50 dark:bg-green-950 border-green-200' : 
                            'bg-red-50 dark:bg-red-950 border-red-200'
                          }`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium">Question {index + 1}</p>
                                <p className="text-sm text-muted-foreground">
                                  {q.question || q.task}
                                </p>
                                {(q.type === 'multiple' || q.type === 'text' || q.type === 'audio') && (
                                  <div className="mt-2 text-sm">
                                    <p>Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                                      {q.options?.[parseInt(userAnswer)] || 'No answer'}
                                    </span></p>
                                    {!isCorrect && (
                                      <p>Correct answer: <span className="text-green-600">
                                        {q.options?.[q.correct]}
                                      </span></p>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className={`text-2xl ${
                                isCorrect ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {isCorrect ? '✓' : '✗'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center space-y-4">
                  <Button onClick={resetExam} size="lg">
                    Take Another Practice Exam
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Keep practicing to improve your chances of passing the real A2 Inburgering exam!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}