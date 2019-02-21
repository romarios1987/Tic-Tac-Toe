import React from 'react'

const Options = (props) => {
  return (
        <div className="Options" id={props.idName}>
          <h3>{props.title}</h3>
          <div className="Btn-wrap">
             <span className="Btn" onClick={props.clickHandlerOne}>
            {props.optionOne}
          </span>
            <span className="Btn" onClick={props.clickHandlerTwo}>
            {props.optionTwo}
          </span>
          </div>
        </div>
  )
};
export default Options