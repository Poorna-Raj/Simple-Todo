const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('getApi',{
    fetchData: async () =>{
        const response = await fetch('http://localhost:5282/api/Todos');
        return response.json();
    },
    fetchById: async(id) =>{
        const response = await fetch(`http://localhost:5282/api/Todos/${id}`);
        return response.json();
    }
});