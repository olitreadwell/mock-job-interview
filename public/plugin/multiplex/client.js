(function () {
  const multiplex = Reveal.getConfig().multiplex;
  const socketId = multiplex.id;
  const socket = io.connect(multiplex.url);

  socket.on(multiplex.id, (data) => {
		// ignore data from sockets that aren't ours
    if (data.socketId !== socketId) { return; }
    if (window.location.host === 'localhost:1947') return;

    Reveal.setState(data.state);
  });
}());
