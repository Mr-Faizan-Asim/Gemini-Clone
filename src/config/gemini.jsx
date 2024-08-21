import React from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const apiKey = 'AIzaSyDyTfBW0kE7rRPK9v2BFfOjXdvE6caXG2g';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.93,
  topK: 63,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

// Fetch documents from Firestore
async function loadDocuments() {
  try {
    const querySnapshot = await getDocs(collection(db, 'documents'));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ pageContent: doc.data().content });
    });
    return documents;
  } catch (error) {
    console.error('Error fetching documents from Firestore:', error);
    return [];
  }
}

function splitDocuments(documents, chunkSize) {
  const chunks = [];
  for (let doc of documents) {
    for (let i = 0; i < doc.pageContent.length; i += chunkSize) {
      chunks.push({
        pageContent: doc.pageContent.slice(i, i + chunkSize),
      });
    }
  }
  return chunks;
}

// Function to analyze emotional tone
function analyzeEmotion(prompt) {
  if (/hello|hi|hey/.test(prompt.toLowerCase())) {
    return 'greeting';
  } else if (/sad|unhappy|depressed|pain|hurt/.test(prompt.toLowerCase())) {
    return 'empathetic';
  } else if (/happy|joyful|excited|good/.test(prompt.toLowerCase())) {
    return 'positive';
  }
  return 'neutral';
}

async function retrieveRelevantDocs(query, documents) {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: 'models/embedding-001',
    googleApiKey: apiKey,
  });

  try {
    const embeddedQuery = await embeddings.embedQuery(query);
    const vectorstore = new Chroma.fromDocuments(documents, embeddings);

    const retriever = vectorstore.asRetriever({
      searchType: 'similarity',
      search_kwargs: { k: 10 },
    });

    const retrievedDocs = await retriever.invoke(query);
    return retrievedDocs;
  } catch (error) {
    console.error('Error retrieving relevant documents:', error);
    return [];
  }
}

function combineRetrievedDocs(retrievedDocs) {
  return retrievedDocs.map((doc) => doc.pageContent).join('\n');
}

async function run(prompt) {
  try {
    const emotion = analyzeEmotion(prompt);
    let responsePrefix = '';

    if (emotion === 'greeting') {
      responsePrefix = 'Hello! How are you doing today? Is there anything specific on your mind?';
    } else if (emotion === 'empathetic') {
      responsePrefix = 'I understand you might be going through a tough time, and I’m here to help. ';
    } else if (emotion === 'positive') {
      responsePrefix = 'It’s wonderful to hear that you’re feeling good! Let’s celebrate that positivity. ';
    }

    const documents = await loadDocuments();
    const splitDocs = splitDocuments(documents, 1000);

    const context = splitDocs.map((doc) => doc.pageContent).join('\n');

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      `${responsePrefix} Context: ${context}\n\n${prompt}`
    );

    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('Error running the chat session:', error);
    return 'Error generating response.';
  }
}

export default run;
