import React from 'react'
import { Link } from 'react-router-dom'
import Table from '../components/Table'
import '../styles/Mainpage.css'
import '../styles/Cabinet.css'

export default function Mainpage() {
    const tableData = [
        {
            id: 3357,
            target: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects',
            short: '00109',
            counter: 1
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
                <div className='table-card'>
                    <table className='table-card__table'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th >target</th>
                                <th >short</th>
                                <th >count</th>
                            </tr>
                        </thead>
                        <Table tableData={tableData} />
                    </table>
                </div>
            </div>


        </div>
    )
}