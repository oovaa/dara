import { getSummarizeRes } from '../tools/summarize.js'
import generateQs from '../tools/generateQs.js'
import { parser } from '../utils/parser.js'


// For testing
async function testSummarization() {
  const info = await parser('./story.txt')
  const data = await generateQs(info)
  console.log(data)
}

//   / Uncomment to run the test
testSummarization()