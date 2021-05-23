import React, { useEffect, useState } from 'react'
import styles from './project.module.css';
import config from '../../config'

import APIService from '../../api.service'
import { withRouter } from 'react-router';

function Project(props) {

    const projectId = props.match.params.id;
    const [project,setProject] = useState('');

    useEffect(async() => {
        var res = await APIService.getProject(projectId);
        console.log(res);
        setProject(res.data);
    }, [] );

    console.log(project);

    return (
        <div className={styles.project_body}>
            {(project)? (<div><img src={`${config.BASE_URL}user/seeker/${project.project.image}`} className={styles.project_cover_img} alt="" />
            <div className={styles.project_content}>
            <p>Company Name: &nbsp; {project.project.name}</p>
            <p>Description: &nbsp; {project.project.description}</p>
            <p>Address: &nbsp; {project.project.address}</p>
            </div>
            </div>):(null)}
        </div>
    )
}

export default withRouter(Project);
