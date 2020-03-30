<<<<<<< HEAD
import React, { Fragment, useEffect } from 'react';
import './App.css';
import { observer , inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import OrderManager from './Components/OrderManager';
import MyAppBar from './Components/MyAppBar';
import Settings  from './Components/Settings';

const App = inject('ordersStore')(observer((props) => {
   
     useEffect(() => {
        props.ordersStore.initializeAll() 
        
    },[])
    
    return (
        <Router>
            <Route path="/" exact render={() =><Redirect to="/order-manager" />}/>
            <Route path="/order-manager" exact render={() => 
                <Fragment>
                    <MyAppBar headline={'Order Manager'}/>
                    <OrderManager />
                </Fragment>
            }/>
            <Route path="/completed-orders" exact render={() => 
                <Fragment>
                    <MyAppBar headline={'Completed Orders'}/>
                </Fragment>
            }/>
            <Route path="/settings" exact render={() => 
                <Fragment>
                    <MyAppBar headline={'Settings'}/>
                    <Settings />
                </Fragment>
            }/>
        </Router>
    )
}))
=======
import React, { Fragment } from "react"
import "./App.css"
import { observer } from "mobx-react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import OrderManager from "./Components/OrderManager"
import MyAppBar from "./Components/MyAppBar"
import Settings from "./Components/Settings"
import { StylesProvider } from "@material-ui/core/styles"

const App = observer(props => {
  return (
    <StylesProvider injectFirst>
      <Router>
        <Route
          path="/ordermanager"
          exact
          render={() => (
            <Fragment>
              <MyAppBar headline={"Order Manager"} />
              <OrderManager />
            </Fragment>
          )}
        />
        <Route
          path="/settings"
          exact
          render={() => (
            <Fragment>
              <MyAppBar headline={"Settings"} />
              <Settings />
            </Fragment>
          )}
        />
      </Router>
    </StylesProvider>
  )
})
>>>>>>> master

export default App
