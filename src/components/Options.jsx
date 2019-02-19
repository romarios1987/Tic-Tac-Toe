import React from 'react'

const Options = ({idName, title, clickHandlerOne, clickHandlerTwo, optionOne, optionTwo}) => {
  return (
        <div className="Options" id={idName}>
          <h3>{title}</h3>
          <span onClick={clickHandlerOne}>
            {optionOne}
          </span>
          <span onClick={clickHandlerTwo}>
            {optionTwo}
          </span>
        </div>
  )
};
export default Options