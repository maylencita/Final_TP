import { AppState, AppProps } from './commons/models'
import { ping } from './commons/api'
import { Channel, User } from './commons/models'


type StateReducer<K extends keyof AppState> = (prevState: AppState, props: AppProps) => Pick<AppState, K>

class Store {
  
  // tslint:disable:no-any
  _setState: any // <K extends keyof S>: (f: StateReducer<S, P, K>) => void
  // tslint:enable:no-any
  constructor () {
    this.bindSetState.bind(this)
  }

  bindSetState<K extends keyof AppState>(setState: (f: StateReducer<K>) => void): void {
    this._setState = setState
  }

  addChannel = (channelName: string) => {
    this._setState((prev: AppState) => ({
      channels: [...prev.channels, channelName]
    }))    
  }
/*
  addQuestion(question: Question){
    this._setState((prev: AppState) => ({
      questions: [...prev.questions, question]
    })) 
  }
  */

  updateChannels = (newChannels: Array<Channel>) => {
    this._setState(() => ({
      channels: newChannels.map(c => c.name)
    }))
  }

  setUser = (user: User) => {
    this._setState(() => ({
      user: user
    }))    
  }

  setQuestionToAnswer = (questionId: string) => {
    this._setState(() => ({
      questionToAnswer: questionId
    }))
  }

  pingServer = () => {
    ping()
    .then((response) => {
      this._setState(() => ({
        serverStatus: response.ping
      }))
    }).catch(error => {
      console.error('Login error: ', error)
    }) 
  }

}

const AppStore = new Store()

export default AppStore