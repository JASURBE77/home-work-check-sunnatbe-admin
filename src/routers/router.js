import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../pages/dashboard/DashboardLayout.vue";
import GroupsView from "../pages/dashboard/groups/GroupsView.vue";
import TasksView from "../pages/dashboard/tasks/TasksView.vue";
import AuthView from "../pages/auth/AuthView.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: AuthView,
    meta: {
      title: "Tizimga kirish",
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: DashboardLayout,
    redirect: { name: "Groups" },
    children: [
      {
        path: "groups",
        name: "Groups",
        component: GroupsView,
        children: [
          {
            path: "group-students",
            name: "GroupStudents",
            meta: {
              title: "Guruh o'quvchilari",
            },
          },
        ],
        meta: {
          title: "Guruhlar",
        },
      },
      {
        path: "tasks",
        name: "Tasks",
        component: TasksView,
        meta: {
          title: "Vazifalar",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken && to.path !== "/login") next("/login");
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  next();
});

export default router;
