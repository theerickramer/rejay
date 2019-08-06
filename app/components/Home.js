// @flow
import React, { Component } from 'react';
import { remote } from 'electron';
import fs from 'fs';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { app } = remote;
    const musicPath = `${app.getPath('music')}/iTunes/iTunes Media/Music`;
    this.parseFolders(musicPath);
  }

  fileDetail = path => {
    console.log(`FILE: ${path}`);
  };

  parseFolders = path => {
    try {
      fs.readdir(path, 'utf-8', (err, files) => {
        if (err) {
          if (String(err).match(/Error: ENOTDIR: not a directory/)) {
            if (path.match(/\.aac|\.aif|\.mp3|\.wav/)) {
              this.fileDetail(path);
            }
          }
        } else {
          files.forEach(file => {
            this.parseFolders(`${path}/${file}`);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  openDialog = () => {
    const { dialog } = remote;
    dialog.showOpenDialog(
      {
        properties: ['openFile', 'openDirectory', 'multiSelections']
      },
      files => console.log(files)
    );
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        {/* <div onClick={this.openDialog}>Choose Music Folder</div> */}
        {/* <Link to={routes.COUNTER}>to Counter</Link> */}
      </div>
    );
  }
}
