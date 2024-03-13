export const generateHtml = ({
  title,
  category,
  image,
  author,
  text,
  createdOn,
  audio,
  source,
}) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>test</title>
  </head>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      min-width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #eff2f3;
    }
    .container {
      padding: 20px;
      background-color: #ffffff;
      height: 80vh;
      width: 560px;
      display: flex;
      flex-direction: column;
    }
    .textCon {
      display: flex;
      flex-direction: column;
      padding: 10px;
      height: auto;
    }
    h5 {
      margin: 0;
      color: gray;
    }
    p {
      margin: 0;
    }
    header {
      background-color: #ffffff;
      width: 560px;
      height: 70px;
      margin-bottom: 10px;
      padding: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .title-author-date {
      font-family: Arial, Helvetica, sans-serif;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
      padding-top: 40px;
    }
    h1 {
      margin: 0;
      text-align: left;
    }
    .desc {
      font-family: Arial, Helvetica, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 500px;
      padding: 20px;
      padding-top: 0;
    }
  </style>
  <body>
    <header>
      <h1>newsletter.</h1>
    </header>
    <div class="container">
      <div class="textCon">
        <div class="title-author-date">
          <h1>${title}</h1>
          <h5>By ${author} * ${createdOn}</h5>
        </div>

        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 25px;
            margin-bottom: 40px;
          "
        >
          <img src=${image} alt="picture" width="400px" height="250px" />
        </div>
        <p class="desc">
          ${text}
        </p>
        <p style="padding: 20px; padding-top: 0px;">
          <span 
            >source:
            <a
              href=${source}
            >
              ${title}
            </a></span
          >
        </p>
      </div>
    </div>
  </body>
</html>

  `;
};

{/* <audio controls style="padding-left: 20px;">
  <source src="${audio}" type="audio/mpeg" />
</audio>; */}
