import promptSync from 'prompt-sync';
import { printWeatherInfo } from './utils';

console.log(''); // Line separator

const prompt = promptSync();
const location = prompt('Please enter a location: ');

console.log(''); // Line separator

printWeatherInfo(location); 