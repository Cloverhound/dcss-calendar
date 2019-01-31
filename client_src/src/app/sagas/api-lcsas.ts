getLcsas

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

export async function createLcsa(payload) {
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