import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { userData: null };
  }

  loadUserData() {
    this.setState({userData: null});
    this.fetchID = fetchUserData(this.props.username, (userData) => {
  this.setState({ userData });
});
  }

  componentDidMount() {
    this.loadUserData();
  }
  componentWillUnmount() {
    cancelFetch(this.fetchID)
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      cancelFetch(this.fetchID);
      this.loadUserData();
    }
  }

  render() {
    const isLoading = this.state.userData === null ? true : false;
    const name = isLoading ? 'Loading...' : this.state.userData.name;
    const bio = isLoading ? 'Loading...' : this.state.userData.bio;
    const friends = isLoading ? [] : this.state.userData.friends;

    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }
