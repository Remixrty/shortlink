import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import RegForm from '../components/RegForm'
import '../styles/Form.css'


const SignUp = () => {
    const { registerActive } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    function closeForm() {
        dispatch({ type: 'NOBODY_ACTIVE' })
    }


    return (
        <div className={registerActive ? 'main active' : 'main'} onClick={() => closeForm()} >
            <div className='form' onClick={e => e.stopPropagation()}>
                <RegForm />
            </div>
        </div>
    )

}

export default SignUp