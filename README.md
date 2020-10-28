### Login App Launch Example

App's on the same runtime use the same cookie / session store by default. This example launches a login page application `app.login.json`. "login" by entering a username and pressing the "login" button. No matter what you enter a cookie will be set by the server and another application will launch. If you enter a username that includes `@openfin.co` the "premium" app `app.premium.json` will launch.

#### Assumptions

- all apps (`app.login.json`, `app.lite.json`, `app.premium.json` are on the same runtime (and security realm if applicable)
- the manifests aren't behind authentication (i.e. cookies/sessions won't be present on the request for the manifest itself because it's being made by the RVM)

#### How to use

- clone the repository: `git clone https://github.com/connormccafferty/apps-sharing-cookies.git`
- install dependancies: `cd apps-sharing-cookies` && `npm i`
- start the server / launch openfin: `npm start`
