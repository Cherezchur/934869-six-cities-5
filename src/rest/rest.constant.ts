export const STATIC_UPLOAD_ROUTE = '/upload';
export const STATIC_FILES_ROUTE = '/static';

export const LOGS = {
  APP_INIT: 'Application initialization',
  DB_INIT: 'Initializing database…',
  DB_READY: 'Database initialization complete.',
  MIDDLEWARE_INIT: 'Initializing app-level middleware…',
  MIDDLEWARE_READY: 'App-level middleware initialization complete.',
  CONTROLLER_INIT: 'Initializing controllers…',
  CONTROLLER_READY: 'Controller initialization complete.',
  EXCEPTION_FILTER_INIT: 'Initializing exception filters…',
  EXCEPTION_FILTER_READY: 'Exception filters initialization complete.',
  SERVER_INIT: 'Initializing server…',
  SERVER_STARTED: '🚀 Server started on',
} as const;
