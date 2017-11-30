import * as React from 'react'

import AnswerComponent from './answer'
import { UserIcon, UserName } from './user'
import { Question, Answer, User } from '../commons/models'
import AppStore from '../store'
import * as api from '../commons/api'

interface QuestionProps {
  question: Question
  answers: Array<Answer>
}

interface QuestionState {
  users: Array<User>
}

// TODO 
// - afficher le bon userIcon
// - modifier l'action d'ajouter un point pour envoyer l'information au serveur

class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
  state: QuestionState = {
    users: []
  }

  componentWillMount() {
    api.getUsers()
    .then(users => {
      this.setState(() => ({
        users: users
      }))
    }).catch(error => {
      console.error('oops', error)
    })
  }

  render() {
    const { question, answers } = this.props

    return (
      <div className="message">
        <div className="message_gutter">
          <UserIcon userIcon={this.getUserIcon(question.emetteur)} />
        </div>
        <div className="message_content">
          <UserName userNickname={question.emetteur} />
          <div className="message_content_body">
            <div className="message_content_question"> 
              <div className="question_text">
                {question.content}
              </div>
            </div>
            <div className="message_content_answers">
              {answers.map(answer => {
                return <AnswerComponent 
                  userNickName={answer.emetteur} 
                  addPoints={this.addAnswerPoints} 
                  userIcon={this.getUserIcon(answer.emetteur)} 
                  answerText={answer.content} 
                  key={answer.id} 
                  answerPoints={answer.note}
                  answerId={answer.id}
                />
              })}
            </div>
          </div>
        </div>    
        <div className="message_buttons">
          <span className="message_buttons_points">{this.props.question.note}</span>
          <button className="message_buttons_addPoints" onClick={this.addPoints}>+1</button>
          <button className="question_buttons_answer" onClick={this.answerQuestion}>A</button>
        </div>
      </div>  
    )
  }  

  addPoints = () => {
    api.addPointsToQuestion(this.props.question.destinataire, this.props.question.id).then(channels => {
      AppStore.updateChannels(channels || [])      
    })
  }

  getUserIcon = (emetteur: string) => {
    let userI = this.state.users.find(user => user.pseudo === emetteur)
    if (userI) {
      return userI.avatar
    }
    return '';
  }

  answerQuestion = () => {
    AppStore.setQuestionToAnswer(this.props.question.id)
  }

  addAnswerPoints = (answerId: string) => {
    api.addPointsToAnswer(this.props.question.destinataire, answerId).then(channels => {
      AppStore.updateChannels(channels || [])      
    })
  }
}

export default QuestionComponent