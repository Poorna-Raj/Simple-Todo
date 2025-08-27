window.addEventListener("DOMContentLoaded", async () => {
    await init();

    const addBtn = document.getElementById("addTodo");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("closeModal");
    const btnSave = document.getElementById("modalSave");
    const btnUpdate = document.getElementById("modalUpdate");

    addBtn.addEventListener("click", async () => await openModal("addBtn"));
    closeModalBtn.addEventListener("click", () => closeOpenModal(modal));
    btnSave.addEventListener("click",async ()=> await saveTodo());
    btnUpdate.addEventListener("click",async()=> await updateTodo());
});

async function updateTodo(){
    try{
        const form = document.getElementById("todoForm");
        const id = form.dataset.id;
        const dueDateTime = new Date(document.getElementById("dueDate").value + "T00:00:00")
        const todo = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            priority: document.getElementById("priority").value,
            status: document.getElementById("status").value,
            dueDate: dueDateTime.toISOString()
        };
        console.log(JSON.stringify(todo));

        const response = await window.getApi.updateTodo(JSON.stringify(todo),id);
        if(response && response.id){
            const modal = document.getElementById("modal");
            closeOpenModal(modal);
            await init();
        }
        else{
            console.error("Failed to save todo");
        }
    }
    catch(err){
        console.error(err);
    }
}

async function saveTodo(){
    try{
        const currentDate = new Date();
        const dueDateTime = new Date(document.getElementById("dueDate").value + "T00:00:00")
        const todo = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            priority: document.getElementById("priority").value,
            status: document.getElementById("status").value,
            dueDate: dueDateTime.toISOString(),
            createdAt: currentDate.toISOString()
        };

        console.log(JSON.stringify(todo));

        const response = await window.getApi.saveTodo(JSON.stringify(todo));
        if(response && response.id){
            const modal = document.getElementById("modal");
            closeOpenModal(modal);
            await init();
        }
        else{
            console.error("Failed to save todo");
        }
    }
    catch(err){
        console.error(err);
    }
}

async function openModal(source,id){
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "";
    document.getElementById("status").value = "";
    const modal = document.getElementById("modal");
    if(source === "addBtn"){
        const btnUpdate = document.getElementById("modalUpdate");
        const btnDelete = document.getElementById("modalDelete");
        const btnSave = document.getElementById("modalSave");
        if(btnSave.classList.contains("hidden")){
            btnSave.classList.remove("hidden");
        }
        if(!btnUpdate.classList.contains("hidden")){
            btnUpdate.classList.add("hidden");
        }
        if(!btnDelete.classList.contains("hidden")){
            btnDelete.classList.add("hidden");
        }
        modal.classList.add("flex");
        modal.classList.remove("hidden");
    }
    else if(source === "card"){
        try{
            const data = await window.getApi.fetchById(id);
            document.getElementById("title").value = data.title;
            document.getElementById("description").value = data.description;
            document.getElementById("dueDate").value = data.dueDate.split('T')[0];
            document.getElementById("priority").value = data.priority;
            document.getElementById("status").value = data.status;

            const form = document.getElementById("todoForm");
            form.dataset.id = data.id;
            
            const btnUpdate = document.getElementById("modalUpdate");
            const btnDelete = document.getElementById("modalDelete");
            const btnSave = document.getElementById("modalSave");
            if(btnUpdate.classList.contains("hidden")){
                btnUpdate.classList.remove("hidden");
            }
            if(btnDelete.classList.contains("hidden")){
                btnDelete.classList.remove("hidden");
            }
            if(!btnSave.classList.contains("hidden")){
                btnSave.classList.add("hidden");
            }

            modal.classList.add("flex");
            modal.classList.remove("hidden");
        }
        catch(err){
            console.error(err);
        }
    }
}

function closeOpenModal(modal){
    modal.classList.remove("flex");
    modal.classList.add("hidden");
}

async function init(){
    try {
        const data = await window.getApi.fetchData();
        populateTodos(data);
    } catch (err) {
        console.error("Error: " + err);
    }
}

function populateTodos(todos){
    const container = document.getElementById("cards-container");
    container.innerHTML = "";
    todos.forEach(todo => {
        const card = document.createElement("div");
        card.className = `
            flex flex-col p-5 rounded-2xl 
            border-l-4 ${getBorderColor(todo.priority)}
            bg-white hover:shadow-xl transition h-64 w-64
        `;
        card.innerHTML = `
            <!-- Header -->
            <div class="flex justify-between items-start">
                <h3 class="font-semibold text-lg text-gray-800">${todo.title}</h3>
                <div class="text-sm text-red-600 font-medium bg-red-100 px-2 py-1 rounded">
                    ${todo.createdAt.split('T')[0]}
                </div>
            </div>

            <!-- Description -->
            <p class="flex-grow mt-3 text-gray-700 leading-relaxed text-justify line-clamp-5">
                ${todo.description}
            </p>

            <!-- Footer -->
            <div class="flex justify-between items-center mt-4 text-sm">
                <p class="text-gray-500">Created: ${todo.dueDate.split('T')[0]}</p>
                <span class="${getStatusBadge(todo.status)} text-xs font-semibold px-2 py-1 rounded">
                    ${todo.status}
                </span>
            </div>
        `;
        card.addEventListener("click",async() => await openModal("card",todo.id));
        container.appendChild(card);
    });
}

function getBorderColor(priority){
    if(priority === "High"){
        return "border-red-500 shadow-md";
    } else if (priority === "Medium"){
        return "border-green-500 shadow-md";
    }
    return "border-blue-500 shadow-md";
}

function getStatusBadge(status){
    if(status === "Pending"){
        return "bg-blue-500";
    } else if(status === "InProgress"){
        return "bg-yellow-500";
    } 
    return "bg-green-500";
}
