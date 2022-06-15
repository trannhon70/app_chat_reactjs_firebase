import React from "react";
import Attachment from "./../Svg/Attachment";

function MessengerForm({
  handleSubmit,
  text,
  setText,
  changeFile,
  imgRef,
}) {
  console.log(text);

  return (
    <form className="form-messenger" onSubmit={handleSubmit}>
       <img src={imgRef} alt="" />
      <label htmlFor="img">
        <Attachment />
      </label>

      <input
        type="file"
        id="img"
        accept="img/*"
        style={{ display: "none" }}
        // onChange={(e) => setImg(e.target.files[0]) }
        onChange={changeFile}
      />
     
      <div className="form-messenger-input">
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-messenger-button">
        <button className="btn">send</button>
      </div>
      <div style={{ clear: "both" }}></div>
    </form>
  );
}

export default MessengerForm;
