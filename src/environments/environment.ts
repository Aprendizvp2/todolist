// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBhfERhlTWHFcBbgEWRTwds6KSxcwRD5LE",
    authDomain: "todolist-9008a.firebaseapp.com",
    projectId: "todolist-9008a",
    storageBucket: "todolist-9008a.appspot.com",  // Nota: corrige esto (te faltó el .appspot.com completo)
    messagingSenderId: "114487405348",
    appId: "1:114487405348:web:b7f47d3ea7938c57b561b1",
    measurementId: "G-7M1DM5KYKD"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
