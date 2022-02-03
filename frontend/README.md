# React + Redux App

## React + Redux codebase containing (CRUD, auth)

To get the frontend running:

- `npm install` to install all dependencies
- `npm start` to start the local server (this project uses create-react-app)
 
Add `.env` file in the root folder of project to set environment variables (use PORT to change webserver's port). This file will be ignored by git, so it is suitable for API keys and other sensitive stuff. Refer to [dotenv](https://github.com/motdotla/dotenv) and [React](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md) documentation for more details. Also, please remove setting variable via script section of `package.json` - `dotenv` never override variables if they are already set.  

### Making requests to the backend API

If you want to change the API URL to a local server, start/build the app with the REACT_APP_BACKEND_URL environment variable pointing to the local server's URL (i.e. `REACT_APP_BACKEND_URL="http://localhost:3000/api" npm run build`)


## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Commune". It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users


- Home page (URL: /#/ )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/@username, /#/@username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorite articles
    
Run cypress E2E Tests:
```shell
npx cypress run
```