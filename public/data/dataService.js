import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'data.json');

export const getData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    return null;
  }
};

export const saveData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Data Submit successfully.');
  } catch (error) {
    console.error('Error Submit data file:', error);
  }
};
