export const generateHtml = ({
  title,
  category,
  image,
  author,
  text,
  createdOn,
  audio,
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
      justify-content: center;
      align-items: center;
    }
    .container {
      padding: 20px;
      background-color: plum;
      height: 80vh;
      width: 50vw;
      display: flex;
      flex-direction: column;
    }
    h3 {
      margin: 0;
      font-weight: bold;
    }
    .textCon {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      background-color: blanchedalmond;
      padding: 10px;
      height: 100%;
    }
    h5 {
      margin: 0;
    }
    span {
      color: blue;
      font-weight: bold;
    }
    p {
      margin: 0;
    }
  </style>
  <body>
    <div class="container">
      <div class="textCon">
        <h3><span>TITLE: </span>${title}</h3>
        <h5>
          <span>author: </span> ${author} | <span>category: </span> ${category}
        </h5>
        <h5><span>date: </span> ${createdOn}</h5>
        <img src=${image} alt="nyanCat" height="50%" width="50%" />
        <p>
          <span>desc: </span> ${text}
        </p>
        <p>
          <span
            >source:
            <a
              href="https://www.npr.org/2024/02/26/1232986212/leap-day-explained"
            >
              ${title}
            </a></span
          >
        </p>
        <p>${audio}</p>
        <audio controls>
  <source src=${audio} type="audio/mpeg">
</audio>
      </div>
    </div>
  </body>
</html>
    `;
};
