import React, {useState} from "react";



const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [todos, setTodos] = useState([])
	return (
		<div className="container">
			<h1>To Do</h1>
			<ul>
				<li> 
					<input type="text" placeholder="What to do today?" onChange={(e)=> setInputValue(e.target.value)}
					value={inputValue} onKeyDown={(e)=>{
						if(e.key ==="Enter"){
							setTodos(todos.concat([inputValue]));
							setInputValue("");
							
						}
					}}/>
				</li>
				{todos.map((item, index) => (
				<li>	
					<div className="todo" key={index}>{item}<span className="hiddenX"onClick={()=> setTodos(todos.filter((t, currentIndex)=> index != currentIndex))}><strong>X</strong></span></div>
				</li>
				))}
			</ul>
			<div>{todos.length} tasks left</div>
		</div>
	
	);	
};

export default Home;
