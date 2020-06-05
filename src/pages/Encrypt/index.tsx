import React, { Component } from 'react';
import { createDiffieHellman } from 'diffie-hellman';
import CryptoJS from 'crypto-js';
import { decToHex, hexToDec } from './hex2dec';

import './encrypt.scss';

interface State {
  p: string;
  g: string;
  serverPubKey: string;
  encryptedString: string;
  decryptedString: string;
  encryptKey: string;
}

let encryptIV = CryptoJS.enc.Utf8.parse('A-16-Byte-String');

export default class Encrypt extends Component {
  state: State = this.getInitState();

  encryptKey: string = '';

  getInitState(): State {
    return {
      p: localStorage.getItem('p') || '',
      g: localStorage.getItem('g') || '',
      serverPubKey: localStorage.getItem('serverPubKey') || '',
      encryptedString: localStorage.getItem('encryptedString') || '',
      decryptedString: '',
      encryptKey: localStorage.getItem('encryptKey') || ''
    };
  }

  encrypt = () => {
    if (!this.encryptKey) {
      this.generateEncryptKey();
    }
    let srcs = CryptoJS.enc.Utf8.parse('hello world');
    let encrypted = CryptoJS.AES.encrypt(srcs, this.encryptKey, {
      iv: encryptIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    // @ts-ignore
    console.log(encrypted.ciphertext.toString(CryptoJS.enc.Base64));
    // @ts-ignore
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  decrypt = () => {
    if (!this.encryptKey) {
      this.generateEncryptKey();
    }
    const { encryptedString } = this.state;
    let decrypt = CryptoJS.AES.decrypt(encryptedString, this.encryptKey, {
      iv: encryptIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    this.setState({
      decryptedString: decryptedStr.toString(),
    });
  };

  generateEncryptKey() {
    const { p, g, serverPubKey, encryptKey } = this.state;
    if (encryptKey) {
      this.encryptKey = CryptoJS.enc.Utf8.parse(encryptKey);
      return;
    }
    if (p && g && serverPubKey) {
      let DH = createDiffieHellman(
        decToHex(p, { prefix: false }) as string,
        'hex',
        decToHex(g, { prefix: false }) as string,
        'hex'
      );
      DH.generateKeys();
      let deServerKey = Buffer.from(serverPubKey, 'base64').toString();
      // @ts-ignore
      let originKey = DH.computeSecret(deServerKey);
      let tmp: string = hexToDec(originKey.toString('hex'))?.slice(0, 32) || '';
      this.encryptKey = CryptoJS.enc.Utf8.parse(tmp);
    }
  }

  render() {
    let { p, g, serverPubKey, encryptedString, decryptedString, encryptKey } = this.state;
    return (
      <div className="encrypt-wrap">
        <h3>AES解密</h3>
        {/* <div className="row">
          <label htmlFor="">P:</label>
          <input
            type="text"
            value={p}
            onChange={(e) => {
              let p = e.target.value;
              localStorage.setItem('p', p);
              this.setState({
                p,
              });
            }}
          />
        </div>
        <div className="row">
          <label htmlFor="">G:</label>
          <input
            type="text"
            value={g}
            onChange={(e) => {
              let g = e.target.value;
              localStorage.setItem('g', g);
              this.setState({
                g,
              });
            }}
          />
        </div>
        <div className="row">
          <label htmlFor="">server public key:</label>
          <input
            type="text"
            value={serverPubKey}
            onChange={(e) => {
              let serverPubKey = e.target.value;
              localStorage.setItem('serverPubKey', serverPubKey);
              this.setState({
                serverPubKey,
              });
            }}
          />
        </div> */}
        <div className="row">
          <label htmlFor="">待解密字符串:</label>
          <input
            type="text"
            value={encryptedString}
            onChange={(e) => {
              let encryptedString = e.target.value;
              localStorage.setItem('encryptedString', encryptedString);
              this.setState({
                encryptedString,
              });
            }}
          />
        </div>
        <div className="row">
          <label htmlFor="">AES密钥:</label>
          <input
            type="text"
            value={encryptKey}
            onChange={(e) => {
              let encryptKey = e.target.value;
              localStorage.setItem('encryptKey', encryptKey);
              this.setState({
                encryptKey,
              });
            }}
          />
        </div>
        <div className="row">
          <button onClick={() => this.decrypt()}>解密</button>
        </div>
        <div className="decrypt-value">{decryptedString}</div>
      </div>
    );
  }
}
