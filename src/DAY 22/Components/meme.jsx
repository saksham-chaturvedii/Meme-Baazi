import React from "react";
import { useState, useEffect } from "react";
import { Button, Input } from "@material-ui/core";

const Meme = (props) => {
  //   console.log(props.meme);

  const [caption_image, setCaption_image] = useState({
    template_id: props.meme.id,
    username: "tempboi",
    password: "L!jmsng2Az6Db7i",
    boxes: [],
  }); //image_caption is used to display the caption at the correct position (https://imgflip.com/api)
  const CaptionOnMemeTest = () => {
    let url = `https://api.imgflip.com/caption_image?template_id=${
      caption_image.template_id
    }&username=${caption_image.username}&password=${
      caption_image.password
    }&boxes[0][text]=${"%20"}`;

    // console.log(url);
    //“?” in URL acts as separator, it indicates end of URL resource path and start of query parameters. When this form is used, the combined URI stands for the object which results from the query being applied to the original object.
    // var arr = [1, 2, 3, 4];
    // console.log(arr);
    // console.log(
    //   arr.map((...e) => {
    //     console.log(e);
    //   })
    //   );
    //   console.log(arr); to understand the map warning.

    caption_image.boxes.map((box, index) => {
      if (box && box.text){
        const text = box.text === "" ? "%20" : box.text;
        return (url += `&boxes[${index}][text]=${text}`);
      }
      // writing return doesnt make any sense here because we are not changing anything within caption_image.boxes
      // console.log(` boxes[${index}][text]=${box.text}`);
    });
    // console.log("2", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const url2 = data && data.data && data.data.url; // Null checking, part of every version if data is false toh aagey dekhega hi nahi.
        // props.setMeme({ ...props.meme, url: data?.data?.url || "" }); //data?. null checking- ES7
        props.setMeme({ ...props.meme, url: url2 });
      });
  };

  useEffect(() => {
    CaptionOnMemeTest();
  }, [caption_image]);

  return (
    <div className="MemeBox">
      Your input captions will automatically be loaded at the right positions.
      You can modify the captions and then copy the created meme image.
      <div className="renderedMeme">
        <img loading="lazy" src={props.meme.url} alt="ClickedMeme" />
        <div>
          {[...Array(props.meme.box_count)].map((_, index) => (
            <Input
              key={index}
              className="renderedMemeInputBox"
              placeholder={`Caption ${index + 1}`}
              multiline={true} //Red Warning shown if written as multiline = "true" or 'true'
              onChange={(e) => {
                // console.log(caption_image.boxes);
                // e.preventDefault();
                const data_boxes = [...caption_image.boxes];
                data_boxes[index] = { text: e.target.value };
                setCaption_image({
                  ...caption_image,
                  boxes: data_boxes,
                });
              }}
            ></Input>
          ))}
          {/* If written map((index)) instead of map((_, index)), index value will be shown undefined. Becasue, we create an array(size=box_count) of value undefined i.e. empty array. console.log(_) === undefined*/}
        </div>
        <div className="renderedMemeInputBox">
          <div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                props.setMeme(false);
              }}
            >
              Choose Another Meme
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meme;
