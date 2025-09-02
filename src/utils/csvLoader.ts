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

const THEMA_CONFIGS = [
  {
    id: 1,
    title: "Thema 1: Persoonlijke Informatie",
    description: "Leer jezelf voor te stellen en persoonlijke informatie te delen in het Nederlands",
    color: "bg-gradient-to-br from-primary to-primary-glow",
    csvFile: "thema1.csv"
  },
  {
    id: 2,
    title: "Thema 2: Dagelijkse Activiteiten", 
    description: "Leer over dagelijkse activiteiten, winkelen en tijdsindeling",
    color: "bg-gradient-to-br from-secondary to-accent",
    csvFile: "thema2.csv"
  },
  {
    id: 3,
    title: "Thema 3: Begroetingen en Welzijn",
    description: "Leer begroetingen, over je welzijn spreken en afspraken maken",
    color: "bg-gradient-to-br from-accent to-muted",
    csvFile: "thema3.csv"
  },
  {
    id: 4,
    title: "Thema 4: Eten en Drinken",
    description: "Leer over voedsel, maaltijden en restaurant bezoeken", 
    color: "bg-gradient-to-br from-primary to-secondary",
    csvFile: "thema4.csv"
  },
  {
    id: 5,
    title: "Thema 5: Wonen en Huisinrichting",
    description: "Leer over woningsituaties, huizen en meubels",
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

export async function loadThemaDataFromExcel(): Promise<Thema[]> {
  try {
    const themas: Thema[] = [];
    
    for (const config of THEMA_CONFIGS) {
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
          themas.push({
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
    
    return themas.length > 0 ? themas : getFallbackData();
  } catch (error) {
    console.error('Error loading thema data:', error);
    return getFallbackData();
  }
}

function getFallbackData(): Thema[] {
  return [
    {
      id: 1,
      title: "Thema 1: Persoonlijke Informatie",
      description: "Leer jezelf voor te stellen en persoonlijke informatie te delen in het Nederlands",
      color: "bg-gradient-to-br from-primary to-primary-glow",
      questions: [
        { id: "1-1", question: "Wie ben je?", answer: "Ik ben Alper" },
        { id: "1-2", question: "Waar woon je?", answer: "Ik woon in Almere." }
        // ... more questions would be here in a real fallback
      ]
    }
    // ... more themas would be here
  ];
}