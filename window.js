$(() => {
  var canvas = document.querySelector('canvas')

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext("2d");
  var on = true;

  c.font = "30px Arial";
  window.setInterval(function() {
    on = !on;
    if (on) {
      c.fillStyle = "#ff0000";
    } else {
      c.fillStyle = "#0000ff";
    }
    c.fillText("Hello World", 40, 40);
  }, 500);
})
