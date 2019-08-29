# Setup

## Install nodeModules for BE and FE
```
 ~/Cloverhound/dcss-calendar yarn

Cloverhound/dcss-calendar/client_src yarn
```

## To Run
Open two terminal windows/tabs

1)
```
Cloverhound/dcss-calendar/client_src npm start
Or Cloverhound/dcss-calendar/node_modules/.bin/webpack
```
2)
```
~/Cloverhound/dcss-calendar npm start
```

## Azure Server
Inside .env are login/pass

https://portal.azure.com/

1) dcss-calendar-demo (database) = Heroku 
2) dcss-calendar (database) = Local Development


## Example SQL Query
```
UPDATE [dcss_calendar].[dbo].[Queue]
SET [ewt] = 901
```

## Update Notes

```
// When there are front end / react changes
// inside client_src folder
npm run webpack

// Backend changes
// remove daemon folder
// sometimes need to restart windows server to take effect
rm -rf daemon
node /server/node-windows-install.js
```

## Changelog

8/29/19 - Updated both West/East servers with DC-106-status-ewt-force-closed. Copied all files from github to East/West servers after stopping each service on their server. Since there was both front end and backend changes, I ran webpack to bundle assets and deleted daemon folder to run node-windows-install folder. Updated the database with a new EWT column by using Loopbacks autoUpdate method. Ran a SQL Query to default EWT column to 901. For servers to take new changes, a restart of both was needed.