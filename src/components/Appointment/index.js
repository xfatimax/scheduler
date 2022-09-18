import React from "react";

import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  };

  function confirm() {
    console.log(`confirming`);

    transition(CONFIRM);
  }

  function cancel() {
    console.log(`cancelling`); // aka 'destroy' or 'delete'

    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => {transition(EMPTY)})
      .catch(error => {
        console.log(`catching error`);
        transition(ERROR_DELETE, true)
      })
  }

  function edit() {
    console.log(`editing`);

    transition(EDIT);
  }

   



  return(
    <article className="appointment">
      <Header time={props.time}/>

      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      }

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={confirm}
          onEdit={edit}
        />
      )}

      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)} 
          onSave={save}
          onDelete={confirm}
        />
      }

      {mode === SAVING && <Status message="Saving"/>}

      {mode === DELETING && <Status message="Deleting"/>}

      {mode === CONFIRM && 
        <Confirm 
          message="Delete the appointment?"
          onConfirm={cancel}
          onCancel={()=> back()}
        />
      }

      {mode === EDIT &&
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={()=> back()}
        />
      }

      {mode === ERROR_SAVE &&
        <Error
          message="Could not create appointment"
          onClose={()=> back()}
        />
      }

      {mode === ERROR_DELETE &&
        <Error
          message="Could not cancel appointment"
          onClose={()=> back()}
        />
      }

    </article>
  );
}