import React, { Component } from "react";
import { Box, Badge } from "@material-ui/core";

import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
};

const Chat = (props) => {
  const { classes, conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (username) => {
    await props.setActiveChat(username);
  };


  return (
    <Box
      onClick={() => handleClick(otherUser.username)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
        
      <Badge badgeContent={conversation.totalUnRead} color="primary" />
          
    </Box>
  );

}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
