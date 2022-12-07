import React from "react"
import FilterValueElement from "./FilterValueElement";

export default function CreateFilterElement({
                                                filterAttr = [],
                                                filter = [],
                                                onChangeFilter = () => console.log('Add filter')
                                            }) {
    const [name, setName] = React.useState('')
    const [acceptedFilters, setAcceptedFilters] = React.useState('')
    const [acceptedValues, setAcceptedValues] = React.useState('')
    const [acceptedValues2, setAcceptedValues2] = React.useState('')

    // console.log([...new Set(filterAttr.map(m => m.fieldType))])
    console.log([...new Set(filterAttr.reduce((prev, current) => {
        return prev.concat(current.acceptedFilters)
    }, []))])
    // console.table(filterAttr.map(m => ({
    //     name: m.name,
    //     fieldTyp: m.fieldType
    // })))

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
    const onClickButtonAdd = () => {
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
        if (acceptedFilters === 'BETWEEN') {
            onChangeFilter([...filter, forValue2])
        } else {
            onChangeFilter([...filter, forValue1])
        }
        setName('')
        setAcceptedFilters('')
        setAcceptedValues('')
        setAcceptedValues2('')
    }

    const isENUM = (type, v) => filterAttr
        .find(attr => attr.name === name)?.[type] === v

    const activeAcceptedList = (key = '') => {
        try {
            const res = filterAttr
                .find(attr => attr.name === name)?.[key]
            if (Array.isArray(res)) return res
            return []
        } catch (e) {
            return []
        }
    }

    const getFieldType = () => filterAttr
        .find(attr => attr.name === name)?.fieldType

    // STRING
    // NUMBER
    // DATE
    // DATE_TIME
    // ENUM

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
                    {filterAttr
                        .filter(attr => !filter
                            .map(m => m.name).includes(attr.name))
                        .map(attr => (
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
                    {activeAcceptedList('acceptedFilters')
                        .map(el => (
                            <option key={el} value={el}>{el}</option>
                        ))}
                </select>
            </div>
            <div className={'elk_filter_element'}>
                <label
                    htmlFor="acceptedValuesId">значение {getFieldType()}</label>
                {isENUM('fieldType', 'ENUM')
                    ? (
                        <select
                            disabled={!acceptedFilters}
                            name="acceptedValuesName"
                            id="acceptedValuesId"
                            value={acceptedValues}
                            onChange={e => setAcceptedValues(e.target.value)}>
                            <option value="">пусто</option>

                            {activeAcceptedList('acceptedValues').map(el => (
                                <option key={el} value={el}>{el}</option>
                            ))}
                        </select>
                    )
                    : (
                        <FilterValueElement {...{
                            acceptedFilters,
                            acceptedValues,
                            setAcceptedValues,
                            acceptedValues2,
                            setAcceptedValues2,
                            getFieldType: getFieldType()
                        }}/>
                    )}
            </div>
            <button
                disabled={!name || !acceptedFilters || !acceptedValues}
                onClick={onClickButtonAdd}>
                добавить фильтр
            </button>
        </div>
    )
}
