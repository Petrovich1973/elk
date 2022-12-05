import React from "react"
import ReactPaginate from 'react-paginate'

export default function Pagination({
                                       size = 20,
                                       currentPage = 0,
                                       pageCount = 0,
                                       onChangePage = () => console.log('Pagination change'),
                                       onChangeSize = () => console.log('Size change')
                                   }) {
    const handlePageClick = (e) => {
        console.log(e.selected)
        onChangePage(e.selected)
    }
    return (
        <div className={'elk_pagination'}>
            <select name="sizeName" id="sizeId" value={size} onChange={e => onChangeSize(e.target.value)}>
                {[20, 60, 100].map(element => (
                    <option key={element} value={element}>{element}</option>
                ))}
            </select>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="previous"
                renderOnZeroPageCount={null}
                initialPage={currentPage}
            />
        </div>
    )
}
