import { Dropbox, DropboxTeam } from "dropbox";
import { dBox } from './ConfigSettings';

export class DropboxCripto {
    dropbox;
    constructor() {
        this.dropbox = new Dropbox({ accessToken: dBox.key});
        this.dropbox.setClientId('zn0kbmrq6ed8rme');
        
        // this.dropbox.usersGetCurrentAccount()
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });
        console.log(this.dropbox.getAuthenticationUrl('/'));
        

    }

    getFileListForlder(){
        this.dropbox.filesListFolder({ path: '' })
        .then(function (response) {
          
          this.dropbox.filesGetTemporaryLink({ path: response.entries[0].path_display}).then(resp => {
            console.log(resp)
          })
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
}