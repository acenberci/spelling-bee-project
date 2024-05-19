import React, { useEffect, useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import axios from "axios";
import i18next from '../i18n.js'

function HoneyComb({ foundedWords, setFoundedWords, setFinished, isTurkish }) {
    const [words, setWords] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [shuffle, setShuffle] = useState(false);
    const [disableController, setDisableController] = useState(false)
    const [remainingTime, setRemainingTime] = useState(60);
    const Alphabet = [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z']]
    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [])
    useEffect(() => {
        setInputValue('')
        var tempWords = []
        for (let i = 0; i < 7; i++) {
            var word = Alphabet[isTurkish ? 1 : 0][Math.floor(Math.random() * 26)]
            while (tempWords.includes(word)) {
                word = Alphabet[isTurkish ? 1 : 0][Math.floor(Math.random() * 26)]
            }
            tempWords.push(word)
        }
        setWords(tempWords)
        setRemainingTime(60)
        setFoundedWords([])
    }, [shuffle])
    useEffect(() => {
        if (inputValue.length > 9) {
            showErrorMessage(i18next.t("errLong"))
            setTimeout(() => {
                setInputValue("")
            }, 1000);
        }
    }, [inputValue])
    useEffect(()=>{
        if(remainingTime<0){
            setFinished(true)
        }
    },[remainingTime])
    function honeyCombAnimation(targetButton) {
        targetButton.classList.add('honeyCombAnimation');
        setTimeout(() => {
            targetButton.classList.remove('honeyCombAnimation')
        }, 200);
    }
    function click(targetButton) {
        honeyCombAnimation(targetButton);
        addValue(targetButton.innerHTML)
    }
    const inputChange = (event) => {
        setInputValue(event.target.value);
    };
    const addValue = (value) => {
        setInputValue(inputValue + value);
    };
    function deleteLastLetter() {
        const tempInput = inputValue.slice(0, -1);
        setInputValue(tempInput)
    }
    function checkWordCorrection() {
        let tempInputValue = inputValue
        if (inputValue.length <= 3) {
            showErrorMessage(i18next.t("errShort"))
        } else if (!inputValue.includes(words[0])) {
            showErrorMessage(i18next.t("errCenterLetter"))
        }
        else if (foundedWords.includes(tempInputValue)) {
            showErrorMessage(i18next.t("errAlreadyF"))
        }
        else {
            axios.post((`http://localhost:3001/${isTurkish ? "tr" : "en"}`), { value: tempInputValue }).then((res) => {
                if (res.data) {
                    setRemainingTime(prevRemainingTime => prevRemainingTime + 15);
                    setFoundedWords([...foundedWords, tempInputValue])
                }
                else {
                    showErrorMessage(i18next.t("errNotIn"))
                }
            })
        }
        setInputValue("")
    }
    function showErrorMessage(index) {
        setErrorMessage(index)
        setDisableController(true)
        const eMessage = document.getElementsByClassName("errorMessage")[0]
        eMessage.classList.add("fadeIn")
        setTimeout(() => {
            eMessage.classList.remove("fadeIn")
            setTimeout(() => {
                setDisableController(false)
                setInputValue("")
            }, 1000)
        }, 1000);
    }
    return (<>
        <div className=' absolute max-lg:right-5 max-lg:top-5 right-10 top-10'><p className={`font-bold text-4xl rounded-full w-20 h-20 border-2 justify-center flex items-center ${remainingTime > 30 ? "text-green-400 border-green-400" : 10 > remainingTime ? " text-red-400 border-red-400" : "text-yellow-400 border-yellow-400"} `}>{remainingTime}</p></div>

        <div className=' w-[260px] mx-auto max-lg:col-span-2'>
            <div className="text-center">
                <div className='flex justify-center'>
                    <p className='errorMessage rounded-md border-1 py-1 px-4 bg-black text-white w-fit opacity-0 h-8'>{errorMessage}</p>
                </div>
                <input className='w-full font-semibold text-center text-3xl pointer-events-none pb-5 bg-[#aaaaaa]' type="text" value={inputValue} onChange={inputChange} readOnly />
            </div>
            <div className=' position relative flex items-center justify-center text-3xl font-semibold w-[260px] h-[269.806px]'>
                <button onClick={(event) => click(event.target)} className='honeyComb w-[100px] h-[86.602px] leading-[86.602px]' disabled={disableController} >
                    {words[0]}
                </button>
                <button onClick={(event) => click(event.target)} className='honeyComb w-[100px] h-[86.602px] leading-[86.602px] left-[calc(50%-50px)] top-[calc(50%-134.903px)]' disabled={disableController}>
                    {words[1]}
                </button>
                <button onClick={(event) => click(event.target)} className='honeyComb w-[100px] h-[86.602px] leading-[86.602px] left-[calc(50%-129.330px)] top-[calc(50%-89.102px)]' disabled={disableController}>
                    {words[2]}
                </button>
                <button onClick={(event) => click(event.target)} className='honeyComb w-[100px] h-[86.602px] leading-[86.602px] left-[calc(50%+29.330px)] top-[calc(50%-89.102px)]' disabled={disableController}>
                    {words[3]}
                </button>
                <button onClick={(event) => click(event.target)} className='honeyComb w-[100px] h-[86.602px] leading-[86.602px] left-[calc(50%-129.330px)] top-[calc(50%+2.5px)]' disabled={disableController}>
                    {words[4]}
                </button>
                <button onClick={(event) => click(event.target)} className='honeyComb w-[100px] h-[86.602px] leading-[86.602px] left-[calc(50%+29.330px)] top-[calc(50%+2.5px)]' disabled={disableController}>
                    {words[5]}
                </button>
                <button onClick={(event) => click(event.target)} className='border-0 honeyComb w-[100px] h-[86.602px] leading-[86.602px] left-[50%-50px] top-[calc(50%+48.301px)]' disabled={disableController}>
                    {words[6]}
                </button>
            </div>
            <div className='flex items-center justify-between w-full mt-5 ' disabled={disableController}>
                <button className='bg-[#ebebeb] p-3 font-semibold text-md rounded-2xl w-[30%]' onClick={() => deleteLastLetter()}>
                    {i18next.t("delButton")}
                </button>
                <button className='bg-[#ebebeb] p-3 rounded-full' onClick={() => setShuffle(prev => !prev)} disabled={disableController}>
                    <ArrowPathIcon className='size-7'></ArrowPathIcon>
                </button>
                <button className='bg-[#ebebeb] p-3 font-semibold text-md rounded-2xl w-[30%]' onClick={() => checkWordCorrection()} disabled={disableController}>
                    {i18next.t("enterButton")}
                </button>
            </div>
        </div>
    </>
    )
}

export default HoneyComb