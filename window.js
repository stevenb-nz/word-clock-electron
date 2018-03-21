$(() => {
  function extract_hour (d) {
    return d.getHours() % 12;
  }
  function extract_5min (d) {
    return Math.floor(d.getMinutes()/5)*5;
  }

  var canvas = document.querySelector('canvas')

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext("2d");
  var on = true;

  c.font = "24px System";

  var d = new Date();
  var c_hour = extract_hour(d);
  var c_5min = extract_5min(d);
  window.setInterval(function() {
    on = !on;
    if (on) {
      c.fillStyle = "#FF0000";
    } else {
      c.fillStyle = "#FF9999";
    }
    d = new Date();
    if (c_hour !== extract_hour(d)) {
      c_hour = extract_hour(d);
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.fillText(c_hour+' '+c_5min, 40, 40);
    }
    if (c_5min !== extract_5min(d)) {
      c_5min = extract_5min(d);
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.fillText(c_hour+' '+c_5min, 40, 40);
    }
  }, 500);
})
