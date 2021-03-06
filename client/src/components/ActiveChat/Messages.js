import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { updateLastRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const Messages = (props) => {
  const { messages, otherUser, otherUserLastMessageId, totalUnRead, lastRead } = props.conversation;
  const { userId } = props

  useEffect(() => {
    if (totalUnRead > 0) {
      props.updateLastRead({
        userId,
        recipientId: otherUser.id,
        lastRead: otherUserLastMessageId,
        conversationId: props.conversation.id,
      })
    }
  })

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble key={message.id} id={message.id} text={message.text} time={time} otherUser={otherUser} lastRead={lastRead} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLastRead: (updateData) => {
      dispatch(updateLastRead(updateData))
    }
  };
};

export default connect(null, mapDispatchToProps)(Messages)
