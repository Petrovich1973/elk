import React from "react"
import './styles.css'
import Filter from "./Filter"
import Journal from "./Journal"
import axios from "axios";

// const remoteServer = 'http://localhost:3001'
const remoteServer = 'http://swagger-ci00080066-eiftgen1ds-tp-repca.apps.ift-gen1-ds.delta.sbrf.ru'

export default function Elk() {
    const [filterAttr, setFilterAttr] = React.useState([])

    React.useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        const {data} = await axios({
            url: `${remoteServer}/journal`,
            method: 'POST',
            params: {
                tb: 38,
                page: 0,
                size: 20
            },
            data: {
                filter: [
                    {
                        "name": "branch",
                        "type": "EQUAL",
                        "value": "2",
                        "valueFrom": "",
                        "valueTo": ""
                    },
                    {
                        "name": "office",
                        "type": "EQUAL",
                        "value": "24"
                    },
                    {
                        "name": "id",
                        "type": "EQUAL",
                        "value": "38-2-24-50001312-2022-12-01"
                    }
                ]
            }
        })
        setFilterAttr(data.content)
    }

    const fetch3 = async () => {
        const {data} = await axios({
            url: `${remoteServer}/journal`,
            method: 'PUT',
            params: {
                tb: 38
            },
            // data: {
            //     filter: [
            //         {
            //             "name": "branch",
            //             "type": "EQUAL",
            //             "value": "2"
            //         },
            //         {
            //             "name": "office",
            //             "type": "EQUAL",
            //             "value": "24"
            //         },
            //         {
            //             "name": "id",
            //             "type": "EQUAL",
            //             "value": "38-2-24-50001312-2022-12-01"
            //         }
            //     ]
            // }
        })


        setFilterAttr(data.content)
    }

    const fetch2 = async () => {
        const {data} = await axios({
            url: `${remoteServer}/journal/filter`,
            method: 'GET'
        })
        setFilterAttr(data.content)
    }

    console.log(filterAttr)

    return (
        <div className={'elk_container'}>
            <h2>Title ELK page</h2>
            <Filter/>
            <Journal/>
        </div>
    )
}