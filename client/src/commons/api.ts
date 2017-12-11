import { fetchJson } from './protocol'
import { Channel, User, Question, Answer } from './models'

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
  const url = `${SERVER_URL}/channels/${question.destinataire}/questions`
  const method = 'PUT'
  return fetchJson<Array<Question>>(url, {
    method: method,
    body: question
  }).catch(error => {
    console.error('Impossible de lire les questions ', error)
  })
}

interface AnswerPayLoad {
  question_id: string,
  emetteur: string,
  content: string,
  destinataire: string
}

export function sendAnswer(answer: AnswerPayLoad) {
  const url = `${SERVER_URL}/channels/${answer.destinataire}/questions/${answer.question_id}`
  const method = 'PUT'
  return fetchJson<Array<Question>>(url, {
    method: method,
    body: answer
  }).catch(error => {
    console.error('Impossible de lire les reponses ', error)
  })
}

export function sendNoteQuestion(note: number, channelId: string, questionId: string ) {
  const url = `${SERVER_URL}/channels/${channelId}/questions/${questionId}/note`
  const method = `POST`
  return fetchJson<Array<Question>>(url, {
    method: method,
    body: {note}
  }).catch(error => {
    console.error('Impossible de noter la question ', error)
  })
}

export function sendNoteAnswer(note: number, answerId: string) {
  const url = `${SERVER_URL}/channels/random/answers/${answerId}/note`
  const method = `POST`
  return fetchJson<Array<Question>>(url, {
    method: method,
    body: {note}
  }).catch(error => {
    console.error('Impossible de noter la reponse ', error)
  })
}
  
export function getQuestions() {
  return fetchJson<Array<Question>>(`${SERVER_URL}/questions`)
}

export function getAnswers() {
  return fetchJson<Array<Answer>>(`${SERVER_URL}/answers`)
}
