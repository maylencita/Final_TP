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
  avatar: string
}

interface QuestionState {
  points: number,
  answers: Answer[]
}

class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
  constructor(props: any) {
    super(props)
    this.state = {
      points: props.question.note,
      answers: props.answers
    }
  }

  componentWillMount() {
    api.getAnswers().then(answers => {
      const realAnswers = answers.filter(a => a.question_id === this.props.question.id)
      this.setState(() => ({
        ...this.state,
        answers: realAnswers
      }))
    }).catch(error => {
      console.error('Oops [componentWillMount] ', error)
    })
  }

  render() {
    const { question, pseudo, avatar } = this.props

    return (
      <div className="message">
        <div className="message_gutter">
          <UserIcon userIcon={avatar} />
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
              {this.state.answers.map(answer => {
                return <AnswerComponent userNickName={answer.emetteur} userIcon={answer.avatar} answerText={answer.content} key={answer.id} id={answer.id} answer={answer} />
              })}
            </div>
          </div>
        </div>    
        <div className="message_buttons">
          <span className="message_buttons_points">{this.state.points}</span>
          <button className="message_buttons_addPoints" onClick={this.addPoints}>+1</button>
          <button className="question_buttons_answer" onClick={this.answerQuestion}>A</button>
        </div>
      </div>
    )
  }

  addPoints = () => {
    if (this.state.points < 5) {
      this.setState({
        ...this.state,
        points: this.state.points + 1
      })

      api.sendNoteQuestion(
        this.state.points + 1,
        this.props.question.destinataire,
        this.props.question.id
      )
    }
  }

  answerQuestion = () => {
    AppStore.setQuestionToAnswer(this.props.question.id)
  }
}

export default QuestionComponent