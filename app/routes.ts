import { type RouteConfig, index, route } from "@react-router/dev/routes";

const routes: RouteConfig = [
  index("routes/home.tsx"), // trang home độc lập tại '/'
    route("layout", "routes/layout.tsx", [
    route("Invitation", "Invitationpage/Invitation.tsx"),
    route("InvitationCard","InvitationCard/InvitationThiep.tsx"),
    route("layoutEvent", "layoutEven/layoutEven.tsx"),
    route("LayoutLanding", "LayoutLanding/WeddingLayoutLanding.tsx"),
    route("Plan", "Plan/PlanSelection.tsx"),
    route("StatisticsPage","StatisticsPage/StatisticsPage.tsx"),
    route("PlanEditor", "PlanEditor/PlanEditor.tsx"),
    route("TransactionReport", "TransactionReport/TransactionReport.tsx"),
  ]),
];

export default routes;
