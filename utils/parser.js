import { TextLoader } from 'langchain/document_loaders/fs/text'

const parseTEXT = async (path) => {
  const loader = new TextLoader(path)

  const text = await loader.load()

  //   console.log(text)
  return text[0].pageContent
}

export { parseTEXT }
