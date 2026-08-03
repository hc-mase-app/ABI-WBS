import mammoth from 'mammoth';

const result = await mammoth.extractRawText({ path: 'data/Kuesioner-Dasar-Abhitech-Speak-Up-System-ad650c.docx' });
console.log(result.value);
