import * as React from 'react'
import InputText from '../components/inputText'
import * as Ev from '../commons/eventModels'
import * as api from '../commons/api'
import { User } from '../commons/models'

interface FormState { 
  message: string 
}

interface FormProps {
  channelId: string, 
  questionToAnswer?: string,
  user?: User
}

class MessageForm extends React.Component<FormProps, FormState> {

  state: FormState = {
    message: ''
  }

  render() {
    const { questionToAnswer } = this.props
    const placeholder = !!questionToAnswer ? `Send an answer to question ${questionToAnswer}` : 'Ask a question on #Channel'
    const formTarget = !!questionToAnswer ? this.sendAnswer : this.sendQuestion

    return (
      <form onSubmit={formTarget}>
        <InputText placeholder={placeholder} value={this.state.message} onChange={this.onTextChange}/>
      </form>    
    )
  }

  onTextChange = (value: string) => {
    this.setState({
      message: value
    })
  }

  sendQuestion = (event: Ev.Submit) => {
    api.sendQuestion({
        destinataire: this.props.channelId,
        emetteur: (!!this.props.user?this.props.user.pseudo:"Admin"),
        content: this.state.message
      });
    this.setState({
      message: ''
    })
  }

  sendAnswer = (event: Ev.Submit) => {
    api.sendAnswer({
        question_id: !!this.props.questionToAnswer ? this.props.questionToAnswer : 'null',
        emetteur: (!!this.props.user?this.props.user.pseudo:"Admin"),
        content: this.state.message,
        destinataire: this.props.channelId
      });
    this.setState({
      message: ''
    })
  }
}

export default MessageForm