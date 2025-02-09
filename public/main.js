import path from 'node:path';
import { parseIndexJson } from '../src/lib/parse.js';
import { readJson } from '../src/lib/file.js';
import {
  parseCategoryJson,
  generateIndexHtml,
  generateCategoryHtml,
  writeHtml,
} from '../src/lib/generate.js';

const DATA_DIR = './data';
const DIST_DIR = './dist';

async function main() {
  const indexPath = path.join(DATA_DIR, 'index.json');
  const indexJson = await readJson(indexPath);

  if (!Array.isArray(indexJson)) {
    console.error('Invalid index.json format.');
    return;
  }


  const validCategories = parseIndexJson(indexJson);

  const indexHtml = generateIndexHtml(validCategories);
  await writeHtml(path.join(DIST_DIR, 'index.html'), indexHtml);


  if (validCategories.length === 0) {
    console.warn('No valid categories found. Exiting.');
    return;
  }

  console.log('Processing category files...');

  for (const category of validCategories) {
    const categoryPath = path.join(DATA_DIR, category.file);
    console.log(`Processing: ${categoryPath}`);

    const categoryJson = await readJson(categoryPath);
    if (!categoryJson) {
      console.warn(`Skipping ${category.file}: Could not read JSON.`);
      continue;
    }

    const categoryData = parseCategoryJson(categoryJson);
    if (!categoryData) {
      console.warn(`Skipping ${category.file}: Invalid data.`);
      continue;
    }

    const outputFilePath = path.join(DIST_DIR, category.file.replace('.json', '.html'));

    const categoryHtml = generateCategoryHtml(categoryData);
    await writeHtml(outputFilePath, categoryHtml);
    console.log(`File written: ${outputFilePath}`);
  }

  console.log('HTML generation completed successfully!');
}

main().catch((err) => {
  console.error('Error during HTML generation:', err);
});
