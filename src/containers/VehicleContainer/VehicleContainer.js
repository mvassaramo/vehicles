import React from "react";
import './VehicleContainer.css';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter';
import Modal from '../../components/Modal/Modal';
import fetchVehicles from "../../apis/vehicles";

class VehicleContainer extends React.Component {
  state = {
    vehicles: [],
    loading: true,
    sortBy: undefined,
    showModal: false,
    selectedVehicle: null,
    showErrorMessage: false
  }

  async componentDidMount() {
      const vehicles = await fetchVehicles()
      return vehicles ? this.setState({ vehicles: vehicles, loading: false }) : this.setState({ showErrorMessage: true, loading: false })
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

  renderErrorMessage = () => <div>Unable to retrieve data, please try again</div>
  
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

  renderPageContent() {
    if (this.state.showErrorMessage) {
      return this.renderErrorMessage()
    } else if (this.state.loading || this.state.vehicles.length === 0) {
      return <div>Loading...</div>
    } return (
        <>
          <DropdownFilter
            onChange={this.handleSortByChange}
            value={this.state.sortBy}
          />
          <div className="image-list">{this.renderVehicleList()}</div>
        </>
    )
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        {this.renderPageContent()}
      
        {this.state.showModal && <Modal vehicle={this.state.selectedVehicle} onDismiss={this.hideModal} /> }
      </div>
    )
  }
}

export default VehicleContainer;