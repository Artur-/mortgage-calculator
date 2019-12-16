import { Router } from "@vaadin/router";
import "./main-view";

const routes = [
  {
    path: "",
    component: "main-view"
  }
];

const router = new Router(document.querySelector("#outlet"));
router.setRoutes(routes);
