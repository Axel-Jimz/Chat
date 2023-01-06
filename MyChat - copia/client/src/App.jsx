import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './components/Chat'
import Friend from './components/Friend'
import Loader from './components/Loader'

const socket = io.connect('http://localhost:3000')

const App = () => {
  const [showChat, setShowChat] = useState(false)
  const [room, setRoom] = useState('')

  return (
    <div className='container'>
      <div className='friends'>
          <h2>Friends</h2>
          <Friend socket={socket} name='Sala 1' setRoom={setRoom} setShowChat={setShowChat} />
          <Friend socket={socket} name='Sala 2' setRoom={setRoom} setShowChat={setShowChat} />
          <Friend socket={socket} name='Sala 3' setRoom={setRoom} setShowChat={setShowChat} />
      </div>
      <div className='chat'>
        {
          showChat ? <Chat socket={socket} room={room} /> : <Loader/>
        }
      </div>
    </div>
  )
}

export default App