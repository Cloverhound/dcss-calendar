export async function createPrompt(payload) {
  try {
    let response = await fetch('/api/Prompts/upload', {
      method: 'POST',
      body: payload
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}