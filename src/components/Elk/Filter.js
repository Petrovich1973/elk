import React from "react"

export default function Filter({
                                   tb = '',
                                   tbList = [],
                                   onChangeFilterTb = () => console.log('Tb change'),
                                   filter = [],
                                   filterAttr = [],
                                   onChangeFilter = () => console.log('Filter change'),
                                   totalElements = 0
                               }) {

    const onDeleteTag = el => {
        const newFilterList = filter.filter(element => element.name !== el.name)
        onChangeFilter(newFilterList)
    }

    const getValue = (el) => {
        if(el?.value) {
            return (
                <span>
                    &nbsp;/&nbsp;{el?.value}
                </span>
            )
        }
        if(el?.valueFrom && el?.valueTo) {
            return (
                <span>
                    &nbsp;/&nbsp;{el?.valueFrom}-{el?.valueTo}
                </span>
            )
        }
        return ('')
    }

    return (
        <div className={'elk_filter'}>
            <div className={'elk_filter_header'}>
                <h3>Filter</h3>
                <h3><small>Найдено:</small> {totalElements.toLocaleString() || 0}</h3>
            </div>
            <div className={'elk_filter_elements'}>
                <div className={'elk_filter_element'}>
                    <label htmlFor="TbId">Тербанк</label>
                    <select name="TbName" id="TbId" value={tb} onChange={e => onChangeFilterTb(e.target.value)}>
                        <option value={''}>пусто</option>
                        {tbList.map(element => (
                            <option key={element} value={element}>Tb {element}</option>
                        ))}
                    </select>
                </div>
                {filter.map((el, i) => (
                    <div key={i} className={'elk_filter_element tag'}>
                        <span>{el.name} / {el.type}{getValue(el)}</span>
                        <span title={'удалить'} className={'delete'} onClick={() => onDeleteTag(el)}>&#10005;</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
