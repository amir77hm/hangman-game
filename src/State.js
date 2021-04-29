import React, { Component } from 'react'
import { words } from './words.json'

export default class State extends Component {


    static defaultProps = {
        maxWrong: 6
    }

    // get random word from json file
    generateRandomWord = () => {
        return words[Math.floor(Math.random() * words.length)]
    }

    // initialize the state
    state = {
        nWrong: 0,
        gussed: new Set(),
        answer: this.generateRandomWord()
    }

    // generate words to display user
    genrateWords = () => {
        return this.state.answer.split("").map(ltr => {
            return this.state.gussed.has(ltr) ? ltr : "_"
        })
    }

    // create buttons of alphabet
    createBtn = () => {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map((btn, index) => {
            return <button
                onClick={this.generateBtn}
                key={index}
                disabled={this.state.gussed.has(btn)}>{btn}</button>
        })
    }

    // manage state when user click button
    generateBtn = (e) => {
        const userGuess = e.target.innerHTML
        this.setState(prevState => ({
            gussed: prevState.gussed.add(userGuess),
            nWrong: prevState.nWrong + (prevState.answer.includes(userGuess) ? 0 : 1)
        }))
    }

    // manage image that show the user with css styling
    generateImage = () => {
        let nums = ['two', 'three', 'four', 'five', 'six']
        const divElements = Array.from({ length: this.state.nWrong }).map((div, idx) => {
            if (idx === 5) {
                return document.querySelector('.base').classList.add('lose')
            }
            return <div className={nums[idx]}></div>
        })
        return divElements;
    }

    // manage the state of game
    handleWin = () => {
        if (this.state.answer === this.genrateWords().join("")) {
            return <p className='win'>you win</p>
        } else if (this.state.nWrong >= this.props.maxWrong) {
            return <p className='lose'>you lose</p>
        } else {
            return <p className='generateBtn'>{this.createBtn()}</p>
        }
    }

    render() {
        const gameOver = this.state.nWrong >= this.props.maxWrong
        return (
            <div className="State">
                <div className='wrrap'>
                    <div className='one'></div>
                    <div className='base'></div>
                    {this.generateImage()}
                </div>
                <p>gussed number: {this.state.nWrong}</p>
                <p className='genrateWords'>{!gameOver ? this.genrateWords() : this.state.answer}</p>
                {this.handleWin()}
            </div>
        )
    }
}
