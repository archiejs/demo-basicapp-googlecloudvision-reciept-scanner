A short explaination of directories.

/env

    It contains environment variables for different application
    modes (such as local, development, test or production). The mode
    is specified in NODE_ENV environment variable.

    $
      export NODE_ENV=local
      node app [serviceName]

    It merges default.js, with the relevant enviroment variable config file.


/common

    It contains code that is called during the initialization of a sub-project
    inside the app.
