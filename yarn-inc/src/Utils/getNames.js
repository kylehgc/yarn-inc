const URL = 'https://www.thecolorapi.com/'

const getName = async(color) => {
 
  color = color.slice(1)
  
  const response = await fetch(`${URL}id?hex=${color}&?format=JSON`)
  const data = await response.json()
  return data.name.value
  
}

const getNames = async (swatch) => {
  
  return await Promise.all(swatch.map((color)=> getName(color) ))
}
export default getNames