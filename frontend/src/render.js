window.addEventListener("DOMContentLoaded", async () => {
    await init();

    const addBtn = document.getElementById("addTodo");
    const modal = document.getElementById("modal");
    const closeModalBtn = document.getElementById("closeModal");

    addBtn.addEventListener("click", () => openModal(modal,"addBtn"));
    closeModalBtn.addEventListener("click", () => closeOpenModal(modal));
});

function openModal(modal,source){
    modal.classList.add("flex");
    modal.classList.remove("hidden");
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
