import React, { useEffect, useState } from 'react'
import styles from './project.module.css';
import config from '../../config'

import APIService from '../../api.service'
import { withRouter } from 'react-router';
import 'semantic-ui-css/semantic.min.css'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import TruffleContract from '@truffle/contract'
import SeekerPage from '../transaction/transaction_seeker'
import Investor from '../transaction/transaction_provider'
function Project(props) {

    const projectId = props.match.params.id;
    const [project,setProject] = useState('');
    const [curStage,setCurStage] = useState(1);

    const handleCurStage = (x) => {
        if(x<=project.seeker.stage+1)
        setCurStage(x);
    }
    const [open,setOpen] = useState(false)
    var user = useSelector(state => state.user);
    user = user.data;
    console.log("User next")
    console.log(user)
    if(user){
        window.userType = user.user.userType;
        window.signedIn = true;
    } else{
        window.signedIn = false;
    }
    console.log("Usertype: "+window.userType)
    const openPanel = ()=>{

    }
    useEffect(async() => {
        var res = await APIService.getProject(projectId);
        console.log(res);
        setProject(res.data);
    }, [] );
    console.log(project);

    return (
        <>
        <div className={styles.project_body}>
            {(project)? (<div><img src={project.project.image!='0' ? `${config.BASE_URL}user/seeker/${project.project.image}` : `http://localhost:3000/images/6.jpg`} className={styles.project_cover_img} alt="" />
            <div className={styles.project_content}>
            <p>Company Name: &nbsp; {project.project.name}</p>
            <p>Description: &nbsp; {project.project.description}</p>
            <p>Address: &nbsp; {project.project.address}</p>
            </div>
            </div>):(null)}
        {(window.signedIn)?(
        (window.userType==1)?(
            <div style={{float: 'right',marginTop:'10px'}}>
                 <Modal
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={<Button>Seeker</Button>}
                >
            <Modal.Header>Seeker</Modal.Header>

            <Modal.Content image>
            <Image size='huge' src='https://www.reuters.com/resizer/60bsfoAyJ-g4Vu7xY8RpLWpFkIg=/960x0/cloudfront-us-east-2.images.arcpublishing.com/reuters/KO22TXO2SBIHXCAKOWRLSBQWLU.jpg' wrapped />
            <Modal.Description>
            <p>
            <SeekerPage user={user} project={project}></SeekerPage>
            </p>
            </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
            <Button negative onClick={() => setOpen(false)}>
            Cancel
            </Button>
            </Modal.Actions>
            </Modal>
            </div>
       
       
        ):(
            <div style={{float: 'right',marginTop:'10px'}}>
            <Modal
           open={open}
           onClose={() => setOpen(false)}
           onOpen={() => setOpen(true)}
           trigger={<Button>Investor</Button>}
           >
       <Modal.Header>Investor</Modal.Header>

       <Modal.Content image>
       <Image size='medium' src='https://www.reuters.com/resizer/60bsfoAyJ-g4Vu7xY8RpLWpFkIg=/960x0/cloudfront-us-east-2.images.arcpublishing.com/reuters/KO22TXO2SBIHXCAKOWRLSBQWLU.jpg' wrapped />
       <Modal.Description>
       <p>
       <Investor user={user} project={project}></Investor>
       </p>
       </Modal.Description>
       </Modal.Content>
       <Modal.Actions>
       <Button negative onClick={() => setOpen(false)}>
       Cancel
       </Button>
       </Modal.Actions>
       </Modal>
       </div>
  
        )):(null)
}
        

        </div>
        <div className={styles.project_details}>
            {(project)?(<><div className={styles.project_project_details}>
                <p><strong>Company details :-</strong></p>
                <p>Initial deposit: {project.project.deposit}</p>
                <p>Investor count: {project.project.investor_count}</p>
                <p>Coins recieved: {project.project.amount_received}</p>
                <p>Target to achieve: {project.project.totalRequiredTokens}</p>
                <p>Created on : {project.project.sanctionedData}</p>
            </div>
            <div className={styles.project_seeker_details}>
                <p><strong>Owner details :-</strong></p>
                <p>Name: {project.user.name}</p>
                <p>Email: {project.user.email}</p>
                <p>Files related to licensing:</p>
                <div style={{textAlign: "center"}}>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f1}`}>File 1</a> </button>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f2}`}>File 2</a> </button>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f3}`}>File 3</a> </button>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f4}`}>File 4</a> </button>
                    <button className={`${styles.seeker_stage_btn}`} > <a href={`${config.BASE_URL}user/seeker/${project.seeker.f5}`}>File 5</a> </button>
                </div>
            </div></>) : (null)}
        </div>
        </>
    )
}

export default withRouter(Project);
