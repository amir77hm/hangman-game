import React, { Component } from 'react'
import img1 from "./img/img1.jpg";
import img2 from "./img/img2.jpg";
import img3 from "./img/img3.jpg";
import img4 from "./img/img4.jpg";
import img5 from "./img/img5.jpg";
import img6 from "./img/img6.jpg";

export default class State extends Component {
    static defaultProps = {
        images: [img1, img2, img3, img4, img5, img6]
    }

    state = {
        nWrong: 4,
        gussed: new Set(),
        answer: 'test'
    }

    genrateWords = () => {
        return this.state.answer.split("").map(ltr => { this.state.gussed.has(ltr) ? ltr : "_" })
    }

    render() {
        return (
            <div className="State">
                <img src={this.props.images[this.state.nWrong]} />
                <p className='genrateWords'>{this.genrateWords()}</p>
            </div>
        )
    }
}
