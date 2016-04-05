

// <script type="text/javascript" src="scripts/soundcloud.player.api.js"> </script>
//  <script type="text/javascript">
//    soundcloud.addEventListener('onPlayerReady', function(player, data) {
//      player.api_play();
//    });
// </script>

<script type="text/javascript">
   soundcloud.addEventListener('onPlayerReady', function(player, data) {
     player.api_play();
   });
</script>


$(document).ready(function() {
  client = soundcloud.Client(client_id='9812d36e4b4576afc3dfa4e5beeee407');
  SC.initialize({
    client_id: '9812d36e4b4576afc3dfa4e5beeee407'
  });
    
     $('#musicSearch').submit(function (){
        var userSearch = $("#musicInput").val();
        console.log(userSearch)
        console.log('ballinnnnn')
            songs = SC.get('/tracks', { genres: userSearch }, function(tracks) {
              $(tracks).each(function(index, track) {
                console.log(track.title, track.genre)  ;
              });
              SC.get('/tracks/'+userSearch, function(track) {
                SC.oEmbed(track.permalink_url, document.getElementById('player'));
        });
               
  return false;
});
       
});
   });
//
//     $('#searchgifs').submit(function (){
//                  var gif =  $("#giphysearch").val();
//                  gifs = $.get("http://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=dc6zaTOxFJmzC");
//                  console.log("SEARCH GIFSSSSS", gifs);
//                  // http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
//                return false;
//                });