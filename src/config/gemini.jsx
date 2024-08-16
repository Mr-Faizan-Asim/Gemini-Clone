import React, { useState, useEffect } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@latest/es5/build/pdf.worker.min.js';

// API key and Generative AI client setup
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

// Function to load and split documents
async function loadDocuments() {
  const pdfUrl = '/Empathy.pdf'; // Specify the path to your PDF document

  try {
    // Fetch the PDF document
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());

    // Load the PDF
    const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;

    // Extract text from the PDF
    const numPages = pdf.numPages;
    const textPromises = [];
    for (let i = 1; i <= numPages; i++) {
      textPromises.push(pdf.getPage(i).then((page) => page.getTextContent()));
    }
    const textContents = await Promise.all(textPromises);
    const texts = textContents
      .map((textContent) =>
        textContent.items.map((item) => item.str).join(' ')
      )
      .join(' ');

    // Create a document object
    return [{ pageContent: texts }];
  } catch (error) {
    console.error('Error loading or processing PDF:', error);
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

// Function to retrieve relevant documents based on the query
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

// Simplified run function
async function run(prompt) {
  try {
    const documents = await loadDocuments();
    const splitDocs = splitDocuments(documents, 1000);

    // Generate context from documents (if needed)
    const context = splitDocs.map((doc) => doc.pageContent).join('\n');

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      `Context: ${context}\n\n${prompt}`
    );

    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('Error running the chat session:', error);
    return 'Error generating response.';
  }
}

export default run;
