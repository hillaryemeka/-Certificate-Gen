import React from "react";

import "./bulk.style.scss";
import "@splidejs/react-splide/css";
import Button from "../../Component/button";
import BulkCertDesign from "./BulkCertDesign";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Index() {
  // Getting the file data from the local storage and parsing its values
  const savedData = localStorage.getItem("dataKey");
  const array = JSON.parse(savedData);

  return (
    <div id="bulk-preview">
      {/* PREVIEW OF BULK GENERATED CERTIFICATES  */}
      <h2>Preview of Generated Certificates</h2>
      <section id="bulk-images-desktop">
        <Splide
          className="bulk-images-wrapper"
          options={{
            rewind: true,
            gap: "30px",
            perPage: 3,
            drag: "free",
            arrows: true,
            pagination: true,
            breakpoints: {
              640: {
                perPage: 1
              },
              798: {
                perPage: 2
              }
            }
          }}
        >
          {/* Mapping through the data */}
          {array.map((item, id) => (
            <SplideSlide key={id}>
              <BulkCertDesign
                item={item}
              />
            </SplideSlide>
          ))}
        </Splide>
      </section>

      {/* BUTTONS TO DOWNLOAD OR SHARE THE CRETIFICATES */}
      <div id="bulk-btns">
        <Button name="Download Certificates" style={{ padding: "10px" }} />
        <Button
          className="btnLight"
          name="Send Certificates"
          style={{ padding: "10px" }}
        />
      </div>
    </div>
  );
}

export default Index;
