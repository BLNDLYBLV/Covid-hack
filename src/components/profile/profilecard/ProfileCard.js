import React from 'react'
import { useSelector } from 'react-redux'
import styles from './profileCard.module.css'

function ProfileCard() {
    
    var user = useSelector(state => state.user);
    // console.log(user);
    user = user.data;
    return (
        <div className={styles.prcard_box}>
            <table>
            <tr className={styles.prcard_img_box}>
                <td>
                    <img src="images/default.jpg" className={styles.prcard_img} alt="" />
                </td>
                <td>
                    <tr>
                        <h1>Name: {user.user.name}</h1>
                    </tr>
                    <tr>
                        <h4>email: {user.user.email}</h4>
                    </tr>
                    <tr>
                        <h4>type: seeker</h4>
                    </tr>
                </td>
            </tr>
            </table>
        </div>
    )
}

export default ProfileCard
