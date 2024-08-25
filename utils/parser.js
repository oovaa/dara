import { TextLoader } from "langchain/document_loaders/fs/text";
import {PDFLoader} from '@langchain/community/document_loaders/fs/pdf'
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import pdf from 'pdf-parse-debugging-disabled';
import fs from 'fs';
import path from 'path';
import { config } from "dotenv";
config();


const parser = async filePath => {
  const ext = path.extname(filePath).toLowerCase();
  let loader = '';
  let docs = '';
  let allSlidesContent = '';

  switch (ext) {
    case ('.pptx'):
     loader = PPTXLoader(filePath);
     docs = await loader.load();
     allSlidesContent = docs.map(doc => doc.pageContent);
    
     return allSlidesContent;
    
    case '.pdf':
      // const pdfBuffer = fs.readFileSync(filePath);
      // try {
      //   const data = await pdf(pdfBuffer);
      //   return data.text;
      // } catch (error) {
      //   console.error("Error parsing PDF:", error);
      //   return null;
      // }
      loader = new PDFLoader(filePath);
      docs = await loader.load();
      allSlidesContent = docs.map(doc => doc.pageContent);
    
      return allSlidesContent;
    
    case '.docx':
      loader = new DocxLoader(filePath);
      docs = await loader.load();
      allSlidesContent = docs.map(doc => doc.pageContent);
    
      return allSlidesContent;
    
    case '.txt':
      loader = new TextLoader(filePath)
      docs = await loader.load();
      allSlidesContent = docs.map(doc => doc.pageContent);
    
      return allSlidesContent;
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}

export {parser}