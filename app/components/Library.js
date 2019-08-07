// @flow
import React, { Component } from 'react';
import { remote } from 'electron';
import fs from 'fs';
import * as mm from 'music-metadata';
import styles from './Library.css';

type Props = {
  library: object[],
  addToLib: () => []
};

export default class Library extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { app } = remote;
    // const musicPath = `${app.getPath('music')}/iTunes/iTunes Media/Music`;
    const musicPath = `${app.getPath('downloads')}/_MUSIC/`;
    this.parseFolders(musicPath);
  }

  parseFile = path => {
    const { addToLib } = this.props;
    mm.parseFile(path)
      .then(metadata => {
        const { album, artist, picture, title } = metadata.common;
        return addToLib({ album, artist, picture, title });
      })
      .catch(error => {
        console.log(error);
      });
  };

  parseFolders = path => {
    try {
      fs.readdir(path, 'utf-8', (err, files) => {
        if (err) {
          if (String(err).match(/Error: ENOTDIR: not a directory/)) {
            // if (path.match(/\.aac|\.aif|\.mp3|\.wav/)) {
            if (path.match(/\.mp3/)) {
              this.parseFile(path);
            }
          }
        } else {
          files.forEach(file => {
            // recursively parse nested folders
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

  renderTracks() {
    const { library } = this.props;
    return library.map(track => {
      // Ref: https://gist.github.com/candycode/f18ae1767b2b0aba568e
      let imageUrl;
      if (track.picture) {
        const arrayBufferView = new Uint8Array(track.picture[0].data);
        const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
        const urlCreator = window.URL || window.webkitURL;
        imageUrl = urlCreator.createObjectURL(blob);
      }
      return (
        <li>
          {track.picture && (
            <img
              alt={`${track.artist} ${track.album}`}
              className={styles.albumImage}
              src={imageUrl}
            />
          )}
          {track.artist} - {track.title}
        </li>
      );
    });
  }

  render() {
    return (
      <ul>
        {/* <div onClick={this.openDialog}>Choose Music Folder</div> */}
        {/* <Link to={routes.COUNTER}>to Counter</Link> */}
        {this.renderTracks()}
      </ul>
    );
  }
}
