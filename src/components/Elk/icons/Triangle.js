import React from 'react'

export default function Triangle() {
    return (
        <div className={'icon-triangle'}>
            <svg
                version="1.1"
                width="5px"
                height="5px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none">
                <polygon fill="currentColor" points="0,100 50,0 100,100"/>
            </svg>
        </div>
    )
}