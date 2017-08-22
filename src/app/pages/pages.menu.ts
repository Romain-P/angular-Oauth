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
        path: 'activities',
        data: {
          menu: {
            title: 'general.menu.activities',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        
      },
      {
        path: 'activitiesUser',
        data: {
          menu: {
            title: 'general.menu.activitiesUser',
            icon: 'ion-bag',
            selected: false,
            expanded: false,
            order: 100,
          },
        },
        
      },
    ],
  },
];
