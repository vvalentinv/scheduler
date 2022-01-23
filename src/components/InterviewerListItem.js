import React from 'react';
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return (
    <li className={interviewerListItemClass} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        onClick={props.setInterviewer}
      />
      {props.selected && props.name}
    </ li>
  );
}
