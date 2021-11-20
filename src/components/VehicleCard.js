import React from "react";
import "./VehicleCard.css"

const VehicleCard = (props) => {
  const { photo, make, model, price, range } = props.vehicle

  return(
    <div className="vehicle-card">
     <img src={photo} alt="vehicle" />
      <div>
        <p>{make}</p>
        <p>{model}</p>
        <p>{price}</p>
        <p>{range.distance}</p>
      </div>
    </div>
  )
}

export default VehicleCard;