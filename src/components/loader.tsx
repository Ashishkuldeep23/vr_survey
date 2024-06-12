'use client'

import React from 'react'

const Loader = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <div className=' absolute  top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
            {
                isLoading
                &&
                <div id='loader'></div>
            }
        </div>

    )
}

export default Loader

