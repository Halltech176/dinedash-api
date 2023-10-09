import LanguageData from './language.json';

export const LanguageName: string[] = LanguageData.map((item) => item.name);

console.log({ LanguageName });
