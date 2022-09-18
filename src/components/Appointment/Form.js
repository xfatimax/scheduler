import React, { useState } from 'react';

import Button from "../Button";

import InterviewerList from "../InterviewerList.js";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    onCancel();
  }


  function validate() {
    if (student === "")  {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null)  {
      setError("Interviewer must be set");
      return;
    }
    setError("");
    onSave(student, interviewer);
  };


  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList 
            interviewers={interviewers}
            value={interviewer}
            onChange={setInterviewer}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}