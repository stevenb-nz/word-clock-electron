$(() => {
  var canvas = document.querySelector('canvas')

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var c = canvas.getContext("2d");

  c.font = "30px Arial";
  c.fillStyle = "#FF0000";
  c.fillText("Hello World", 10, 50);
})
