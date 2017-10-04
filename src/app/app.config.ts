var api_url = 'http://10.64.0.41:8080/gta';

export var config = {
  api_url: api_url,

  authentication: {
    url: api_url + '/login/token',
    clientId: 'clktime-app',
    clientSecret: 'ortec-secret'
  },

  models: {
    user: {
      url: api_url + '/user/',
      current: api_url + '/user/current',
      current_meta_sync: api_url + '/user/current-meta-sync',
      meta_sync: api_url + '/user/meta-sync/',
      absence_days: api_url + '/user/absenceDays/{userId}/{year}'
    },

    activity: {
      url: api_url + '/activity/',
      children: api_url + '/activity/children/',
      parents: api_url + '/activity/parents/'
    },

    role: {
      url: api_url + '/role/'
    },

    stat: {
      url: api_url + '/stat'
    },

    week: {
      url: api_url + '/week',
      parents_by_weeks: api_url + '/week/user/{user_id}/weekNumber/{number}/year/{year}',
      current_parents_by_weeks: api_url + '/week/user/weekNumber/{number}/year/{year}'
    }
  }
};
