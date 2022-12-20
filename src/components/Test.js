import React from "react"
import axios from "axios"

const url = 'http://localhost:3001'

const delay = ms => new Promise(yea => setTimeout(yea, ms))

export default function Test() {
    const [waiting, setWaiting] = React.useState(false)
    const [date, setDate] = React.useState(Date.now())
    const [count, setCount] = React.useState(0)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        void getJournal(0)
    }, [])

    const getJournal = async (ms = 0) => {
        await delay(ms)
        setWaiting(true)
        try {
            const response = await axios.get(`${url}/test`)
            setDate(response.data.date)
            setError(false)
        } catch (e) {
            setError(true)
        }
        setCount(count => count + 1)
        setWaiting(false)
        getJournal(2000)
    }

    return (
        <div style={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%'
        }}>
            <h1>{count === 0 ? 'время старта' : 'время крайнего ответа'} {new Date(date).toLocaleString()}</h1>
            {waiting ? <h3>waiting</h3> : <h3>количество ответов {count}</h3>}
            {count > 0 && <div>
                {error ? <h3 style={{color: "red"}}>response error</h3> :
                    <h3 style={{color: "green"}}>response success</h3>}
            </div>}
        </div>
    )
}
