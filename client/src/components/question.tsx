import * as React from "react";

import AnswerComponent from "./answer";
import { UserIcon, UserName } from "./user";
import { Question, Answer } from "../commons/models";
import AppStore from "../store";

interface QuestionProps {
  question: Question;
  answers: Array<Answer>;
}

interface QuestionState {
  points: number;
}

// TODO
// - afficher le bon userIcon
// - modifier l'action d'ajouter un point pour envoyer l'information au serveur

class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
  state = {
    points: 0
  };

  render() {
    const { question, answers } = this.props;

    return (
      <div className="message">
        <div className="message_gutter">
          <UserIcon userIcon={"ToD"} />
        </div>
        <div className="message_content">
          <UserName userNickname={question.emetteur} />
          <div className="message_content_body">
            <div className="message_content_question">
              <div className="question_text">{question.content}</div>
            </div>
            <div className="message_content_answers">
              {answers.map(answer => {
                return (
                  <AnswerComponent
                    userNickName={answer.emetteur}
                    userIcon="^_^'"
                    answerText={answer.content}
                    key={answer.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="message_buttons">
          <span className="message_buttons_points">{this.state.points}</span>
          <button
            className="message_buttons_addPoints"
            onClick={this.addPoints}
          >
            +1
          </button>
          <button
            className="question_buttons_answer"
            onClick={this.answerQuestion}
          >
            A
          </button>
        </div>
      </div>
    );
  }

  addPoints = () => {
    this.setState({
      ...this.state,
      points: this.state.points + 1
    });
  };

  answerQuestion = () => {
    AppStore.setQuestionToAnswer(this.props.question.id);
  };
}

export default QuestionComponent;
