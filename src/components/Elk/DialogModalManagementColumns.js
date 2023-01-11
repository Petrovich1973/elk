import React from 'react'

export default function DialogModalManagementColumns({
                                                         tdList = [],
                                                         onClearSetting = () => console.log('onClearSetting'),
                                                         onClose = () => console.log('onClose'),
                                                         onChangeVisible = () => console.log('onChangeVisible'),
                                                         onChangeOrder = () => console.log('onChangeOrder')
                                                     }) {

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
                <div>
                    <button onClick={onClearSetting}>сброс настроек</button>
                </div>
                <div className="elk_dialog-content">
                    <table>
                        <tbody>
                        <tr>
                            {tdList
                                .map((el, idx) => (
                                    <td key={el.key}>
                                        <div style={{textAlign: "center"}}>{el.key}</div>
                                        <div style={{textAlign: "center"}}>
                                            <input
                                                onChange={() => onChangeVisible(el.key)}
                                                type={'checkbox'}
                                                checked={el.visible}/>
                                        </div>
                                        <div className={'order-change'}>
                                            <div>
                                                {idx - 1 in tdList &&
                                                    <div onClick={() => onChangeOrder(idx, idx - 1)}>&#10094;</div>}
                                            </div>
                                            <div>
                                                {idx + 1 in tdList &&
                                                    <div onClick={() => onChangeOrder(idx, idx + 1)}>&#10095;</div>}
                                            </div>
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