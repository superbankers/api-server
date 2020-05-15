import { UserProfiles, userYupSchema } from '../models/authentication'
import { ErrorHandler } from '../common/helpers/error-handling'
import sha256 from 'sha256'

// =====================================
// USER PROFILE
// =====================================

const HashedPassword = (password) => sha256(process.env.SALT + password);


export const checkPassword = (id, password) => new Promise(async(resolve, reject) => {
  try {
    const user = await UserProfiles.findById(id);
    const userReturn = { ...user._doc, password: undefined }
    if (HashedPassword(password) === user.password) resolve(userReturn)
    reject({ err: 'Invalid User and Password' })
  } catch (err) {
    reject({ err: 'Database Access Error' })
  }
})

// GET
// =====================================
export const login = async (req, res) => {
  try {
    const { id, password } = req.params
    const user = await checkPassword(id, password)
    res.status(200).end(JSON.stringify(user))
  } catch (err) {
    ErrorHandler(err, res)
  }
}

// POST
// =====================================

export const createNewUser = async (req, res) => {
  try {
    const userObject = {
      ...req.body,
      password: HashedPassword(req.body.password),
      createdAt: new Date().getTime(),
      companyName: req.body.companyName ? req.body.companyName : '',
      flags: {
        emailVerified: false
      }
    }
    const returnValue = await userYupSchema.validate(userObject)
    // SAVE USER
    let Newuser = new UserProfiles(returnValue);
    const data = await Newuser.save()
    res.status(200).end(JSON.stringify(data))
  } catch (err) {
    ErrorHandler(err, res)
  }
}

export default {}
