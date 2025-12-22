import { defineStore } from "pinia";
import api from "../utils/api";
import { notification } from "ant-design-vue";

const useUser = defineStore("user", {
  state: () => ({
    user: {},
    users: [],
    params: {
      size: 10,
      page: 0,
      search: "",
    },
    userForm: {
      name: "",
      surname: "",
      age: null,
      login: "",
      password: "",
      level: 0,
      group: "",
    },
    loading: false,
    buttonLoading: false,
    selectLoading: {},
  }),

  actions: {
    me() {
      this.loading = true;

      api({
        url: "me",
        method: "GET",
      })
        .then(({ data }) => {
          this.user = data;
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message || error,
          });
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    updateMe() {
      this.buttonLoading = true;

      api({
        url: `update/${this.user._id}`,
        method: "PUT",
        data: this.user,
      })
        .then(({ data }) => {
          this.user = data.user;
          notification.success({
            message: "Sozlamalar saqlandi",
          });
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message || error,
          });
          console.error(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },

    getUsers({ size, page, search }) {
      this.loading = true;

      api({
        url: "/all",
        params: {
          size,
          page,
          search,
        },
        method: "GET",
      })
        .then(({ data }) => {
          this.users = data;
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message || error,
          });
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    createUser(callback) {
      this.buttonLoading = true;

      api({
        url: "register",
        method: "POST",
        data: this.userForm,
      })
        .then(({ data }) => {
          this.users.unshift(data);
          notification.success({
            message: "Foydalanuvchi qo'shildi",
          });

          callback?.();
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message || error,
          });
          console.error(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },

    updateUser(callback, id) {
      this.buttonLoading = true;

      api({
        url: `update/${id}`,
        method: "PUT",
        data: this.userForm,
      })
        .then(({ data }) => {
          const index = this.users.findIndex((user) => user._id === id);

          if (index !== -1) {
            this.users[index] = data.user;
          }
          notification.success({
            message: "Foydalanuvchi ma'lumotlari yangilandi",
          });

          callback?.();
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message || error,
          });
          console.error(error);
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },

    updateRole(role, id) {
      this.selectLoading[id] = true;

      api({
        url: `update/${id}`,
        method: "PUT",
        data: {
          role: role,
        },
      })
        .then(({ data }) => {
          const index = this.users.findIndex((user) => user._id === id);

          if (index !== -1) {
            this.users[index] = data.user;
          }
          notification.success({
            message: "Foydalanuvchi roli o'zgartirildi",
          });
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message || error,
          });
          console.error(error);
        })
        .finally(() => {
          this.selectLoading[id] = false;
        });
    },

    deleteUser(id) {
      this.loading = true;

      api({
        url: `delete/${id}`,
        method: "DELETE",
      })
        .then(() => {
          this.users = this.users.filter((user) => user._id !== id);
          notification.success({
            message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
          });
        })
        .catch((error) => {
          notification.error({
            message: error.response?.data?.message || error,
          });
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});

export default useUser;
