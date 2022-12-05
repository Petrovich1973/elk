import React from "react"

export default function Filter({
                                   tb = 38,
                                   tbList = [],
                                   onChangeFilterTb = () => console.log('Tb change'),
                                   filter = [],
                                   filterAttr = [],
                                   onChangeFilter = () => console.log('Filter change')
                               }) {

    return (
        <div className={'elk_filter'}>
            <h3>Filter</h3>
            <div className={'elk_filter_elements'}>
                <div className={'elk_filter_element'}>
                    <label htmlFor="TbId">Тербанк</label>
                    <select name="TbName" id="TbId" value={tb} onChange={e => onChangeFilterTb(e.target.value)}>
                        {tbList.map(element => (
                            <option key={element} value={element}>Tb {element}</option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    )
}
