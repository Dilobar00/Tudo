let elForm = document.querySelector(".form");
let elList = document.querySelector(".list");

let modalWrapper = document.querySelector(".wrapper");
let elModal = document.querySelector(".modal");

let allCount = document.querySelector(".all-count");
let complatedCount = document.querySelector(".complated-count");
let unComplatedCount = document.querySelector(".uncomplated-count");

let allBtn = document.querySelector(".all-btn");
let complatedBtn = document.querySelector(".complated-btn");
let unComplatedBtn = document.querySelector(".uncomplated-btn");

let todos = [];

elForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    id: todos.length + 1,
    value: e.target[0].value,
    isComplated: false,
  };
  todos.push(data);
  renderTodos(todos, elList);
  e.target.reset();
});

function renderTodos(arr, list) {
  list.innerHTML = "";
  arr.forEach((item, index) => {
    let elItem = document.createElement("li");

    elItem.className = `flex items-center relative justify-between ${
      item.isComplated
        ? "before:w-[60%] before:h-[2px] before:bg-black before:absolute before:top-0 before:bottom-0 before:my-auto opacity-50"
        : ""
    }`;
    elItem.innerHTML = `
        <div>
            <span class="font-bold text-[20px] text-slate-500">${
              index + 1
            }.</span>
            <span class="font-bold text-[22px]">${item.value}</span>
           </div>
           <div class="flex items-center gap-5">
           <input onclick ={changeCheckbox(${
             item.id
           })} type = "checkbox" class="form-checkbox">
           <button onclick ={updateTodo(${
             item.id
           })} class="todo-update bg-blue-300 hover:opasity-50 duration-300 text-white font-semibold p-3 rounded-lg">Update</button>
            <button onclick ={todoDeleteBtnClick(${
              item.id
            })} class="todo-delete bg-red-500 hover:opasity-50 duration-300 text-white font-semibold p-3 rounded-lg">Delete</button>
           </div>
            `;
    list.appendChild(elItem);
  });
  allCount.textContent = todos.length;
  complatedCount.textContent = todos.filter(
    (item) => item.isComplated == true
  ).length;
  unComplatedCount.textContent = todos.filter(
    (item) => item.isComplated == false
  ).length;
}
                    
function todoDeleteBtnClick(id) {
  const findedInddex = todos.findIndex((item) => item.id == id);
  todos.splice(findedInddex, 1);
  renderTodos(todos, elList);
}

function changeCheckbox(id) {
  const findedObj = todos.find((item) => item.id == id);
  findedObj.isComplated = !findedObj.isComplated;
  renderTodos(todos, elList);
}

function updateTodo(id) {
  modalWrapper.classList.add("!top-0");
  elModal.classList.add("!scale-100");
  const updateObj = todos.find((item) => item.id == id);
  elModal.innerHTML = `
    <div class ="p-5 flex items-center">
      <input value = "${updateObj.value}" class="update-value py-3 w-[75%] pl-5 border-[1.5px] border-slate-500 rounded-lg outline-none focus:shadow-blue-500" placeholder="Update todo" type="text" name="update-todo"/>
        <button onclick={updateTodoBtnClick(${id})} class="bg-blue-400 w-[25%] p-2.5 font-semibold text-white rounded-lg text-[20px]">Update</button>
    </div>    
  `;
}

function updateTodoBtnClick(id) {
  const updateObj = todos.find((item) => item.id == id);
  let newValue = document.querySelector(".update-value").value;
  updateObj.value = newValue;
  modalWrapper.classList.remove("!top-0");
  elModal.classList.remove("!scale-100");
  renderTodos(todos, elList);
}

modalWrapper.addEventListener("click", function (e) {
  if (e.target.id == "wrapper") {
    modalWrapper.classList.remove("!top-0");
    elModal.classList.remove("!scale-100");
  }
});


allBtn.addEventListener("click", function(){
  renderTodos(todos, elList)
})

complatedBtn.addEventListener("click", function(){
  const complatedList = todos.filter(item => item.isComplated == true)
  renderTodos(complatedList, elList)
})

unComplatedBtn.addEventListener("click", function(){
  const unComplatedList = todos.filter(item => item.isComplated == false)
  renderTodos(unComplatedList, elList)
})

//https://media.gq.com.mx/photos/60cf8f0a33c54bdef67610ee/16:9/w_2560%2Cc_limit/paisaje.jpg