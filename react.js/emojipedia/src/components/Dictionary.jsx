import React from "react";
import Term from "./Term";
import emojipedia from "../emojipedia.js";
import '../App.css';


function createEmoji(e) {
    return (
        <Term 
        id= {e.id}
        emojiIcon= {e.emoji}
        name= {e.name}
        meaning= {e.meaning}
        />
    )
}

function Dictionary() {
    return (
        <div>
            <h1>
                <span>emojipedia</span>
            </h1>
            <dl className="dictionary">
                {emojipedia.map(createEmoji)}
            </dl>
        </div>
    )
}

export default Dictionary;
