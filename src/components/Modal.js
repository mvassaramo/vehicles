import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  const { make, model, price, colors, range } = props.vehicle

  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active">
        <i onClick={props.onDismiss} className="close icon"></i>
        <div className="header">{make} - {model}</div>
        <div className="content">
          <p>Price: {price}</p>
          <p>Colours available: {colors.join(", ")}</p>
          <p>Range: {range.distance} {range.unit}</p>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default Modal;