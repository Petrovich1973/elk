import React from "react"
import Triangle from "./icons/Triangle";

const tdList = {
    "id": "38-5278-1106-24-2022-12-01",
    "workMode": "MAIN",
    "status": "SUCCESS",
    "branch": "5278",
    "depositNum": "",
    "epkId": "",
    "errorMessage": "",
    // "jrnExists": "false",
    "lastRetryTime": "",
    "office": "1106",
    "officeOperNo": "24",
    "operDate": "2022-12-01",
    "operationCode": "",
    "partitionKey": "226",
    "recordOffset": "1905157203",
    "recordTime": "2022-12-02T22:59:27.138044",
    "retryCount": "0",
    "tb": "38",
    "topic": "jrn",
    "topicPartition": "0",
    "untb": ""
}

const elementFilterExample = {
    attributeDescription: "нал./безн.",
    attributeName: "CASH_FLAG",
    attributeType: "string",
    columnOrder: 15,
    defaultValue: [
        {
            name: 'Наличный',
            value: 'нал.'
        },
        {
            name: 'Безналичный',
            value: 'безн.'
        }
    ],
    filterOperation: "=",
    filterOrder: 10,
    multiselect: false,
    reportId: "vkl_11",
    required: false,
    visible: true,
    visualType: null
}

export default function Journal({
                                    journal = [],
                                    sort: {sortBy = 'id', sortDir = 'asc'},
                                    onChangeSort = () => console.log('onChangeSort'),
                                    putJournal = () => console.log('putJournal'),
                                    getHeaders = () => console.log('getHeaders'),
                                    url = ''
                                }) {

    const onChange = key => {
        let newSort = {sortBy: key, sortDir}
        if (key === sortBy && sortDir === 'asc') newSort.sortDir = 'desc'
        if (key === sortBy && sortDir === 'desc') newSort.sortDir = 'asc'
        if (key !== sortBy) newSort.sortDir = 'asc'
        onChangeSort(newSort)
    }

    if (!journal.length) return (
        <p/>
    )

    return (
        <div className={'elk_journal'}>
            <table>
                <thead>
                <tr>
                    <th/>
                    {Object.keys(tdList).map((key, idxCell) => (
                        <th
                            onClick={() => onChange(key)}
                            key={idxCell} className={key === sortBy ? 'sortCurrent' : ''}>
                            <div className={'header-cell'}>
                                <div className={'arrows'}>
                                    <div className={sortDir === 'asc' ? 'arrows_up active' : 'arrows_up'}><Triangle/></div>
                                    <div className={sortDir === 'desc' ? 'arrows_down active' : 'arrows_down'}><Triangle/></div>
                                </div>
                                <div>{key}</div>
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {journal.map((row, idxRow) => (
                    <tr key={idxRow}>
                        <td>
                            <button onClick={() => putJournal({name: 'id', type: 'EQUAL', value: row?.id})}>
                                push
                            </button>
                            <button onClick={() => getHeaders({tb: row?.tb, id: row?.id})}>
                                headers view
                            </button>
                            <a target="_blank" href={`${url}/journal/kafka?tb=${row?.tb}&id=${row?.id}`}>тело кафки</a>
                            <a target="_blank" href={`${url}/journal/db?tb=${row?.tb}&id=${row?.id}`}>тело db</a>
                        </td>
                        {Object.keys(tdList).map((key, idxCell) => (
                            <td key={idxCell} className={key === sortBy ? 'sortCurrent' : ''}>{'errorMessage' === key ?
                                <div className={'wrapNormal'}>{row[key]}</div> : row[key].trim()}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}