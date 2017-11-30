import { Response, Request } from "express";
import { User, Answer } from '../models'
import Store from '../models/store'
import * as uuid from 'uuid'

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
      question:q,
      answers: Store.answers().filter(msg => msg.question_id === q.id)
    }))
    response.send(questionsWithAnswers)
  } else response.send([])
}

export function addQuestion(request: Request, response: Response) {
  const channelId = request.params.channelId;
  const question = request.body;
  if(!!channelId && Store.channels().findIndex(chan => chan.name === channelId) >=0){
    Store.addQuestion({
      id:"" + (Store.questions().length),
      destinataire: request.body.destinataire,
      emetteur: request.body.emetteur,
      note: 0,
      content: request.body.content
    })
    response.send(Store.channels)
  } else{
    response.send([])
  }
}

export function sendAnswer(request: Request, response: Response) {
  const questionId = request.params.questionId
  const channelId = request.params.channelId
  if((!!questionId && Store.questions().findIndex(q => q.id === questionId) >=0)
  && (!!channelId && Store.channels().findIndex(chan => chan.name === channelId) >=0)){
    Store.addAnswer({
      id: "" + (Store.answers().length),
      question_id: request.body.question_id,
      emetteur: request.body.emetteur,
      note:0,
      content:request.body.content
    })
    response.send(Store.channels)
  } else{
    response.send([])
  }
}

export function noteQuestion(request: Request, response: Response) {
  Store.addNoteQuestion(request.params.questionId);
  response.send(Store.channels())  
}

export function noteAnswer(request: Request, response: Response) {
  console.log(request.params.answerId);
  Store.addNoteAnswer(request.params.answerId);
  console.log(Store.answers())
  response.send(Store.channels())  
}
