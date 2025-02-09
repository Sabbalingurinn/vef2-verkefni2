import { readJson, writeFile } from './file.js';
import fs from 'node:fs/promises';

// Mock fs functions
jest.mock('node:fs/promises');

describe('File Utilities', () => {
  test('readJson should return parsed JSON data', async () => {
    fs.readFile.mockResolvedValueOnce(JSON.stringify({ key: 'value' }));

    const result = await readJson('dummy.json');
    
    expect(result).toEqual({ key: 'value' });
    expect(fs.readFile).toHaveBeenCalledWith(expect.any(String), 'utf-8');
  });

  test('readJson should return null on error', async () => {
    fs.readFile.mockRejectedValueOnce(new Error('File not found'));

    const result = await readJson('dummy.json');

    expect(result).toBeNull();
  });

  test('writeFile should write data to a file', async () => {
    await writeFile('dummy.html', '<h1>Test</h1>');

    expect(fs.writeFile).toHaveBeenCalledWith('dummy.html', '<h1>Test</h1>', 'utf8');
  });
});
