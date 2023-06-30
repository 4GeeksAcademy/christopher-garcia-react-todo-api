import React, {useState} from "react";



const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [todos, setTodos] = useState([])
	return (
		<div className="container">
			<h1>To Do</h1>
			<ul>
				<li key="search"> 
					<input type="text" placeholder="What to do today?" onChange={(e)=> setInputValue(e.target.value)}
					value={inputValue} onKeyDown={(e)=>{
						if(e.key ==="Enter" && inputValue != ""){
							setTodos(todos.concat([inputValue]));
							setInputValue("");
							
						}
					}}/>
				</li>
				{todos.map((item, index) => (
				<li key={index}>	
					<div className="todo">{item}<span className="hiddenX"onClick={()=> setTodos(todos.filter((t, currentIndex)=> index != currentIndex))}><strong>X</strong></span></div>
				</li>
				))}
			</ul>
			<div>{todos.length} tasks left</div>
		</div>
	
	);	
};

export default Home;
