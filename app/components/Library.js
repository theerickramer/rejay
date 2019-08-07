// @flow
import React, { Component } from 'react';
import { remote } from 'electron';
import fs from 'fs';
import * as mm from 'music-metadata';

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

  render() {
    const { library } = this.props;
    return (
      <ul>
        {/* <div onClick={this.openDialog}>Choose Music Folder</div> */}
        {/* <Link to={routes.COUNTER}>to Counter</Link> */}
        {library.map(track => (
          <li>
            {track.artist} - {track.title}
          </li>
        ))}
      </ul>
    );
  }
}
