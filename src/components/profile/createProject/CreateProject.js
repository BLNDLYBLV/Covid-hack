import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'

import styles from './createProject.module.css'
import APIService from '../../../api.service'
import { Redirect } from 'react-router';
import {setUserState} from '../../../actions/user'


function CreateProject(props) {

    const [deposit,setDeposit] = useState('');
    const [file,setFile] = useState('');
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [target,setTarget] = useState('');
    const [description,setDesc] = useState('');
    const [projectId,setProjectId] = useState('');
    const [toProfile,setToProfile] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
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
        setProjectId(result1.data.id);
        if(result1.status==200){
            var res2 =await APIService.uploadProjectPhoto(result1.data.id,data);
            if(res2.status==200){
                var res3 = await APIService.getUser(user.data.user._id);
                if(res3.status===200){
                    console.log(res3);
                    dispatch(setUserState(res3));
                }
                setToProfile(true);
            }
        }
    }

    const handleProjectImage = (e) => {
        e.preventDefault()
        setFile(e.target.files[0])
    }

    if(toProfile){
        console.log(projectId);
        return (<Redirect to={`/project/${projectId}`} />)
    }

    return (
        <div className={styles.create_body}>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    Name: <input className={styles.create_body_input} required onChange={handleName} value={name} placeholder="Name" type="text" />
                </div>
                <div>
                    Description: <textarea required onChange={handleDesc} value={description} placeholder="Description" rows='5' cols='20' />
                </div>
                <div>
                    Address: <textarea required onChange={handleAddress} value={address} placeholder="Address" rows='5' cols='20' />
                </div>
                <div>
                    Deposit: <input className={styles.create_body_input} required onChange={handleDeposit} value={deposit} placeholder="Deposit" type='number' />
                </div>
                <div>
                    Target: <input className={styles.create_body_input} required onChange={handleTarget} value={target} placeholder="Target" type="number" />
                </div>
                <div>
                    Project image: <input required onChange={handleProjectImage} type="file" name="file" id="" />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            
        </div>
    )
}

export default CreateProject
