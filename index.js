/*jshint esversion: 6 */
const {
  app,
  Menu,
  MenuItem,
  Tray
} = require('electron');

const io = require("socket.io-client");

var socket = io.connect('http://192.168.1.15:1237');

function theme(name) {
  socket.emit('theme', name);
}


let tray = null;
app.on('ready', () => {
  tray = new Tray('icon.png');

  const contextMenu = new Menu();

  var themes = ['Lounge Bright', 'Lounge Dim', 'Lounge Lamp', 'Lounge Off', 0, 'Kitchen Bright', 'Kitchen Dim', 'Kitchen Off', 0, 'Bedroom Bright', 'Bedroom Dim', 'Bedroom Off', 0, 'Night'];

  for (var i in themes) {

    (function(i) {
      if (themes[i] === 0) {
        contextMenu.append(new MenuItem({
          type: 'separator'
        }));
      } else {
        contextMenu.append(new MenuItem({
          label: themes[i],
          click() {
            console.log(themes[i]);
            theme(themes[i]);
          }
        }));
      }
    }).call(this, i);
  }

  contextMenu.append(new MenuItem({
    type: 'separator'
  }));
  contextMenu.append(new MenuItem({
    role: 'quit'
  }));



  tray.setToolTip('Home Control');
  tray.setContextMenu(contextMenu);
  tray.on("click", function(data) {
    console.log(data);
  });
});
