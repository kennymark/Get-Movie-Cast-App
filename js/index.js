var api = {
  key: "1e5ec4638942f91917f76021bb9af048",
  later: "&page=1&include_adult=true",
  url: "https://api.themoviedb.org/3/search/movie?api_key=",
  call: function() {
    return this.url + this.key + "&language=en-US&query=";
  }
};

$("form").on("submit", function(e) {
  var query = $("input").val();
  e.preventDefault();

  $.ajax({
    type: "GET",
    url: api.call() + query,
    success: getFilm,
    fail: failedAttempt
  });
  $("input").val('');
});

$(".search").on("click", function() {
  $("input").submit();
});

function getFilm(movie) {
  var bg = movie.results[0].poster_path;
  var bgurl = "https://image.tmdb.org/t/p/w500/" + bg;
  var fullbg = "url("+bgurl+")";
  $(".title").text(movie.results[0].original_title);
  $("p").text(movie.results[0].overview);
  console.log(bgurl);
   $(".block2").css("background-image", fullbg)
  $(".blurbg").css("background-image", fullbg);
  console.log(movie);
  console.log(movie.results[0].id);
  /*  var m = movie.results.map(function(a){
     console.log(a.overview)
    }) */
  var movieID = movie.results[0].id;
  getCast(movieID);
}

function getCast(movieID) {
  $('li').remove();
  $.ajax({
    type: "GET",
    url:
      "https://api.themoviedb.org/3/movie/" +
        movieID +
        "/credits?api_key=1e5ec4638942f91917f76021bb9af048",
    success: function(a) {
     var castmember = a.cast;
      console.log(castmember)
      
     var topcasts = castmember.slice(0, 15);
      topcasts.forEach(function(member) {
      
        $(".casts").append(`<li>${member.name} </li>`);
     /*    console.log(
          member.name + " was in the movie and was called " + member.character
        ); */
      });
    },
    fail: failedAttempt
  });
}

function failedAttempt() {
  var input = $('input').val();
  $('.cast').append(`<h1>There is no movie called ${input} </hi>`)
  alert("Movie not found");
}