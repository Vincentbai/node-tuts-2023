const User = require('../model/User')
const handleLogout = async (req, res) =>{

  // on client, also delete the accessToken in the memory

  const cookies = req.cookies

  if(!cookies?.jwt) return res.sendStatus(204) // no content

  const refreshToken = cookies.jwt

  // is refreshToken in DB?
  const foundUser = await User.findOne({refreshToken}).exec()

  if(!foundUser) {
    
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    })

    return res.sendStatus(204) // on content 

  } 

  // delete the refreshToken in db
  foundUser.refreshToken = ''
  const result = await foundUser.save()
  console.log("🚀 ~ file: logout.controller.js:34 ~ handleLogout ~ result:", result)

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  })

  res.sendStatus(204)

}

module.exports={
  handleLogout
}
