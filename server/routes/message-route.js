const express = require('express');
const db = require('../../database-mysql/db-helpers');

const router = express.Router();

/**
 * This route gets the main user and accompanied users
 */
router.get('/:userAid,:userBid', (req, res) => {
  // res.send('GET handler for /api/message route.');
  const { userAid, userBid } = req.params;
  db.getConversation(userAid, userBid).then((results) => {
    res.send(results);
  }).catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
});

/**
 * This route gets an user and gets their inbox messages
 */
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  db.getInbox(userId).then((results) => {
    res.send(results);
  }).catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  // res.send('POST handler for /api/message route.');
  const message = req.body;
  db.saveMessage(message)
    .then((msg) => {
      res.send(msg);
    }).catch((error) => {
      res.send(error);
    });
});

module.exports = router;
