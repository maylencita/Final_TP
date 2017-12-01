import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './index.css';
import Home from './views/home'
import Messages from './views/messages'
import NewChannel from './views/newChannel'
import { AppState, AppProps } from './commons/models'
import * as api from './commons/api'
import AppStore from './store'

class App extends React.Component<AppProps, AppState> {  

  constructor(props: AppProps) {
    super(props)
    this.state = {
      channels: [],
      serverStatus: ''
    }
    AppStore.bindSetState(this.setState.bind(this))
    console.debug('App started!', AppStore)
  }

  componentWillMount() {
    api.getChannels()
    .then(AppStore.updateChannels)
  }

  componentDidMount() {
    // TODO
  }

  componentWillUnmount() {
    // TODO
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route 
            exact={true} 
            path="/" 
            render={() => {
              return (
                <Home 
                  {...this.props} 
                  {...this.state}
                />
            )}} 
          />
          <Route 
            path="/messages/:channelId" 
            render={(props) => (
              <Messages channelId={props.match.params.channelId} {...this.props} {...this.state}/>
            )} 
          />
          <Route path="/newChannel" render={(props) => <NewChannel history={props.history} {...this.state}/>}/>
        </div>
      </Router>
    )  
  }

  // addChannel = (channelName: string) => {
  //   AppStore.addChannel(channelName)
  //   this.setState((prev, props) => ({
  //     channels: [...prev.channels, channelName]
  //   }))
  //   AppStore.setState((prev: AppState, props) => ({
  //     channels: [...prev.channels, channelName]
  //   }))
  // } 
}

export default App;
