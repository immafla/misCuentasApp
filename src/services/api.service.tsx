import React from 'react'

export class ApiService {
    
    async getAllCategories(){
        return await fetch('http://localhost:3000/getAllCategories', {
            method: 'GET',
        })   
    } 
    
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

    async getAllBussinesCategory(){
        return await fetch('http://localhost:3000/getAllBussinesCategory', {
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

    async setProduct(body:any){
        return fetch('http://localhost:3000/setProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            body: JSON.stringify(body)
        }) 
    }

    async deleteBrand(body:any){
        return fetch('http://localhost:3000/deleteBrand', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            body: JSON.stringify(body)
        }) 
    }
}
