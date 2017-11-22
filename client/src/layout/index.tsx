import * as React from 'react'
import { Link } from 'react-router-dom'

import ChannelSidebar from '../components/channelsSidebar'
import { User } from '../commons/models'

interface LayoutProps {
  appName: string
  children?: React.ReactNode
  serverStatus?: string
  user?: User
  channels: Array<string>
}

const layout = (props: LayoutProps) => {
  const { serverStatus } = props

  return (
    <div className="container">
      <div className="sideBar">
        <div className="sideBar_title">
          <h1><Link to="/">{props.appName}</Link></h1>
          {props.user && <div> <span>{props.user.avatar}</span> <span>{props.user.pseudo}</span></div>}
        </div>
        <ChannelSidebar {...props}/>
        {serverStatus &&
          <div className={`sideBar_serverstatus ${serverStatus}`}>
            <span>Server is {serverStatus}</span>
          </div>
        }
      </div>
      <div className="homeContainer">
        {props.children}
      </div>  
    </div>    
  )
}

export default layout