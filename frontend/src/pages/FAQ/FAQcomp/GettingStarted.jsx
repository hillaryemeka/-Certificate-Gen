import React, { useState } from "react";
import Style from "../faq.module.scss";
import { GettingStartedItems } from "./FaqModule";

import { FaqItems } from "./FaqItems";

export const GettingStarted = ({ header }) => {
  const [clicked, setclicked] = useState("0");
  const handleToggle = (index) => {
    console.log(index);
    if (clicked === index) {
      return setclicked("0");
    }
    setclicked(index);
  };

  return (
    <>
      <section className={Style.faqContainer}>
        <h2>{header}</h2>

        {GettingStartedItems.map((faq, index) => {
          return (
            <FaqItems
              key={index}
              faq={faq}
              onToggle={() => handleToggle(index)}
              active={clicked === index}
            />
          );
        })}
      </section>
    </>
  );
};
