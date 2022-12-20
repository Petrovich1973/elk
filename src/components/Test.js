import React from "react"
import axios from "axios"

const url = 'http://localhost:3001'

const delay = ms => new Promise(yea => setTimeout(yea, ms))

export default function Test() {
    const [waiting, setWaiting] = React.useState(false)
    const [date, setDate] = React.useState(Date.now())
    const [count, setCount] = React.useState(0)

    // React.useEffect(() => {
    //     void getJournal()
    // }, [])

    React.useEffect(() => {
        void scheduling()
    }, [count])

    const scheduling = async () => {
        await delay(1000)
        getJournal()
    }

    const getJournal = async () => {
        setWaiting(true)
        try {
            const response = await axios.get(`${url}/test`)
            setDate(response.data.date)
            setCount(count + 1)
        } catch (e) {
            setCount(count + 1)
        }
        setWaiting(false)
    }

    return (
        <div style={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%'
        }}>
            <h1>{date.toLocaleString()}</h1>
            {waiting ? <p>waiting</p> : <h3>{count}</h3>}
        </div>
    )
}