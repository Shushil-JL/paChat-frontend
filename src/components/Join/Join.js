import React, { useState } from 'react'
import './join.css'
import logo from '../../image/logo.png'
import { Link } from 'react-router-dom'


let user
const sendUser = () => {
  user = document.getElementById('joinName').value
  document.getElementById('joinName').value = ""
  // console.log(user)
}

const Join = () => {
  const [name, setName] = useState("")

  return (
    <div className='joinPage'>
      <div className='joinContainer'>
        <img src={logo} alt='logo' />
        <h1>paChat</h1>
        <input type='text' placeholder='User Name' id='joinName' onChange={(e) => setName(e.target.value)} />
        <Link onClick={(e) => !name ? e.preventDefault() : null} to={"/chat"}><button className='joinbtn' onClick={sendUser}>Join</button></Link>
      </div>

    </div>
  )
}

export default Join
export { user }