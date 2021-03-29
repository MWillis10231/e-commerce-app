import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ProductsList from './ProductsList'
import ProductSingle from "./ProductSingle";
import Filter from './Filter'
import { Fragment } from "react";
import SortBar from "./Sort";

export default function Products(props) {
  let match = useRouteMatch();

  return (
    <Fragment>
      <Switch>
        <Route path={`${match.path}/search`} exact>
          <SortBar />
          <Filter />
          <ProductsList update={match}/>
        </Route>
        <Route path={`${match.path}/:productId`} exact>
          <ProductSingle/>
        </Route>
        <Route path={`${match.path}/category/:categoryId`} exact>
          <ProductsList update={match}/>
        </Route>
        <Route path={`${match.path}/`} exact>
          <ProductsList/>
        </Route>
      </Switch>
    </Fragment>
  );
}
