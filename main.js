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
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = []
let filterList = []
let tabMode = 'all'

for(let i=1; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter(event);
})
};

addButton.disabled = true;
taskInput.addEventListener("input", function() {
    addButton.disabled = false;
});

addButton.addEventListener("click", addTask);    // == onclick
taskInput.addEventListener("keydown", function(event) {
    // console.log(event)
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if (taskInput.value == "") {
        addButton.disabled = true;
        return;
    }

    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task)
    console.log(taskList);
    taskInput.value = "";
    addButton.disabled = true;
    render();
}

// 완료된 경우와 완료되지 않은 경우를 나눠서 HTML를 다르게 구성
function render() {
    let list = [];
    //1. 내가 선택한 tabMode에 따라서
    //2. list가 다르게 출력되어야한다. 
    if(tabMode === "all") {
        list = taskList;
    }else {
        list = filterList;
    }

    let resultHTML = '';
    for(let i = 0; i < list.length; i++) {
        // 완료된 경우 (class="task-done == 회색배경 + 밑줄, 회전 아이콘)
        if (list[i].isComplete) {
            resultHTML += 
            `<div class="task">
                <div class="task-done">            
                    ${list[i].taskContent}  
                </div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">
                        <i class="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>`;
        } else {
            // 완료되지 않은 경우
            resultHTML += 
            `<div class="task">
                <div>
                    ${list[i].taskContent}  
                </div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button onclick="deleteTask('${list[i].id}')">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            </div>`;
        } 
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

// 체크 이벤트를 클릭하면 토글 함수를 호출하여 isComplete를 반전시킨 후 다시 (필터함수->렌더함수)task를 표시
function toggleComplete(id) {
    console.log("id:",id);
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
} 

// 삭제 이벤트가 실행되면 i번째 요소 1개를 삭제하고 다시 (필터함수->렌더함수) task를 표시
function deleteTask(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1)  // i의 요소를 삭제 + 1개 삭제
            break;
        }
    }
    filter();
}

// 구조: 탭모드에 맞게 필터링하고, 필터함수 내에서 다시 렌더링(render함수 호출)
function filter(event) {
        // 1) 탭을 클릭하면 이벤트가 발생하고 변경된 탭의 id("all", "ongoing", "done")에 맞게 필터링 된다.
        // 2) 체크/삭제 버튼을 클릭했을 때는 이벤트가 발생하지 않고, 탭을 유지한 상태에서 필터가 되어야하므로 해당 조건문이 필요함.
        ///// 탭을 클릭하면, 해당 탭의 이벤트(html)정보가 발생한다. 
        ///// not done, done 모드에서는 탭을 클릭하지 않고 탭을 유지하면서 체크버튼을 클릭했을 때 필터링이 되어야하므로, 탭 클릭으로 인한 이벤트가 발생하지 않는다. 
        ///// 그래서 조건을 만든다. 이벤트가 없어도 조건문 아래 수행코드가 실행되어야 함.
    if(event) {
        tabMode = event.target.id; 
    }

    filterList = [] //
    const underline = document.getElementById("under-line")

    if(tabMode === "all") {
        // 전체 task 출력
        underline.style.width = "60px";
        underline.style.left = "0px";
        render()
    }else if(tabMode === "ongoing") {
        // 진행 중인 task 출력
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render()
        underline.style.width = "85px";
        underline.style.left = "60px";
        // console.log("진행중", filterList)
    }else if(tabMode === "done") {
        // 끝난 task 표시
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        underline.style.width = "60px";
        underline.style.left = "161px";
        render()

    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}