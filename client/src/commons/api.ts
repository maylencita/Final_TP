import { fetchJson } from './protocol'
import { Channel, User, Question } from './models'

const SERVER_URL = 'http://localhost:3001'

export function ping() {
  return fetchJson<{ping: string}>(`${SERVER_URL}/ping`)
    .catch(error => {
      console.error('Server unreachable: ', error)
      return {ping: 'ko'}
    })
}

export function newChannel(channel: Channel) {
  return fetchJson<Array<Channel>>(`${SERVER_URL}/channels`, {
    method: 'PUT',
    body: channel
  }).catch(error => {
    console.error('Impossible to get channels: ', error)
  })  
}

export function login(payload: {pseudo: string, avatar: string}) {
  return fetchJson<User>(`${SERVER_URL}/login`, {
    method: 'POST',
    body: payload
  })
}

export function getChannels() {
  return fetchJson<Array<Channel>>(`${SERVER_URL}/channels`)
}

export function getMessages(channelId: string) {
  return fetchJson<Array<Question>>(`${SERVER_URL}/channels/${channelId}/questions`)
}

interface QuestionPayload {
  destinataire: string,
  emetteur: string,
  content: string
}

export function sendQuestion(question: QuestionPayload) {
  return fetchJson<Array<Channel>>(`${SERVER_URL}/channels/${question.destinataire}/questions`, {
    method: 'PUT',
    body: question
  })
}