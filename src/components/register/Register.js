import React, { useState} from 'react'

import ApiService from '../../api.service'

function Register() {
    
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');

    const handleEmail = (event) =>{
        setEmail(event.target.value);
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value);
    }

    const handleName = (event) =>{
        setName(event.target.value);
    }

    const submit = async () => {
        var res = await ApiService.registerAsSeeker(email,password,name);
        console.log(res);
    }

    return (
        <div>
            <input value={email} onChange={handleEmail} type="email" placeholder="email" />
            <input value={password} onChange={handlePassword} type="password" placeholder="password" />
            <input value={name} onChange={handleName} type="text" placeholder="name" />
            <button onClick={submit}>submit</button>
        </div>
    )
}

export default Register
