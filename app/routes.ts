import { type RouteConfig, index, route } from "@react-router/dev/routes";

const routes: RouteConfig = [
  index("routes/home.tsx"), // trang home độc lập tại '/'
    route("layout", "routes/layout.tsx", [
    route("Invitation", "Invitationpage/Invitation.tsx"),
    route("InvitationCard","InvitationCard/InvitationThiep.tsx"),
    route("layoutEven", "layoutEven/layoutEven.tsx"),
     route("LayoutLanding", "LayoutLanding/WeddingLayoutLanding.tsx"),
  ]),
];

export default routes;
