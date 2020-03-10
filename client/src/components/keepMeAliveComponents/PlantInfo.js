import React, { useEffect, useState } from 'react';
import aloeVeraMedium from '../../assets/aloevera2.png';
import './PlantInfo.css'

const PlantInfo = (props) => {
  
  const [plant, setPlant] = useState({});

  const getPlant = () => {
    fetch(`http://localhost:8080/plants/${props.match.url}`)
      .then(response => response.json())
      .then(plantObject => setPlant(plantObject))
      .catch(err => console.error)
  }

  useEffect( () => {
    getPlant();
  }, [])
  
  return (
    <article className="plant-info">

      <h1>{plant.commonName}</h1>

      <section className="plant-facts">
        <dl id="plant-scientific-name">
          <dt>scientific name: </dt> 
          <dd>{plant.scientificName}</dd>
        </dl>

        <p>{plant.description}</p>
      </section>

      <figure>  
        <img
            src={aloeVeraMedium}
            id="medium-aloe"
            alt="Aloe vera plant"
          />
        <figcaption>Keep me alive!</figcaption>
      </figure>

      <section className="plant-care-instructions">
        <h2>Care instructions:</h2>
        <dl>
            <dt>Watering: </dt>
            <dd>You should water this plant about {plant.wateringFrequency} times a month. When the top 2 inches of soil are dry, this is a good time to do it.</dd>

            <dt>Fertilisation: </dt>
            <dd>This plant requires fertilisation {plant.fertilisationFrequency} times a month. The best time to do this is during watering.</dd>

            <dt>Light requirements: </dt>
            <dd>This plant prefers {plant.lightRequirement} light.</dd>
          
            <dt>Temperature requirements: </dt>
            <dd>This plant thrives in temperatures between {plant.minTemperature}°C and {plant.maxTemperature}°C.</dd>
        </dl>
      </section>

      <div id="plant-info-buttons">
        <button className="navigate" onClick={() => {props.setGameStatus(true)}}>PLAY</button>
        <button className="navigate" onClick={props.returnToPickAPlant}>PICK A DIFFERENT PLANT</button>
      </div>

    </article>
  )
}

export default PlantInfo;
