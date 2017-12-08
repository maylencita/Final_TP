import * as React from 'react'

import AnswerComponent from './answer'
import { UserIcon, UserName } from './user'
import { Question, Answer } from '../commons/models'
import AppStore from '../store'
import * as api from '../commons/api'

interface QuestionProps {
  question: Question
  answers: Array<Answer>
  pseudo: string
  icon: string
}

interface QuestionState {
  points: number
}

class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
  state = {
    points: 0
  }

  render() {
    const { question, answers, pseudo, icon } = this.props
    return (
      <div className="message">
        <div className="message_gutter">
          <UserIcon userIcon={icon} />
        </div>
        <div className="message_content">
          <UserName userNickname={pseudo} />
          <div className="message_content_body">
            <div className="message_content_question"> 
              <div className="question_text">
                {question.content}
              </div>
            </div>
            <div className="message_content_answers">
              {answers.map(answer => {
                return <AnswerComponent userNickName={answer.emetteur} userIcon={answer.avatar} answerText={answer.content} id={answer.id} key={answer.id}/>
              })}
            </div>
          </div>
        </div>    
        <div className="message_buttons">
          <span className="message_buttons_points">{question.note}</span>
          <button className="message_buttons_addPoints" onClick={this.addPoints}>+1</button>
          <button className="question_buttons_answer" onClick={this.answerQuestion}>A</button>
        </div>
      </div>  
    )
  }  

  addPoints = () => {
    this.setState({
      ...this.state,
      points: this.state.points + 1
    })
    api.sendPointsQuestion(
        this.state.points + 1,
        this.props.question.destinataire,
        this.props.question.id);
  }

  answerQuestion = () => {
    AppStore.setQuestionToAnswer(this.props.question.id)
  }
}

export default QuestionComponent