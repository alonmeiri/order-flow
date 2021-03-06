import React from 'react';
import '../../styles/Analytics.css'

import { inject, observer } from 'mobx-react';
import EmployeeTimeForTask from './EmployeeTimeForTask';
import OrdersPerProduct from './OrdersPerProduct';
import CompletedByEmployee from './CompletedByEmployee';
import CompletedTimePerProduct from './CompletedTimePerProduct';

const Analytics = inject('generalStore')(observer((props) => {
  
  

return(
    <div className="analytics">
      <CompletedTimePerProduct/>
      <CompletedByEmployee/>
      <EmployeeTimeForTask/>
      <OrdersPerProduct/>
    </div>
)


}))
export default Analytics