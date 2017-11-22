import * as React from 'react'
import { Link } from 'react-router-dom'
import { History } from 'history';

import AppStore from '../store'
import * as api from '../commons/api'
import { User } from '../commons/models'  
import * as Ev from '../commons/eventModels'

interface ChannelFormState {
  channelName: string
}

interface ChannelFormProps {
  history: History
  user?: User 
}

class NewChannelForm extends React.Component<ChannelFormProps, ChannelFormState> {

  state: ChannelFormState = {
    channelName: ''
  }
  
  render() {
    return (
      <div className="newChannel">
        <div className="newChannel_content">
          <Link to="/" className="newChannel_close"> <span>X</span> </Link>
          <form onSubmit={this.handleAddChannel}>
            <h1>Create a channel</h1>
            <h4> (Note: you have to be logged to create a channel) </h4>
            <label>Name</label>
            <div className="inputWrapper">
              <input 
                id="channelName" 
                placeholder="e.g. leads" 
                value={this.state.channelName}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="newChannel_buttonsWrapper">
              <button className="cancel" type="cancel">Cancel</button>
              <button className="create">Create channel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  handleNameChange = (event: Ev.Input) => {
    this.setState({
      channelName: (event.target as HTMLInputElement).value
    })
  }

  handleAddChannel = (event: Ev.Submit) => {
    if (this.props.user) {
      api.newChannel({
        name: this.state.channelName,
        owner: this.props.user.pseudo,
        participants_ids: [this.props.user.pseudo]
      }).then(newChannels => {
        AppStore.updateChannels(newChannels || [])      
      })
    }

    history.back()
    event.preventDefault()
  }
}

export default NewChannelForm