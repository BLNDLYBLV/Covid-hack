import React, { useEffect, useState } from 'react'
import styles from './card.module.css';

import APIService from '../../api.service'
import { Redirect } from 'react-router';

function Card(props) {

    useEffect(async() => {
        // var res = await APIService.getPosts();
    },[])

    const [toProject,setToProject] = useState(false);

    const goToProject = (he) => {
        setToProject(true)
    }

    return (
        <div onClick={goToProject} className={styles.card_body}>
            {toProject ? <Redirect to='/project/123'/> : <></>}
            <img alt='card_pic' className={styles.card_img} src={`images/${props.imgsrc}.jpg`}></img>
        </div>
    )
}

export default Card
