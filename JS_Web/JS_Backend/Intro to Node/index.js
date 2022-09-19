const http = require("http");

const homePage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="/about">about</a>
    <h1>Home</h1>
</body>
</html>`;

const aboutPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="/">home</a>
    <h1>About</h1>
</body>
</html>`;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http:${request.headers.host}`);
  if (url.pathname == "/") {
    response.write(homePage);
    response.end();
  } else if (url.pathname == "/about") {
    response.write(aboutPage);
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
});

server.listen(3000);
