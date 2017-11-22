import * as React from 'react'
import { Link } from 'react-router-dom'

interface ChannelProps {
  channels: Array<string>
}

export default class ChannelSidebar extends React.Component<ChannelProps, {} > {

  render() {
    return (
      <div className="sideBar_channels">
        <h2 className="sideBar_channels_title">
          Channels <Link to="/newChannel"> <button className="addButton sideBar_channels_add">+</button> </Link>
        </h2>
        {
          this.props.channels.map(this.renderChannelLink)
        }
      </div>  
    )
  }

  renderChannelLink = (channel: string, index: number) => {
    return (
      <Link to={`/messages/${channel}`} className="sideBar_channel sideBar_channels_link" key={index}># {channel}</Link>
    )
  }
}