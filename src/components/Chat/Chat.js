import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join'
import socketIO from 'socket.io-client'
import './chat.css'
import sendLogo from '../../image/sendLogo.png'
import Message from '../Message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import closeIcon from '../../image/closeIcon.png'

let socket

// const ENDPOINT = "http://localhost:4500/"
const Chat = () => {
    const [id, setId] = useState("")
    const [messages, setMessages] = useState([])
    // console.log(messages)

    const send = () => {
        const message = document.getElementById('chatinput').value
        socket.emit('message', { message, id })
        document.getElementById('chatinput').value = ""
    }
    const leave = () => {
        socket.emit('leave', { id })
    }

    useEffect(() => {

        socket = socketIO(process.env.ENDPOINT, { transports: ['websocket'] })
        socket.on('connect', () => {
            // alert("connected")
            setId(socket.id)
        })
        socket.emit('joined', { user })

        return () => {
            socket.emit('Disconnect')
            socket.off()

        }

    }, [])

    useEffect(() => {
        socket.on('welcome', (data) => {
            setMessages([...messages, data])
        })
        socket.on('userJoined', (data) => {
            setMessages([...messages, data])

        })
        socket.on('sendMessage', (data => {
            setMessages([...messages, data])

        }))
        socket.on('left', (data) => {
            setMessages([...messages, data])

        })

        return () => {
            socket.off()
        }
    }, [messages])


    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>

                    <h2>paChat</h2>
                    <a href='/' ><img src={closeIcon} alt='X' onClick={leave} /></a>
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {messages.map((item, i) => <Message user={item.id === id ? "" : item.user} message={item.message} key={i} classs={item.id === id ? "right" : "left"} />)}
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input onKeyDown={(e) => e.key === 'Enter' ? send() : null} type='text' id='chatinput' />
                    <button type='submit' onClick={send} className='sendbtn' ><img src={sendLogo} alt='send' /></button>

                </div>
            </div>

        </div>
    )
}

export default Chat