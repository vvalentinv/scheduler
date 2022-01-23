import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';


export default function Appointment(props) {


  return (<article className="appointment">
    <Header time={props.time} />
    {props.interview ? <Show interviewer={props.interview.interviewer.name} student={props.interview.student} /> : <Empty />}
    {/* {props.time && <h3>Appointment at {props.time}</h3>}
    {!props.time && <h2>No Appointment</h2>} */}
  </article>);
}
