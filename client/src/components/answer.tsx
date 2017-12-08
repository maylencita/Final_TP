import * as React from 'react'
import * as api from '../commons/api'

interface AnswerProps {
  userIcon: string,
  userNickName: string,
  answerText: string,
  id: string
}

interface AnswerState {
  points: number
}

class AnswerComponent extends React.Component<AnswerProps, AnswerState> {
  state = {
    points: 0
  }

  render() {
    const { userIcon, userNickName, answerText } = this.props

    return (
    <div className="answer">
      <div className="answer_gutter">
        <div className="user_icon"> {userIcon} </div>
      </div>
      <div className="answer_content">
        <div className="answer_header">{userNickName}</div>
        <div className="answer_text">
          {answerText}
        </div>
      </div>
      <div className="message_buttons">
        <span className="message_buttons_points">{this.state.points}</span>
        <button className="message_buttons_addPoints" onClick={this.addPoints}>+1</button>
      </div>
    </div>    

    )
  }  

  addPoints = () => {
    this.setState({
      ...this.state,
      points: this.state.points + 1
    })
    api.sendPointsAnswer(
        this.state.points + 1,
        this.props.id
        );
  }
}

export default AnswerComponent