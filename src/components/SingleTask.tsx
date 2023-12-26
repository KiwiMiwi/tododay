import { faPen, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { taskList } from "../utils/resources";

function SingleTask(props: { taskListRes: taskList, description: string, done: boolean, label :string, name:string, callback: (task: string, label:string) => void}) {
  const [isChecked, setIsChecked] = useState(props.done);
  const [taskDescription, setTaskDescription] = useState<string | null>(null);
  const [editTaskClass, setEditTaskClass] = useState<string>("");
  const [saveTaskClass, setSaveTaskClass] = useState<string>("d-none");
 
  const textInputRef = useRef<HTMLInputElement>(null);
  function load(){
    if (taskDescription != "" && taskDescription != null) props.callback(taskDescription, props.name);
    if (textInputRef.current != null) {
      textInputRef.current.focus();
    }
  }

  function handleTaskDescription(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const value = e.target.value;
    setTaskDescription(value);
  }

  const handleMenu = () => {
    if(editTaskClass == ""){
      setEditTaskClass("d-none");
      setSaveTaskClass("");
    } else {
      setEditTaskClass("");
      setSaveTaskClass("d-none");
    }
  }

  useEffect(() => {
    load();
  }, [editTaskClass, taskDescription]); //TODO: isChecked muss auch gespeichert werden

  useEffect(() => {
    
    if(props.description != null) setTaskDescription(props.description) 
  }, [props.description, props.taskListRes]);

  if(taskDescription == null) return (<></>);

    return (
      <div className="checkbox-wrapper">
        
          <label>
            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} className={isChecked ? "checked" : ""}/>
            <Form.Control ref={textInputRef} type="text" className="singleTaskText" value={taskDescription} placeholder={props.label} disabled={editTaskClass == "" ? true : false} onChange={(e) => handleTaskDescription(e)} />
          </label>
          
        {/*<Button onClick={() => { console.log("props.description taskDescription",props.description+",", taskDescription) } }>descr in Konsole ausgeben</Button>*/}
        <Button className={editTaskClass+" editTask"} onClick={handleMenu}>
          <FontAwesomeIcon icon={faPen} /> 
        </Button>
        <Button className={saveTaskClass+" editTask checkTask"} onClick={handleMenu}  >
          <FontAwesomeIcon icon={faCheck} className={saveTaskClass} onClick={handleMenu}/> 
        </Button>
        <Button className={saveTaskClass+" editTask removeTask"} onClick={handleMenu}>
          <FontAwesomeIcon icon={faTrash} className={saveTaskClass} /> 
        </Button>
        
          
      </div>
    );
  }
  
  export default SingleTask;