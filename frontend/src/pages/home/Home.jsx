import React, { useState } from 'react'
import CreatePost from '../home/CreatePost'
import Posts from '../../components/common/Posts';
const Home = () => {
  const [feedType, setFeedType] = useState('foryou')
  return (
    <>
      <div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
        <div className='flex w-full border-b border-gray-700'>
          <div 
          className='flex flex-1 justify-center p-3 hover:bg-secondary cursor-pointer transition
          duration-300 relative'
          onClick={() => setFeedType('foryou')}>
            For you
            {
              feedType === 'foryou' && (
                <div className='bg-primary w-10 h-1 absolute bottom-0 rounded-full'></div>
              )
            }
            </div>
          <div
          className='flex flex-1 justify-center p-3 hover:bg-secondary cursor-pointer transition
          duration-300 relative'
          onClick={() => setFeedType('following')}>
            Following
            {
              feedType === 'following' && (
                <div className='bg-primary w-10 h-1 absolute bottom-0 rounded-full'></div>
              )
            }
            </div>
        </div>
        <CreatePost/>
        <Posts/>
      </div>
    </>
  )
}

export default Home