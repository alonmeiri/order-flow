import React from 'react';
import { inject, observer } from 'mobx-react';
import {ExpansionPanelSummary, Typography, ExpansionPanelDetails,ExpansionPanel, Button} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const OrderCard = inject('detailsWindowStore')(observer((props) => {
    
    const openDetailsWindow = () => {
        props.detailsWindowStore.toggleDetailsWindow()
        props.detailsWindowStore.setDetailsWindowOrder(props.order)
    }

    return (
        <ExpansionPanel className='order' >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{props.order.shopifyId}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails >
                {props.order.inProcess ? 
                    <Button variant='contained' color='primary' 
                    onClick={openDetailsWindow}>Complete Task</Button> :
                    <Button variant='contained' color='primary'
                    onClick={openDetailsWindow}>Claim Task</Button>}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}))

export default OrderCard