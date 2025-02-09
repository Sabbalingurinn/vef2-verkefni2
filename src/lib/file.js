import fs from 'node:fs/promises';
import path from 'node:path';


export async function readJson(filePath) {
  try {
    const data = await fs.readFile(path.resolve(filePath), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
    return null;
  }
}


export async function writeFile(filePath, content) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(path.resolve(filePath), content, 'utf8');
    console.log(`File written: ${filePath}`);
  } catch (error) {
    console.error(`Error writing file ${filePath}: ${error.message}`);
  }
}
