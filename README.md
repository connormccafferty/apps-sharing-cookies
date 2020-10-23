### Sharing cookies between Applications

App's on the same runtime use the same cookie / session store thus you get cookie sharing by default. In this example you can set a cookie with the `login` button, once "logged in" you'll notice when launching apps via `startFromManifest` they have the cookie - if not logged in the apps will open back at the `login.html` page.

#### Assumptions

- apps are on the same runtime (and security realm if applicable)
- manifests aren't on protected routes (i.e. cookies/sessions won't be present on the request for the manifest itself because the RVM is making that request)

#### How to use

- clone the repository: `git clone https://github.com/connormccafferty/apps-sharing-cookies.git`
- install dependancies: `cd apps-sharing-cookies` && `npm i`
- start the server: `npm start`
- start the app: `npm run start:openfin`
