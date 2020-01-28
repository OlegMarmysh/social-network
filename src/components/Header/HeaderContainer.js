import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserProfile, logout} from "../../redux/authReducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserProfile(this.props.userId)
    }

    render() {
        return (
            <div>
                <Header {...this.props}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        profile: state.auth.profile,
        login: state.auth.login,
        isAuth: state.auth.isAuth
    }

};

export default connect(mapStateToProps, {logout, getAuthUserProfile})(HeaderContainer);