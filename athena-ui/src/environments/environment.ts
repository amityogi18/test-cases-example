// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  environmentName: 'Dev',
  domain: '.client1.com',
  appUrl: 'http://prod.athena-ust.com',
  apiUrl: 'http://prod.athena-ust.com',
  errorPageUrl: 'http://prod.athena-ust.com',
  apiTokenUrl: 'http://prod.athena-ust.com/token'
};
