export async function submitScheduleToServer(payload) {
  try {
    let response = await fetch('/api/TimeRanges', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}