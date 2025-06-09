import React from "react";

export default function Results(props) {
  console.log(props.results.length);
  if (props.results && props.results.length > 0) {
    return <div className="Results">You have results</div>;
  } else {
    return null;
  }
}
