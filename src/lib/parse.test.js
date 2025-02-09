import { parseIndexJson, parseCategoryJson } from './parse.js';

test('parseIndexJson removes invalid entries', () => {
  const input = [
    { title: 'HTML', file: 'html.json' },
    { foo: 'Invalid entry' }, // Should be removed
    { title: 'Ógild skrá', file: 'invalid.json' } // Should be removed
  ];

  const result = parseIndexJson(input);
  
  expect(result).toEqual([{ title: 'HTML', file: 'html.json' }]);
});

test('parseCategoryJson removes invalid questions', () => {
  const input = {
    title: 'JavaScript',
    questions: [
      {
        question: 'Valid question?',
        answers: [{ answer: 'Yes', correct: true }]
      },
      {
        question: 'Invalid question?',
        answers: { foo: 'bar' } // Should be removed
      }
    ]
  };

  const result = parseCategoryJson(input);
  
  expect(result.questions.length).toBe(1); // Only the valid question should remain
});
