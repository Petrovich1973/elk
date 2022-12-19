import React from "react"

export default function DialogModal({
                                        content = null,
                                        onClose = () => console.log('onClose')
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
                    <h2>Заголовки записи</h2>
                    <button className={'close'} onClick={onClose}>&#10005;</button>
                </div>
                <div className="elk_dialog-content">
                    <table>
                        <tbody>
                        {Object.keys(content).map((key) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{content[key]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}