import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import User from '../dbs/models/user'

passport.use(new LocalStrategy(async function(username, password, done) {
  User.findOne({ username }, function (err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, '用户不存在')
    }
    if (user.password !== password) {
      return done(null, false, '帐号/密码错误')
    }
    return done(null, user);
  });
}));

passport.serializeUser(function(user,done){
  done(null,user)
})

passport.deserializeUser(function(user,done){
  return done(null,user)
})

export default passport