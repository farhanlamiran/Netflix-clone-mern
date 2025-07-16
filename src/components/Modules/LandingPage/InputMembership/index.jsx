import React from 'react'
import EachUtils from '@/utils/EachUtils'
import { LIST_CTA_EN, LIST_CTA_ID } from '@/constants/listCTA'
import { useAtom } from 'jotai'
import { emailAtom, languageAtom } from '@/jotai/atoms'
import DefaultButton from '@/components/Modules/LandingPage/DefaultButton'
import { useNavigate } from 'react-router-dom'

const InputMembership = () => {
    const navigate = useNavigate()
    const [, setEmail] = useAtom(emailAtom)
    const [language,] = useAtom(languageAtom)

    const handleEmail = (e) => {
        e.preventDefault()
        navigate("/register")
    }


    return (
        <form>
            <EachUtils of={language == "en" ? LIST_CTA_EN : LIST_CTA_ID} render={(item, index) => (
                <div key={index} className='flex-col justify-center item-center'>
                    <h3 className='text-white text-xl'>{item.title}</h3>
                    <div className='relative flex justify-center items-center gap-2 py-4 px-0 '>
                        <input
                            placeholder={item.labelInput}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-[100%] p-4 bg-black/50 rounded-md border border-white/50 peer placeholder-transparent text-white'
                        />
                        <label className='absolute top-0 left-0 pl-4 peer-placeholder-shown:top-8 peer-focus:top-[16px] transition-all text-lg text-white'>{item.labelInput}</label>
                        <DefaultButton
                            onClick={handleEmail}
                            text={item.buttonSubmit}
                            isArrowIcon={true}
                            styles={"flex py-4 w-[50%] flex justify-center items-center gap-2 text-xl min-w-[170px] mx-auto"} />
                    </div>
                </div>
            )} />
        </form>
    )
}

export default InputMembership