import React from 'react'

export class ApiService {
    
    async getAllProducts(){
        return await fetch('http://localhost:3000/getProducts', {
            method: 'GET',
        })   
    } 

    setBussines(body:any){
        return fetch('http://localhost:3000/setBussines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            body: JSON.stringify(body)
        }) 
    }
}
