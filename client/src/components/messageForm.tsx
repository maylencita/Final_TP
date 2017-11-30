import * as React from 'react'
import InputText from '../components/inputText'
import * as Ev from '../commons/eventModels'
import * as api from '../commons/api'
import { User } from '../commons/models'  
import AppStore from '../store'

interface FormState { 
  message: string 
}

interface FormProps {
  channelId: string, 
  questionToAnswer?: string
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
    if (this.props.user) {
      api.sendQuestion({ 
        destinataire: this.props.channelId,
        emetteur: this.props.user.pseudo,
        content: this.state.message
      }).then(channels => {
        AppStore.updateChannels(channels || [])      
      })
    }

    event.preventDefault()
  }

  sendAnswer = (event: Ev.Submit) => {
    console.debug('sendAnswer')
    if (this.props.user && this.props.questionToAnswer) {
      api.sendAnswer({ 
        question_id: this.props.questionToAnswer,
        emetteur: this.props.user.pseudo,
        content: this.state.message
      },
    this.props.channelId).then(channels => {
        AppStore.updateChannels(channels || [])      
      })
    }
  event.preventDefault()
}
}

export default MessageForm