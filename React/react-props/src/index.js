import React from "react";
import ReactDOM from "react-dom/client";
import Contact from "./Contact";

ReactDOM.createRoot(
  document.getElementById("root"))
  .render(
    <div>
      <h1 className="heading">My Contacts</h1>
      <Contact
        title={"Beyonce"}
        img={"https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg"}
        alt={"avatar_img"}
        phoneNo={"+123 456 789"}
        email={"b@beyonce.com"}
      />

      <Contact
        title={"Jack Bauer"}
        img={"https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg"}
        alt={"avatar_img"}
        phoneNo={"+987 654 321"}
        email={"jack@nowhere.com"}
      />

      <Contact
        title={"Chuck Norris"}
        img={"https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png"}
        alt={"avatar_img"}
        phoneNo={"+918 372 574"}
        email={"gmail@chucknorris.com"}
      />
    </div>
  );
