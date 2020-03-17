import React, {useState, useEffect} from 'react';
import GameResult from '../components/gameComponents/GameResult.js';
import QuizForm from '../components/gameComponents/QuizForm.js';
import GamePlantImage from '../components/gameComponents/GamePlantImage.js';
import Timer from '../components/gameComponents/Timer.js'
import HealthBar from '../components/gameComponents/HealthBar.js'
import './GameContainer.css';
import { useParams } from 'react-router-dom';

const GameContainer = (props) => {

  const [players, setPlayers] = useState([])
  const [plant, setPlant] = useState({})
  const [playerAnswers, setPlayerAnswers] = useState({
    wateringFrequency: null,
    fertilisationFrequency: null,
    lightRequirement: null,
    temperature: null
  })
  const [playerScore, setPlayerScore] = useState(4)
  const [isQuizFormActive, setIsQuizFormActive] = useState(true)
  const {plantId} = useParams()


  useEffect(() => {
    fetch(`http://localhost:8080/plants/${plantId}`)
    .then(response => response.json())
    .then(plantObject => setPlant(plantObject))
    .catch(err => console.error)
    fetch('http://localhost:8080/players')
    .then(response => response.json())
    .then(playersObject => playersObject._embedded.players)
    .then(playersArray => setPlayers(players))
    .catch(err => console.error)
  }, [])


  useEffect(() => {
      setPlayerScore(calculateGameScore())
      if (playerScore <= 0) {
        setPlayerScore(0)
        setIsQuizFormActive(false)
      }
    }, [playerAnswers]
  )

  const watchAndSetGameStatus = (arrayOfTruthSources) => {
    let truthCount = 0
    arrayOfTruthSources.forEach(item => {
      if (item === false) {
        truthCount += 1
      }
    })
    if (truthCount === 4) {
      setIsQuizFormActive(false)
    }
  }

  const addAnswer = (answer) => {
    const newAnswers = {...playerAnswers, ...answer}
    setPlayerAnswers(newAnswers)
  }

  const reduceScoreByTimer = () => {
    if (playerScore > 0) {
      setPlayerScore(playerScore -1)
    }
    if (playerScore <= 0){
      setPlayerScore(0)
      setIsQuizFormActive(false)
    }
  }

  const calculateGameScore = () => {
    let score = playerScore
    if (playerAnswers.wateringFrequency !== null ){
      if (plant.wateringFrequency === playerAnswers.wateringFrequency) {
        score += 1
      } else {
        score -= 1
      }
      const answer = {wateringFrequency: null}
      const newAnswers = { ...playerAnswers, ...answer}
      setPlayerAnswers(newAnswers)
    }
    if (playerAnswers.fertilisationFrequency !== null ) {
      if (plant.fertilisationFrequency === playerAnswers.fertilisationFrequency ){
        score +=1
      } else {
        score -= 1
      }
      const answer = {fertilisationFrequency: null}
      const newAnswers = { ...playerAnswers, ...answer}
      setPlayerAnswers(newAnswers)
    }
    if(playerAnswers.lightRequirement !== null) {
      if (plant.lightRequirement === playerAnswers.lightRequirement ){
        score +=1
      } else {
        score -= 1
      }
      const answer = {lightRequirement: null}
      const newAnswers = { ...playerAnswers, ...answer}
      setPlayerAnswers(newAnswers)
    }
    if ( playerAnswers.temperature !== null) {
      if (playerAnswers.temperature >= plant.minTemperature &&
        playerAnswers.temperature <= plant.maxTemperature ){
          score +=1
        } else { 
          score -= 1 
        }
        const answer = {temperature: null}
        const newAnswers = { ...playerAnswers, ...answer}
        setPlayerAnswers(newAnswers)
      }
      return score
    }

    const resetPlayerAnswers = () => {
      const defaultPlayerAnswers = {
        wateringFrequency: null,
        fertilisationFrequency: null,
        lightRequirement: null,
        temperature: null
      }
      setPlayerAnswers(defaultPlayerAnswers)
      setPlayerScore(4)
    }

    const playAgain = () => {
      resetPlayerAnswers()
      setIsQuizFormActive(true)
    }

    let quizForm = null
    let timer = null
    if (isQuizFormActive) {
      quizForm = <QuizForm
      isQuizFormActive={isQuizFormActive}
      defaultGameAnswers = {playerAnswers}
      onAnswersSubmit={addAnswer}
      setGameInputStatus = {isQuizFormActive}
      watchAndSetGameStatus = {watchAndSetGameStatus}
      />

      timer = <Timer 
        score={playerScore} 
        reduceScoreByTimer={reduceScoreByTimer} 
        setIsQuizFormActive={setIsQuizFormActive}
      />
    }

    return (
      <section className="game-page">
        
        <h1>{plant.commonName}</h1>
        
        <section className="game">
          <div className="plant">
            <GamePlantImage playerScore={playerScore}/>
            <HealthBar score={playerScore}/>
          </div>

          <div className="game-box">
            {timer}
            {quizForm}
    
            <GameResult
              playerScore={playerScore}
              isQuizFormActive={isQuizFormActive}
              resetPlayerAnswers={resetPlayerAnswers}
              playAgain={playAgain}
            />
          </div>
        </section>  
      </section>
    )

}

export default GameContainer;
