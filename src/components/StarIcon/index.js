import React from 'react'

const StarIcon = (props) => {
    const { fill = 'none' } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22.928" height="18.631" viewBox="0 0 22.928 18.631">
            <path id="Path_164" data-name="Path 164" d="M14224.554,516.425c-1.135-.656,4.205-3.774,3.591-6.564-.538-2.447-5.916-4.549-5.916-4.549l-.132-.046s4.914,1.682,7.56,0,3.023-6.728,3.023-6.728l2.835,6.728h7.749l-6.615,4.595,5.1,4.923-9.072-2.3S14225.688,517.082,14224.554,516.425Z" transform="translate(-14221.933 -498.345)" fill={fill} stroke="#707070" strokeWidth="1" />
        </svg>
    )
}

export default StarIcon