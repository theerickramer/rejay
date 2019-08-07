// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
import styles from './Home.css';
import Library from '../containers/LibraryContainer';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <Library />
        {/* <div onClick={this.openDialog}>Choose Music Folder</div> */}
        {/* <Link to={routes.COUNTER}>to Counter</Link> */}
      </div>
    );
  }
}
