import { type RouteConfig, index, route } from "@react-router/dev/routes";

const routes: RouteConfig = [
  index("routes/home.tsx"), // trang home độc lập tại '/'
  route("layout", "routes/layout.tsx", [  // route cha layout tại '/layout'
    route("welcome", "routes/welcome.tsx"),
    route("layoutEven", "layoutEven/layoutEven.tsx"),
  ]),
];

export default routes;
