/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/',
  Url: 'http://localhost:3000',
  usertoken: localStorage.getItem('auth_app_token'),
  userId: localStorage.getItem('userId'),
};