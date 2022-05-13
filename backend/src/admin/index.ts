import { Novelty } from "../api/novelties/dao"
import { User } from "../api/users/dao"

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')

AdminJS.registerAdapter(AdminJSMongoose)

const adminJsOptions = {
    resources: [User, Novelty],
    databases: [],
    rootPath: '/admin',
  }

const adminJs = new AdminJS(adminJsOptions)

const adminRouter = AdminJSExpress.buildRouter(adminJs)

export {
  adminRouter,
  adminJs,
};