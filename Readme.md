# allNews
## Functionality
- Login
- See all published news
- Manage published status (only by author)

#### Todo
- Register (currently it can be only made by admin panel or code)
- Create news from the app (it can be only made by admin panel at the moment)


#### Tecnologies used
Backend -> Nodejs + Typescript + Mongoose
Frontend -> React 18 + librabries
Database -> MongoDB


#### Crentials
They are commited in .env file (NOT RECOMMENDED!) for this case

### First of all -> Install NPM Deps

```bash
npm i && npm i -w backend && npm i -w frontend
```

### Run project
**Backend**
```bash
npm run back:dev
```
**Frontend**
```bash
npm run front:dev
```
**Both**
```bash
npm run dev
```

### Run project
**Urls**
API
> http://localhost:4000/api

ADMINPANEL (Not credentials required)
(just for admin data as superuser)

> http://localhost:4000/admin

WEBAPP (Not credentials required)
(just for admin data as superuser)

> http://localhost:3000
