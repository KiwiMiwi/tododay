import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputGroup, Button } from "react-bootstrap";
import SingleTask from "./SingleTask";
import { useEffect, useState } from "react";
import { taskList } from "../utils/resources";


function TaskList(props: {taskListRes: taskList, callback: (task: string, label:string) => void}) {
  const [taskAmount, setTaskAmount] = useState<number | null>(null);
  const [singleTaskElements, setSingleTaskElements] = useState<JSX.Element[]>([]);

  function load(){
    if(taskAmount == null) setTaskAmount(Object.keys(props.taskListRes).length);

    if(props.taskListRes != null && taskAmount != null){
      //console.log("amount wurde geändert "+taskAmount)
        let elements: JSX.Element[] = [];
        for (let i = 1; i <= taskAmount; i++) {
          const name = "task"+(i);
          const label = "Task "+(i);
          if(props.taskListRes[name] != null){
            elements.push(
                <SingleTask taskListRes={props.taskListRes} key={name} label={label} name={name} description={props.taskListRes[name]["description"]} done={props.taskListRes[name]["done"]} callback={props.callback} />
            );   
          } else {
            props.callback("", name);
          }
        }console.log(elements)
        setSingleTaskElements(elements);
          
    }
  }

  useEffect(() => {
    load();
    
  }, [taskAmount, props.taskListRes])

  if(taskAmount == null) return (<></>);

  return (
    <div>
      {/*<Button onClick={() => { console.log(props.taskListRes) } }>props.taskListRes in Konsole ausgeben</Button>*/}
      
      <InputGroup>
        {singleTaskElements}
      </InputGroup>
      <Button className="addTaskBtn" onClick={() => setTaskAmount(taskAmount+1)}>
        <FontAwesomeIcon icon={faPlus} /> 
      </Button>
    </div>
  );
}
  
export default TaskList;