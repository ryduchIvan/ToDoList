let arrTask;
if (localStorage.length > 0) {
	arrTask = JSON.parse(localStorage.getItem(`tasks`));
} else {
	arrTask = [];
}
//!localStorage.arrTask ? arrTask = [] : arrTask = JSON.parse(localStorage.getItem(`tasks`));
function createTemplate(item, index) {
	return `
	<div class="todo-item ${item.completed == true ? 'completed' : ""}" >
					<div class="desckription">
						${item.desc}
					</div>
					<div class="buttons">
						<label  onclick =completedTask(${index})  for="btn-complete" style="cursor: pointer;">completed</label>
						<input onclick = completedTask(${index})  type="checkbox" class="btn-complete" id="btn-complete" ${item.completed == true ? 'checked' : ""}>
						<button onclick = deleteTask(${index})  class="btn-delete">delete</button>
					</div>
				</div>
	`
}

let todosItems = [];
function sotredTask() {
	const activeTasks = arrTask.length && arrTask.filter(item => item.completed == false);
	const completedTasks = arrTask.length && arrTask.filter(item => item.completed == true);
	arrTask = [...activeTasks, ...completedTasks];
}

function fillHtmlList() {
	todosWrapper.innerHTML = "";
	if (arrTask.length > 0) {
		sotredTask();
		for (let key in arrTask) {
			todosWrapper.innerHTML += createTemplate(arrTask[key], key);
		}
		todosItems = document.querySelectorAll(`.todo-item`);
	}
}
fillHtmlList();

function updatelocalStorge() {
	localStorage.setItem(`tasks`, JSON.stringify(arrTask));
}


btnTask.addEventListener(`click`, function () {
	let task = new Task(inputTask.value);
	arrTask.push(task);
	inputTask.value = "";
	console.log(arrTask);
	updatelocalStorge();
	fillHtmlList();
})



function completedTask(index) {
	arrTask[index].completed = !arrTask[index].completed;
	if (arrTask[index].completed == true) {
		todosItems[index].classList.add(`completed`);
	} else {
		todosItems[index].classList.remove(`completed`);
	}
	updatelocalStorge();
	fillHtmlList();
}

function deleteTask(index) {
	todosItems[index].classList.add(`deletion`);
	setTimeout(() => {
		arrTask.splice(index, 1);
		updatelocalStorge();
		fillHtmlList();
	}, 500);
}

