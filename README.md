# Employee-api

## Built with Express + NextJS

### Project Folders

- Components contains reusable web components such as cards, buttons, etc
- Pages is used to serve various pages by NextJS. Each file represents a different url route. Subfolders will make a two level route
- Server contains the Express server and API routes
- Static is used by NextJS to serve static files at /static

### Configuration

- package.json requires `dev`, `build`, and `start` scripts
- next.config.js implements dotenv support
- nodemon.json configures nodemon and NextJS to work together, as well as installing `nodemon` as as dev dependency
- pages/_document.js and .babelrc enables use of the Styled Components library, along with installing `babel-plugin-styled-components` as a dev dependency
