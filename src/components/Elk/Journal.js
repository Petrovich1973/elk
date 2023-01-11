import React from "react"
import Triangle from "./icons/Triangle"

const tdListDefault = {
    "id": {order: 0, visible: true},
    "workMode": {order: 1, visible: true},
    "status": {order: 2, visible: true},
    "branch": {order: 3, visible: true},
    "depositNum": {order: 4, visible: true},
    "epkId": {order: 5, visible: true},
    "errorMessage": {order: 6, visible: true},
    "lastRetryTime": {order: 7, visible: true},
    "office": {order: 8, visible: true},
    "officeOperNo": {order: 9, visible: true},
    "operDate": {order: 10, visible: true},
    "operationCode": {order: 11, visible: true},
    "partitionKey": {order: 12, visible: true},
    "recordOffset": {order: 13, visible: true},
    "recordTime": {order: 14, visible: true},
    "retryCount": {order: 15, visible: true},
    "tb": {order: 16, visible: true},
    "topic": {order: 17, visible: true},
    "topicPartition": {order: 18, visible: true},
    "untb": {order: 19, visible: true}
}

export default function Journal({
                                    journal = [],
                                    sort: {sortBy = 'id', sortDir = 'asc'},
                                    onChangeSort = () => console.log('onChangeSort'),
                                    putJournal = () => console.log('putJournal'),
                                    getHeaders = () => console.log('getHeaders'),
                                    url = ''
                                }) {
    const [tdList, setTdList] = React.useState(tdListDefault)
    const [modeSetting, setModeSetting] = React.useState(true)

    React.useEffect(() => {

    }, [])

    const onChangeVisibleCol = (key) => {
        setTdList(prev => ({...prev, [key]: {...prev[key], visible: !prev[key]?.visible}}))
    }

    const onChangeOrderCol = (key, idx) => {
        setTdList(prev => ({...prev, [key]: {...prev[key], order: prev[key]?.order + idx}}))
    }

    // console.log(tdList)

    // const swapPositions = (array, a ,b) => {
    //     [array[a], array[b]] = [array[b], array[a]]
    // }
    //
    // let array = [1,2,3,4,5];
    // swapPositions(array,0,1);


// Решение - Разделить номер счета по разрядам
    let indexSpase = [4,7,8,12]
    // let deposit = '42303810911000393152'
    let deposit = '423'
        .split('')
        .map((el, i) => {
            if(indexSpase.includes(i)) return `${el} `
            return el
        })
        .join('')




    const onChangePositionTd = (current, target) => {
        setTdList(tdList)
    }

    const onChangeSortRows = key => {
        let newSort = {sortBy: key, sortDir}
        if (key === sortBy && sortDir === 'asc') newSort.sortDir = 'desc'
        if (key === sortBy && sortDir === 'desc') newSort.sortDir = 'asc'
        if (key !== sortBy) newSort.sortDir = 'asc'
        onChangeSort(newSort)
    }

    const onCloseManagementColumns = () => setModeSetting(false)

    if (!journal.length) return (
        <p/>
    )

    return (
        <div className={'elk_journal'}>
            <div>
                <button onClick={() => setModeSetting(true)}>управление отображением</button>
                <strong>{deposit}</strong>
            </div>
            <table>
                <thead>
                <tr>
                    <th/>
                    {Object.keys(tdList)
                        .filter(key => tdList[key]?.visible)
                        .sort((a, b) => tdList[a]?.order - tdList[b]?.order)
                        .map((key, idxCell) => (
                            <th
                                onClick={() => onChangeSortRows(key)}
                                key={idxCell} className={key === sortBy ? 'sortCurrent' : ''}>
                                <div className={'header-cell'}>
                                    <div className={'arrows'}>
                                        <div className={sortDir === 'asc' ? 'arrows_up active' : 'arrows_up'}>
                                            <Triangle/>
                                        </div>
                                        <div className={sortDir === 'desc' ? 'arrows_down active' : 'arrows_down'}>
                                            <Triangle/></div>
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
                            <a target="_blank" href={`${url}/journal/kafka?tb=${row?.tb}&id=${row?.id}`}>kafka</a>
                            <a target="_blank" href={`${url}/journal/db?tb=${row?.tb}&id=${row?.id}`}>db</a>
                        </td>
                        {Object.keys(tdList)
                            .filter(key => tdList[key]?.visible)
                            .sort((a, b) => tdList[a]?.order - tdList[b]?.order)
                            .map((key, idxCell) => (
                                <td
                                    key={idxCell}
                                    className={key === sortBy ? 'sortCurrent' : ''}>
                                    {'errorMessage' === key
                                        ?
                                        (
                                            <div className={'wrapNormal'}>{row[key]}</div>
                                        )
                                        : row[key].trim()}
                                </td>
                            ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {modeSetting && <DialogModalManagementColumns
                onClose={onCloseManagementColumns}
                onChangeVisible={onChangeVisibleCol}
                onChangeOrder={onChangeOrderCol}
                tdList={tdList}
                tdListDefault={tdListDefault}/>}
        </div>
    )
}

const DialogModalManagementColumns = ({
                                          tdList = {},
                                          tdListDefault = {},
                                          onClose = () => console.log('onClose'),
                                          onChangeVisible = () => console.log('onChangeVisible'),
                                          onChangeOrder = () => console.log('onChangeOrder')
                                      }) => {

    React.useEffect(() => {
        document.onkeydown = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }
    }, [])

    return (
        <div className={'elk_modal-container'}>
            <div className="elk_overlay" onClick={onClose}/>
            <div className={'elk_dialog'}>
                <div className="elk_dialog-header">
                    <h2>Управление колонками</h2>
                    <button className={'close'} onClick={onClose}>&#10005;</button>
                </div>
                <div className="elk_dialog-content">
                    <table>
                        <tbody>
                        <tr>
                            {Object.keys(tdList)
                                .sort((a, b) => tdList[a]?.order - tdList[b]?.order)
                                .map((key) => (
                                    <td key={key}>
                                        <div style={{textAlign: "center"}}>{key}</div>
                                        <div style={{textAlign: "center"}}>
                                            <input
                                                onChange={() => onChangeVisible(key)}
                                                type={'checkbox'}
                                                checked={tdList[key]?.visible}/>
                                        </div>
                                        <div className={'order-change'}>
                                            <span onClick={() => onChangeOrder(key, -1)}>&#10094;</span>
                                            <span onClick={() => onChangeOrder(key, 1)}>&#10095;</span>
                                        </div>
                                    </td>
                                ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}