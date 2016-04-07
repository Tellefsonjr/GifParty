$(document).ready(function() {
  // hide .navbar first
  $(".navbar").addClass('hideme');

   /* Show navbar */
  $(function () {
    $('#shownav').hover(function () {
      $('.guide').addClass('hideme');
      $('.navbar').removeClass('hideme');
    });
  });
    /* when navbar is hovered over it will override previous */
  $(function () {
    $('.navbar').hover(function () {
      $('.guide').addClass('hideme');
      $('.navbar').removeClass('hideme');
    },
    function () {
      $('.navbar').addClass('hideme');
    });
  });

    var iframeElement   = document.querySelector('iframe');
    var iframeElementID = iframeElement.id;
    var widget1         = SC.Widget(iframeElement);
    var widget2         = SC.Widget(iframeElementID);

        $('#search').submit(function (){
          var gif =  $("#giphysearch").val();
        $.get("http://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=dc6zaTOxFJmzC", function(res) {
            console.log(res);
            $('.fadeIt').fadeOut(2000);

            var i = 0;
            var gifArray = [];
            var gifs= (res);
            gif = gifs["data"];
            gifs = _.pluck(gifs["data"], "images");

            console.log("gifs", gifs);
            for(i in gifs) {
              gifArray.push(gifs[i].original.url);
                if(gifArray.length > 20){
                    for( var x = 0; x <11; x++){
                        gifArray.shift();
                    }
                    console.log(gifArray.length, "GifArray too long, popping first 10 entries.")
                }

              console.log(gifs[i].original.url);
            }

              var current = 0;
            function nextBackground(){
              random = Math.floor(Math.random()*gifArray.length);
              current = current % gifArray.length;
              $("body").css( "background-image", "url('"+gifArray[random]+"')");
            }
            setInterval(nextBackground, 2500);

        });
          return false;
        });

// SoundCloud Search Functions
SC.initialize({
client_id: 'fb88444a7137f351db0974a27b7278e3'
});

$('.genre').click(function (){
console.log("Clicked");
var menuLinks = document.getElementsByClassName('genre');
var userSearch = (this).innerHTML;
console.log("UserSearch:", userSearch);
playSomeSound(userSearch);

});


function playSomeSound(genre){
  console.log("Genre:::", genre);
  songs = SC.get('/tracks', { genres: genre }, function(tracks) {
    console.log("Tracks:", tracks);
    var random = Math.floor(Math.random() * (tracks.length + 1));
    console.log("rando:", random);
    SC.oEmbed(tracks[random].uri, {auto_play:true}, document.getElementById('target'));
  });
  console.log("Songs::", songs);
};
});
