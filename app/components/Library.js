// @flow
import React, { Component } from 'react';
import { remote } from 'electron';
import fs from 'fs';

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
    const musicPath = `${app.getPath('downloads')}/_MUSIC`;
    this.parseFolders(musicPath);
  }

  parseFolders = path => {
    try {
      fs.readdir(path, 'utf-8', (err, files) => {
        if (err) {
          if (String(err).match(/Error: ENOTDIR: not a directory/)) {
            if (path.match(/\.aac|\.aif|\.mp3|\.wav/)) {
              const { addToLib } = this.props;
              addToLib({ path });
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
    const { library } = this.props;
    return (
      <ul>
        {/* <div onClick={this.openDialog}>Choose Music Folder</div> */}
        {/* <Link to={routes.COUNTER}>to Counter</Link> */}
        {library.map(track => (
          <li>{track.path}</li>
        ))}
      </ul>
    );
  }
}
