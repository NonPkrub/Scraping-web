const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "visual", component: () => import("pages/DataVisualize.vue") },
      { path: "scrape", component: () => import("pages/ScrapeData.vue") },
      {
        path: "display",
        component: () => import("pages/DataDisplay.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
