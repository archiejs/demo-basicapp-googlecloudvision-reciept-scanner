A short explaination of directories.

/env

    It contains environment variables for different application
    modes (such as local, development, test or production). The mode
    is specified in NODE_ENV environment variable.

    $
      export NODE_ENV=local
      node app [serviceName]

    It merges default.js, with the relevant enviroment variable config file.

/env/

    Environment variables for different configurations - dev, production,
    etc.

/routes/index.js

    You need to add any new route files to this js filmanually.
    We can perhaps later make this simpler.

/deptree

    It contains dependencies among various plugins in a microservice. 
    The file /app.js calls this module to load the dependencies.

    For example, below commands loads dependencies in /plugins/scrapper.js

    $ node app scrapper


/init

    It contains code that is used during the initialization of a webApp or a
    microservice. You can modify this, if you want to initialize express in a
    more customized manner (or do something similar for some other module).
