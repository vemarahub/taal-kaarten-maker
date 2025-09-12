interface Question {
  id: number;
  type: string;
  text: string;
  question: string;
  options?: string[];
  correct: number;
}

export const loadQuestionsFromCSV = async (filename: string): Promise<Question[]> => {
  try {
    const response = await fetch(`/${filename}`);
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    const questions: Question[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = parseCSVLine(line);
      if (values.length < headers.length) continue;
      
      const options = [];
      if (values[4]) options.push(values[4]);
      if (values[5]) options.push(values[5]);
      if (values[6]) options.push(values[6]);
      if (values[7]) options.push(values[7]);
      
      questions.push({
        id: parseInt(values[0]),
        type: values[1],
        text: values[2],
        question: values[3],
        options: options.length > 0 ? options : undefined,
        correct: parseInt(values[8])
      });
    }
    
    return questions;
  } catch (error) {
    console.error('Error loading CSV:', error);
    return [];
  }
};

const parseCSVLine = (line: string): string[] => {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};