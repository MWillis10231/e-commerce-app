import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import ProductsList from "./ProductsList";
import ProductSingle from "./ProductSingle";
import Filter from "./Filter";
import { Fragment } from "react";
import React from "react";

export default function Products(props) {
  let match = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <Route path={`${match.path}/search`} exact>
          <Filter />
          <ProductsList />
        </Route>
        <Route path={`${match.path}/:productId`} exact>
          <ProductSingle addCartItem={props.addCartItem} />
        </Route>
        <Route path={`${match.path}/category/:categoryId`} exact>
          <Filter />
          <ProductsList />
        </Route>
        <Route path={`${match.path}/`} exact>
          <Redirect to={`${match.path}/category/0`} />
        </Route>
      </Switch>
    </Fragment>
  );
}
