import { faCheck, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputGroup, Button, Form } from "react-bootstrap";
import SingleTask from "./SingleTask";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { taskList } from "../utils/resources";


function TaskListDup(props: {taskListRes: taskList, callback: (task: string, label:string) => void}) {
  const [taskAmount, setTaskAmount] = useState<number>(5);
  const [singleTaskElements, setSingleTaskElements] = useState<JSX.Element[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [taskDescription, setTaskDescription] = useState<string | null>(null);

  const textInputRef = useRef<HTMLInputElement>(null);

  function handleTaskDescription(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const value = e.target.value;
    const name = e.target.name;
    //console.log("value hat folgenden Wert: "+value);
    //console.log("name hat folgenden Wert: "+name);
    props.callback(value, name);
    setTaskDescription(value);
  }


  function load(){

    if(taskDescription == null){
      
      setTaskDescription(props.taskListRes["task1"]["description"]);
    }
    if(props.taskListRes != null){
      setTaskDescription(props.taskListRes["task1"]["description"]);
    }
    
  }

  useEffect(() => {
    load();
    console.log("descr muss aktualisiert werden")
  }, [taskAmount, props.taskListRes])

  function trigger(){
    //load();
  }

  if(taskDescription == null){
    return (<></>);
  }

  return (
    <div>
      <Button onClick={() => { console.log(props.taskListRes) } }>props.taskListRes in Konsole ausgeben</Button>
      
      <InputGroup>
      <div className="checkbox-wrapper">
        <label>
            <input type="checkbox"  checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} className={isChecked ? "checked" : ""}/>
          <Form.Control name="task1" ref={textInputRef} type="text" className="singleTaskText" value={taskDescription} placeholder="Task 1" onChange={(e) => handleTaskDescription(e)} />
        </label>
      </div>
      </InputGroup>
      <Button className="addTaskBtn" onClick={() => setTaskAmount(taskAmount+1)}>
        <FontAwesomeIcon icon={faPlus} /> 
      </Button>
    </div>
  );
}
  
export default TaskListDup;