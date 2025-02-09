import { writeFile } from './file.js';


function isValidQuestion(question) {
  return (
    typeof question.question === 'string' &&
    Array.isArray(question.answers) &&
    question.answers.every(
      (answer) =>
        typeof answer.answer === 'string' && typeof answer.correct === 'boolean'
    )
  );
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
  
        if (question.question.toLowerCase().includes('ógilt')) {
          console.warn(`Fixing invalid title in question: ${question.question}`);
          question.question = question.question.replace(/ógilt/i, '[Ógilt Fjarlægt]');
        }
  
        question.answers = question.answers.filter(
          (answer) =>
            typeof answer.answer === 'string' &&
            typeof answer.correct === 'boolean'
        );
  
        return question.answers.length > 0 ? question : null; 
      })
      .filter(Boolean); 
  
    return { ...data, questions: validQuestions };
  }
  

export function generateIndexHtml(categories) {
    const links = categories
      .map(
        (cat) => `<li><a href="${cat.file.replace('.json', '.html')}">${cat.title}</a></li>`
      )
      .join('');
  
    return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Categories</title>
    <link rel="stylesheet" href="href="styles.css"">
  </head>
  <body>
    <h1>Categories</h1>
    <ul>${links}</ul>
  </body>
  </html>`;
  }
  
  export function generateCategoryHtml(categoryData) {
    const questionsHtml = categoryData.questions
      .map(
        (q, i) => `
      <div class="question">
        <p><strong>Q${i + 1}:</strong> ${q.question}</p>
        ${q.answers
          .map(
            (a, j) => `
          <label>
            <input type="radio" name="q${i}" value="${j}">
            ${a.answer}
          </label><br>
        `
          )
          .join('')}
        <button onclick="checkAnswer(${i}, ${q.answers.findIndex((a) => a.correct)})">
          Check Answer
        </button>
        <p id="result${i}" class="result"></p>
      </div>
    `
      )
      .join('');
  
    return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${categoryData.title}</title>
    <link rel="stylesheet" href="href="styles.css"">
  </head>
  <body>
    <h1>${categoryData.title}</h1>
    ${questionsHtml}
    <script>
      function checkAnswer(questionIndex, correctIndex) {
        const selected = document.querySelector('input[name="q' + questionIndex + '"]:checked');
        const result = document.getElementById('result' + questionIndex);
        
        // ✅ Ensure previous styles are removed
        result.classList.remove("correct", "wrong");
  
        if (!selected) {
          result.textContent = "Please select an answer!";
          result.classList.add("wrong");
          return;
        }
  
        if (parseInt(selected.value, 10) === correctIndex) {
          result.textContent = "Correct!";
          result.classList.add("correct");
        } else {
          result.textContent = "Wrong!";
          result.classList.add("wrong");
        }
  
        console.log("Result applied:", result.className, result.textContent);
      }
    </script>
  </body>
  </html>`;
  }
  
  
export async function writeHtml(outputPath, htmlContent) {
  await writeFile(outputPath, htmlContent);
}
