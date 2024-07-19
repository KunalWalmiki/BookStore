import React from 'react'

const Tab = ({tabData, field, setField }) => {
  return (
    <div className='w-full flex justify-center mb-4'>
    <div
    style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-slate-300 p-1 gap-x-1 my-2 rounded-full max-w-max">
         {
            tabData.map((tab) => (
                <button key={tab.id}
                onClick={() => setField(tab.type)}
                className={`${
                  field === tab.type
                    ? "bg-slate-900 text-white"
                    : "bg-transparent text-richblack-200"
                } py-2 px-5 rounded-full transition-all duration-200`}>
                         {tab.name}
                </button>
            ))
         }
    </div>
            
    </div>
  )
}

export default Tab
