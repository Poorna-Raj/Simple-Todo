const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('getApi',{
    fetchData: async () =>{
        const response = await fetch('http://localhost:5282/api/Todos');
        return response.json();
    },
    fetchById: async(id) =>{
        const response = await fetch(`http://localhost:5282/api/Todos/${id}`);
        return response.json();
    },
    saveTodo: async(data) =>{
        const response = await fetch('http://localhost:5282/api/Todos',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: data
        });
        return response.json();
    },
    updateTodo: async(data,id)=>{
        const response = await fetch(`http://localhost:5282/api/Todos/${id}`,{
            method: "PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:data
        });
        return response.json();
    },
    deleteTodo: async(id) =>{
        const response = await fetch(`http://localhost:5282/api/Todos/${id}`,{
            method: "DELETE",
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.json();
    }
});