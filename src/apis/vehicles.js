async function fetchVehicles () {
  const url = 'https://6157228e8f7ea600179850e4.mockapi.io/api/vehicles'

    try {
      const response = await fetch(url)
      if(!response.ok) throw new Error(response.status)
      else {
        const data = await response.json()
        return data
      }
    } catch (error) {
      console.log(error);
      return null
    }
}

export { fetchVehicles };