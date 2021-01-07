import React, { useState, useMemo, useContext, useCallback } from 'react'
import styles from '../index.module.css'
import UserContext from '../../../Context'
import LoginWindow from '../../loginWindow'
import RegisterWindow from '../../registerWindow'

const ProfileIconLink = () => {
    const [isFilled, setIsFilled] = useState(false)
    const [isLoginRendered, setIsLoginRendered] = useState(false)
    const [isRegisterRender, setIsRegisterRender] = useState(false)

    const { user } = useContext(UserContext)

    const fillColor = useMemo(() => {
        return isFilled
            ? '#40e5eb'
            : 'none'
    }, [isFilled])

    const handleLoginWindowPopup = () => {
        if (user.userId) {
            //TODO: Maybe display a message to user if already logged in?
            return
        }

        setIsLoginRendered(true)
    }
    
    const handleRegisterWindowPopup = useCallback(() => {
        if (user.userId) {
            //TODO: Maybe display a message to user if already logged in?
            return
        }

        setIsLoginRendered(false)
        setIsRegisterRender(true)
    },[])
    
    const hideLoginWindow = useCallback(() => setIsLoginRendered(false), [])
    const hideRegisterWindow = useCallback(() => setIsRegisterRender(false), [])

    return (
        <>
            <div
                className={styles.container}
                onMouseEnter={() => setIsFilled(true)}
                onMouseLeave={() => setIsFilled(false)}
                onClick={handleLoginWindowPopup}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 52.844 49.636">
                    <g id="Group_3" data-name="Group 3" transform="translate(-1814.241 -103.364)">
                        <g id="Ellipse_3" data-name="Ellipse 3" transform="translate(1831 118)" fill={fillColor} stroke="#707070" strokeWidth="1.5">
                            <circle cx="9" cy="9" r="9" stroke="none" />
                            <circle cx="9" cy="9" r="8.25" fill="none" />
                        </g>
                        <path id="Path_40" data-name="Path 40" d="M1865.171,1120c-83.069,51.771,19.546,40,19.546,40" transform="translate(-17.717 -1016)" fill="none" stroke="#707070" strokeWidth="1.5" />
                        <g id="Polygon_3" data-name="Polygon 3" transform="translate(1828 137)" fill={fillColor}>
                            <path d="M 23.46231651306152 15.25 L 1.537684082984924 15.25 L 12.5 1.218235611915588 L 23.46231651306152 15.25 Z" stroke="none" />
                            <path d="M 12.5 2.436481475830078 L 3.075376510620117 14.5 L 21.92462348937988 14.5 L 12.5 2.436481475830078 M 12.5 0 L 25 16 L 0 16 L 12.5 0 Z" stroke="none" fill="#707070" />
                        </g>
                    </g>
                </svg>
            </div>
            { isLoginRendered && <LoginWindow hideWindow={hideLoginWindow} registerWindowPopup={handleRegisterWindowPopup} />}
            { isRegisterRender && <RegisterWindow hideWindow={hideRegisterWindow}/> }
        </>
    )
}

export default ProfileIconLink