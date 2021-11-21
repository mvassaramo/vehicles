import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation() } className="ui standard modal visible active">
        <i onClick={props.onDismiss} className="close icon"></i>
        <div className="header">{props.vehicle.make} - {props.vehicle.model}</div>
        <div className="content">
          <p>Price: {props.vehicle.price}</p>
          <p>Colours available: {props.vehicle.colors.join(", ")}</p>
          <p>Range: {props.vehicle.range.distance} {props.vehicle.range.unit}</p>
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default Modal;