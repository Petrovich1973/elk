import React from "react"

const tdList = {
    "id": "38-5278-1106-24-2022-12-01",
    "workMode": "MAIN",
    "status": "SUCCESS",
    "branch": "5278",
    "depositNum": "",
    "epkId": "",
    "errorMessage": "",
    "jrnExists": "false",
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

export default function Journal({journal = []}) {

    if (!journal.length) return (
        <p>journal empty</p>
    )

    return (
        <div className={'elk_journal'}>
            <table>
                <thead>
                <tr>
                    {Object.keys(tdList).map((key, idxCell) => (
                        <th key={idxCell}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {journal.map((row, idxRow) => (
                    <tr key={idxRow}>
                        {Object.keys(tdList).map((key, idxCell) => (
                            <td key={idxCell}>{tdList[key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
