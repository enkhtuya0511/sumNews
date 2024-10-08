export const generateSubHtml = (userID) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Newsletter</title>
    </head>
    <body style="margin-bottom: 50px; padding: 0">
      <div
        class="container"
        style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; margin-bottom: 20px; color: #333"
      >
        <h1>SumNews</h1>
  
        <div style="max-width: 450px; margin-bottom: 15px; padding: 20px; background-color: #eeeeee; border-radius: 4px">
          <h2 style="font-size: 22px; padding-bottom: 5px; margin: auto">Please Confirm Subscription ⋆.˚</h2>
          <div
            style="
              max-width: 250px;
              max-height: 42px;
              background-color: #4d4d4d;
              padding: 10px 20px;
              border: none;
              border-radius: 3px;
              text-align: center;
              margin: 15px 0;
            "
          >
            <a href="http://localhost:3000/subscribe/confirm?id=${userID}" style="font-size: 16px; color: #ffffff; text-decoration: none"
              >subscribe me to this list</a
            >
          </div>
          <p style="font-size: 15px; color: black">
            For questions about this list, please contact: <br />
            <a href="mailto:newsletter.project03@gmail.com" style="color: #336699" target="_blank">newsletter.project03@gmail.com</a> ᯓ★
          </p>
        </div>
      </div>
    </body>
  </html>
  
`;
};
