import express from 'express'
import { getAllUsers } from '../services/admin/getAllUsers.js'
import { checkUserPermissions } from '../middlewares/auth/OAuth/checkUserPermissions.js'
import validateUserId from '../middlewares/auth/validations/validateUserId.js'
import validateUserExistById from '../middlewares/auth/validations/validateUserExistById.js'
import runValidations from '../middlewares/common/validations/runValidations.js'
import { changeUserRole } from '../services/admin/changeUserRole.js'
import { getAllPendingTasks } from '../services/admin/getAllPendingTasks.js'
import { getAllTaskAppliedForAdmin } from '../services/admin/getAllTaskAppliedForAdmin.js'
const adminRouter = express.Router()

const runChangeUserRoleValidations = runValidations([
    validateUserId,
    validateUserExistById
])

const print = (req, res, next) => {
    console.log('en print')
    console.log(req.body)
    next()
}

adminRouter.use(checkUserPermissions({ role: 'admin' }))
adminRouter.post('/get-users', getAllUsers)
adminRouter.post('/get-pending-tasks', getAllPendingTasks)
adminRouter.patch('/change-user-role', runChangeUserRoleValidations, changeUserRole)
adminRouter.post('/get-all-tasks-applied', getAllTaskAppliedForAdmin)

export default adminRouter