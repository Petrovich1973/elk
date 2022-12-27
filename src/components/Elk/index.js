import React from "react"
import './styles.css'
import Filter from "./Filter"
import Journal from "./Journal"
import axios from "axios"
import Pagination from "./Pagination"
import {NotificationContainer, NotificationManager} from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import CreateFilterElement from "./CreateFilterElement"
import DialogModal from "./DialogModal"
import moment from 'moment'

// const remoteServer = 'http://localhost:3001'
const remoteServer = 'http://swagger-ci00080066-eiftgen1ds-tp-repca.apps.ift-gen1-ds.delta.sbrf.ru'

// const paramsDefault = {
//     page: 0 || undefined,
//     size: 20 || undefined
// }
const paramsDefault = {
    page: 0,
    size: 20
}
const sortDefault = {
    sortBy: 'id',
    sortDir: 'asc' //[asc desc]
}

// const tbList = [13, 16, 18, 38, 40, 42, 44, 62, 54, 55, 70]

const lsKey = 'BOFL_v001'

export default function Elk() {
    const [filterAttr, setFilterAttr] = React.useState([])
    const [filter, setFilter] = React.useState([])
    const [journal, setJournal] = React.useState([])
    const [params, setParams] = React.useState(paramsDefault)
    const [totalPages, setTotalPages] = React.useState(0)
    const [totalElements, setTotalElements] = React.useState(0)
    const [tb, setTb] = React.useState('')
    const [isPendingJournal, setIsPendingJournal] = React.useState(false)
    const [initial, setInitial] = React.useState(Date.now())
    const [url, setUrl] = React.useState(remoteServer)
    const [sort, setSort] = React.useState(sortDefault)
    const [headers, setHeaders] = React.useState(null)
    const [tbList, setTbList] = React.useState([])

    const getLs = () => {
        const ls = localStorage.getItem(lsKey)
        return JSON.parse(ls)
    }

    const setLs = (value) => {
        const ls = getLs() || {}
        localStorage.setItem(lsKey, JSON.stringify({...ls, ...value}))
    }

    React.useEffect(() => {
        const newTb = getLs()?.tb || tb
        const newFilter = getLs()?.filter || filter
        if(!newFilter.some(s => s.name === 'operDate')) {
            const startdate = moment().subtract(1, "days").format("YYYY-MM-DD")
            setFilter([...newFilter, {name: 'operDate', type: "GTE", value: startdate}])
        } else {
            setFilter(newFilter)
        }
        setTb(newTb)

        console.log('useEffect')
    }, [])

    React.useEffect(() => {
        if (tb) void getJournal()
    }, [params.page, params.size, sort.sortBy, sort.sortDir, tb, initial])

    React.useEffect(() => {
        void getFilters()
        void getTbList()
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
            const text = `${response?.data} отправлено на повторную обработку`
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

    // получение списка ТБ
    const getTbList = async () => {
        try {
            const response = await axios({
                url: `${url}/journal/tbs`,
                method: 'GET'
            })
            setTbList(response.data)
        } catch (e) {
            const statusCode = e?.response?.status || 'ERR_CONNECTION_REFUSED'
            const errorText = e?.response?.data || 'Что-то пошло не так :)'
            NotificationManager.error(errorText, statusCode, 4000)
        }
    }

    const onChangePage = page => setParams(prev => ({...prev, page}))
    const onChangeSize = size => setParams({page: 0, size})
    const onChangeFilterTb = value => {
        setLs({tb: value})
        setTb(value)
    }
    const onChangeFilter = filterList => {
        setLs({filter: filterList})
        setFilter(filterList)
    }
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
                        style={{backgroundColor: '#ffd8d8', color: '#2a2a2a', border: 'none', cursor: "pointer"}}
                        onClick={() => onChangeFilter([])}>очистить фильтр
                    </button>
                    <button
                        style={{backgroundColor: '#ced683', color: '#2a2a2a', border: 'none', cursor: "pointer"}}
                        disabled={isPendingJournal || !tb}
                        onClick={onSend}>{isPendingJournal ? 'waiting...' : 'применить фильтр'}
                    </button>
                </div>
                <div>
                    <button
                        style={{backgroundColor: '#666666', color: '#ffffff', border: 'none', cursor: "pointer"}}
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
