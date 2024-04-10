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
      <title>Newsletter</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #eff2f3">
      <div style="margin: 0 auto; background-color: #ffffff; max-width: 600px; height: 70px; margin-bottom: 10px; padding: 20px; color: black">
        <h1>newsletter.</h1>
      </div>
      <div
        class="container"
        style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; margin-bottom: 20px"
      >
        <h1 class="title" style="font-size: 24px; font-weight: bold; margin-bottom: 10px; color: black">
          ${title}
        </h1>
        <p class="author-date" style="font-size: 14px; color: gray; margin-bottom: 20px">
          By ${author} * ${createdOn}
        </p>
        <img
          class="image"
          src=${image}
          alt="picture"
          style="width: 100%; max-width: 560px; height: auto; margin-bottom: 20px"
        />
        <p class="description" style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: black">
          ${text}
        </p>
        <p style="font-size: 14px; color: black">
          source:
          <a
            href=${source}
            style="color: #007bff"
            >${title}</a
          >
        </p>
      </div>
    </body>
  </html>
  `;
};

{
  /* <audio controls style="padding-left: 20px;">
  <source src="${audio}" type="audio/mpeg" />
</audio>; 

//////
      date = new Date();
      testArticles = [
        {
          title: "Why Facts Don’t Change Our Minds",
          author: "James Clear",
          createdOn: date.toISOString(),
          image: "nasa.jpeg",
          summary:
            "Convincing someone to change their mind is really the process of convincing them to change their tribe. If they abandon their beliefs, they run the risk of losing social ties. You can’t expect someone to change their mind if you take away their community too. You have to give them somewhere to go. Nobody wants their worldview torn apart if loneliness is the outcome.",
          source: "https://jamesclear.com/why-facts-dont-change-minds",
        },
        {
          title: "What I Do When I Feel Like Giving Up",
          author: "James Clear",
          createdOn: date.toISOString(),
          image: "nasa.jpeg",
          summary:
            "It has been 939 days since November 12, 2012. That’s the date when I first published an article on JamesClear.com and it’s almost 2 years and 7 months ago. During these 939 mostly glorious, sometimes frustrating days, I have written a new post every Monday and Thursday. Week after week. Month after month. Year after year.",
          source: "https://jamesclear.com/giving-up",
        },
        {
          title: "Why Facts Don’t Change Our Minds",
          author: "James Clear",
          createdOn: date.toISOString(),
          image: "nasa.jpeg",
          summary:
            "It has been 939 days since November 12, 2012. That’s the date when I first published an article on JamesClear.com and it’s almost 2 years and 7 months ago. During these 939 mostly glorious, sometimes frustrating days, I have written a new post every Monday and Thursday. Week after week. Month after month. Year after year.",
          source: "https://jamesclear.com/giving-up",
        },
        {
          title: "Why Facts Don’t Change Our Minds",
          author: "James Clear",
          createdOn: date.toISOString(),
          image: "nasa.jpeg",
          summary:
            "Convincing someone to change their mind is really the process of convincing them to change their tribe. If they abandon their beliefs, they run the risk of losing social ties. You can’t expect someone to change their mind if you take away their community too. You have to give them somewhere to go. Nobody wants their worldview torn apart if loneliness is the outcome.",
          source: "https://jamesclear.com/why-facts-dont-change-minds",
        },
      ];

      async function getData() {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita%");
        const data = await response.json();
        console.log(data);
      }
*/
}
