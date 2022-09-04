import React from 'react'

export default function Table({ tableData }) {

    return (
        <>
            {tableData.map((item) => {
                <div className='table-row' key={item.id}>{item.short}</div>
            })}
        </>
    )
}