import React from "react";
import ReactPaginate from 'react-paginate'

export default function Pagination({pageCount = 0, }) {
    const handlePageClick = (e) => {
        console.log(e)
    }
    return (
        <div className={'elk_pagination'}>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                selected={4}
            />
        </div>
    )
}