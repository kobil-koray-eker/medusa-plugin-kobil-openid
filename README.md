# Configuration

In order to be able to use the **kobil-openid** authentication provider, you have to add the configuration to your newly added plugins in **Medusajs**. To do so here are the steps

<br/>

**1.** Configure your developer console
<br/>
**2.** Go to your `medusa-config.js`
<br/>
**3.** Check that the variables are set with the appropriate values

<br/>

```js
const BACKEND_URL = process.env.BACKEND_URL || "localhost:9000";
const ADMIN_URL = process.env.ADMIN_URL || "localhost:7000";
const STORE_URL = process.env.STORE_URL || "localhost:8000";

const KOBIL_CLIENT_ID = process.env.CLIENT_ID;
const KOBIL_CLIENT_SECRET = process.env.CLIENT_SECRET;
const KOBIL_AUTH_URL = process.env.KOBIL_AUTH_URL;
const KOBIL_TOKEN_URL = process.env.KOBIL_TOKEN_URL;
```

<br/>

Then in your plugins collections, if you did not already inserted the `plugin`, add the following otherwise, you can just add the `kobil` options to your auth plugin options

<br/>

```js
  {
    resolve: "medusa-plugin-kobil-openid",
    options: {
      kobil: {
        clientID: KOBIL_CLIENT_ID,
        clientSecret: KOBIL_CLIENT_SECRET,
        authorizationURL: KOBIL_AUTH_URL,
        tokenURL: KOBIL_TOKEN_URL,

        admin: {
          callbackUrl: `${DATABASE_URL}/admin/auth/kobil/cb`,
          failureRedirect: `${STORE_CORS}/app`,

          // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
          // This query param will have the priority over this configuration
          // successRedirect: `${ADMIN_URL}/`,
          successRedirect: `${STORE_CORS}`,

          // authPath: '/admin/auth/google',
          // authCallbackPath: '/admin/auth/google/cb',
          // expiresIn: 24 * 60 * 60 * 1000,
          // verifyCallback: (container, req, accessToken, refreshToken, profile) => {
          //    // implement your custom verify callback here if you need it
          // }
        },

        store: {
          callbackUrl: `${DATABASE_URL}/store/auth/kobil/cb`,
          failureRedirect: `${STORE_CORS}/account/login`,

          // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
          // This query param will have the priority over this configuration
          successRedirect: `${STORE_CORS}`,

          // authPath: '/store/auth/google',
          // authCallbackPath: '/store/auth/google/cb',
          // expiresIn: 24 * 60 * 60 * 1000,
          // verifyCallback: (container, req, accessToken, refreshToken, profile) => {
          //    // implement your custom verify callback here if you need it
          // }
        },
      },
    },
  },
```

<br/>

The options that are commented are `optional` and the value that you see are the default values
