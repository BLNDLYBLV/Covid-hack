import React from 'react'
import styles from './home.module.css'

import Card from '../card/Card'

function Home() {
    return (
        <div className={styles.home_body}>
            <div className={styles.home_need_content}>
                <div className={`${styles.home_text} ${styles.home_text_first}`}>
                    <div className={styles.home_text1}>Need investment?</div>
                    <div className={styles.home_text2}>For building PSA oxygen plants</div>
                </div>
                <div className={styles.home_text}>
                    <img alt='investment_pic' className={styles.home_invest_svg} src="images/noun_invest2.png"></img>
                </div>
            </div>
            <div className={styles.home_feed_body}>
                <div className={styles.home_feed_header}>
                    <div className={styles.home_feed_search}>
                        <input placeholder='Search' type="text"/>
                    </div>
                    <div className={styles.home_feed_filter}>
                        <button>Filter</button>
                    </div>
                </div>
                <div className={styles.home_feed_content}>
                    <div className={styles.home_feed_row}>
                        <Card imgsrc="1"/>
                        <Card imgsrc="2"/>
                        <Card imgsrc="3"/>
                    </div>
                    <div className={styles.home_feed_row}>
                        <Card imgsrc="4"/>
                        <Card imgsrc="5"/>
                        <Card imgsrc="1"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
