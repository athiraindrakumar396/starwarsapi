import { useState } from "react";
import React from 'react';
import $ from "jquery";
import "./App.css";
import axios from 'axios';

function App() {

    // all initialisations
    let peoplePageVal = 1;
    let planetPageVal = 1;
    let starshipPageVal = 1;
    let listPeople = [];
    let listStarship = [];
    let listPlanets = [];
    const [result, setResult] = useState("");
    const [response, setResponse] = useState("");

    // all API paths defined below
    const HomeAPI = 'http://localhost:8000/api/index.php';
    const PeopleAPI = 'http://localhost:8000/api/ListPeople.php';
    const PlanetsAPI = 'http://localhost:8000/api/ListPlanets.php';
    const StarshipsAPI = 'http://localhost:8000/api/ListStarships.php';
    const PersonAPI = 'http://localhost:8000/api/SearchPerson.php';
    const ViewPeopleAPI = 'http://localhost:8000/api/ViewPeople.php';
    const ViewPlanetsAPI = 'http://localhost:8000/api/ViewPlanet.php';
    const ViewStarshipsAPI = 'http://localhost:8000/api/ViewStarships.php';

    // hide homepage when other pages are rendered
    const hideHomePage = () => {
      $('.homepage').hide()
    }

    // show homepage when needed
    const showHomePage = () => {
      $('.homepage').show()
    }

    // show people, planets or starships when needed
    const showPeople = () => {
      $('.gallery').show()
    }

    // hide people, planets or starships when other pages are rendered
    const hidePeople = () => {
      $('.gallery').hide()
    }

    // hide people search when on other pages
    const hideFilterBox = () => {
      $('.filter-text').hide()
    }

    // show people search when on people list page
    const showFilterBox = () => {
      $('.filter-text').show()
    }

    const showViewItem = () => {
      $('.displayItem').show()
    }

    const hideViewItem = () => {
      $('.displayItem').hide()
    }

    const showLoader = () => {
      $('.loader').show()
    }

    const hideLoader = () => {
      $('.loader').hide()
    }

    const hightlightStarShips = () => {
      $('.starships').css("background-color", "#ddd");
      $('.starships').css("color", "black");
    }

    const hightlightPeople = () => {
      $('.people').css("background-color", "#ddd");
      $('.people').css("color", "black");
    }

    const hightlightPlanets = () => {
      $('.planets').css("background-color", "#ddd");
      $('.planets').css("color", "black");
    }

    const removeHightlightStarShips = () => {
      $('.starships').css("background-color", "#333");
      $('.starships').css("color", "white");
    }

    const removeHightlightPeople = () => {
      $('.people').css("background-color", "#333");
      $('.people').css("color", "white");
    }

    const removeHightlightPlanets = () => {
      $('.planets').css("background-color", "#333");
      $('.planets').css("color", "white");
    }

    // display homepage
    const homePageFetch = () => {
      removeHightlightPlanets()
      removeHightlightPeople()
      removeHightlightStarShips()
      fetch(HomeAPI)
      .then(response => response.text())
      .then(text => {
          showHomePage()
          hidePeople();
          hideFilterBox()
          hideViewItem()
          hideLoader()
      });
    }

    // display people listing page
    const peopleFetch = () => {
      removeHightlightPlanets()
      hightlightPeople()
      removeHightlightStarShips()
      showLoader();
      axios
        .post(PeopleAPI, {
            pageValue: peoplePageVal
        })
      .then(function(body) {
          hideHomePage()
          showFilterBox()
          hidePeople()
          showLoader();
          if (body['data'].length !== 0) {
            listPeople.push((body['data'].map(
                (element, i) => {
                      return (
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={element.name}>
                         <a onClick={() => handlePeopleClick(element.url)} style={{color:'white'}}> {element.name}</a>
                      </li>
                    )
                }
            )))
            if (listPeople.length !== 0) {
              setResult(Array.prototype.concat.apply([], listPeople))
            }

            if (body['data'][0] && body['data'][0].hasOwnProperty('next')) {
              peoplePageVal = peoplePageVal + 1
              peopleFetch()
            } else {
              showPeople()
              hideLoader();
            }
          } else {
              showPeople()
              hideLoader();
          }
      });
    }

    // display planets listing page
    const planetFetch = () => {
      hightlightPlanets()
      removeHightlightPeople()
      removeHightlightStarShips()
      showLoader();
      axios
        .post(PlanetsAPI, {
            planetPageValue: planetPageVal
        })
      .then(function(body) {
          hideHomePage()
          hidePeople()
          showLoader();
          hideViewItem()
          if (body['data'].length !== 0) {
            listPlanets.push((body['data'].map(
                (element, i) => {
                      return (
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={element.name}>
                         <a onClick={() => handlePlanetClick(element.url)} style={{color:'white'}}> {element.name}</a>
                      </li>
                    )
                }
            )))
            if (listPlanets.length !== 0) {
              setResult(Array.prototype.concat.apply([], listPlanets))
            }

            if (body['data'][0] && body['data'][0].hasOwnProperty('next')) {
              planetPageVal = planetPageVal + 1
              planetFetch()
            } else {
              showPeople()
              hideLoader();
            }
          } else {
            showPeople()
            hideLoader();
          }
      });
    }

    // display starships listing page
    const starshipsFetch = () => {
      removeHightlightPlanets()
      removeHightlightPeople()
      hightlightStarShips()
      showLoader();
      axios
        .post(StarshipsAPI, {
            starshipPageValue: starshipPageVal
        })
      .then(function(body) {
          hideHomePage()
          hidePeople()
          showLoader()
          hideViewItem()
          if (body['data'].length !== 0) {
            listStarship.push((body['data'].map(
                (element, i) => {
                      return (
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={element.name}>
                         <a onClick={() => handleStarshipClick(element.url)} style={{color:'white'}}> {element.name}</a>
                      </li>
                    )
                }
            )))
            if (listStarship.length !== 0) {
              setResult(Array.prototype.concat.apply([], listStarship))
            }

            if (body['data'][0] && body['data'][0].hasOwnProperty('next')) {
              starshipPageVal = starshipPageVal + 1
              starshipsFetch()
            } else {
              showPeople()
              hideLoader();
            }
          } else {
            showPeople()
            hideLoader();
          }
      });
    }

    // search for people in people listing page
    const listenToKey = (e) => {
        axios
        .post(PersonAPI, {
            item: e.target.value
        })
        .then(function(body) {
          hideViewItem()
          const listItems = body['data'].map(
              (element, i) => {
                  return (
                    <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={element.name}>
                       <a style={{color:'white'}}> {element.name}</a>
                    </li>
                  )
              }
          )

          setResult(listItems)
          if (e.target.value === '') {
            peoplePageVal = 1
            peopleFetch()
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    // view people details
    const handlePeopleClick = (id) => {
      showLoader();
      axios
        .post(ViewPeopleAPI, {
            peopleId: id
        })
      .then(function(body) {
          hideHomePage()
          hidePeople()
          hideLoader()
          showViewItem()
          if (body['data'].length !== 0) {
            const viewPeopleItem = (body['data'].map(
                (element, i) => {
                      return (
                      <div>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={1}>
                         <a style={{color:'white'}}>Name: {element.name}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={2}>
                         <a style={{color:'white'}}>Height: {element.height}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={3}>
                         <a style={{color:'white'}}>Mass: {element.mass}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={4}>
                         <a style={{color:'white'}}>Skin Color: {element.skin_color}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={5}>
                         <a style={{color:'white'}}>URL: {element.url}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={6}>
                         <a style={{color:'white'}}>Hair Color: {element.hair_color}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={7}>
                         <a style={{color:'white'}}>Gender: {element.gender}</a>
                      </li>
                      </div>
                    )
                }
            ))
            if (viewPeopleItem.length !== 0) {
              setResponse(viewPeopleItem)
            }
          }
      });
    }

    // view planet details
    const handlePlanetClick = (id) => {
      showLoader();
      axios
        .post(ViewPlanetsAPI, {
            planetId: id
        })
      .then(function(body) {
          hideHomePage()
          hidePeople()
          hideLoader()
          showViewItem()
          if (body['data'].length !== 0) {
            const viewPlanetItem = (body['data'].map(
                (element, i) => {
                      return (
                      <div>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={1}>
                         <a style={{color:'white'}}>Name: {element.name}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={2}>
                         <a style={{color:'white'}}>Rotation Period: {element.rotation_period}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={3}>
                         <a style={{color:'white'}}>Orbital Period: {element.orbital_period}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={4}>
                         <a style={{color:'white'}}>Diameter: {element.diameter}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={5}>
                         <a style={{color:'white'}}>URL: {element.url}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={6}>
                         <a style={{color:'white'}}>Climate: {element.climate}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={7}>
                         <a style={{color:'white'}}>Terrain: {element.terrain}</a>
                      </li>
                      </div>
                    )
                }
            ))
            if (viewPlanetItem.length !== 0) {
              setResponse(viewPlanetItem)
            }
          }
      });
    }

    // view starships details
    const handleStarshipClick = (id) => {
      showLoader();
      axios
        .post(ViewStarshipsAPI, {
            starshipId: id
        })
      .then(function(body) {
          hideHomePage()
          hidePeople()
          hideLoader()
          showViewItem()
          if (body['data'].length !== 0) {
            const viewStarshipItem = (body['data'].map(
                (element, i) => {
                      return (
                      <div>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={1}>
                         <a style={{color:'white'}}>Name: {element.name}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={2}>
                         <a style={{color:'white'}}>MGLT: {element.MGLT}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={3}>
                         <a style={{color:'white'}}>Cargo Capacity: {element.cargo_capacity}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={4}>
                         <a style={{color:'white'}}>Consumables: {element.consumables}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={5}>
                         <a style={{color:'white'}}>URL: {element.url}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={6}>
                         <a style={{color:'white'}}>Cost In Credits: {element.cost_in_credits}</a>
                      </li>
                      <li className={'listPeople'}  style={{marginTop: '30px', listStyleType: 'none'}} key={7}>
                         <a style={{color:'white'}}>Crew: {element.crew}</a>
                      </li>
                      </div>
                    )
                }
            ))
            if (viewStarshipItem.length !== 0) {
              setResponse(viewStarshipItem)
            }
          }
      });
    }
  
    // main html is rendered below
    return (
        <div className="App">
          <div className="topnav">
            <a className="non-clickable" onClick={homePageFetch}>The Star Wars API</a>
            <a className="links people" onClick={peopleFetch}>People</a>
            <a className="links planets" onClick={planetFetch}>Planets</a>
            <a className="links starships" onClick={starshipsFetch}>Starships</a>
          </div>
          <br></br>
          <div className="loader"></div>
          <div className="homepage">
            <div className="star-header first-header">Base API: 
              <a className="link-style" href="https://swapi.dev/documentation">The Star Wars API</a>
            </div>
            <div className="star-header">Built by: 
              <a className="link-style" href="https://github.com/athiraindrakumar396">Athira Indrakumar</a>
            </div>
            <div className="star-header">Code available in: 
              <a className="link-style" href="https://github.com/athiraindrakumar396">Github</a>
            </div>
          </div>
          <div className='gallery'>
            <input className="filter-text" type="text" placeholder="Filter People..." onKeyUp={listenToKey} />
            <ul className="columns" data-columns="4">
              { result }
            </ul>
          </div>
          <div className='displayItem'>
            <ul>
              { response }
            </ul>
          </div>
        </div>
    );
}
  
export default App;