import React from 'react';
import {connect} from "react-redux";
import {follow, requestUsers, unFollow} from "../../redux/usersPageReducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching, getPortionSize,
    getSizePage,
    getTotalCountUsers, getUsers
} from "../../redux/usersSelectors";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.sizePage)
    }

    onSetPages = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.sizePage)
    };

    render() {
        return (
            <>
                <div>{this.props.isFetching ? <Preloader/> : null} </div>
                <div>
                    <Users totalCountItems={this.props.totalCountItems}
                           portionSize={this.props.portionSize}
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
        users: getUsers(state),
        totalCountItems: getTotalCountUsers(state),
        sizePage: getSizePage(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
};

export default compose(connect(mapStateToProps, {
        follow,
        unFollow,
        requestUsers
    }),
    withAuthRedirect)
(UsersContainer);