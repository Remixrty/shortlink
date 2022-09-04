import React from 'react'
import { Link } from 'react-router-dom'
import Table from '../components/Table'
import '../styles/Mainpage.css'

export default function Mainpage() {
    const tableData = [
        {
            link: 'https://stackoverflow.',
            shortLink: '79.143.31.216/s/7ASMU',
            views: 134
        },
    ]
    const exampleText = `https://stackoverflow.com/questions/69868956/how-to-redirect-in-react-router-v6

=>
    
79.143.31.216/s/7ASMU`

    return (
        <div className='container'>
            <div className='row'>
                <div className='main-text'>
                    Get short link for your business:
                </div>
                <textarea className='text-field text-field_margin' readOnly={true} value={exampleText}>
                </textarea>
            </div>
            <div className='row'>
                <div className='main-text'>
                    Check statistics from your profile:
                </div>
                <Table tableData={tableData} />
            </div>


        </div>
    )
}