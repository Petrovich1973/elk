import React from "react";
import ReactPaginate from 'react-paginate'

export default function Pagination() {
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
                pageCount={100}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}