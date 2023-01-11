import React from "react"
import Triangle from "./icons/Triangle"
import DialogModalManagementColumns from "./DialogModalManagementColumns"

const tdListDefault = [
    {key: "id", visible: true},
    {key: "workMode", visible: true},
    {key: "status", visible: true},
    {key: "branch", visible: true},
    {key: "depositNum", visible: true},
    {key: "epkId", visible: true},
    {key: "errorMessage", visible: true},
    {key: "lastRetryTime", visible: true},
    {key: "office", visible: true},
    {key: "officeOperNo", visible: true},
    {key: "operDate", visible: true},
    {key: "operationCode", visible: true},
    {key: "partitionKey", visible: true},
    {key: "recordOffset", visible: true},
    {key: "recordTime", visible: true},
    {key: "retryCount", visible: true},
    {key: "tb", visible: true},
    {key: "topic", visible: true},
    {key: "topicPartition", visible: true},
    {key: "untb", visible: true}
]

export default function Journal({
                                    journal = [],
                                    sort: {sortBy = 'id', sortDir = 'asc'},
                                    onChangeSort = () => console.log('onChangeSort'),
                                    putJournal = () => console.log('putJournal'),
                                    getHeaders = () => console.log('getHeaders'),
                                    url = ''
                                }) {
    const [tdList, setTdList] = React.useState(tdListDefault)
    const [modeSetting, setModeSetting] = React.useState(false)

    React.useEffect(() => {

    }, [])

    const onClearSetting = () => setTdList(tdListDefault)

    const onChangeVisibleCol = (key) => {
        setTdList(prev => prev.map(el => {
            if (el.key === key) return ({...el, visible: !el.visible})
            return (el)
        }))
    }

    const onChangeOrderCol = (from, to) => {
        let array = [...tdList]
        if (to in array) {
            swapPositions(array, from, to)
            setTdList(array)
        }
    }

    const swapPositions = (array, a, b) => {
        [array[a], array[b]] = [array[b], array[a]]
    }


// Решение - Разделить номер счета по разрядам
    let indexSpase = [4, 7, 8, 12]
    const depositSplit = value => value
        .split('')
        .map((el, i) => {
            if (indexSpase.includes(i)) return `${el} `
            return el
        })
        .join('')

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
                {' '}
                пример визуализации номера счета
                {' '}
                <strong
                    title={'Вадим, это просто пример визуализации. В дальнейшем этой строки здесь не будет!'}>
                    {depositSplit('42303810911000393152')}
                </strong>
            </div>
            <table>
                <thead>
                <tr>
                    <th/>
                    {tdList
                        .filter(el => el.visible)
                        .map((el, idxCell) => (
                            <th
                                onClick={() => onChangeSortRows(el.key)}
                                key={idxCell} className={el.key === sortBy ? 'sortCurrent' : ''}>
                                <div className={'header-cell'}>
                                    <div className={'arrows'}>
                                        <div className={sortDir === 'asc' ? 'arrows_up active' : 'arrows_up'}>
                                            <Triangle/>
                                        </div>
                                        <div className={sortDir === 'desc' ? 'arrows_down active' : 'arrows_down'}>
                                            <Triangle/></div>
                                    </div>
                                    <div>{el.key}</div>
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
                        {tdList
                            .filter(el => el.visible)
                            .map((el, idxCell) => (
                                <td
                                    key={idxCell}
                                    className={el.key === sortBy ? 'sortCurrent' : ''}>
                                    {'errorMessage' === el.key
                                        ?
                                        (
                                            <div className={'wrapNormal'}>{row[el.key]}</div>
                                        )
                                        : 'depositNum' === el.key
                                            ?
                                            (
                                                <div>{depositSplit(row[el.key])}</div>
                                            )
                                            : row[el.key].trim()}
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
                onClearSetting={onClearSetting}/>}
        </div>
    )
}