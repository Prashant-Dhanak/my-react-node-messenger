const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");
// const { validator } = require("sequelize/types/lib/utils/validator-extras");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id", "lastRead"],
      order: [[Message, "id", "ASC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();
      let totalUnRead = 0
      let otherUserLastMessageId = 0
      const messages = conversations[i]['messages']
      const lastRead = conversations[i]['lastRead']

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }


      messages.forEach(message => {
        if (message.id > lastRead && message.senderId == convoJSON['otherUser']['id']) {
          otherUserLastMessageId > message.id ? null : otherUserLastMessageId = message.id;
          totalUnRead += 1;
        }
      });
      convoJSON.totalUnRead = totalUnRead
      convoJSON.otherUserLastMessageId = otherUserLastMessageId

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[convoJSON.messages.length - 1].text;
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.post("/updateLastRead", async (req, res, next) => {
  console.log(req.user.id)
  // Performs check that the request is validator, for security purpose.
  if (req.user.id === req.body.userId) {
    const update = Conversation.update(
      { lastRead: req.body.lastRead },
      { where: { id: req.body.conversationId } }
    )
    console.log("It was posted")
    res.json({})
  }
  else{
    res.json({"Error": "Forbidden"})
  }
})

module.exports = router;
