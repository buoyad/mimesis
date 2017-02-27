# Mimesis

Mimesis is an application for creating and administering reading pools.

- **Reading pool** - A book club that may include a 
buy-in, which is forfeitted by anyone who fails to 
complete the book.

- - -

### Dev Instructions

Project developed via ng-cli.

```
npm install -g --save angular-cli
/* git clone etc. */
npm install
```
Then see issue [#149](https://github.com/vladotesanovic/ngSemantic/issues/149)
in the ngSemantic repo for a workaround for a common
ngcli issue when building projects with ngSemantic

To build: `ng build`

To serve locally: `ng serve`

To deploy: `scp -rp dist/* user@path_to_server:/var/www/mimesis.us/public_html`