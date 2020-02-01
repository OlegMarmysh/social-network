import React from 'react';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {init, update, sendMessage} from "../../redux/dialogsPageReducer";
import {withRouter} from "react-router-dom";

class DialogsContainer extends React.Component {
    componentDidMount() {
        this.props.init(this.props.match.params.userId)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.props.update(this.props.match.params.userId)
        }
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

export default compose(connect(mapStateToProps, {init, update, sendMessage}),
    withRouter,
    withAuthRedirect)
(DialogsContainer);