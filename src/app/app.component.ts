import { Component } from '@angular/core';
import BITBOXCli = require("bitbox-cli/lib/bitboxcli");

let BITBOX = new BITBOXCli.default({
  protocol: 'http',
  host: '127.0.0.1',
  port: 8332,
  username: '',
  password: '',
  corsproxy: false
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
let mnemonic = BITBOX.Mnemonic.generate(256, BITBOX.Mnemonic.wordLists()[lang]);

// mnemonic to BIP32 root seed encoded as buffer
let rootSeed = BITBOX.Mnemonic.toSeed(mnemonic);

// root seed to BIP32 master HD Node
let masterHDNode = BITBOX.HDNode.fromSeed(rootSeed);

// derive BIP 44 external receive address
let childNode = BITBOX.HDNode.derivePath(masterHDNode, "m/44'/145'/0'/0/0");

// instance of transaction builder
let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');

// keypair of BIP44 receive address
let keyPair = BITBOX.HDNode.toKeyPair(childNode);

// txid of utxo
let txid = '362a884ac1e901255bce551664f1d3eaa7c78226c5ff79f3fc2587259ce262e0';

// subtract fee from original amount
let originalAmount = 5084;

// add input txid, vin 1 and keypair
transactionBuilder.addInput(txid, 0);

// calculate fee @ 1 sat/B
let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });

let sendAmount = originalAmount - byteCount;

// add receive address and send amount
transactionBuilder.addOutput('bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw', sendAmount);

// sign tx
let redeemScript;
transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);

// build it and raw hex
let tx = transactionBuilder.build();
let hex = tx.toHex();

// sendRawTransaction to running BCH
BITBOX.RawTransactions.sendRawTransaction(hex).then((result) => { console.log(result); }, (err) => { console.log(err); });

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
