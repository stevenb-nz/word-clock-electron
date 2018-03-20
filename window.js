$(() => {
  var canvas = document.querySelector('canvas')

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext("2d");
  var on = true;

  c.font = "24px System";

  var d = new Date();
  var c_hour = d.getHours() % 12;
  var c_5min = Math.floor(d.getMinutes()/5)*5;
  window.setInterval(function() {
    d = new Date();
    if (c_hour !== d.getHours() % 12) {
      c_hour = d.getHours() % 12;
    }
    if (c_5min !== Math.floor(d.getMinutes()/5)*5) {
      c_5min = Math.floor(d.getMinutes()/5)*5;
    }
    on = !on;
    if (on) {
      c.fillStyle = "#FF0000";
    } else {
      c.fillStyle = "#FF9999";
    }
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText(c_hour+' '+c_5min, 40, 40);
  }, 500);
})
