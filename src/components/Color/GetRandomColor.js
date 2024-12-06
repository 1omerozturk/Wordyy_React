function getRandomColor() {
  const r = Math.floor(Math.random() * 199)
  const g = Math.floor(Math.random() * 199)
  const b = Math.floor(Math.random() * 199)
  return `rgb(${r}, ${g}, ${b})`
}

export default getRandomColor
