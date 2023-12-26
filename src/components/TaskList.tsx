import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputGroup, Button } from "react-bootstrap";
import SingleTask from "./SingleTask";
import { useEffect, useState } from "react";
import { taskList } from "../utils/resources";


function TaskList(props: { date: string, taskListRes: taskList, callback: (task: string, label:string) => void}) {
  const [taskAmount, setTaskAmount] = useState<number | null>(null);
  const [singleTaskElements, setSingleTaskElements] = useState<JSX.Element[]>([]);
  const [ dateTitle, setDateTitle ] = useState<string>("")

  function load(){
    if(props.taskListRes != null && Object.keys(props.taskListRes).length != singleTaskElements.length) setTaskAmount(Object.keys(props.taskListRes).length);
    if(taskAmount == null || (dateTitle != props.date && props.taskListRes != null )) setTaskAmount(Object.keys(props.taskListRes).length);
    if(dateTitle == "" || dateTitle != props.date) setDateTitle(props.date); 

    if(props.taskListRes != null && taskAmount != null && singleTaskElements.length != taskAmount){
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
        }
        setSingleTaskElements(elements);
          
    }
  }

  useEffect(() => {
    load();
    
  }, [taskAmount, singleTaskElements, props.taskListRes, dateTitle])

  if(taskAmount == null) return (<></>);

  return (
    <div>
      {/**/<Button onClick={() => { console.log(props.taskListRes); console.log(taskAmount); console.log(singleTaskElements.length) } }>props.taskListRes in Konsole ausgeben</Button>}
      
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