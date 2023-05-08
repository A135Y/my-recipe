
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { User } from '../models/user.js';
import config from './config.js';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload._id);
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                console.error(error);
                return done(error, false);
            }
        }
    )
);

export default passport;
