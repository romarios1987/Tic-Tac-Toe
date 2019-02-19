import React from 'react'

const Square = (props) => {

  // gameEnded, markSquare
  return (
        <div className={"coll button" + props.index + (props.gameEnded ? " ended" : " notEnded")}
                onClick={(event) => props.markSquare(event, props.index)}
        >
          {props.value}
        </div>
  )
};

export default Square