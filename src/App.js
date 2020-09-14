import React, { useState, useEffect } from 'react';
import './App.css';
import ImageSlider from './components/ImageSlider';

function App() {
  const [images, setImages] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleChange = (event) => {
    setImages(event.target.value);
  }

  const handleSubmit = (event) => {
    setLoading(true);
    const clientId = "_Mj26NoKdxzDNmp3opzYfy0nRAjCzQY2Hp6RAmqsv1g"
    const url = "https://api.unsplash.com/search/photos/?page=15&query=" + images + "&client_id=" + clientId;
    fetch(url).then((response) => response.json().then((response) => setResult(response.results)));
  }

  const mapImages = (result) => result.map(({ urls }) => urls.small)
  let hRefImages = mapImages(result)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500)
  })

  const manageState = () => {
    //setCurrentImage()
    setModalState(!modalState)
  }

  return (
    <div className="App">

      <header className="App-header">
        <h1>Photo Search</h1>
        <input onChange={handleChange} type="text" name="photo" placeholder="Search for Photos..." />
        <button onClick={handleSubmit} type="submit">Search</button>
        {/* <div className="slider"><ImageSlider images={hRefImages} /></div> */}
      </header>

      {loading ? (
        <div> <h1>Loading...</h1> </div>
      ) : (
          <div className="results">
            <div className="slider">
              <ImageSlider images={hRefImages} />
            </div>
            <ul style={{ listStyleType: "none" }}>
              {/* <a    href={images.urls.small}> </a> */}
              {result.map((images) => (<li ><img onClick={() => manageState()} key={images.id} src={images.urls.thumb} alt={images.alt_description} /></li>))}
            </ul>


            <div className={`modalBackground modalShowing-${modalState}`}>Carousel
              <div className="modalInner">
                {/* <ImageSlider images={hRefImages}/>     currentImage={currentImage}  */}
              </div>
            </div>

          </div>
        )}
    </div>
  );
}

export default App;


