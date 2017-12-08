import { ServerState, User, Channel, Question, Answer } from '../models'
import generateQuestions from '../utils/questionGenerator'
import * as uuid from 'uuid'

const firstChannel = [
  {name: "General", owner: "Admin", participants_ids: ['Admin']}
]

class Store {
  private admin: User = {
    pseudo: 'Admin',
    points: 5,
    avatar: '--',
    status: 'Connected'
  }

  state: ServerState = {
    users: [this.admin],
    channels: firstChannel,
    questions: generateQuestions('General', 2),
    answers: []
  }

  addUser(user: User){
    this.state = {
      ...this.state,
      users: [...this.state.users, user]
    }
  }

  login(payload: {pseudo: string, avatar: string}){
    const i = this.state.users.findIndex(user => user.pseudo === payload.pseudo)
    if (i >= 0) {
      const users = this.state.users.map(user => {
        return user.pseudo !== payload.pseudo ? user : {
          ...user, avatar: payload.avatar, status: 'Connected'
        } as User
      })
      this.state = {
        ...this.state,
        users
      }
    } else {
      this.addUser({
        pseudo: payload.pseudo,
        avatar: payload.avatar,
        points: 0,
        status: 'Connected'
      })
    }
  }

  addChannel(channel: Channel){
    this.state = {
      ...this.state,
      channels: [...this.state.channels, channel] 
    }
    return true
  }

  addQuestion(question: Question){
    question.id = uuid.v4();
    this.state = {
      ...this.state,
      questions: [...this.state.questions, question]
    }
    return true
  }

  addAnswer(answer: Answer){
    answer.id = uuid.v4();
    this.state = {
      ...this.state,
      answers: [...this.state.answers, answer]
    }
    return true
  }

  noteQuestion(note: {note: number}, questionId: string ){
    const questions = this.state.questions;
    if (Math.abs(note.note) < 6) {
      for (let q of questions) {
        if (q.id == questionId) {
          q.note = note.note;
        }
      }
      this.state = {
        ...this.state,
        questions: questions
      }
    }
    return true
  }

  noteAnswer(note: {note: number}, answerId: string ){
    const answers = this.state.answers;
    console.log(answers)
    console.log(answerId)
    if (Math.abs(note.note) < 6) {
      for (let a of answers) {
        if (a.id == answerId) {
          a.note = note.note;
        }
      }
      this.state = {
        ...this.state,
        answers: answers
      }
    }
    return true
  }

  users(){
    return this.state.users
  }

  channels() {
    return this.state.channels
  }

  questions() {
    return this.state.questions
  }

  answers() {
    return this.state.answers
  }

  toJSON() {
    return this.state
  }

}

const store = new Store()

export default store