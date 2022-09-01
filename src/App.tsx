import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "@firebase/firestore"

const currDate = new Date();

const App: React.FC = () => {
  let id: string

  const [tasks, setTasks] = useState<any[]>([]);
  let [newDesc, setNewDesc] = useState<string>("");
  let [newEndDate, setNewEndDate] = useState<string>("");
  let [onSubmit, setOnSubmit] = useState<boolean>(false);
  let newAddDate: string = "";

  const taskCollectionRef = collection(db, "tasks");

  const createUser = async () => {
    await addDoc(taskCollectionRef, { Desc: newDesc, AddDate: newAddDate, Deadline: newEndDate, Completion: false })
  };

  const updateComp = async (id:string, completion:boolean) => {
    let tempVal = completion;
    if(completion === true){ tempVal = false; }
    else{ tempVal = true; }
  
    const taskDoc = doc(db, "tasks", id);
    const updateVal = {Completion: tempVal};
    await updateDoc(taskDoc, updateVal);
    setOnSubmit(true);
  };

  const delTask = async (id:string)=> {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    setOnSubmit(true);
  }

  //Add New Task
  const handleClick = () => {
    if (newDesc !== "") {
      newAddDate = ('0' + currDate.getDate()).slice(-2) + "/" + ('0' + (currDate.getMonth() + 1)).slice(-2) + "/" + currDate.getFullYear()

      if (newEndDate !== "" && newEndDate !== undefined) {
        let sampleEndDate: string = newEndDate.split(",")[0]
        sampleEndDate = sampleEndDate.split("-")[2] + "/" + sampleEndDate.split("-")[1] + "/" + sampleEndDate.split("-")[0]
        newEndDate = sampleEndDate
      }
      createUser();
      setOnSubmit(true);
    } else {
      alert("Please enter a task desc");
    }
  };

  const getTasks = async () => {
    const data = await getDocs(taskCollectionRef);
    setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  //Get All Task from Firebase
  useEffect(() => {
    getTasks();
  }, []);


  useEffect(() => {
    getTasks();
    setOnSubmit(false);
  }, [onSubmit])

  return <div className="w-full bg-yellow-50 flex justify-center pt-5 pb-5">
    <div className="max-w-4xl bg-orange-100 min-h-screen pr-10 pl-10 pt-5 drop-shadow-xl rounded-lg">
      <div className="bg-orange-600 rounded flex items-center w-full p-2">
        <div className="w-full text-xl text-white text-center font-bold">
          TODO LIST
        </div>
      </div>

      <div className="mt-1 mb-1 w-full flex items-center justify-center">
        <input type="text" className="w-80 inline-block rounded-xl bg-white p-2.5 mr-1 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-50" placeholder="Task Description" onChange={(event) => {
          setNewDesc(event.target.value);
        }} />
        <input type="date" className="w-40 inline-block rounded-xl bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-50" placeholder="Deadline" onChange={(event) => {
          setNewEndDate(event.target.value);
        }} />
        <div className="flex items-center justify-center">
          <div className="ml-1 mt-2 mb-2 w-full">
            <button id="updateBtn" className="flex p-2 bg-orange-400 rounded-xl hover:rounded-full hover:bg-orange-700 transition-all duration-300 text-white" onClick={() => handleClick()}>
              New
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 p-4 gap-4 text-black dark:text-white align-baseline">
        <div>
          <div className="rounded bg-orange-400 dark:bg-gray-800 p-3">
            <div className="flex justify-between py-1 text-black dark:text-white">
              <span className="text-sl font-semibold">Ongoing Task</span>
            </div>
          </div>
          <div className="text-sm text-black dark:text-gray-50 mt-2">
            {
              tasks.map((task) => {
                if(task.Completion === false){
                  return(
                  <div className="bg-white forceHeight dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                    <span className="w-1/5">{task.Desc}</span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3.5 rounded-full float-right" onClick={()=> { updateComp(task.id, task.completion);}}>&#10003;</button>
                  </div>)
                }
              })
            }
          </div>
        </div>

        <div>
          <div className="rounded bg-gray-400 dark:bg-gray-800 p-3">
            <div className="flex justify-between py-1 text-black dark:text-white">
              <span className="text-sl font-semibold">Completed Task</span>
            </div>
          </div>
          <div className="text-sm text-black dark:text-gray-50 mt-2">
          {
              tasks.map((task) => {
                if(task.Completion === true){
                  return(
                  <div className="bg-white forceHeight dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                    {task.Desc}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3.5 rounded-full float-right" onClick={() => delTask(task.id) }>
                    X
                    </button>
                  </div>)
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default App;