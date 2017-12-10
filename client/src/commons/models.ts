export interface AppState {
  channels: Array<string>
  serverStatus: string
  user?: User
  questionToAnswer?: string
  // ajout de liste de questions
  //questions: Array<Question>
  
}

export interface AppProps {
  appName: string
}

export interface User {
  pseudo: string
  avatar?: string
  points: number
  status: 'Connected' | 'Offline' | 'Suspended'
}

export type UserId = string

export type ChannelId = string

export interface Question {
  id: string
  destinataire: ChannelId 
  emetteur: UserId
  content: string
}

export interface QuestionWithAnswers {
  question: Question
  answers: Array<Answer>
}

export interface Answer { 
  id: string
  question_id: string
  emetteur: UserId
  content: string
}

export interface Note { 
  ref_id: string
  note: number // from -5 to 5
}

export interface Channel {
  name: string
  owner: string // owner pseudo
  participants_ids: Array<string>
}
