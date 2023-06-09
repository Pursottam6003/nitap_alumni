const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = 'secret'

const { userAuthExpire, driverAuthExpire } = require('../config/config');
const dbo = require('../db/conn');


const getDbCollection = (collection, cb) => {
  cb(dbo.getDb().collection(collection));
}

 


// const findUserByToken = (userLoginCollection, token, cb) => {
//   if (!token) return cb(null, null);
//   jwt.verify(token, SECRET, (err, decode) => {
//     if (!decode) return cb(null, null);
//     getDbCollection(userLoginCollection, users => {
//       users.findOne({ userId: decode.id, token: token })
//       .then(user => cb(null, user))
//       .catch(err => cb(err));
//     })
//   })
// }

/**
 * insert new user if email does not exist
 * @param {import('mongodb').Collection} collection MongoDB Collection  
 * @param {Object} newUser User object
 * @param {Response} res Response to client
 **/


// const registerNewUser = (collection, newUser, res) => collection.findOne({ email: newUser.email })
//   .then(result => {
//     if (result) return res.status(400).json({ auth: false, message: 'Email exists' })

//     bcrypt.hash(newUser.password, 10).then(hashedPassword => {
//       const hashedUser = {
//         name: newUser.name,
//         email: newUser.email,
//         password: hashedPassword,
//       }

//       if (newUser.vehicleId) hashedUser['vehicleId'] = newUser.vehicleId;

//       console.log(hashedUser)

//       collection.insertOne(hashedUser).then(result => {
//         console.log(`New user signed up: ${result.insertedId}`);

//         // if user is a driver
//         if (newUser.vehicleId) {
//           res.status(200).json({
//             success: true,
//             user: {
//               userId: result.insertedId,
//               vehicleId: newUser.vehicleId,
//               name: newUser.name,
//               email: newUser.email,
//               password: newUser.password,
//           }
//           });
//         } else {
//           res.status(200).json({
//             success: true,
//             user: {
//               userId: result.insertedId
//             }
//           });
//         }
//       })
//         .catch(err => {
//           throw err
//         })
//     })
//   })

// /**
//  * Geneerate JWT token and sign in user
//  * @param {string} userLoginCollection User login collection name
//  * @param {import('mongodb').Document} user
//  * @param {Response} res
//  */
// const generateToken = (userLoginCollection, user, res) => {
//   const expiresInMin = userLoginCollection === 'logged_in_users' 
//                         ? userAuthExpire : driverAuthExpire;
//   const userId = user._id.toHexString()
//   const token = jwt.sign({ id: userId }, SECRET, { expiresIn: 60 * expiresInMin });

//   let query = { userId: user._id.toHexString() };
//   let newValues = {$set: {
//     createdAt: new Date(),
//     userId: userId,
//     token: token
//   }}

//   getDbCollection(userLoginCollection, loggedIn => {

//     loggedIn.updateOne(query, newValues, {upsert: true})
//     .then(result => {

//       if (userLoginCollection === 'logged_in_drivers') {
//         getDbCollection('vehicles', vehicles => {
//           vehicles.findOne({_id: ObjectId(user.vehicleId)})
//           .then(result => {
//             const vehicle = {
//               vehicleNo: result.vehicleNo,
//               vehicleName: result.vehicleName,
//             }
//             return res.cookie('auth', token, { maxAge: expiresInMin * 60 * 1000 }).json({
//               isAuth: true, id: user._id, email: user.email, name: user.name,
//               vehicleId: user.vehicleId, vehicle: vehicle
//             });
//           })
//         })
//       } else {
//         return res.cookie('auth', token, { maxAge: expiresInMin * 60 * 1000 }).json({
//           isAuth: true, id: user._id, email: user.email, name: user.name
//         });
//       }
//       console.log(result);
//     }).catch(err => {throw err});
//   })
// }

//  */