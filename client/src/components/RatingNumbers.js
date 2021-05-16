import React from "react"

export default function RatingNumbers(props) {

  let oneToFive = [1, 2, 3, 4, 5]
  let content

  content = oneToFive.map(function(value,index) {
    return (
      <li key={`${props.name}${index}`}>{value}</li>
    )
  })

  return (
    <ul className="RatingNumbers" key={props.name}>
      {content}
    </ul>
  );
}
