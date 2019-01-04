import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <section className="user-authentication">
        <p>Current User: { this.props.user ? this.props.user.displayName : "Guest" }</p>
        <button id="sign-in" onClick={() => this.handleSignIn()}>Sign In</button>
        <button id="sign-out" onClick={ () => this.handleSignOut() }>Sign Out</button>
      </section>
    )
  }
}

export default User;
