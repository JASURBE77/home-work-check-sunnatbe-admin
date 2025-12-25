import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../pages/dashboard/DashboardLayout.vue";
import AuthView from "../pages/auth/AuthView.vue";
import UsersView from "../pages/dashboard/users/UsersView.vue";
import ServerInternalError from "../pages/errors/ServerInternalError.vue";
import TasksView from "../pages/dashboard/tasks/TasksView.vue";
import SettingsView from "../pages/dashboard/setting/SettingsView.vue";
import GroupsView from "../pages/dashboard/groups/GroupsView.vue";
import GroupStudentsView from "../pages/dashboard/group-students/GroupStudentsView.vue";

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
            path: "tasks/:userId",
            name: "Tasks",
            component: TasksView,
            meta: {
              title: "Guruh o'quvchilari",
            },
          },
        ],
        meta: {
          title: "Foydalanuvchilar",
        },
      },
      {
        path: "groups",
        name: "Groups",
        component: GroupsView,
        meta: {
          title: "Guruhlar",
        },
        children: [
          {
            path: "students/:groupId",
            name: "GroupStudents",
            component: GroupStudentsView,
            meta: {
              title: "Guruh o'quvchilari",
            },
          },
        ],
      },
      {
        path: "setting",
        name: "Setting",
        component: SettingsView,
        meta: {
          title: "Sozlamalar",
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
