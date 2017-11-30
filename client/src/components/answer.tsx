import * as React from 'react'

interface AnswerProps {
  userIcon: string,
  userNickName: string,
  answerText: string,
  answerPoints: number,
  addPoints: (answerId: string) => void,
  answerId: string
}

class Answer extends React.Component<AnswerProps, {}> {
  render() {
    return (
      <div className="answer">
        <div className="answer_gutter">
          <div className="user_icon"> {this.props.userIcon} </div>
        </div>
        <div className="answer_content">
          <div className="answer_header">{this.props.userNickName}</div>
          <div className="answer_text">
            {this.props.answerText}
          </div>
        </div>
        <div className="message_buttons">
          <span className="message_buttons_points">{this.props.answerPoints}</span>
          <button className="message_buttons_addPoints" onClick={(e) => this.props.addPoints(this.props.answerId)}>+1</button>
        </div>
      </div>    
    )
  }
}

export default Answer