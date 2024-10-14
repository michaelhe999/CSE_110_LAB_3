import "./App.css";
import { ToDoList } from "./toDoList";
import { Route, Routes } from "react-router-dom";
import { StickyNotes } from "./stickyNotes";

const App = () => {
 return (
   <div>
     <Routes>
       <Route path="/" element={<StickyNotes />} />
       <Route path="/todolist" element={<ToDoList />} />
     </Routes>
   </div>
 );
};

export default App;