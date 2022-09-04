import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from '../components/LoginForm'
import '../styles/Form.css'

const SignIn = () => {
    const { loginActive } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    function closeForm() {
        dispatch({ type: 'NOBODY_ACTIVE' })
    }

    return (
        <div className={loginActive ? 'main active' : 'main'} onClick={() => closeForm()} >
            <div className='form' onClick={e => e.stopPropagation()}>
                <LoginForm />
            </div>
        </div>


    )
}

export default SignIn

