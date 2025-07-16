import React from 'react'
import SectionLayout from '@layouts/SectionLayout'
import EachUtils from '@/utils/EachUtils'
import { useAtom } from 'jotai'
import { languageAtom } from '@/jotai/atoms'
import { LIST_CONTENT_3_EN, LIST_CONTENT_3_ID } from '@/constants/listContent'
import { WATCH_DEVICE_VIDEO, WATCH_DEVICE_IMAGE  } from '@/constants/listAsset'

const SectionWatch = () => {
    const [language,] = useAtom(languageAtom)
    return (
        <SectionLayout>
            <EachUtils of={language == "en" ? LIST_CONTENT_3_EN : LIST_CONTENT_3_ID} render={(item, index) => (

                <div key={index} className='px-8'>
                    <h2 className='font-black text-5xl'>{item.title}</h2>
                    <p className='text-2xl mt-4'>{item.desc}</p>
                </div>
            )} />
            <div className='relative max-w-xl mx-auto '>
                <img src={WATCH_DEVICE_IMAGE} alt='' className='relative z-10' />
                <div className='absolute top-9 left-1/2 -translate-x-1/2 w-[62%]'>
                    <video autoPlay muted loop>
                        <source src={WATCH_DEVICE_VIDEO} type='video/mp4' />
                    </video>
                </div>
            </div>

        </SectionLayout>
    )
}

export default SectionWatch