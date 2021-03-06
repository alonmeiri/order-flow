import {observable,action} from 'mobx'
import axios from 'axios'
import SingleOrderStore from './SingleOrderStore'

export default class BoardStore {
    @observable name
    @observable stages
    @observable orders
    @observable stagesNum
    @observable productIds

    constructor(board){
        this.name = board.name
        this.stages = board.stages
        this.orders = board.orders.map(o => new SingleOrderStore(o, board.stages))
        this.stagesNum = board.stages.length
        this._id = board._id 
        this.productIds = board.products
    }

    @action updateProducts = async (productIds) => {
    this.productIds = productIds
    await axios.put('/api/board',this)
    }

    @action updateStage = async (stage,index) => {
        if(index === this.stages.length){
            this.stages.push(stage)
        }else{
            this.stages[index] = stage
        }
        await axios.put('/api/board',this)
    }

    @action getStageOrders = (stage) =>{
        return this.orders.map(o => o.progress === stage)
    }

}

