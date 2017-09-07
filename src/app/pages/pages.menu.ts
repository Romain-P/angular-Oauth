export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'activity',
        data: {
          menu: {
            title: 'general.menu.activities',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          },
        },

      },
      {
        path: 'assignment',
        data: {
          menu: {
            title: 'general.menu.assignment',
            icon: 'ion-bag',
            selected: false,
            expanded: false,
            order: 100,
          },
        },

      },
      {
        path: 'pointage',
        data: {
          menu: {
            title: 'general.menu.pointage',
            icon: 'ion-compass',
            selected: false,
            expanded: false,
            order: 100,
          },
        },

      },
      {
        path: 'role',
        data: {
          menu: {
            title: 'general.menu.roles',
            icon: 'ion-ios-people',
            selected: false,
            expanded: false,
            order: 100,
          },
        },

      },
    ],
  },
];
