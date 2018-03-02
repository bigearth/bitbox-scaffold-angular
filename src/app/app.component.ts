import { Component } from '@angular/core';
import BITBOXCli = require("bitbox-cli/lib/bitboxcli");

let BITBOX = new BITBOXCli.default({
  protocol: 'http',
  host: '127.0.0.1',
  port: 8332,
  username: '',
  password: ''
});

@Component({
  selector: 'bitbox',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version;
  protocolversion;
  walletversion;
  balance;
  blocks;
  timeoffset;
  connections;
  proxy;
  difficulty;
  testnet;
  keypoololdest;
  keypoolsize;
  paytxfee;
  relayfee;
  errors;
  constructor(){

    BITBOX.getinfo()
    .then((result) => {
      this.version = result.version;
      this.protocolversion = result.protocolversion,
      this.walletversion = result.walletversion,
      this.balance = result.balance,
      this.blocks = result.blocks,
      this.timeoffset = result.timeoffset,
      this.connections = result.connections,
      this.proxy = result.proxy,
      this.difficulty = result.difficulty,
      this.testnet = result.testnet,
      this.keypoololdest = result.keypoololdest,
      this.keypoolsize = result.keypoolsize,
      this.paytxfee = result.paytxfee,
      this.relayfee = result.relayfee,
      this.errors = result.errors
    }, (err) => { console.log(err);
    });
  }
}
