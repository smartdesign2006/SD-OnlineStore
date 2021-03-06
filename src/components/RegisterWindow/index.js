import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import WindowContainer from '../WindowContainer'
import { registerUser } from '../../services/user'
import UserContext from '../../contexts/UserContext'
import SectionTitle from '../SectionTitle'
import SubmitButton from '../SubmitButton'
import TextInput from '../InputFields/TextInput'
import { getValidationConstants } from '../../services/info'
import ValidationErrorMessage from '../ValidationErrorMessage'

const RegisterWindow = ({ hideWindow, loginWindowPopup }) => {
    const [validationConstants, setValidationConstants] = useState(null)
    const [showPassCondition, setShowPassCondition] = useState(false)
    const { register, errors, clearErrors, handleSubmit, setError } = useForm()
    const { setNewUser } = useContext(UserContext)

    const getUserValidationConstants = useCallback(async () => {
        const userConstants = await getValidationConstants('user')
        setValidationConstants(userConstants)
    }, [setValidationConstants])

    useEffect(() => {
        getUserValidationConstants()
    }, [getUserValidationConstants])

    if (!validationConstants) {
        return null
    }

    const registerNewUser = async (data) => {
        const registerResult = await registerUser(data)

        if (registerResult.uniqueRestriction) {
            setError(registerResult.uniqueRestriction, {
                type: 'string',
                message: registerResult.error
            })

            return setTimeout(() => clearErrors(registerResult.uniqueRestriction), 5000)
        }
        
        if (!registerResult.error) {
            setNewUser(registerResult)
            hideWindow()
        }
    }

    return (
        <WindowContainer hideWindow={hideWindow}>
            <form className={styles['register-form']} onSubmit={handleSubmit(registerNewUser)}>
                <SectionTitle title='QUICK Secure SIGN UP' />
                <div className={styles['input-group']}>
                    <TextInput
                        name='email'
                        type='email'
                        placeholder='Your email address'
                        reference={register(validationConstants.email)}
                    />
                    {errors.email && <ValidationErrorMessage message={errors.email.message} />}
                </div>
                <div className={styles['input-group']}>
                    <TextInput
                        name='firstName'
                        type='text'
                        placeholder='First name'
                        reference={register(validationConstants.firstName)}
                    />
                    { errors.firstName && 
                        <ValidationErrorMessage message={errors.firstName.message} />
                    }
                </div>
                <div className={styles['input-group']}>
                    <TextInput
                        name='lastName'
                        type='text'
                        placeholder='Last name'
                        reference={register(validationConstants.lastName)}
                    />
                    { errors.lastName && 
                        <ValidationErrorMessage message={errors.lastName.message} />
                    }
                </div>
                <div 
                    className={styles['input-group']}
                    onFocus={() => setShowPassCondition(true)}
                >
                    { showPassCondition && 
                            <div className={styles['pass-condition']}>
                                Password must contain min 6 symbols: at least 1 capital case , 1 lowercase, 1 numeric and 1 special symbol
                            </div>  
                    }
                    <TextInput
                        name='password'
                        type='password'
                        placeholder='Password'
                        reference={register(validationConstants.password)}
                    />
                    {errors.password && <ValidationErrorMessage message={errors.password.message} />}
                </div>
                <SubmitButton text='Register' />
                <div className={styles.container}>
                    <p className={styles.paragraph}>I wish to receive sale and other information related to Find you</p>
                    <label className={styles['label-checkbox']}>
                        <input
                            className={styles['checkbox-input']}
                            type="checkbox"
                            name='interest'
                        // ref={register} : TODO : comment was added to stop send the result of the checkbox
                        />
                        <span className={styles.checkmark}></span>
                    </label>
                </div>
                <p className={styles['paragraph-two']}>Find you would like to keep you up to date with news of products and services including store events, offers, promotions, and Sale information. Find you may use your contact details to get in touch by email, telephone, SMS or post. You can opt out at any time by amending your preferences in My Account. Your personal information will not be shared with other companies for their marketing purposes. To find out more, see our Privacy and Cookie Policy.</p>
                <div className={styles['third-container']}>
                    <p className={styles['paragraph-three']}>By clicking Register you agree to the Find You <Link>Terms and Conditions</Link> and <Link>Privacy&Cookie Policy</Link></p>
                    <div
                        className={styles['login-btn']}
                        onClick={loginWindowPopup}
                    >
                        Continue with login
                    </div>
                </div>
            </form>
        </WindowContainer>
    )
}

export default RegisterWindow