import React from "react";
import '../App.css';

function Card (props) {
    return (
        <div>
            <div className="card">
                <div className="top">
                    <h2 className="name"> {props.name} </h2>
                    <img className="circle-img" src={props.imgURL} alt="avatar_image"/>
                </div>
                <div className="bottom">
                    <p>{props.phone}</p>
                    <p>{props.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;