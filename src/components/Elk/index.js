import React from "react"
import './styles.css'
import Filter from "./Filter"
import Journal from "./Journal"
import axios from "axios"
import Pagination from "./Pagination"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import CreateFilterElement from "./CreateFilterElement"

const remoteServer = 'http://localhost:3001'
// const remoteServer = 'http://swagger-ci00080066-eiftgen1ds-tp-repca.apps.ift-gen1-ds.delta.sbrf.ru'

const paramsDefault = {
    page: 0,
    size: 20
}

const tbList = [13, 16, 18, 38, 40, 42, 44, 62, 54, 55, 70]

// filter element
// {
//     "name": "branch",
//     "type": "EQUAL",
//     "value": "2",
//     "valueFrom": "",
//     "valueTo": ""
// }

export default function Elk() {
    const [filterAttr, setFilterAttr] = React.useState([])
    const [filter, setFilter] = React.useState([])
    const [journal, setJournal] = React.useState([])
    const [params, setParams] = React.useState(paramsDefault)
    const [totalPages, setTotalPages] = React.useState(0)
    const [tb, setTb] = React.useState(38)

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
                data: {filter}
            })
            setJournal(response.data.content)
            setTotalPages(response.data.totalPages)

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

    // console.log(filterAttr)

    const onChangePage = page => setParams(prev => ({...prev, page}))
    const onChangeSize = size => setParams(prev => ({...prev, size}))
    const onChangeFilterTb = tb => setTb(tb)
    const onChangeFilter = filterList => setFilter(filterList)
    const onAddFilter = filterList => setFilter(filterList)

    return (
        <div className={'elk_container'}>
            <h2>Title ELK page</h2>
            <Filter {...{
                tb,
                tbList,
                filterAttr,
                filter,
                onChangeFilterTb,
                onChangeFilter
            }}/>
            <CreateFilterElement {...{
                filterAttr,
                filter,
                onAddFilter
            }}/>
            <Journal {...{journal}}/>
            <Pagination {...{
                size: params.size,
                currentPage: params.page,
                pageCount: totalPages,
                onChangePage,
                onChangeSize
            }}/>
            <NotificationContainer/>
        </div>
    )
}
