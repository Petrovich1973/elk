import React from "react"
import './styles.css'
import Filter from "./Filter"
import Journal from "./Journal"
import axios from "axios"
import Pagination from "./Pagination"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import CreateFilterElement from "./CreateFilterElement"
import DialogModal from "./DialogModal";

// const remoteServer = 'http://localhost:3001'
const remoteServer = 'http://swagger-ci00080066-eiftgen1ds-tp-repca.apps.ift-gen1-ds.delta.sbrf.ru'

const paramsDefault = {
    page: 0,
    size: 20
}
const sortDefault = {
    sortBy: 'branch',
    sortDir: 'asc' //[asc desc]
}

const tbList = [13, 16, 18, 38, 40, 42, 44, 62, 54, 55, 70]

export default function Elk() {
    const [filterAttr, setFilterAttr] = React.useState([])
    const [filter, setFilter] = React.useState([])
    const [journal, setJournal] = React.useState([])
    const [params, setParams] = React.useState(paramsDefault)
    const [totalPages, setTotalPages] = React.useState(0)
    const [totalElements, setTotalElements] = React.useState(0)
    const [tb, setTb] = React.useState(38)
    const [isPendingJournal, setIsPendingJournal] = React.useState(false)
    const [initial, setInitial] = React.useState(Date.now())
    const [url, setUrl] = React.useState(remoteServer)
    const [sort, setSort] = React.useState(sortDefault)
    const [headers, setHeaders] = React.useState(null)

    React.useEffect(() => {
        void getJournal()
    }, [params.page, params.size, sort.sortBy, sort.sortDir, initial])

    React.useEffect(() => {
        // void getJournal()
        void getFilters()
    }, [])

    // получение журнала
    const getJournal = async () => {
        setIsPendingJournal(true)
        try {
            const response = await axios({
                url: `${url}/journal`,
                method: 'POST',
                params: {...params, tb, sort: `${sort.sortBy},${sort.sortDir}`},
                data: {filter}
            })
            setJournal(response.data.content)
            setTotalPages(response.data.totalPages)
            setTotalElements(response.data.totalElements)

        } catch (e) {
            console.log(e)
            const statusCode = e?.response?.status || 'ERR_CONNECTION_REFUSED'
            const errorText = e?.response?.data || 'Что-то пошло не так :)'
            NotificationManager.error(errorText, statusCode, 8000)

            setJournal([])
            setTotalPages(0)
            setTotalElements(0)
        }
        setIsPendingJournal(false)

    }

    // повторная обработка
    const putJournal = async (f = null) => {
        console.log(f)
        setIsPendingJournal(true)
        try {
            const dataFilter = f ? [f] : filter
            const response = await axios({
                url: `${url}/journal`,
                method: 'PUT',
                params: {tb},
                data: {filter: dataFilter}
            })
            const statusCode = 'Успешный запрос!'
            const text = `${response?.data} повторно обработано`
            response?.data > 0
                ? NotificationManager.success(text, statusCode, 8000)
                : NotificationManager.info(text, statusCode, 8000)

        } catch (e) {
            console.log(e)
            const statusCode = e?.response?.status || 'ERR_CONNECTION_REFUSED'
            const errorText = e?.response?.data || 'Что-то пошло не так :)'
            NotificationManager.error(errorText, statusCode, 8000)
        }
        setIsPendingJournal(false)

    }

    // получение заголовков
    const getHeaders = async (params = null) => {
        console.log(params)
        setIsPendingJournal(true)
        try {
            const response = await axios({
                url: `${url}/journal/headers`,
                method: 'GET',
                params: {...params}
            })
            setHeaders(response.data)

        } catch (e) {
            console.log(e)
            const statusCode = e?.response?.status || 'ERR_CONNECTION_REFUSED'
            const errorText = e?.response?.data || 'Что-то пошло не так :)'
            NotificationManager.error(errorText, statusCode, 8000)
        }
        setIsPendingJournal(false)

    }

    // получение фильтров
    const getFilters = async () => {
        try {
            const response = await axios({
                url: `${url}/journal/filter`,
                method: 'GET'
            })
            setFilterAttr(response.data.filter(f => f.name !== 'tb'))
        } catch (e) {
            const statusCode = e?.response?.status || 'ERR_CONNECTION_REFUSED'
            const errorText = e?.response?.data || 'Что-то пошло не так :)'
            NotificationManager.error(errorText, statusCode, 4000)
        }
    }

    // console.table(filterAttr.map(m => ({name: m.name, fieldType: m.fieldType})))

    const onChangePage = page => setParams(prev => ({...prev, page}))
    const onChangeSize = size => setParams(prev => ({page: 0, size}))
    const onChangeFilterTb = tb => setTb(tb)
    const onChangeFilter = filterList => setFilter(filterList)
    const onSend = () => {
        setParams(prev => ({...prev, page: 0}))
        setInitial(Date.now())
    }
    const onChangeSort = value => setSort(value)
    const onCloseModal = () => setHeaders(null)

    return (
        <div className={'elk_container'}>
            <div>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
                <button onClick={getFilters}>повторно получить фильтры</button>
            </div>
            <h2>ELK</h2>
            <Filter {...{
                tb,
                tbList,
                filterAttr,
                filter,
                totalElements,
                onChangeFilterTb,
                onChangeFilter
            }}/>
            <div className={'elk_buttons'}>
                <div>
                    <button
                        style={{backgroundColor: '#ffd8d8', color: '#2a2a2a', border: 'none'}}
                        onClick={() => onChangeFilter([])}>очистить фильтр</button>
                    <button
                        style={{backgroundColor: '#ced683', color: '#2a2a2a', border: 'none'}}
                        disabled={isPendingJournal}
                        onClick={onSend}>{isPendingJournal ? 'waiting...' : 'применить фильтр'}
                    </button>
                </div>
                <div>
                    <button
                        style={{backgroundColor: '#666666', color: '#ffffff', border: 'none'}}
                        disabled={!totalElements}
                        onClick={() => putJournal()}>повторная обработка
                    </button>

                </div>
            </div>
            <CreateFilterElement {...{
                filterAttr,
                filter,
                onChangeFilter
            }}/>
            <Journal {...{journal, sort, onChangeSort, putJournal, getHeaders, url}}/>
            <Pagination {...{
                size: params.size,
                currentPage: params.page,
                pageCount: totalPages,
                onChangePage,
                onChangeSize,
                isPendingJournal
            }}/>
            {headers && <DialogModal onClose={onCloseModal} content={headers}/>}
            <NotificationContainer/>
        </div>
    )
}
