export default class Data {
  APIKEY = "781e652b603061b14211cfcdf1e822ff";
  APIURL = "https://api.themoviedb.org/3";
  sendRequest(url) {
    return fetch(`${url}`)
      .then((resp) => {
        if (resp.success === false) {
          throw new Error("Запрос выполнился неудачно");
        }
        resp.json();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getMovies() {
    return this.sendRequest(
      `${this.APIURL}/search/movie?api_key=${this.APIKEY}&language=en-US&query=return&include_adult=false`,
    );
  }
  getGenres() {
    return this.sendRequest(
      `${this.APIURL}/genre/movie/list?api_key=${this.APIKEY}&language=en-US`,
    );
  }
}
