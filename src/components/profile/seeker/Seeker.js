import React, { useState } from 'react'
import styles from './seeker.module.css'

import APIService from '../../../api.service'
import {setUserState} from '../../../actions/user'
import { useDispatch } from 'react-redux';

import config from '../../../config'
import CreateProject from '../createProject/CreateProject';

function Seeker(props) {

    const [curStage,setCurStage] = useState(1);
    const [file,SetFile] = useState('');

    const fileMap = new Map();

    fileMap[1]=props.data.seeker.f1;
    fileMap[2]=props.data.seeker.f2;
    fileMap[3]=props.data.seeker.f3;
    fileMap[4]=props.data.seeker.f4;
    fileMap[5]=props.data.seeker.f5;


    const dispatch = useDispatch();

    const handleCurStage = (x) => {
        if(x<=props.data.seeker.stage+1)
        setCurStage(x);
    }

    const handleFile = (e) => {
        e.preventDefault()
        console.log(e.target.files);
        SetFile(e.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append('file', file)
        var result = await APIService.sendFile(props.data.user._id,data);
        if(result.status==200){
            var res2 = await APIService.getUser(props.data.user._id);
            if(res2.status===200){
                dispatch(setUserState(res2));
            }
        }
    }

    const createProject = () => {
        APIService.createProject(props.data.seeker._id,10000);
    }

    console.log(props.data);
    return (
        <div>
            {(
            <div className={styles.seeker_box}>
                {(props.data.seeker.stage==5  && props.data.seeker.project=='0' )? (<CreateProject data={props.data}/>) : null}
                <div style={{textAlign: "center"}}>
                {props.data.seeker.stage == 5 ? 'View all files:':null}
                    <button className={`${styles.seeker_stage_btn} ${props.data.seeker.stage+1<1 ? styles.seeker_disable : null}`} onClick={() => handleCurStage(1)}>Stage 1</button>
                    <button className={`${styles.seeker_stage_btn} ${props.data.seeker.stage+1<2 ? styles.seeker_disable : null}`} onClick={() => handleCurStage(2)}>Stage 2</button>
                    <button className={`${styles.seeker_stage_btn} ${props.data.seeker.stage+1<3 ? styles.seeker_disable : null}`} onClick={() => handleCurStage(3)}>Stage 3</button>
                    <button className={`${styles.seeker_stage_btn} ${props.data.seeker.stage+1<4 ? styles.seeker_disable : null}`} onClick={() => handleCurStage(4)}>Stage 4</button>
                    <button className={`${styles.seeker_stage_btn} ${props.data.seeker.stage+1<5 ? styles.seeker_disable : null}`} onClick={() => handleCurStage(5)}>Stage 5</button>
                </div>
                {curStage>=props.data.seeker.stage+1 ?
                <form style={{textAlign: "center",marginTop : "30px"}} onSubmit={handleSubmit}>
                    <p>Select file for stage {curStage}</p>
                    <input onChange={handleFile} type="file" name='file' id="" />
                    <input type="submit" value="submit" />
                </form>
                
                : 
                <div style={{textAlign: 'center'}}>
                    <div className={styles.seeker_file_link}>
                        <a target="_blank" rel="noopener noreferrer" href={config.BASE_URL+`user/seeker/${fileMap[curStage]}`}>Click here to open file {curStage}</a>
                    </div>
                </div>}
                
            </div>
            )}
        </div>
    )
}

export default Seeker
