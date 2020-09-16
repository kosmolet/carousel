import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Slider from './components/Slider';

function App() {
  const [images, setImages] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);



  const handleChange = (e) => {
    setImages(e.target.value);
  }

  const handleSubmit = () => {
    setIsModalOpen(false);
    setLoading(true);
    const clientId = "_Mj26NoKdxzDNmp3opzYfy0nRAjCzQY2Hp6RAmqsv1g"
    const url = "https://api.unsplash.com/search/photos/?page=15&query=" + images + "&client_id=" + clientId;
    fetch(url).then((response) => response.json().then((response) => {
      setResult(response.results);
      setTimeout(() => {
        setLoading(false);
      }, 800)
    }
    ))
      .catch((e) => {
        setLoading(false);
        console.log('fetch failed');
      });

  }

  const filteredResults = (result.filter((i) => {
    if (i.urls.small === "" || !i.urls.small) {
      return false;
    }
    return true
  })).map(img => ({ id: (result.indexOf(img)), src: img.urls.small, alt: img.alt_description }))


  const setMainImg = (e) => {

    const imageSrc = e.currentTarget.src
    let imageSrcMain = imageSrc.slice(0, imageSrc.indexOf("?"));
    let foundIndex = filteredResults.findIndex((img, index) => {
      if ((img.src.slice(0, img.src.indexOf("?"))) === imageSrcMain)
        return true;
    });
    setImageIndex(foundIndex)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="App" >

      <header className="App-header">
        <h1>Photo Search</h1>
        <input onChange={handleChange} className="searchInput" type="search" name="photo" placeholder="Search for Photos..." />
        <button onClick={handleSubmit} className="searchButton" type="submit">Search</button>
      </header>

      {loading ? (
        // <div> <h1>Loading...</h1> </div>
        <div class="loadingio-spinner-spinner-3k7656kmf8f"><div class="ldio-nemp09m36fr">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div></div>
      ) : (
          <div className="results">
            <div className="slider">
              {isModalOpen ? (
                <div className="modal">
                  <a href="/#" onClick={() => setIsModalOpen(false)}>{"X"}</a>
                  <Slider Images={filteredResults} Index={imageIndex} />
                </div>
              ) : null}
            </div>

            <ul style={{ listStyleType: "none" }}>
              {result.map((images) => (<li >
                <img onClick={(e) => setMainImg(e)}
                  key={images.id}
                  src={images.urls.thumb}
                  alt={images.alt_description} />
              </li>))}
            </ul>
            {console.log(imageIndex)}
          </div>
        )}
    </div>
  );
}

export default App;


