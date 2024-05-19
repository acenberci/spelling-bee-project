import React from 'react'
import i18next from '../i18n.js'


function MainScreen({ setStarted,isTurkish,setIsTurkish }) {
    function changeLanguage(){
        if(isTurkish){
            i18next.changeLanguage("en")
            window.location.pathname = "/en"
        }else{
            i18next.changeLanguage("tr")
            window.location.pathname = "/tr"
        }
        setIsTurkish(prev=>!prev)
    }
    return (
        <>
            <button onClick={()=>{changeLanguage()}} className='absolute right-5 top-5 rounded-full border-2 overflow-hidden'>
                <img className='size-14' src={require(`../Assets/Icons/${isTurkish?"tr":"en"}Flag.jpg`)} alt="" />
            </button>
            <div className='text-center absolute -translate-x-1/2 left-1/2 top-[calc(20%)]'>
                <img src={require("../Assets/Icons/spellingBeeIcon.png")} alt="" className=' mx-auto size-16' />
                <h4 className=' font-bold text-2xl'>Spelling Bee</h4>
                <button className='border-black border-4 px-10 rounded-full bg-[#f8cd0e] mt-[20vh]' onClick={() => setStarted(true)}>
                    <p className='text-3xl font-bold px-2 py-3 border-black border-x-4 bg-[#f8cd0e]'>{i18next.t("startButton")}</p>
                </button>
            </div>
            <div className='absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2'>

            </div>
        </>
    )
}

export default MainScreen