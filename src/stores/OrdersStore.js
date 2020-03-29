import {observable,action} from 'mobx'
import axios from 'axios'
import SingleOrderStore from './SingleOrderStore'



export default class OrdersStore{
    @observable orders = []
    @observable products = []
    @observable employees = []
    
    @action getOrders = async () => {
        const ordersResponse = await axios.get("http://localhost:4000/orders")
        this.orders = ordersResponse.data.map(o => new SingleOrderStore(o))
        console.log(this.orders);
        
    }

    @action getEmployees = async () => {
        const employeesResponse = await axios.get("http://localhost:4000/employees")
        this.employees = employeesResponse.data
        console.log(this.employees);
        
    }

    @action getProducts = async () => {
        const productsResponse = await axios.get("http://localhost:4000/products")
        this.products = productsResponse.data
        console.log(this.products);
        
    }

    @action initializeAll = () => {
        this.getOrders()
        this.getEmployees()
        this.getProducts()
    }


}