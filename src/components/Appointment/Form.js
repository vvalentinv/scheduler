import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [error, setError] = useState("");
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const cancel = () => {
    reset();
    props.onCancel();
  }
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  const updateInterviewer = (e) => setInterviewer(e);
  const updateStudent = (e) => {
    setStudent(e.target.value);
    setError("");
  }

  function validate(student) {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    props.onSave(student, interviewer);
  }

  return (<main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={updateStudent}
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList
        interviewers={props.interviewers}
        value={interviewer}
        onChange={updateInterviewer}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button data-testid="save" confirm onClick={() => validate(student)}>Save</Button>
      </section>
    </section>
  </main>);
}
