import React, { useEffect, useState } from 'react'
import { searchBookByTitle } from '../../../services/operations/readersBook';

const SearchBooks = () => {



  return (
    <div className='w-screen min-h-[calc(100vh-3.5rem)]'>
      <div className=''>
            <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className='py-2 px-4 min-w-[500px] border-[1px] border-black rounded-2xl text-black' 
            placeholder='Search For Books'/>
      </div>
    </div>
  )
}

export default SearchBooks
