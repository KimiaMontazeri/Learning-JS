import React from "react";

function Footer() {
    const date = new Date()
    return (<p className="footer"> copyright {date.getFullYear()} </p>)
}

export default Footer
