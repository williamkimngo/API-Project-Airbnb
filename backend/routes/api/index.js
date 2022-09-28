const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spot.js');
const reviewsRouter = require('./review.js')
const bookingsRouter = require('./booking.js')
const { requireAuth } = require('../../utils/auth.js');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter)

router.use('/reviews', reviewsRouter)

router.use('/bookings', bookingsRouter)

// router.use('/spots', spotsRouter)

router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});


const { restoreUser } = require('../../utils/auth.js');

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.use(restoreUser);


router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);




module.exports = router;
