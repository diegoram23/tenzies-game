import React from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)

  const [time, setTime] = React.useState(0)
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    let interval
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime => prevTime + 10))
      }, 10)
    } else if (!isActive) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive])

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allEqual = dice.every(die => die.value === dice[0].value)

    if (allHeld && allEqual) {
      setTenzies(true)
      setIsActive(false)
    }
  }, [dice])
  //----------------Generates a single new die--------------//
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  //----------------Generates an array of 10 random dice numbers--------------//
  function allNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      //------Object is pushed into diceArray with values representing each die-----//
      diceArray.push(generateNewDie())
    }
    return diceArray
  }

  //----------------Maps over each array element--------------//
  const diceElements = dice.map(die => {
    return <Die
      key={die.id}
      id={die.id}
      handleClick={() => holdDice(die.id)}
      value={die.value}
      isHeld={die.isHeld}
    />
  })

  //----------------Flips boolean of die(isHeld) resulting in color change--------------//
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
    setIsActive(true)
  }


  function newGame() {
    setDice(allNewDice())
    setTenzies(false)
    setCount(0)
    setTime(0)
  }
  //----------------Generates random dice numbers if isHeld is false--------------//
  function rollDice() {
    //----------------Maintains isHeld state of previous die--------------//
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))

    setCount(prevCount => prevCount + 1)
    setIsActive(true)
  }


  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at
        its current value between rolls.
      </p>
      <div className='dice--container'>
        {diceElements}
      </div>
      <div className='game-stats-container'>
        <h2 className='game--rolls'>Rolls: {count}</h2>
        <div className='timer'>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
      </div>
      <button onClick={tenzies ? newGame : rollDice} >{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

