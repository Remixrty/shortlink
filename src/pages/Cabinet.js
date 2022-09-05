import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import '../styles/Cabinet.css'
import { orderCounter, orderShort, orderTarget } from '../store/slices/sortSlice'
import { decreaseOffset, increaseOffset } from '../store/slices/offsetSlice'


export default function Cabinet() {
    const { isAuth, token } = useSelector(state => state.user)
    const { order } = useSelector(state => state.sort)
    const { offset } = useSelector(state => state.offset)
    const { username } = useSelector(state => state.user)
    const [tableData, setTableData] = useState('')
    const [link, setLink] = useState('')
    const [shortLink, setShortLink] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (tableData === '') getData()
    }, [])

    useEffect(() => {
        getData()
    }, [order, offset])


    async function getData() {
        await axios({
            url: `http://79.143.31.216/statistics?order=${order}&offset=${offset}&limit=20`,
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

    function sortBy(sort) {
        if (sort === 'SORT_BY_TARGET') {
            dispatch(orderTarget())
        }
        else if (sort === 'SORT_BY_SHORT') {
            dispatch(orderShort())
        }
        else if (sort === 'SORT_BY_COUNTER') {
            dispatch(orderCounter())
        }
    }

    function offsetChange(direction) {
        if (direction === 'increase') {
            dispatch(increaseOffset())
        }
        else dispatch(decreaseOffset())
    }

    function copyToClipboard(text) {
        document.getElementById('shortLink-field-label').innerHTML = 'Short link'
        navigator.clipboard.writeText(text)
        document.getElementById('shortLink-field-label').innerHTML += ' COPIED'
    }

    return isAuth ? (
        <div className='container'>
            <div className='row'>
                <div className='change-link'>
                    <p className='main-text'>
                        Short your link here:
                    </p>
                    <div className='change-link__row'>
                        <div className='superfield'>
                            <input id='link-field' type='text' className='input-field' value={link} minLength='4' onChange={e => setLink(e.target.value)} placeholder=' ' />
                            <label htmlFor='link-field' className='input-field__label'>Enter link</label>
                        </div>
                        <div className='button' onClick={() => getShortLink()}>Short link</div>
                        <div className='superfield '>

                            <input id='shortLink-field' type='text' className='input-field' value={`http://79.143.31.216/s/${shortLink}`} minLength='4' placeholder=' ' readOnly={true} onClick={e => copyToClipboard(e.target.value)} />

                            <label htmlFor='shortLink-field' id='shortLink-field-label' className='input-field__label'>Short link</label>
                        </div>
                    </div>

                </div>
            </div>
            <div className='table-card'>
                <p className='main-text'>{username}'s stats</p>
                <table className='table-card__table'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th onClick={() => sortBy('SORT_BY_TARGET')}>target</th>
                            <th onClick={() => sortBy('SORT_BY_SHORT')}>short</th>
                            <th onClick={() => sortBy('SORT_BY_COUNTER')}>count</th>
                        </tr>
                    </thead>
                    <Table tableData={tableData} />
                </table>
                <div className='pagination'>
                    <button className='pagination__button' id='decrease-button' onClick={() => offsetChange('decrease')}>prev</button>
                    <button className='pagination__button' onClick={() => offsetChange('increase')}>next</button>
                </div>
            </div>


        </div>
    )
        :
        (
            <Navigate to='/' />
        )
}