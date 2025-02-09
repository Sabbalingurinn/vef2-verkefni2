export function parseIndexJson(data) {
    if (!Array.isArray(data)) {
      console.error('Invalid index.json: not an array');
      return [];
    }
  
    return data.filter((item) => {
      const isValid = typeof item.title === 'string' && typeof item.file === 'string';
  
      if (isValid && !item.title.toLowerCase().includes('ógild')) {
        return true;
      }
  
      console.warn('Skipping invalid or excluded entry in index.json:', item);
      return false;
    });
  }
  
  

export function parseCategoryJson(data) {
    if (!data?.title || !Array.isArray(data.questions)) {
      console.error('Invalid category data:', data);
      return null;
    }
  
    const validQuestions = data.questions
      .map((question) => {
        if (typeof question.question !== 'string' || !Array.isArray(question.answers)) {
          console.warn('Skipping invalid question:', question);
          return null;
        }
  
        question.answers = question.answers.filter(
          (answer) =>
            typeof answer.answer === 'string' &&
            typeof answer.correct === 'boolean' &&
            !answer.answer.toLowerCase().includes('ógilt') 
        );
  
        return question.answers.length > 0 ? question : null; 
      })
      .filter(Boolean); 
  
    return { ...data, questions: validQuestions };
  }
  