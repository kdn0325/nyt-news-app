export interface IArticle {
  _id: string;
  headline: {
    main: string;
  };
  byline: {
    original: string;
  };
  pub_date: string;
  source: string;
  web_url: string;
}

export interface ICountryOptionList {
  id: number;
  name: string;
  desc: string;
}
