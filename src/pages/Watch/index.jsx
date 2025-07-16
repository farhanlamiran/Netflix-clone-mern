import BrowseLayout from '@/components/Layouts/BrowseLayout'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { GoChevronLeft } from 'react-icons/go'

const Watch = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <BrowseLayout>
            <div
                onClick={() => navigate("/browse")}
                className='absolute top-20 left-6 text-slate-50/50 z-10 hover:text-white transition-all cursor-pointer'
            >
                <GoChevronLeft size={40} />

            </div>
            <ReactPlayer
                src={"https://youtube.com/watch?v=" + id}
                width={"100%"}
                height={"100vh"}
                autoPlay={true}
                muted={false}
                controls={false}
            />
        </BrowseLayout>
    )
}

export default Watch