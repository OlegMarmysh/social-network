import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {sendMessage} from "../../redux/dialogsPageReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newTextMessage: state.dialogsPage.newTextMessage,
    }
};

export default compose(connect(mapStateToProps, {sendMessage}),
    withAuthRedirect)
(Dialogs);