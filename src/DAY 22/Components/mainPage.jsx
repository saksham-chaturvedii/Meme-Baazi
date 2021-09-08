import React from "react";
import { Button } from "@material-ui/core";

export default function MemeGenerator_gallery(props) {
  const { templates, setMeme } = props;
  return (
    <>
      <div className="memeGenerator_gallery">
        {templates.map((template) => (
          <div key={template.id} className="meme_Template">
            <img loading="lazy" src={template.url} alt="MemeImg" />
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => {
                //   console.log(template);
                setMeme(template);
                // e.target.parentNode.parentNode.firstChild.src;
              }}
            >
              {template.name}
            </Button>
          </div>
        ))}
        ;
      </div>
      ;
    </>
  );
}
