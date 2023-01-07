import React from 'react'

export class ApiService {
    
    async getAllProducts(){
        return await fetch('http://localhost:3000/getProducts', {
            method: 'GET',
        })   
    } 

    async getAllBrands(){
        return await fetch('http://localhost:3000/getAllBrands', {
            method: 'GET',
        })   
    } 

    async setBrand(body:any){
        return fetch('http://localhost:3000/setBrand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            body: JSON.stringify(body)
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
