import { getSummarizeRes } from '../utils/chain'
import { parseTEXT } from '../utils/parser'

// For testing
async function testSummarization() {
  const info = await parseTEXT('./story.txt')
  const data = await getSummarizeRes(info)
  console.log(data)
}

//   / Uncomment to run the test
testSummarization()
