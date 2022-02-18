import React from "react";
import '../App.css';

function Term (props) {
    return (
        <div className="term">
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              {props.emojiIcon}
            </span>
            <span>
              {props.name}
            </span>
          </dt>
          <dd>
            {props.meaning}
          </dd>
        </div>
    );
}

export default Term;