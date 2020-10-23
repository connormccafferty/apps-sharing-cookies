### Apps sharing a cookie

Example of apps sharing a cookie. First launch the `app.login.json` app, the `url` for both `app.json` and `app.alt.json` is `http://localhost:5555/` which will check for the cookie and redirect back to `login.html` if it's not present.

#### Assumptions

- apps are on the same runtime (and security realm if applicable)
- manifests aren't on protected routes (i.e. cookies/sessions won't be present on the request for the manifest itself because the RVM is making that request)

#### How to use

- clone the repository: `git clone https://github.com/connormccafferty/apps-sharing-cookies.git`
- install dependancies: `cd apps-sharing-cookies` && `npm i`
- start the server: `npm start`
- start the app: `npm run start:openfin`
