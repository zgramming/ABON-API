import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MenuSeeder = async () => {
  await prisma.appMenu.deleteMany();

  const modulSetting = await prisma.appModul.findFirst({
    where: {
      code: "SETTING",
    },
  });

  const modulKaryawan = await prisma.appModul.findFirst({
    where: {
      code: "KARYAWAN",
    },
  });

  const karyawanMenu = [
    {
      app_modul_id: modulKaryawan?.id ?? 0,
      code: "KARYAWAN_DASHBOARD",
      name: "Dashboard",
      route: "/karyawan/dashboard",
      order: 1,
    },
  ];

  const settingMenu = [
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_USER_GROUP",
      name: "Management User Group",
      route: "/setting/user_group",
      order: 1,
    },
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_USER",
      name: "Management User",
      route: "/setting/user",
      order: 2,
    },
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_MODUL",
      name: "Modul",
      route: "/setting/modul",
      order: 3,
    },
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_MENU",
      name: "Menu",
      route: "/setting/menu",
      order: 4,
    },
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_ACCESS_MODUL",
      name: "Akses Modul",
      route: "/setting/access_modul",
      order: 5,
    },
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_ACCESS_MENU",
      name: "Akses Menu",
      route: "/setting/access_menu",
      order: 6,
    },
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_MASTER_CATEGORY",
      name: "Master Kategori",
      route: "/setting/master_category",
      order: 7,
    },
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_DOCUMENTATION",
      name: "Dokumentasi",
      route: "/setting/documentation",
      order: 8,
    },
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_PARAMETER",
      name: "Parameter",
      route: "/setting/parameter",
      order: 9,
    },

    // Parent & Children Menu EXAMPLE
    {
      app_modul_id: modulSetting?.id ?? 0,
      code: "SETTING_PARENT_MENU",
      name: "Parent Menu",
      route: "?/setting/parent",
      order: 10,
    },
  ];

  //! Start Insert Children Menu
  await prisma.appMenu.createMany({
    data: [...settingMenu, ...karyawanMenu],
  });

  const parentMenu = await prisma.appMenu.findFirst({
    where: { code: "SETTING_PARENT_MENU" },
  });

  await prisma.appMenu.createMany({
    data: [
      {
        app_modul_id: modulSetting?.id ?? 0,
        app_menu_id_parent: parentMenu?.id ?? 0,
        code: "SETTING_CHILDREN_1",
        name: "Children Menu 1",
        route: "/setting/parent/children_1",
        order: 1,
      },
      {
        app_modul_id: modulSetting?.id ?? 0,
        app_menu_id_parent: parentMenu?.id ?? 0,
        code: "SETTING_CHILDREN_2",
        name: "Children Menu 2",
        route: "/setting/parent/children_2",
        order: 2,
      },
    ],
  });
};

export default MenuSeeder;
