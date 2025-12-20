import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../pages/dashboard/DashboardLayout.vue";
import AuthView from "../pages/auth/AuthView.vue";
import UsersView from "../pages/dashboard/groups/UsersView.vue";
import ServerInternalError from "../pages/errors/ServerInternalError.vue";
import TasksView from "../pages/dashboard/tasks/TasksView.vue";

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
    redirect: { name: "Users" },
    children: [
      {
        path: "users",
        name: "Users",
        component: UsersView,
        children: [
          {
            path: "group-students",
            name: "GroupStudents",
            children: [
              {
                path: 'tasks/:userId',
                name: "Tasks",
                component: TasksView
              }
            ],
            meta: {
              title: "Guruh o'quvchilari",
            },
          },
        ],
        meta: {
          title: "Foydalanuvchilar",
        },
      },
    ],
  },
  {
    path: "/500",
    name: "ServerInternalError",
    component: ServerInternalError,
    meta: {
      title: "Server xatosi",
    },
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
