import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <span className="loading loading-ring w-44"></span>
      <p className='text-center text-2xl font-bold'>Please Wait</p>
    </div>
  )
}

export default Loading