import React from 'react'
import styles from './card.module.css';

function Card(props) {
    return (
        <div className={styles.card_body}>
            <img alt='card_pic' className={styles.card_img} src={`images/${props.imgsrc}.jpg`}></img>
        </div>
    )
}

export default Card
