import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getDialogs, getMessages, sendMessage, setCurrentDialog} from "../../redux/dialogsPageReducer";
import {withRouter} from "react-router-dom";

class DialogsContainer extends React.Component {
    componentDidMount() {
        this.props.getDialogs();
        this.props.getMessages(this.props.match.params.userId);
        this.props.setCurrentDialog(this.props.match.params.userId)
    }

    render(){
        return (
            <Dialogs {...this.props}/>
        )
    }

}

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        selectedDialogId: state.dialogsPage.selectedDialogId
    }
};

export default compose(connect(mapStateToProps, {getDialogs, getMessages, sendMessage, setCurrentDialog}),
    withRouter,
    withAuthRedirect)
(DialogsContainer);