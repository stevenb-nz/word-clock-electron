$(() => {
  var canvas = document.querySelector('canvas')

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext("2d");
  var on = true;

  c.font = "24px System";
  window.setInterval(function() {
    on = !on;
    if (on) {
      c.fillStyle = "#FF0000";
    } else {
      c.fillStyle = "#FF9999";
    }
    c.fillText("HELLO WORLD", 40, 40);
  }, 500);
})
