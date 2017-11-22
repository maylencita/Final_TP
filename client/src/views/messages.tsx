import * as React from 'react'
import Layout from '../layout'

import QuestionComponent from '../components/question'
import MessageForm from '../components/messageForm'
import { QuestionWithAnswers } from '../commons/models'
// import * as api from '../commons/api'

interface MessagesProps {
  appName: string
  channelId: string
  channels: Array<string>
  questionToAnswer?: string
}
interface MessagesState {
  messages: Array<QuestionWithAnswers>
}

class Messages extends React.Component<MessagesProps, MessagesState> {

  state: MessagesState = {
    messages: []
  }

  componentWillMount() {
    // TODO use api.getMessages(this.props.channelId)
  }

  render() {
    return (
      <Layout {...this.props}>
        <div className="messagesContainer_title">
          <h2># {this.props.channelId}</h2>
          </div>
          <div className="messagesContainer_messages">
          {renderQuestions(this.state.messages)}
        </div>
        <div className="messagesContainer_footer">
          <MessageForm channelId={this.props.channelId} questionToAnswer={this.props.questionToAnswer} />
          <div className="messagesContainer_notifBar" />
        </div>
      </Layout>
    )   
  }
}

function renderQuestions(questions: Array<QuestionWithAnswers>) {
  return questions.map(q => (
    <QuestionComponent question={q.question} answers={q.answers} key={q.question.id} />
  ))
}

export default Messages
