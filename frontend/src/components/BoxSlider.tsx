/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "react-bootstrap";
import SingleBoxSlide from "./SingleBoxSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faEllipsis, faPaw } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getDateStringTitle, getDateToday, getDateTomorrow, getDateYesterday } from "../utils/script";
import { taskListDaily } from "../utils/resources";


function BoxSlider() {
    const [dateTitle, setDateTitle] = useState<string>("")
    const [date, setDate] = useState<Date | null>(null);
    const [menuClasses, setMenuClasses] = useState<string>("menuWrapper d-none");
    const [taskResource, setTaskResource] = useState<taskListDaily | null>(null);
    const [theme, setTheme] = useState<string>("dark");

    const emptyTaskList: taskListDaily = {
        [dateTitle]: {
            "task1": {
                "description": "",
                "done": false
            },
            "task2": {
                "description": "",
                "done": false
            },
            "task3": {
                "description": "",
                "done": false
            }
        }
    }

    function load() {
        if (date == null) {
            const today = getDateToday();
            setDate(today);
        }
        if (date) setDateTitle(getDateStringTitle(date));

        if (taskResource == null && dateTitle !== "") {
            setTaskResource(emptyTaskList);
        }

        if (taskResource != null) {
            if (taskResource[dateTitle] == null) {
                setTaskResource({
                    ...taskResource,
                    [dateTitle]: emptyTaskList[dateTitle]
                })
            }
        }

        const node = document.getElementsByTagName("body") as HTMLCollection;
        node[0].className = theme;
    }

    function handleMenu() {
        if (menuClasses === "menuWrapper") {
            setMenuClasses("menuWrapper d-none");
        } else {
            setMenuClasses("menuWrapper");
        }
    }

    function handleTheme() {
        const themes = ["dark", "aurora", "cats", "blank"]
        const i = themes.indexOf(theme) + 1
        i === themes.length ? setTheme(themes[0]) : setTheme(themes[i])
    }
    
    function handleTaskList(task: string, label: string, check: boolean) {
        if (taskResource != null && taskResource[dateTitle] != null) {
            if (taskResource[dateTitle].hasOwnProperty(label)) {
                taskResource[dateTitle][label]["description"] = task;
                taskResource[dateTitle][label]["done"] = check;
            } else {
                taskResource[dateTitle][label] = { "description": "", "done": false }
            }
        }
    }

    useEffect(() => {
        load();
    }, [date, dateTitle, taskResource, theme])

    return (
            <div className="boxWrapper">
                <Button className="editSettings" onClick={handleMenu}><FontAwesomeIcon icon={faEllipsis} /> </Button>
                {taskResource != null ?
                    <SingleBoxSlide date={dateTitle} callback={handleTaskList} taskListRes={taskResource[dateTitle]}></SingleBoxSlide>
                    :
                    <></>
                }

                {date == null ?
                    <>
                        <Button className="slideButton slideLeft"> <FontAwesomeIcon icon={faCaretLeft} /> </Button>
                        <Button className="slideButton slideRight"> <FontAwesomeIcon icon={faCaretRight} /> </Button>
                    </>
                    :
                    <>                                                                                                       
                        <Button className="slideButton slideLeft" onClick={() => setDate(getDateYesterday(date))}> 
                            { theme === "cats" ? 
                                <FontAwesomeIcon icon={faPaw} /> : <FontAwesomeIcon icon={faCaretLeft} /> 
                            }
                        </Button>
                        <Button className="slideButton slideRight" onClick={() => setDate(getDateTomorrow(date))}> 
                            { theme === "cats" ? 
                                <FontAwesomeIcon icon={faPaw} /> : <FontAwesomeIcon icon={faCaretRight} /> 
                            }
                        </Button>
                    </>
                }

                <div className={menuClasses}>
                    <ul>
                        <li onClick={handleTheme}>
                            Change Theme
                        </li>
                        <li>
                            Save ToDo List
                        </li>
                        <li>
                            Load ToDo List
                        </li>
                    </ul>
                </div>
            </div>
    );
}

export default BoxSlider;