import * as loremIpsum from 'lorem-ipsum'
import * as uuid from 'uuid'

const generateQuestions = (channelId: string, total: number) => {
  return Array(total).fill(1).map((_, index) => {
    const text = loremIpsum({count: 30, units: 'words'})
    return {
      id: uuid.v4(),
      destinataire: channelId,
      emetteur: 'Admin',
      content: text,
      note: 0,
      avatar: '*/*'
    }
  })
}

export default generateQuestions