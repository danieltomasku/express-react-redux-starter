var readlineSync = require('readline-sync');
// var _ = require('lodash');
var fs = require('fs');
// var ejs = require('ejs');
var chalk = require('chalk');

module.exports = function(shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);
  require('shipit-npm')(shipit);
  require('shipit-pm2-nginx')(shipit);

  shipit.initConfig({
    default: {
      name: 'express-react-redux',
      workspace: '/tmp/express-react-redux',
      deployTo: '/var/www/express-react-redux',
      repositoryUrl: 'git@github.com:mattanglin/express-react-redux-starter.git',
      ignores: ['.git','node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: false,

      /* shipit-npm */
      npm: {
        triggerEvent: 'sharedEnd' // Only install packages after shared files linked
      },
      /* shipit-shared */
      shared: {
        overwrite: true,
        dirs: [
          {
            path:'node_modules',
            overwite: false
          }
        ],
      },

      /** Nginx settings **/
      nginx: {
        servername: 'localhost',
      },
      /** pm2 settings **/
      pm2: {
        conf: {
          script: "bin/www",
          cwd: "/var/www/express-react-redux/current",
          watch: false,
        }
      }
    },

    staging: {
      branch: 'develop',
      servers: [
        {
          host:'0.0.0.0',
          user: 'deploy'
        }
      ],
      nginx: {
        servername: 'example.com www.example.com'
      },
    },

    production: {
      branch: 'master',
      servers: [
        {
          host:'0.0.0.0',
          user: 'deploy'
        },
        {
          host:'0.0.0.1',
          user: 'deploy'
        },
      ],
      nginx: {
        servername: 'example.com www.example.com'
      },
    },
  });


  /**
   *  deploy-public
   *  This task compiles all the assets locally and
   *  deploys them via shipit.remoteCopy.
   *  Please see caveats in comments below.
   */
  shipit.blTask('deploy-public',function() {
    /*
      This poses a problem for me. Technically, assets could
      be out of sync with what is currently being deployed. We
      copy the repository to the working folder with the supplied
      branch, but then build the assets in the current working directory.
      If for some reason you were say in the master branch of your cloned
      repo, but tried to deploy the develop branch, the develop branch would 
      be fetched to the working folder, but the master branch assets would
      be built and deployed to the site since we are building/copying from
      the cwd.

      Possible solutions don't seem very efficient either:

      1. Installing the package in the working directory to allow building
        and copying from the target branch (add option: {cwd: shipit.config.workspace})
        -- THIS TAKES WAY TOO LONG AND IS HIGHLY NOT RECOMMENDED! --
      2. Building remotely. Not terrible, but I'd prefer to avoid putting this strain
        on the servers.
      3. Maintaining public assets in repository just seems irresponsible...

      For now I will leave it building and copying from the cwd, but we must make
      sure that we have checked out the same branch we are deploying and the current
      checked out branch is up to date and unmodified.
    */
    shipit.log(chalk.yellow('Building public assets locally...'));
    return shipit.local('NODE_ENV='+shipit.environment+' gulp build-prod').then(function(res) {
      shipit.log(chalk.bold.green(' - Public assets built locally'));
      shipit.log(chalk.bold.blue('Copying public assets to remote servers...'));
      return shipit.remoteCopy('public',shipit.releasePath).then(function(a) {
        return shipit.log(chalk.green.bold(' - Public assets copied successfully'));
      })
    })
  })

  /**
   *  remote-compile-assets
   *  This task runs the asset compilation on the remote server. 
   *  Sets NODE_ENV to shipit environment before compilation.
   */
  shipit.blTask('remote-compile-assets',function() {
    shipit.log(chalk.yellow('Building public assets on remote servers...'));
    return shipit.remote('cd '+ shipit.releasePath +' && NODE_ENV='+shipit.environment+' gulp build-prod',function(res) {
      shipit.log(chalk.green.bold(' - Public assets built on remote servers successfully'));
    });
  });


  // Ask for deploy branch
  shipit.on('deploy',function() {
    var branch = readlineSync.question(chalk.white('Please enter branch (')+chalk.red.bold(shipit.config.branch)+chalk.white('):'));
    shipit.config.branch = branch || shipit.config.branch;
  })


  // Compile assets on update
  shipit.on('updated', function() {
    /**
     *  Change this depending on whether or not you'd like 
     *  to compile assets locally or remotely.
     */

    // shipit.start('deploy-public'); // Local asset compilation
    shipit.start('remote-compile-assets'); // Remote asset compilation
  });
};
