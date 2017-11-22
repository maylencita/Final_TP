export interface User {
  pseudo: UserId
  points: number
  avatar: string
  status: 'Connected' | 'Offline' | 'Suspended'
}

export type UserId = string

export type ChannelId = string

export type QuestionId = string

export interface Question {
  id: string
  destinataire: ChannelId
  emetteur: UserId
  note: number
  content: string
}

export interface Answer { 
  id: string
  question_id: QuestionId
  emetteur: UserId
  note: number
  content: string
}

export interface Channel {
  name: string
  owner: UserId
  participants_ids : Array<UserId>
}

export interface ServerState {
  users : Array<User>
  channels : Array<Channel>
  questions: Array<Question>
  answers: Array<Answer>
}