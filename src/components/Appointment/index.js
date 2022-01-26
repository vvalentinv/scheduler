import React from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    // console.log(name, interviewer);
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  const remove = () => {
    //transition to Confirm
    // transition(CONFIRM);
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));

  }

  console.log(props);
  return (<article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        interviewers={props.interviewers}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        student={props.interview.student}
        interview={props.interview}
      />
    )}
    {mode === CREATE && <Form interviewers={props.interviewers}
      onCancel={() => back()} onSave={save} />}
    {mode === SAVING && <Status message={mode} />}
    {mode === CONFIRM && <Confirm onConfirm={remove} onCancel={back} />}
    {mode === DELETING && <Status message={mode} />}
    {mode === EDIT && <Form
      student={props.interview.student}
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer}
      onSave={save}
      onCancel={() => back()}
    />}
  </article>);
}
