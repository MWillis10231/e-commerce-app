import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ProductsList from './ProductsList'
import ProductSingle from "./ProductSingle";

export default function Products(props) {
  let match = useRouteMatch();

  return (
    <div className="Content">
      <Switch>
        <Route path={`${match.path}/:productId`} exact>
          <ProductSingle/>
        </Route>
        <Route path={`${match.path}/category/:categoryId`} exact>
          <ProductsList update={match}/>
        </Route>
        <Route path={`${match.path}/`} exact>
          <h3>All products</h3>
          <p>Limit results by searching for a product or filter by a category above.</p>
          <ProductsList/>
        </Route>
      </Switch>
    </div>
  );
}
