'use strict';

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win = null

app.once('ready', () => {
  win = new BrowserWindow({
    width: 550,
    height: 242,
    show: false
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.once('ready-to-show', () => {
    win.show()
  })
})
