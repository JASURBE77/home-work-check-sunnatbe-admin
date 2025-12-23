import { useI18n } from "vue-i18n";

export const usersColumn = () => {
  const { t } = useI18n();

  return [
    {
      title: "№",
      dataIndex: "colIndex",
      key: "colIndex",
      width: 40,
      align: "center",
    },
    {
      title: t("Users.FISH"),
      dataIndex: "name",
      key: "name",
      width: 150,
      align: "center",
    },
    {
      title: t("Users.age"),
      dataIndex: "age",
      key: "age",
      width: 100,
      align: "center",
    },
    {
      title: t("Users.login"),
      dataIndex: "login",
      key: "login",
      width: 100,
      align: "center",
    },
    {
      title: t("Users.role"),
      dataIndex: "role",
      key: "role",
      width: 100,
      align: "center",
    },
    {
      title: t("Users.level"),
      dataIndex: "level",
      key: "level",
      width: 120,
      align: "center",
    },
    {
      title: t("Users.group"),
      dataIndex: "group",
      key: "group",
      width: 120,
      align: "center",
    },
    {
      title: t("ACTIONS"),
      dataIndex: "actions",
      key: "actions",
      width: 60,
      align: "center",
    },
  ];
};
