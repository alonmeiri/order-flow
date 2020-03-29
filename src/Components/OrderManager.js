import React, {useState, useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import Stage from './Stage';
import StageDetailsWindow from './StageDetailsWindow';

const OrderManager = inject('ordersStore','detailsWindowStore')(observer((props) => {
    const [stages,setStages] = useState([])
    const [numStages,setNumStages] = useState(7)

    useEffect(() => {
        props.ordersStore.initializeAll() // dummy data right now
    },[]) 

    useEffect(() => {
        const arr = []
        for(let i = 1 ; i <= numStages ; i++){
            arr.push(<Stage stage={i}/>)
        }
        setStages(arr)
    },[props.ordersStore.orders])

    return (
        <div id="order-manager-page">
            <div id="stages-container">
                {stages}
            </div>
            {props.detailsWindowStore.showDetailsWindow ? <StageDetailsWindow /> : null}
        </div>
    )
}))

export default OrderManager