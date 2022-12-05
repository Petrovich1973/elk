import React from "react"
import './styles.css'
import Filter from "./Filter"
import Journal from "./Journal"
import axios from "axios"
import Pagination from "./Pagination"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const remoteServer = 'http://localhost:3001'
// const remoteServer = 'http://swagger-ci00080066-eiftgen1ds-tp-repca.apps.ift-gen1-ds.delta.sbrf.ru'

const paramsDefault = {
    page: 0,
    size: 20
}

const tbList = [13, 16, 18, 38, 40, 42, 44, 62, 54, 55, 70]

export default function Elk() {
    const [filterAttr, setFilterAttr] = React.useState([])
    const [filter, setFilter] = React.useState([])
    const [journal, setJournal] = React.useState([])
    const [params, setParams] = React.useState(paramsDefault)
    const [totalPages, setTotalPages] = React.useState(0)
    const [tb, setTb] = React.useState(38)

    const createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Info message');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };

    React.useEffect(() => {
        void getJournal()
        void getFilters()
    }, [])

    // получение журнала
    const getJournal = async () => {
        try {
            const response = await axios({
                url: `${remoteServer}/journal`,
                method: 'POST',
                params: {...params, tb},
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
            setJournal(response.data.content)

        } catch (e) {
            const statusCode = e.response.status || 'not code'
            const errorText = e.response.data || 'Что-то пошло не так :)'
            NotificationManager.error(errorText, statusCode, 4000)
        }

    }

    // получение фильтров
    const getFilters = async () => {
        try {
            const response = await axios({
                url: `${remoteServer}/journal/filter`,
                method: 'GET'
            })
            setFilterAttr(response.data)
        } catch (e) {
            const statusCode = e.response.status || 'not code'
            const errorText = e.response.data || 'Что-то пошло не так :)'
            NotificationManager.error(errorText, statusCode, 4000)
        }
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
            <Pagination/>
            <NotificationContainer/>
        </div>
    )
}