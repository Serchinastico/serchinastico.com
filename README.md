# serchinastico.com

My personal webpage.

## Development

This webpage is built with the classic HTML + CSS + JS stack. To separate data from the final HTML, I use node to render [EJS](https://github.com/mde/ejs) templates into one big HTML. Because this is a personal project that will most likely be maintained by me and only me, I'm taking the liberty of some "magic" (like loading scripts and style files automatically in the HTML if they are inside some specific directories).

### Installing dependencies

`yarn install`

### Hot reload for development

`yarn start:dev`

### Compile EJS templates into HTML

`yarn build`
