import React, { useState } from 'react'

import styles from './createProject.module.css'
import APIService from '../../../api.service'


function CreateProject(props) {

    const [deposit,setDeposit] = useState();
    const [file,setFile] = useState('');
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [target,setTarget] = useState();
    const [description,setDesc] = useState('');

    const handleDeposit = (e) => {
        setDeposit(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleDesc = (e) => {
        setDesc(e.target.value)
    }

    const handleTarget = (e) => {
        setTarget(e.target.value)
    }

    const handleSubmit = async (e) => {
        console.log(props);
        e.preventDefault();
        var data = new FormData();
        data.append('file',file);
        var result1 = await APIService.createProject(name,target,description,address,props.data.user._id,deposit,'kzdhgkhjabgd');
        if(result1.status==200){
            var res2 =await APIService.uploadProjectPhoto(result1.data.id,data);
        }
    }

    const handleProjectImage = (e) => {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    return (
        <div className={styles.create_body}>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    Name: <input onChange={handleName} value={name} placeholder="Name" type="text" />
                </div>
                <div>
                    Description: <input onChange={handleDesc} value={description} placeholder="Description" type="text" />
                </div>
                <div>
                    Address: <input onChange={handleAddress} value={address} placeholder="Address" type="text" />
                </div>
                <div>
                    Deposit: <input onChange={handleDeposit} value={deposit} placeholder="Deposit" type="text" />
                </div>
                <div>
                    Target: <input onChange={handleTarget} value={target} placeholder="Target" type="text" />
                </div>
                <div>
                    <input onChange={handleProjectImage} type="file" name="file" id="" />
                </div>
                <div>
                    <input type="submit" value="Submit  " />
                </div>
            </form>
            
        </div>
    )
}

export default CreateProject
