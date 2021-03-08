const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  const userId = res.locals.userId;
  res.cookie('ssid', userId, { httpOnly: false });
  
  return next();
  
}


module.exports = cookieController