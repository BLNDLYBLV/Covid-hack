import React, { useEffect } from 'react'
import styles from './project.module.css';

import APIService from '../../api.service'
import { withRouter } from 'react-router';

function Project(props) {

    const projectId = props.match.params.id;
    
    useEffect(() => {
        // var res = APIService.getProject(projectId);
    }, [] );

    return (
        <div className={styles.project_body}>
            <img src="/images/1.jpg" className={styles.project_cover_img} alt="" />
            <h1>Project title</h1>
            <h4>location</h4>
            <h4>seeker acc</h4>
        </div>
    )
}

export default withRouter(Project);
