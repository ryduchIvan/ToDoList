const input = document.querySelector(`.description-task`);
const todosWrapper = document.querySelector(`.todos-wrapper`);
const btnSend = document.querySelector(`.add-task-butn`);
const btnDelete = document.querySelector(`.btn-delete`);
let arrTask = [];
if (localStorage.length > 0) {
	arrTask = JSON.parse(localStorage.getItem(`tasks`));
} else {
	arrTask = [];
}

let todoItems;

function updateLocalStorge() {
	localStorage.setItem(`tasks`, JSON.stringify(arrTask));
}
function createElemnt(item, index) {
	return `
	<div class="todo-item ${item.completed == true ? "completed" : ""}" >
	<div class="desckription">
	${item.desc}
	</div>
	<div class="buttons">
		<label onclick = completedTask(${index})  for="btn-complete" style="cursor: pointer;">completed</label>
		<input onclick = completedTask(${index})  type="checkbox" class="btn-complete" id="btn-complete" ${item.completed == true ? 'checked' : ""}>
		<button onclick = deleteTask(${index}) class="btn-delete">delete</button>
	</div>
</div>
	`
}

function fillHtmlList() {
	todosWrapper.innerHTML = "";
	if (arrTask.length > 0) {
		sortedTask();
		for (let key in arrTask) {
			todosWrapper.innerHTML += createElemnt(arrTask[key], key);
		}
		todoItems = document.querySelectorAll(`.todo-item`);
	}
}
fillHtmlList();

function completedTask(index) {
	arrTask[index].completed = !arrTask[index].completed;
	console.log(index);
	if (arrTask[index].completed == true) {
		todoItems[index].classList.add(`completed`);
	} else {
		todoItems[index].classList.remove(`completed`);
	}
	fillHtmlList();
	updateLocalStorge();
}
function sortedTask() {
	let activeTask = arrTask.filter(function (item) {
		return item.completed == false;
	})
	let completedTask = arrTask.filter(function (item) {
		return item.completed == true;
	})
	arrTask = [...activeTask, ...completedTask];
	console.log(arrTask);
}

btnSend.addEventListener(`click`, function () {
	let task = new Task(input.value);
	arrTask.push(task);
	input.value = "";
	updateLocalStorge();
	fillHtmlList();
})


function deleteTask(index) {
	todoItems[index].classList.add(`deletion`);
	setTimeout(() => {
		console.log(index)
		arrTask.splice(index, 1);
		updateLocalStorge();
		fillHtmlList();
	}, 500);

}