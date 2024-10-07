import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import ViewIngredient from "./ViewIngredient";
import ShowNews from "./ShowNews";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        Component: ComposeSalad,
        children: [
          {
            path: "view-ingredient/:name",
            Component: ViewIngredient,
          }
        ],
      },
      {
        path: "view-order",
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:id",
            Component: ShowNews,
          },
        ],
      }
      , {
        index: true,
        element: <p>Välkommen till vår salladsbar</p>
      },
      {
        path: "*",
        element: <><p>Ajdå! Nu har du gått vilse.</p><img src="https://media.tenor.com/B0UDVSjWo9wAAAAe/despair-trolldespair.png" width="300px"></img></>,
      }]
  },
]);
export default router;