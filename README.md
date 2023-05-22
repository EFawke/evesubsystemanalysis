# Rage-Roll

Rage-roll is a heat map for Eve Online sorted by ship class. Currently it only covers wormholes, but we can look into expanding to k-space also.

This document shows you how to get rage-roll up and running on your computer using localhost.

**SECURITY** This repository is set to private because of passwords and api keys, etc. Let's not anger the github security gods/ bots by leaking those!!

# Environments

Currently it is only possible to run rage-roll locally or in full production mode. The live version is here. [link] (https://rage-roll.herokuapp.com/) This set up is fine for now, but in the future it would be ideal to set up a production site as well, to test how changes implemented locally actually work in heroku. Currently local and live codebases both work as there are if statements in place to check whether the environment is local or on heroku - (this only affects how the database client works though, for the most part).

localhost (http://localhost:3000)

# Localhostin'

Ensure that you have git installed (or the git command line on windows) and install node package manager

[link](https://phoenixnap.com/kb/install-node-js-npm-on-windows)

clone the repo:

```
git clone https://github.com/EFawke/rage-roll.git
cd rage-roll
```

# installing dependencies

```
cd rage-roll
npm install --save

```

**NOTE**

npm install --save will install and save all dependencies when you run it in a directory with a package.json file.
You may have to run it separately in the frontend directory (cd rage-roll/frontend) and the backend directory (cd rage-roll/backend) as well as the root directory.
This is because React and Nodejs (the backend and frontend) both have different dependencies.

# saving changes

From inside /rage-roll run

```
git add .
git commit -m "message"
git push origin main
```

You might not be able to push to heroku as it requires a login but the command to do that is

```
git push heroku main
```

# running the app locally
the command to run the website locally from the root directory is.
```
npm run dev
```

# pg
Running postgresql locally means installing a local database (note, this is separate from the live database because localhost doesn't accept SSL).
If you're getting errors related to the database after installing all of the package.json files, then you may want to read this:
[link](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database)

# Heroku

It might also be useful to read the Heroku docs
[link](https://devcenter.heroku.com/articles/getting-started-with-nodejs)# evesubsystemanalysis
