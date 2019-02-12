export async function getLcsas() {
  console.log('Getting lcsas')
  try {
    let response = await fetch('/api/Lcsas', {
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

export async function getLcsa(id) {
  console.log('Getting lcsa -- ', id)
  try {
    let response = await fetch(`/api/Lcsas/${id}`, {
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

export async function createLcsa(payload) {
  console.log('Creating Lcsa -- ', payload);
  
  try {
    let response = await fetch('/api/Lcsas', {
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

export async function updateLcsa(payload) {
console.log('updating lcsa', payload)
try {
  let response = await fetch(`/api/Lcsas/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload.data)
  });
  let responseJson = await response.json()
  return responseJson
} catch (error) {
  return {error}
}
}

export async function deleteLcsa(payload) {
  console.log('Deleting lcsa -- ', payload)
  try {
    let response = await fetch(`/api/Lcsas/${payload}`, {
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

export async function lcsaToggle(payload) {
  console.log('lcsaToggle -- ', payload)
  try {
    let response = await fetch('/api/Lcsas/toggle', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    console.log('Response json lcsas toggle', responseJson)
    return responseJson
  } catch (error) {
    return {error}
  }
}
