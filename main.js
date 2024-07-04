//1. 유저가 값을 입력한다
//2. + 버튼을 클릭하면, 할일이 추가된다.
//3. delete 버튼을 누르면 할일이 삭제된다.
//4. check버튼을 누르면 할일이 끝나면서 텍스트에 밑줄이 간다.
//4-1. true이면 끝난 걸로 간주하고 밑줄 / false이면 상태 유지
//5. Not Done, Done탭을 누르면, 언더바가 이동한다
//5. Done탭은 끝난 아이템만 Not Done탭은 진행중인 아이템만
//6. All탭을 누르면 다시 All아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []

// let taskInput = document.getElementById("task-input");
// let taskInput = document.getElementById("task-input");
// let taskInput = document.getElementById("task-input");

addButton.addEventListener("click", addTask);    // == onclick

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task)
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for(let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete) {
            resultHTML += `<div class="task">
            <div class="task-done">
                ${taskList[i].taskContent}  
            </div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">
                <i class="fa-solid fa-arrow-rotate-left"></i>
                </button>
                <button onclick="deleteTask('${taskList[i].id}')">
                <i class="fa-regular fa-trash"></i>  <!-- 삭제 아이콘 -->
                </button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>
                ${taskList[i].taskContent}  
            </div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button onclick="deleteTask('${taskList[i].id}')">
                <i class="fa-regular fa-trash"></i>  <!-- 삭제 아이콘 -->
                </button>
            </div>
        </div>`;
        } 
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("id:",id);
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
} 

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)
            break;
        }
    }
    render()

}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}