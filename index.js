const summarizeArticle = async (url) => {
  const options = {
    method: "POST",
    url: "https://tldrthis.p.rapidapi.com/v1/model/abstractive/summarize-url/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3ec94a6abdmsh459f2b595599252p12a984jsnb5191ed3a754",
      "X-RapidAPI-Host": "tldrthis.p.rapidapi.com",
    },
    data: {
      url,
      min_length: 190,
      max_length: 300,
      is_detailed: true,
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data.summary[0]?.heading) {
      return;
    }
    return response.data.summary;
  } catch (err) {
    console.log(url, err.response);
    return;
  }
};

export const fetchNews = async (req, res) => {
  try {
    let mostViewed = [];
    const response = await axios.get(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=XJQaY2RQ1ooOkfGGlZjAyCmBeMozzZn6`
    );

    //destructuring data
    if (response.data && response.data.results) {
      const articles = response.data.results;
      mostViewed = articles.map((article) => ({
        url: article.url,
        published_date: article.published_date,
        section: article.section,
        author: article.byline,
        title: article.title,
        imageUrl: article.media[0]["media-metadata"][1].url ? article.media[0]["media-metadata"][1].url : null,
      }));
    } else {
      console.error("No results found");
    }

    //summarizing articles
    const queue = new PQueue({ concurrency: 1 });
    const summarizedNews = await queue.addAll(
      mostViewed.map((cur, index) => {
        return async () => {
          if (index % 5 === 0 && index !== 0) {
            const time = new Promise((resolve, reject) => {
              setTimeout(() => resolve(), 60000);
            });
            await time;
          }
          return await summarizeArticle(cur.url);
        };
      })
    );

    res.status(200).json({ status: "success", data: summarizedNews });
  } catch (err) {
    console.log(err);
    res.status(204).json({ status: "failed", message: err });
  }
};
