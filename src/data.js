export default class Data {
  constructor(props = {}) {
    this.APIKEY = props.apikey;
    this.APIURL = props.apiurl;
  }

  sendGetRequest(url) {
    return fetch(url)
      .then((resp) => {
        if (resp.success === false) {
          throw new Error("Запрос выполнился неудачно");
        }
        return resp.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  sendPostRequest({ url = "", body = {}, headers = {} } = {}) {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    })
      .then((resp) => {
        if (resp.success === false) {
          throw new Error("Запрос выполнился неудачно");
        }
        return resp.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getMovies = (page = 1, query = "") => {
    return this.sendGetRequest(
      `${this.APIURL}/search/movie?api_key=${
        this.APIKEY
      }&language=en-US&query=${`${query} `}return&page=${page}&include_adult=false`,
    );
  };
  getGenres = () => {
    return this.sendGetRequest(
      `${this.APIURL}/genre/movie/list?api_key=${this.APIKEY}&language=en-US`,
    );
  };

  authorize = () => {
    return this.sendGetRequest(
      `${this.APIURL}/authentication/token/new?api_key=${this.APIKEY}&language=en-US`,
    );
  };

  authenticate = (token = "") => {
    return this.sendGetRequest(
      `https://www.themoviedb.org/authenticate/${token}`,
    );
  };

  createSession(token = "") {
    return this.sendPostRequest({
      url: `${this.APIURL}/authentication/session/new?api_key=${this.APIKEY}`,
      body: {
        request_token: token,
      },
    });
  }

  createGuestSession() {
    return this.sendGetRequest(
      `${this.APIURL}/authentication/guest_session/new?api_key=${this.APIKEY}`,
    );
  }

  getRatedMovies = (questSession = "", page = 1) => {
    return this.sendGetRequest(
      `${this.APIURL}/guest_session/${questSession}/rated/movies?api_key=${this.APIKEY}&language=en-US&sort_by=created_at.asc&page=${page}`,
    );
  };

  rateMovie = ({ questSession = "", movieId = 0, rate = 0 }) => {
    return this.sendPostRequest({
      url: `${this.APIURL}/movie/${movieId}/rating?api_key=${this.APIKEY}&guest_session_id=${questSession}`,
      body: {
        value: rate,
      },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  };
}
