import React from "react";
import MainPage from "./Components/mainPage";
import Meme from "./Components/meme";
import { useState, useEffect } from "react";
import "./style.css";

const App_22 = () => {
  const [templates, setTemplate] = useState([]); //for the main page
  const [meme, setMeme] = useState(false);
  // for the chosen meme

  const fetchTemplate = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    // console.log(data.data);
    // console.log(data.data.memes);
    const memeTemplateJSON = data.data.memes; //meme template image obtained from the API .
    setTemplate(memeTemplateJSON);
  };
  useEffect(() => {
    fetchTemplate();
    // ();
  }, []);

  return (
    <div>
      <h1>Meme Generator</h1>
      {!meme ? (
        <MainPage templates={templates} setMeme={setMeme} />
      ) : (
        <Meme meme={meme} templates={templates} setMeme={setMeme} />
      )}
    </div>
  );
};
export default App_22;
//share button for the meme image or copy image
