import * as React from 'react'
import InputText from '../components/inputText'
import * as Ev from '../commons/eventModels'
// import * as api from '../commons/api'

interface FormState { 
  message: string 
}

interface FormProps {
  channelId: string, 
  questionToAnswer?: string
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

  onTextChange(value: string) {
    this.setState({
      message: value
    })
  }

  sendQuestion = (event: Ev.Submit) => {
    // TODO use api.sendQuestion
  }

  sendAnswer() {
    // TODO
  }
}

export default MessageForm