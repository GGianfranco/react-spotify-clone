import React from "react";
import Row from "./Row";

function goAroundCircularArray(steps, lengthOfArray) {
  const currentIndexAfterSteps =
    ((steps % lengthOfArray) + lengthOfArray) % lengthOfArray;
  return currentIndexAfterSteps;
}

const currentDay = new Date().getDay();

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

function Home() {
  return (
    <div className="home">
      {DAYS.map((element, index) => (
        <Row
          day={DAYS[goAroundCircularArray(currentDay + index, DAYS.length)]}
        />
      ))}
    </div>
  );
}

export default Home;
