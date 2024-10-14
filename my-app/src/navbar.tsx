import { Link } from "react-router-dom";

export const Navbar = () => {
 return (
   <div>
     <nav>
       <Link to="/">Home</Link> <Link to="/todolist">To Do List</Link>
     </nav>
   </div>
 );
};