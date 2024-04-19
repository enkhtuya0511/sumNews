export const mailTemp1 = (testArr) => {
  const articleHTML = testArr
    .map(
      (article) => `
    <div style="margin-bottom: 20px;">
      <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: black;">${article.title}</h1>
      <p style="font-size: 14px; color: gray; margin-bottom: 20px;">${article.author} * ${article.publishedDate}</p>
      <img alt="picture" style="width: 100%; max-width: 560px; height: auto; margin-bottom: 20px;" src="${article.imageUrl}"/>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: black; padding-right: 30px;">${article.summary}</p>
      <p style="font-size: 14px; color: black;">source: <a href="${article.source}" style="color: #007bff;">${article.title}</a></p>
    </div>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Newsletter</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #eff2f3;">
        <div style="margin: 0 auto; background-color: #ffffff; max-width: 600px; height: 70px; margin-bottom: 10px; padding: 20px; color: black;">
          <h1>SumNews</h1>
        </div>
        <div id="container" style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; margin-bottom: 20px;">
          ${articleHTML}
        </div>
      </body>
    </html>`;
};
