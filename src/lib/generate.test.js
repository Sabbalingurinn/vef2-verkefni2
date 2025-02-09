import { generateIndexHtml, generateCategoryHtml } from './generate.js';

describe('HTML Generation', () => {
  test('generateIndexHtml should create valid index page', () => {
    const categories = [
      { title: 'HTML', file: 'html.json' },
      { title: 'CSS', file: 'css.json' }
    ];

    const result = generateIndexHtml(categories);
    
    expect(result).toContain('<title>Quiz Categories</title>');
    expect(result).toContain('<a href="html.html">HTML</a>');
    expect(result).toContain('<a href="css.html">CSS</a>');
  });

  test('generateCategoryHtml should create a valid quiz page', () => {
    const categoryData = {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is JS?',
          answers: [
            { answer: 'A programming language', correct: true },
            { answer: 'A type of coffee', correct: false }
          ]
        }
      ]
    };

    const result = generateCategoryHtml(categoryData);
    
    expect(result).toContain('<title>JavaScript</title>');
    expect(result).toContain('<p><strong>Q1:</strong> What is JS?</p>');
    expect(result).toContain('<input type="radio" name="q0" value="0"> A programming language');
    expect(result).toContain('<input type="radio" name="q0" value="1"> A type of coffee');
    expect(result).toContain('checkAnswer(0, 0)');
  });
});
