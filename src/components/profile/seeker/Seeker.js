import React, { useState } from 'react'
import styles from './seeker.module.css'

function Seeker(props) {

    const [curStage,setCurStage] = useState(props.data.seeker.stage+1);

    const handleCurStage = (x) => {
        setCurStage(x);
    }

    // console.log(props.data);
    return (
        <div>
            {props.data.seeker.isVerified === false ? (
            <div className={styles.seeker_box}>
                <div style={{textAlign: "center"}}>
                    <button onClick={() => handleCurStage(1)}>Stage 1</button>
                    <button onClick={() => handleCurStage(2)}>Stage 2</button>
                    <button onClick={() => handleCurStage(3)}>Stage 3</button>
                    <button onClick={() => handleCurStage(4)}>Stage 4</button>
                    <button onClick={() => handleCurStage(5)}>Stage 5</button>
                </div>
                {curStage>=props.data.seeker.stage+1 ?
                <form style={{textAlign: "center",marginTop : "30px"}} onSubmit={event => event.preventDefault()}>
                    <input type="file" name={'f'+props.data.seeker.stage+1} id="" />
                    <input type="submit" value="submit" />
                </form>
                : null}
            </div>
            )
             : (null)}
        </div>
    )
}

export default Seeker
