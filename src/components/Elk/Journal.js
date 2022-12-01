import React from "react";
import Table from "./Table";
import Pagination from "./Pagination";

export default function Journal() {
    return (
        <div className={'elk_journal'}>
            <Table/>
            <Pagination/>
        </div>
    )
}