import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Cabinet() {
    const { isAuth, token } = useSelector(state => state.user)
    const [tableData, setTableData] = useState('')
    const [link, setLink] = useState('')
    const [shortLink, setShortLink] = useState('')

    async function getData() {
        await axios({
            url: 'http://79.143.31.216/statistics?offset=0&limit=0',
            method: 'GET',
            headers: {
                'content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) =>
            setTableData(data)
        ).catch(e =>
            console.log(e)
        )
    }

    async function getShortLink() {
        await axios({
            url: `http://79.143.31.216/squeeze?link=${link}`,
            method: 'POST',
            // data: new URLSearchParams({
            //     link: link
            // }),
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(({ data }) => {
            setShortLink(data?.short);
            getData()
        }).catch(e => console.log(e))
    }

    return isAuth ? (
        <div className='container'>
            <div className='row'>
                <div className='change-link'>
                    <p className='main-text'>
                        Short your link here:
                    </p>
                    <div className='change-link__row'>
                        <div className='superfield superfield_margin'>
                            <input id='link-field' type='text' className='input-field' value={link} minLength='4' onChange={e => setLink(e.target.value)} placeholder=' ' />
                            <label htmlFor='link-field' className='input-field__label'>Enter link</label>
                        </div>
                        <div className='button' onClick={() => getShortLink()}>Short link</div>
                        <div className='superfield superfield_margin'>
                            <input id='shortLink-field' type='text' className='input-field' value={`http://79.143.31.216/s/${shortLink}`} minLength='4' placeholder=' ' readOnly={true} />
                            <label htmlFor='shortLink-field' className='input-field__label'>Short link</label>
                        </div>
                    </div>

                </div>
            </div>
            <Table tableData={tableData} />
        </div>
    )
        :
        (
            <Navigate to='/' />
        )
}