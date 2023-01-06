import React, { useEffect, useState } from 'react'

const Chat = ({socket, room}) => {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])


  const sendMessage = async (e) => { 
    e.preventDefault()
    if (message !== '') {
      const messageData = {
        room,
        message,
        time: new Date().getHours() + ':' + new Date().getMinutes()
      }
      await socket.emit('messageToBack', messageData)
      setMessageList(list => [...list, messageData])
      setMessage('')
    }
  }

  useEffect(() => {
    socket.on('messageToFront', data => {
      setMessageList(list => [...list, data])
    })
  
    return () => {
      socket.off('messageToFront', data => {
        setMessageList(list => [...list, data])
      })
    }

  }, [socket])
  

  return (
    <>
        <center>
          <h1> {room} </h1>
        </center>
        
        <div className='messages'>
          {
            messageList.map((data, index) => {
              return (
                <div key={index} className='message'>
                  <span> {data.message} </span>
                  <span> {data.time} </span>
                </div>
              )
            })
          }
        </div>
        <form className='form' onSubmit={e => sendMessage(e)} >
            <input type="text" placeholder='Message' onChange={e => setMessage(e.target.value)} value={message} />
            <button>Send</button>
        </form>
    </>
  )
}

export default Chat