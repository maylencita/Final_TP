import * as React from 'react'

import Layout from '../layout'
import Input from '../components/inputText'
import AppStore from '../store'
import * as api from '../commons/api'
import * as Ev from '../commons/eventModels'

interface HomeProps {
  appName: string,  
  serverStatus: string
  channels: Array<string>
}

interface HomeState {
  pseudo: string
  avatar: string
}

const avatars = [':)', '*_*', '^_^', '^_^\'', '-_-', '--\'', '[-_-]']

class Home extends React.Component<HomeProps, HomeState> {

  state: HomeState = {
    pseudo: '',
    avatar: ''      
  }

  render() {
    return (
      <Layout {...this.props}>
        <div className="homeView">
          <form onSubmit={this.login}>
            <h3> WELCOME TO {this.props.appName} </h3>

            <h2>What is your name ?</h2>
            <Input placeholder="your name" className="name" onChange={this.changeName} value={this.state.pseudo}/>

            <h3>Please choose an avatar</h3>
            <select onChange={this.changeAvatar}>
              <option value="" key={0}>_</option>
              {avatars.map((av, i) => <option value={av} key={i}>{av}</option>)}
            </select>  
            
            <div className="homeView_buttonWrapper">
              <button type="submit">Ok, let's go</button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }

  changeName = (value: string) => {
    this.setState((prev: HomeProps, next: HomeState) => ({
      pseudo: value
    }))
  }

  changeAvatar = (event: Ev.Select) => {
    const avatar = event.currentTarget.value
    this.setState(() => ({
      avatar: avatar
    }))
  }

  login = (event: Ev.Submit) => {
    if (this.state.pseudo && this.state.avatar) {
      api.login(this.state)
      .then(AppStore.setUser)
    }
    event.preventDefault()
  }
}

export default Home