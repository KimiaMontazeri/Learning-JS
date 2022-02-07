import React from "react";


let title = "this is the title!"
let content = "this is the content"

function Note() {
    return (
        <div className="note">
            <h1> {title} </h1>
            <p> {content} </p>
        </div>
    )
}

export default Note
