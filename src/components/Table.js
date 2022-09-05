import React from 'react'

export default function Table({ tableData }) {
    const data = [...tableData]
    return (
        <tbody>
            {data.map((item, index) =>
                <tr key={index}>
                    <td>{item.id}</td>
                    <td><a href={item.target} target='blank'>{item?.target?.length > 40 ? `${item.target.substr(0, 40)}...` : item.target}</a></td>
                    <td><a href={`http://79.143.31.216/s/${item.short}`} target='blank'>{item.short}</a></td>
                    <td>{item.counter}</td>
                </tr>

            )}

        </tbody>
    )
}