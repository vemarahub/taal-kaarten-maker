export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface Thema {
  id: number;
  title: string;
  description: string;
  color: string;
  questions: Question[];
}

export interface VocabularyWord {
  dutch: string;
  english: string;
  article?: string;
  pronunciation?: string;
  example?: string;
}

export interface VocabularyThema {
  id: number;
  title: string;
  description: string;
  words: VocabularyWord[];
  color: string;
}

const TOPIC_CONFIGS = [
  {
    id: 1,
    title: "Topic 1: Personal Information",
    description: "Learn to introduce yourself and share personal information in Dutch",
    color: "bg-gradient-to-br from-primary to-primary-glow",
    csvFile: "thema1.csv"
  },
  {
    id: 2,
    title: "Topic 2: Daily Activities", 
    description: "Learn about daily activities, shopping and time management",
    color: "bg-gradient-to-br from-secondary to-accent",
    csvFile: "thema2.csv"
  },
  {
    id: 3,
    title: "Topic 3: Greetings and Wellbeing",
    description: "Learn greetings, talking about your wellbeing and making appointments",
    color: "bg-gradient-to-br from-accent to-muted",
    csvFile: "thema3.csv"
  },
  {
    id: 4,
    title: "Topic 4: Food and Drinks",
    description: "Learn about food, meals and restaurant visits", 
    color: "bg-gradient-to-br from-primary to-secondary",
    csvFile: "thema4.csv"
  },
  {
    id: 5,
    title: "Topic 5: Housing and Furnishing",
    description: "Learn about housing situations, homes and furniture",
    color: "bg-gradient-to-br from-accent to-primary",
    csvFile: "thema5.csv"
  },
  // Add new themas here - just add thema6.csv to public folder and add config below
  // {
  //   id: 6,
  //   title: "Thema 6: Your Title",
  //   description: "Your description",
  //   color: "bg-gradient-to-br from-secondary to-primary",
  //   csvFile: "thema6.csv"
  // }
];

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (line.trim()) {
      const row: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      row.push(current.trim());
      rows.push(row);
    }
  }
  
  return rows;
}

export async function loadTopicDataFromExcel(): Promise<Thema[]> {
  try {
    const topics: Thema[] = [];
    
    for (const config of TOPIC_CONFIGS) {
      try {
        const response = await fetch(`/${config.csvFile}`);
        const csvText = await response.text();
        const rows = parseCSV(csvText);
        
        const questions: Question[] = [];
        
        // Skip header row and process data
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row[0] && row[1]) { // Ensure both question and answer exist
            questions.push({
              id: `${config.id}-${i}`,
              question: row[0].replace(/"/g, '').trim(),
              answer: row[1].replace(/"/g, '').trim()
            });
          }
        }
        
        if (questions.length > 0) {
          topics.push({
            id: config.id,
            title: config.title,
            description: config.description,
            color: config.color,
            questions
          });
        }
      } catch (csvError) {
        console.error(`Error loading ${config.csvFile}:`, csvError);
      }
    }
    
    return topics.length > 0 ? topics : getFallbackData();
  } catch (error) {
    console.error('Error loading thema data:', error);
    return getFallbackData();
  }
}

export async function loadVocabularyData(): Promise<VocabularyThema[]> {
  try {
    const response = await fetch(`/vocabulary.csv?t=${Date.now()}`);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    const vocabularyMap = new Map<string, Map<string, VocabularyWord[]>>();
    
    // Skip header row and process data
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[0] && row[1] && row[2] && row[3]) {
        const word: VocabularyWord = {
          dutch: row[0].replace(/"/g, '').trim(),
          english: row[1].replace(/"/g, '').trim(),
          example: generateExample(row[0].replace(/"/g, '').trim())
        };
        
        const topic = row[2].replace(/"/g, '').trim();
        const section = row[3].replace(/"/g, '').trim();
        
        if (!vocabularyMap.has(topic)) {
          vocabularyMap.set(topic, new Map());
        }
        
        const topicMap = vocabularyMap.get(topic)!;
        if (!topicMap.has(section)) {
          topicMap.set(section, []);
        }
        
        topicMap.get(section)!.push(word);
      }
    }
    
    const vocabularyThemas: VocabularyThema[] = [];
    let id = 1;
    
    vocabularyMap.forEach((sections, topicName) => {
      sections.forEach((words, sectionName) => {
        vocabularyThemas.push({
          id: id++,
          title: sectionName,
          description: `Learn Dutch words for ${sectionName.toLowerCase()}`,
          words,
          color: getTopicColor(id - 1)
        });
      });
    });
    
    return vocabularyThemas;
  } catch (error) {
    console.error('Error loading vocabulary data:', error);
    return getVocabularyFallbackData();
  }
}

function generateExample(dutch: string): string {
  const examples: { [key: string]: string } = {
    'dat': 'Dat is mijn huis.',
    'dit': 'Dit is mijn boek.',
    'dorp': 'Ik woon in een klein dorp.',
    'een': 'Ik heb een auto.',
    'één': 'Ik heb één zus.',
    'gaan': 'Ik ga naar school.',
    'hij': 'Hij werkt hard.',
    'ik': 'Ik ben student.',
    'in': 'Ik woon in Amsterdam.',
    'jaar': 'Dit jaar leer ik Nederlands.',
    'komen': 'Ik kom uit India.',
    'leren': 'Ik leer Nederlands op school.',
    'maand': 'Deze maand heb ik veel les.',
    'naar': 'Ik ga naar de winkel.',
    'Nederland': 'Ik woon in Nederland.',
    'Nederlands': 'Ik spreek Nederlands.',
    'niet': 'Ik ben niet ziek.',
    'nu': 'Nu ga ik naar huis.',
    'school': 'Ik ga naar school.',
    'stad': 'Amsterdam is een grote stad.',
    'uit': 'Ik kom uit Pakistan.',
    'werken': 'Ik werk bij een bedrijf.',
    'winkel': 'De winkel is open.',
    'wonen': 'Ik woon in Almere.',
    'ze': 'Ze zijn aardig.',
    'zijn': 'Ik ben gelukkig.'
  };
  
  return examples[dutch] || `Ik gebruik het woord "${dutch}".`;
}

function getTopicTitle(topicName: string): string {
  const topicTitles: { [key: string]: string } = {
    'Topic 1': 'Topic 1: Who Are You?',
    'Topic 2': 'Topic 2: Shopping',
    'Topic 3': 'Topic 3: Social Conversations',
    'Topic 4': 'Topic 4: Food and Drinks'
  };
  return topicTitles[topicName] || topicName;
}

function getTopicColor(index: number): string {
  const colors = [
    "bg-gradient-to-br from-primary to-primary-glow",
    "bg-gradient-to-br from-secondary to-accent",
    "bg-gradient-to-br from-accent to-muted",
    "bg-gradient-to-br from-primary to-secondary",
    "bg-gradient-to-br from-accent to-primary"
  ];
  return colors[index % colors.length];
}

function getVocabularyFallbackData(): VocabularyThema[] {
  return [
    {
      id: 1,
      title: "Topic 1: Basis Woorden",
      description: "Essential Dutch words for daily use",
      color: "bg-gradient-to-br from-primary to-primary-glow",
      words: [
        { dutch: "dat", english: "that", example: "Dat is mijn huis." },
        { dutch: "dit", english: "this", example: "Dit is mijn boek." }
      ]
    }
  ];
}

function getFallbackData(): Thema[] {
  return [
    {
      id: 1,
      title: "Topic 1: Personal Information",
      description: "Learn to introduce yourself and share personal information in Dutch",
      color: "bg-gradient-to-br from-primary to-primary-glow",
      questions: [
        { id: "1-1", question: "Wie ben je?", answer: "Ik ben Alper" },
        { id: "1-2", question: "Waar woon je?", answer: "Ik woon in Almere." }
        // ... more questions would be here in a real fallback
      ]
    }
    // ... more topics would be here
  ];
}