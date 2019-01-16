export async function getHolidayLists() {
    console.log('Getting holiday lists')
    try {
      let response = await fetch('/api/HolidayLists', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        },
      });
      let responseJson = await response.json()
      return responseJson
    } catch (error) {
      return {error}
    }
  }
  
  export async function createHolidayList(payload) {
    console.log('Submitting New Holiday List to Server', JSON.stringify(payload))
    try {
      let response = await fetch('/api/holidayLists/createWithHolidays', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      let responseJson = await response.json()
      return responseJson
    } catch (error) {
      return {error}
    }
  }
  
  export async function getHolidayList(payload) {
    console.log('Getting holiday list -- ', payload.id)
    try {
      let response = await fetch('/api/HolidayLists/' + payload.id + '?filter=%7B%22include%22%3A%22holidays%22%7D', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Pragma': 'no-cache',
          'Cache-Control': 'no-cache'
        },
      });
      let responseJson = await response.json()
      console.log('Response json', responseJson)
      return responseJson
    } catch (error) {
      return {error}
    }
  }
  
  export async function updateHolidayList(payload) {
    console.log('Getting holiday lists', payload)
    try {
      let response = await fetch('/api/HolidayLists/' + payload.id + '/updateWithHolidays', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      let responseJson = await response.json()
      return responseJson
    } catch (error) {
      return {error}
    }
  }
  
  
  export async function deleteHolidayList(payload) {
    console.log('Deleting holiday list -- ', payload)
    try {
      let response = await fetch('/api/HolidayLists/' + payload + '/deleteWithHolidays', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
      let responseJson = await response.json()
      console.log('Response json', responseJson)
      return responseJson
    } catch (error) {
      return {error}
    }
  }