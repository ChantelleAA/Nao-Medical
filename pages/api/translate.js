// pages/api/translate.js
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, sourceLanguage, targetLanguage, context } = req.body;

    if (!text || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Build a prompt that emphasizes medical terminology accuracy
    const prompt = `
      Translate the following healthcare text from ${sourceLanguage} to ${targetLanguage}.
      Maintain the accuracy of medical terminology and ensure the translation is culturally appropriate.
      
      Original text (${sourceLanguage}): "${text}"
      
      Translated text (${targetLanguage}):
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a medical translator specialized in healthcare terminology. Provide accurate translations while preserving medical context and meaning."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent translations
      max_tokens: 1000,
    });

    // Extract the translated text from the response
    const translatedText = response.choices[0].message.content.trim();

    // Return the translated text
    return res.status(200).json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({ error: error.message || 'Failed to translate text' });
  }
}