import React, { useEffect, useState } from "react";
import { words } from './words.json'

export default function State({ maxWrong = 6 }) {

    // get random word from json file
    const generateRandomWord = () => {
        return words[Math.floor(Math.random() * words.length)]
    }


    // initialize hooks
    const [nWrong, setNWrong] = useState(0)
    const [gussed, setGussed] = useState(new Set())
    const [answer, setAnswer] = useState(generateRandomWord())


    // generate words to display user
    const genrateWords = () => {
        return answer.split("").map(ltr => {
            return gussed.has(ltr) ? ltr : "_"
        })
    }

    // create buttons of alphabet
    const createBtn = () => {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map((btn, index) => {
            return <button
                onClick={generateBtn}
                key={index}
                disabled={gussed.has(btn)}>{btn}</button>
        })
    }

    // manage state when user click button
    const generateBtn = (e) => {
        const userGuess = e.target.innerHTML
        setGussed({ gussed: gussed.add(userGuess) })
        setNWrong({ nWrong: nWrong + (answer.includes(userGuess) ? 0 : 1) })
    }

    // manage image that show the user with css styling
    const generateImage = () => {
        let nums = ['two', 'three', 'four', 'five', 'six']
        const divElements = Array.from({ length: nWrong }).map((div, idx) => {
            if (idx === 5) {
                return document.querySelector('.base').classList.add('lose')
            }
            return <div className={nums[idx]}></div>
        })
        return divElements;
    }

    // manage the state of game
    const handleWin = () => {
        if (answer === genrateWords().join("")) {
            return <p className='win'>you win</p>
        } else if (nWrong >= maxWrong) {
            return <p className='lose'>you lose</p>
        } else {
            return <p className='generateBtn'>{createBtn()}</p>
        }
    }


    return (
        <div className="State">
            <div className='wrrap'>
                <div className='one'></div>
                <div className='base'></div>
                {generateImage()}
            </div>
            <p>gussed number: {nWrong}</p>
            <p className='genrateWords'>{!(nWrong >= maxWrong) ? genrateWords() : answer}</p>
            {handleWin()}
        </div>
    )
}
