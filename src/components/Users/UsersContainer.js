import React from 'react';
import {connect} from "react-redux";
import {follow, getUsers, unFollow} from "../../redux/usersPageReducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.sizePage)
    }

    onSetPages = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.sizePage)
    };

    render() {
        return (
            <>
                <div>{this.props.isFetching ? <Preloader/> : null} </div>
                <div>
                    <Users totalCountUsers={this.props.totalCountUsers}
                           sizePage={this.props.sizePage}
                           currentPage={this.props.currentPage}
                           onSetPages={this.onSetPages}
                           users={this.props.users}
                           unFollow={this.props.unFollow}
                           follow={this.props.follow}
                           followingInProgress={this.props.followingInProgress}
                    />
                </div>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        totalCountUsers: state.users.totalCountUsers,
        sizePage: state.users.sizePage,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress: state.users.followingInProgress
    }
};

export default connect(mapStateToProps, {
    follow,
    unFollow,
    getUsers
})(UsersContainer);