export async function createPrompt(payload) {
  try {
    let response = await fetch('/api/Prompts/upload', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    console.log("responseJson", responseJson);
    
    return responseJson
  } catch (error) {
    console.log(error)
  }
}