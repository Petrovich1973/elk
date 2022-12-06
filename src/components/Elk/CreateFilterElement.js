import React from "react"

export default function CreateFilterElement({
                                                filterAttr = [],
                                                filter = [],
                                                onChangeFilter = () => console.log('Add filter')
                                            }) {
    const [name, setName] = React.useState('')
    const [acceptedFilters, setAcceptedFilters] = React.useState('')
    const [acceptedValues, setAcceptedValues] = React.useState('')
    const [acceptedValues2, setAcceptedValues2] = React.useState('')

    const onChangeName = e => {
        setName(e.target.value)
        setAcceptedFilters('')
        setAcceptedValues('')
        setAcceptedValues2('')
    }

    const onChangeAcceptedFilters = e => {
        setAcceptedFilters(e.target.value)
        setAcceptedValues('')
        setAcceptedValues2('')
    }
    const onAdd = () => {
        const forValue1 = {
            name: name,
            type: acceptedFilters,
            value: acceptedValues
        }
        const forValue2 = {
            name: name,
            type: acceptedFilters,
            valueFrom: acceptedValues,
            valueTo: acceptedValues2
        }
        if(acceptedFilters === 'BETWEEN') {
            onChangeFilter([...filter, forValue2])
        } else {
            onChangeFilter([...filter, forValue1])
        }
        setName('')
        setAcceptedFilters('')
        setAcceptedValues('')
        setAcceptedValues2('')
    }

    return (
        <div className={'elk_filter_elements add'}>
            <div className={'elk_filter_element'}>
                <label htmlFor="nameId">имя атрибута</label>
                <select
                    name="nameName"
                    id="nameId"
                    value={name}
                    onChange={onChangeName}>
                    <option value="">пусто</option>
                    {filterAttr.filter(attr => !filter.map(m => m.name).includes(attr.name)).map(attr => (
                        <option key={attr.name} value={attr.name}>{attr.name}</option>
                    ))}
                </select>
            </div>
            <div className={'elk_filter_element'}>
                <label htmlFor="acceptedFiltersId">оператор</label>
                <select
                    disabled={!name}
                    name="acceptedFiltersName"
                    id="acceptedFiltersId"
                    value={acceptedFilters}
                    onChange={onChangeAcceptedFilters}>
                    <option value="">пусто</option>
                    {filterAttr.find(attr => attr.name === name)?.acceptedFilters.map(el => (
                        <option key={el} value={el}>{el}</option>
                    ))}
                </select>
            </div>
            <div className={'elk_filter_element'}>
                <label htmlFor="acceptedValuesId">значение</label>
                {filterAttr.find(attr => attr.name === name)?.acceptedValues.length
                    ? (
                        <select
                            disabled={!acceptedFilters}
                            name="acceptedValuesName"
                            id="acceptedValuesId"
                            value={acceptedValues}
                            onChange={e => setAcceptedValues(e.target.value)}>
                            <option value="">пусто</option>
                            {filterAttr.find(attr => attr.name === name)?.acceptedValues.map(el => (
                                <option key={el} value={el}>{el}</option>
                            ))}
                        </select>
                    )
                    : (
                        <div>
                            <input
                                disabled={!acceptedFilters}
                                type="text"
                                value={acceptedValues}
                                   onChange={e => setAcceptedValues(e.target.value)}/>
                            {acceptedFilters === 'BETWEEN'
                            && <input
                                disabled={!acceptedFilters}
                                type="text"
                                value={acceptedValues2}
                                      onChange={e => setAcceptedValues2(e.target.value)}/>}
                        </div>
                    )}
            </div>
            <button disabled={!name || !acceptedFilters || !acceptedValues} onClick={onAdd}>добавить фильтр</button>
        </div>
    )
}
