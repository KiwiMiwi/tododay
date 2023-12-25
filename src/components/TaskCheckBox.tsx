import { useState } from "react";
import { Form } from "react-bootstrap";

function TaskCheckBox(props: { label :string}) {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <div className="checkbox-wrapper">
        <label>
          <input type="checkbox"  checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} className={isChecked ? "checked" : ""}/>
          <span></span>
          <Form.Control type="text" placeholder="Enter Task" value={props.label}  />
        </label>
        <p>{isChecked ? "Selected" : "Unchecked"}</p>
      </div>
    );
  };
  export default TaskCheckBox;