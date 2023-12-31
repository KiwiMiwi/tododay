import { faPen, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { taskList } from "../utils/resources";

function SingleTask(props: { taskListRes: taskList, description: string, done: boolean, label: string, name: string, callback: (task: string, label: string, check: boolean) => void }) {
  const [isChecked, setIsChecked] = useState(props.done);
  const [taskDescription, setTaskDescription] = useState<string | null>(null);
  const [editTaskClass, setEditTaskClass] = useState<string>("");
  const [saveTaskClass, setSaveTaskClass] = useState<string>("d-none");

  const textInputRef = useRef<HTMLInputElement>(null);
  function load() {
    if (taskDescription != "" && taskDescription != null) props.callback(taskDescription, props.name, isChecked);

  }

  function handleTaskDescription(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.value;
    setTaskDescription(value);
  }

  function handleTaskCheck(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    setIsChecked(value);
    if (taskDescription != null) {
      props.callback(taskDescription, props.name, value);
    }
  }

  const handleMenu = () => {

    if (textInputRef.current != null && editTaskClass == "") textInputRef.current.focus();

    if (editTaskClass == "" && textInputRef.current == document.activeElement) {
      setEditTaskClass("d-none");
      setSaveTaskClass("");
    } else if (editTaskClass != "" && textInputRef.current != document.activeElement) {
      setEditTaskClass("");
      setSaveTaskClass("d-none");
    }
  }

  useEffect(() => {
    load();
  }, [editTaskClass, taskDescription, isChecked]); //TODO: isChecked muss auch gespeichert werden

  useEffect(() => {
    if (textInputRef.current != null && editTaskClass != "") {
      textInputRef.current.focus();
    }
  }, [editTaskClass])

  useEffect(() => {
    setEditTaskClass("");
    setSaveTaskClass("d-none");

    if (props.description != null) setTaskDescription(props.description)
    if (props.done != null) setIsChecked(props.done)
  }, [props.description, props.done, props.taskListRes]);

  if (taskDescription == null) return (<></>);

  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" checked={isChecked} onChange={(e) => handleTaskCheck(e)} className={isChecked ? "checked" : ""} />
        <Form.Control ref={textInputRef} type="text" onClick={handleMenu} className="singleTaskText" value={taskDescription} placeholder={props.label} disabled={isChecked ? true : false} onChange={(e) => handleTaskDescription(e)} />
      </label>
      {
        !isChecked ?
          <>
            <Button className={editTaskClass + " editTask"} onClick={handleMenu}>
              <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button className={saveTaskClass + " editTask checkTask"} onClick={handleMenu}  >
              <FontAwesomeIcon icon={faCheck} className={saveTaskClass} onClick={handleMenu} />
            </Button>
            <Button className={saveTaskClass + " editTask removeTask"} onClick={handleMenu}>
              <FontAwesomeIcon icon={faTrash} className={saveTaskClass} />
            </Button>
          </>
          :
          <></>
      }
    </div>
  );
}

export default SingleTask;