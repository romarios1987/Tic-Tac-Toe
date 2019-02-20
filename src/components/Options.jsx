import React from 'react'
const Options = (props) => {
  return (
        <div className="Options" id={props.idName}>
          <h3>{props.title}</h3>
          <div className="btn-wrap">
             <span className="btn" onClick={props.clickHandlerOne}>
            {props.optionOne}
          </span>
            <span className="btn" onClick={props.clickHandlerTwo}>
            {props.optionTwo}
          </span>
          </div>
        </div>
  )
};
export default Options