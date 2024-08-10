import { TextLoader } from "langchain/document_loaders/fs/text";
import {PDFLoader} from '@langchain/community/document_loaders/fs/pdf'
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";
import path from 'path';
import { config } from "dotenv";
config();


const parser = async filePath => {
  const ext = path.extname(filePath).toLowerCase();
  let loader = '';
  let docs = '';

  switch (ext) {
    case ('.pptx'):
     loader = PPTXLoader(filePath);
     docs = await loader.load();
     return docs[0].pageContent
    
    case '.pdf':
      loader = new PDFLoader(filePath);
      docs = await loader.load();
      return docs[0].pageContent;
    
    case '.docx':
      loader = new DocxLoader(filePath);
      docs = await loader.load();
      return docs[0].pageContent;
    
    case '.txt':
      loader = new TextLoader(filePath)
      docs = await loader.load();
      return docs[0].pageContent;
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}

export {parser}