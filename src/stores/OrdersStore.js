import {observable,action} from 'mobx'
import axios from 'axios'
import SingleOrderStore from './SingleOrderStore'

export default class OrdersStore{
    @observable orders = [{progress:1,name:'111'},{progress:2,name:'222',inProcess:true},
    {progress:3,name:'33333'},{progress:4,name:'444',inProcess:true},{progress:2,name:'222'},
    {progress:5,name:'555',inProcess:true},{progress:6,name:'666'},{progress:7,name:'777'}]
    @observable employees = [{id:1,name:'nadav'},{id:2,name:'alon'},{id:3,name:'amir'}]
    @observable products = []
   

    @action getOrders = async () => {
        const ordersResponse = await axios.get("http://localhost:4000/orders")
        this.orders = ordersResponse
    }

    @action getEmployees = async () => {
        const employeesResponse = await axios.get("http://localhost:4000/employees")
        this.employees = employeesResponse
    }

    @action getProducts = async () => {
        const productsResponse = await axios.get("http://localhost:4000/products")
        this.products = productsResponse
    }

    @action initializeAll = () => {
        this.getOrders()
        this.getEmployees()
        this.getProducts()
    }


}