import { Component } from '@angular/core';
import BITBOXCli = require("bitbox-cli/lib/bitboxcli");

let BITBOX = new BITBOXCli.default({
  protocol: 'http',
  host: '127.0.0.1',
  port: 8332,
  username: '',
  password: ''
});

let langs = [
  'english',
  'chinese_simplified',
  'chinese_traditional',
  'korean',
  'japanese',
  'french',
  'italian',
  'spanish'
];

let lang = langs[Math.floor(Math.random()*langs.length)];

// create 256 bit BIP39 mnemonic
let mnemonic = BITBOX.Mnemonic.generateMnemonic(256, BITBOX.Mnemonic.mnemonicWordLists()[lang]);

// mnemonic to BIP32 root seed encoded as buffer
let rootSeed = BITBOX.Mnemonic.mnemonicToSeed(mnemonic);

// root seed to BIP32 master HD Node
let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed);

// derive BIP 44 external receive address
let childNode = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'/0/0");

// instance of transaction builder
let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');

// keypair of BIP44 receive address
let keyPair = childNode.keyPair;

// txid of utxo
let txid = '5699610b1db28d77b1021ed457d5d9010900923143757bc8698083fa796b3307';

// subtract fee from original amount
let originalAmount = 3678031;

// add input txid, vin 1 and keypair
transactionBuilder.addInput(txid, 1, originalAmount);

// calculate fee @ 1 sat/B
let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });

let sendAmount = originalAmount - byteCount;

// add receive address and send amount
transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);

// sign tx
transactionBuilder.sign(0, keyPair);

// build it and raw hex
let tx = transactionBuilder.build();
let hex = tx.toHex();

@Component({
  selector: 'bitbox',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mnemonic;
  lang;
  hex;
  addresses = [];
  constructor(){
    this.mnemonic = mnemonic;
    this.lang = lang;
    this.hex = hex;
    for(let i = 0; i < 10; i++) {
      let childNode = masterHDNode.derivePath("m/44'/145'/0'/0/" + i);
      this.addresses.push("m/44'/145'/0'/0/" + i + ": " + BITBOX.HDNode.toCashAddress(childNode));
    }
  }
}
