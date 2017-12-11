import * as React from 'react'
import Layout from '../layout'

import QuestionComponent from '../components/question'
import MessageForm from '../components/messageForm'
import { QuestionWithAnswers, User } from '../commons/models'
import * as api from '../commons/api'
import App from '../store'

interface MessagesProps {
  appName: string
  channelId: string
  channels: Array<string>
  questionToAnswer?: string
  user?: User
}
interface MessagesState {
  messages: Array<QuestionWithAnswers>
}

class Messages extends React.Component<MessagesProps, MessagesState> {
  state: MessagesState = {
    messages: []
  }

  componentWillMount() {
    api.getMessages(this.props.channelId)
    .then(messages => {
      this.setState(() => ({messages: messages}))
    }).catch(error => {
      console.error('Oops [componentWillMount] ', error)
    })
  }

  componentWillReceiveProps(nextProps: any) {
    api.getMessages(nextProps.channelId)
    .then(messages => {
      this.setState(() => ({messages: messages}))
    }).catch(error => {
      console.error('Oops [componentWillReceiveProps] ', error)
    })
  }

  render() {
    return (
      <Layout {...this.props}>
        <div className="messagesContainer_title">
          <h2> onClick={this.disableAnswer}> #{this.props.channelId}</h2>
          </div>
          <div className="messagesContainer_messages">
          {renderQuestions(this.state.messages)}
        </div>
        <div className="messagesContainer_footer">
          <MessageForm channelId={this.props.channelId} questionToAnswer={this.props.questionToAnswer} user={this.props.user} />
          <div className="messagesContainer_notifBar" />
        </div>
      </Layout>
    )   
  }

  disableAnswer = () => {
    App.disableAnswerMode()
  }
}

function renderQuestions(questions: Array<QuestionWithAnswers>) {
  return questions.map(q => (
    <QuestionComponent question={q.question} answers={q.answers} key={q.question.id} pseudo={q.question.emetteur} avatar={q.question.avatar}/>
  ))
}

export default Messages
