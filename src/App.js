import React, { useEffect, useState } from "react"

const width = 8
const candyColor = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]

const App = () => {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([])

  //if there is match of three candies (columns and rows)
  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2]

      const decidedColor = currentColorArrangement[i]

      if ( columnOfThree.every(square => currentColorArrangement[square] === decidedColor) ) {
        columnOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]

      const decidedColor = currentColorArrangement[i]

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]

      if (notValid.includes(i)) continue

      if ( rowOfThree.every(square => currentColorArrangement[square] === decidedColor) ) {
        rowOfThree.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  //if there is match of four candies (columns and rows)
  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]

      const decidedColor = currentColorArrangement[i]

      if ( columnOfFour.every(square => currentColorArrangement[square] === decidedColor) ) {
        columnOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]

      const decidedColor = currentColorArrangement[i]

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]

      if (notValid.includes(i)) continue

      if ( rowOfFour.every(square => currentColorArrangement[square] === decidedColor) ) {
        rowOfFour.forEach(square => currentColorArrangement[square] = '')
      }
    }
  }

  //this will moves the candies down if there is an empty space
  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {

      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangement[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColor.length)
        currentColorArrangement[i] = candyColor[randomNumber]
      }
      
      if ((currentColorArrangement[i+ width]) === '') {
        currentColorArrangement[i+ width] = currentColorArrangement[i]
        currentColorArrangement[i] = ''
      }
    }
  }

  const createBoard = () => {
    const randomColorArrangement = []

    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColor[Math.floor(Math.random() * candyColor.length)]
      randomColorArrangement.push(randomColor)
    }

    setCurrentColorArrangement(randomColorArrangement)
  }

  //for creating a gameboard
  useEffect(() => {
    createBoard()
  }, [])

  //for checking matches between candies
  useEffect(() => {

    const timer = setInterval(() => {
      //order matters in this case!
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangement])
    }, 100)

    return () => clearInterval(timer)

  }, [checkForColumnOfThree, checkForColumnOfFour, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement])

  console.log(currentColorArrangement)

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img 
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
            data-id={index}
            //handling drag & drop
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={{dragDrop}}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
