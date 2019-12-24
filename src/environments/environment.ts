// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SERVER_URL_GET: 'https://localhost:8443/get',
  SERVER_URL_PUT: 'https://localhost:8443/put',
  apiUrl: 'https://localhost:443'
  /*SERVER_URL_GET: 'https://dev.api.part4.info:8443/get',
  SERVER_URL_PUT: 'https://dev.api.part4.info:8443/put'*/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
