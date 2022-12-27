import React from "react"
import ReactPaginate from 'react-paginate'

export default function Pagination({
                                       size = 20,
                                       currentPage = 0,
                                       pageCount = 0,
                                       onChangePage = () => console.log('Pagination change'),
                                       onChangeSize = () => console.log('Size change'),
                                       isPendingJournal = false
                                   }) {
    const handlePageClick = e => {
        console.log(e.selected)
        if(!isPendingJournal) onChangePage(e.selected)
    }
    return (
        <div className={'elk_pagination'}>
            {Boolean(pageCount) &&
            <select
                disabled={isPendingJournal}
                name="sizeName"
                id="sizeId"
                value={size}
                onChange={e => onChangeSize(e.target.value || 20)}>
                {[20, 60, 100].map(element => (
                    <option key={element} value={element}>{element}</option>
                ))}
            </select>}
            <ReactPaginate
                disableInitialCallback={true}
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="previous"
                renderOnZeroPageCount={null}
                forcePage={currentPage}
            />
        </div>
    )
}
