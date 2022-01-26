import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  console.log(props.interviewers);
  const { interviewers, value, onChange } = props;
  const preparedInterviewers = interviewers.map(i =>
    <InterviewerListItem setInterviewer={() => onChange(i.id)}
      key={i.id} avatar={i.avatar} name={i.name} selected={value === i.id} />
  );

  console.log(preparedInterviewers);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{preparedInterviewers}</ul>
    </section>
  );
}
