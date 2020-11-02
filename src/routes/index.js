import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from '../pages/main'
import New from '../pages/new'
import Edit from '../pages/edit'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/new" component={New} />
        <Route path="/edit/:id" component={Edit} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
