import { Card} from "react-bootstrap";
import TaskList from "./TaskList";
import { taskList } from "../utils/resources";
import TaskListDup from "./TaskListDup";

function SingleBoxSlide(props: { date: string, taskListRes: taskList, callback: (task: string, label:string) => void}) {
  
    return (
        <Card>
          <Card.Body>
            <Card.Title>{ props.date }</Card.Title>
            <TaskList callback={props.callback} taskListRes={props.taskListRes} />
          </Card.Body>
        </Card>
      );
  }
  
  export default SingleBoxSlide;