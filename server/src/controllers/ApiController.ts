import { Response, Request } from "express";
import { User, Answer } from '../models'
import Store from '../models/store'

export function getState(request: Request, response: Response){
  response.send(Store.toJSON())
}

export function ping(request: Request, response: Response){
  response.send({ ping: 'ok'})
}

export function registerUser(request: Request, response: Response) {
  Store.login(request.body)
  response.send(request.body)
}

export function getUsers(request: Request, response: Response) {
  response.send(Store.users())
}

export function getChannels(request: Request, response: Response) {
  response.send(Store.channels())
}

export function addChannel(request: Request, response: Response) {
  if (Store.addChannel(request.body)) {
    response.send(Store.channels())
  } else {
    response.status(400)
    response.send({error: 'An error occured'})
  }
}

export function readChannel(request: Request, response: Response) {
  const channelId = request.params.channelId
  if(!!channelId){
    const questions = Store.questions().filter(msg => msg.destinataire === channelId)
    const questionsWithAnswers = questions.map(q => ({
      question: q,
      answers: Store.answers().filter(msg => msg.question_id === q.id)
    }))
    response.send(questionsWithAnswers)
  } else response.send([])
}

export function addQuestion(request: Request, response: Response) {
  if (Store.addQuestion(request.body)) {
    response.send(Store.questions())
  } else {
    response.status(400)
    response.send({error: 'An error in adding a question occured'})
  }
}

export function sendAnswer(request: Request, response: Response) {
  if(Store.addAnswer(request.body)){
    response.send(Store.answers())
  } else {
    response.status(400)
    response.send({error: 'An error in adding a response occured'})
  }
}

export function noteQuestion(request: Request, response: Response) {
  const questionId = request.params.questionId
  if(Store.noteQuestion(request.body, questionId)){
    response.send(Store.questions())
  } else {
    response.status(400)
    response.send({error: 'An error in noting a question occured'})
  }  
}

export function noteAnswer(request: Request, response: Response) {
  response.send('TODO')  
}
