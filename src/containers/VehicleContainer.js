import React from "react";
import './VehicleContainer.css';
import VehicleCard from '../components/VehicleCard';
import DropdownFilter from '../components/DropdownFilter';
import Modal from '../components/Modal';

class VehicleContainer extends React.Component {
  state = {
    vehicles: [],
    loading: true,
    sortBy: undefined,
    showModal: false,
    selectedVehicle: null
  }

  async componentDidMount() {
    const url = 'https://6157228e8f7ea600179850e4.mockapi.io/api/vehicles'

    try {
      const response = await fetch(url)
      const data = await response.json()
      this.setState({ vehicles: data, loading: false })
    } catch (e) {
      return null
    }
  }

  sortedVehicles  = () => {
    const { sortBy, vehicles } = this.state

    if (sortBy === 'Range ASC') {
      return vehicles.sort((a, b) => this.sortAscending(a.range.distance, b.range.distance))
    } else if (sortBy === 'Range DESC') {
      return vehicles.sort((a, b) => this.sortDescending(a.range.distance, b.range.distance))
    } else if (sortBy === 'Price ASC') {
      return vehicles.sort((a, b) => this.sortAscending(this.getPrice(a), this.getPrice(b)))
    } else if (sortBy === 'Price DESC') {
      return vehicles.sort((a, b) => this.sortDescending(this.getPrice(a), this.getPrice(b)))
    } else {
      return vehicles
    }
  }

  getPrice = (vehicle) => parseInt(vehicle.price.split(" ")[0])

  sortAscending =  (a, b ) => {
    if ( a < b ) {
      return -1;
    }
    else if ( a > b ){
      return 1;
    }
    return 0;
  }

  sortDescending = (a, b) => {
    if ( a > b ) {
      return -1;
    }
    else if ( a < b ) {
      return 1;
    }
    return 0;
  }

  handleSortByChange = (selectedOption) => this.setState({ sortBy: selectedOption.value })

  hideModal = () => this.setState({ showModal: false, selectedVehicle: null })

  displayModal = (vehicle) => this.setState({ showModal: true, selectedVehicle: vehicle })

  renderVehicleList = () => {
    const vehicles = this.state.sortBy ? this.sortedVehicles() : this.state.vehicles

    return vehicles.map((vehicle) => {
      return (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          displayModal={this.displayModal}
        />
      )
    }) 
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <DropdownFilter
          onChange={this.handleSortByChange}
          value={this.state.sortBy}
        />
        <div className="image-list">
          {this.state.loading || this.state.vehicles.length === 0 ?
            <div>Loading...</div> :
            this.renderVehicleList()
          }
        </div>
        {this.state.showModal ? <Modal vehicle={this.state.selectedVehicle} onDismiss={this.hideModal} /> : null }
      </div>
    )
  }
}

export default VehicleContainer;