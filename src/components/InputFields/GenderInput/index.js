import React from 'react'
import styles from './index.module.css'

const GenderInput = ({ currentGender, onChange }) => {
    const genderInfos = [
        { value: 'M', name: 'Male' },
        { value: 'F', name: 'Female' }
    ]

    return (
        <div className={styles.container}>
            {
                genderInfos.map(gender => {
                    return (
                        <label key={gender.value} className={styles['gender-label']}>
                            <input data-testid={`gender-${gender.name.toLowerCase()}`}
                                type="radio"
                                value={gender.value}
                                name="gender"
                                checked={currentGender === gender.value}
                                onChange={() => onChange(gender.value)}
                            />
                            {gender.name}
                        </label>
                    )
                })
            }
        </div>
    )
}

export default GenderInput