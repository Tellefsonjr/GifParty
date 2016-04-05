      $(document).ready(function() {
          $("#goAway").fadeIn(1000);

            var iframeElement   = document.querySelector('iframe');
            var iframeElementID = iframeElement.id;
            var widget1         = SC.Widget(iframeElement);
            var widget2         = SC.Widget(iframeElementID);


            var menu = $('#foot')
            var nav = $("#navs")
            var timeout = 0;
            menu.hide();
            nav.hide();

            // set to widget url
            // enable_api=true;

                  gifs = $.get("http://api.giphy.com/v1/gifs/search?q=cats&api_key=dc6zaTOxFJmzC");
                  console.log("TEST QUERY", gifs);

                    $(".activate").on('mouseenter', function() {
                            hovering = true;

                    $("#foot, #navs").stop(true, true).slideDown(500);
                            if (timeout > 0) {
                        clearTimeout(timeout);
                    }
                }).on("mouseleave", function () {
                    resetHover();
                        });

                    $("#foot, #navs").on("mouseenter", function () {
                    // reset flag
                    hovering = true;
                    // reset timeout
                    startTimeout();
                }).on("mouseleave", function () {
                    // The timeout is needed incase you go back to the main menu
                    resetHover();
                });

                function startTimeout() {
                    // This method gives you 1 second to get your mouse to the sub-menu
                    timeout = setTimeout(function () {
                        closeMenu();
                    }, 500);
                };

                function closeMenu() {
                    // Only close if not hovering
                    if (!hovering) {
                        $('#foot, #navs').stop(true, true).slideUp(500);
                    }
                };

                function resetHover() {
                    // Allow the menu to close if the flag isn't set by another event
                    hovering = false;
                    // Set the timeout
                    startTimeout();
                };
                $('#search').submit(function (){
                  var gif =  $("#giphysearch").val();
                $.get("http://api.giphy.com/v1/gifs/search?q="+gif+"&api_key=dc6zaTOxFJmzC", function(res) {
                    console.log(res);
                    $('.fadeIt').fadeOut(2000);

                    var i = 0;
                    var gifArray = [];
                    var gifs= (res);
                    gif = gifs["data"];
                    var myGifs = _.pluck(gifs["data"], "images");

                    // var gifurl = _.pluck(url["original"], "url")
                    // console.log (my)
                    console.log(myGifs);
                    for(i in myGifs) {
                      gifArray.push(myGifs[i].original.url);
                        if(gifArray.length > 20){
                            for( var x = 0; x <11; x++){
                                gifArray.shift();
                            }
                            console.log(gifArray, "GifArray too long, popping first 10 entries.")
                        }
                      // giphy = myGifs[i]
                      // console.log(giphy, "GIIIPHY")
                      // var original = giphy.original.url
                      // var original = _.pluck(giphy["original"], "object")
                      // console.log(original, "ORIGINAL")
                      console.log(myGifs[i].original.url);
                    }


                      // $("body").css( "background-image", "url('" +myGifs[i].original.url+ "')");

                      var current = 0;
                    function nextBackground(){
                      random = Math.floor(Math.random()*gifArray.length);
                      current = current % gifArray.length;
                      $("body").css( "background-image", "url('"+gifArray[random]+"')");
                    }
                    setInterval(nextBackground, 2500);
                    $("body").css('background-image', gifArray[0]);

                    console.log("res gifs::::::::", gifArray);

                });
                  return false;
                });


                  SC.initialize({
                    client_id: '9812d36e4b4576afc3dfa4e5beeee407'
                  });
            

      $('#search').submit(function (){
          
       var userSearch = $("#musicInput").val();
       if (current == userSearch) {
        return;
       }
       else{
                console.log(userSearch)
           songs = SC.get('/tracks', { genres: userSearch }, function(tracks) {
             $(tracks).each(function(index, track) {
               console.log(track.title, track.genre, track.bpm)  ;
             });

             console.log("NOW FOR THE")
             SC.get('/tracks/'+userSearch, function(track) {
               SC.oEmbed(track.permalink_url, {auto_play: true},
                document.getElementById('player'));
            });
        });
       };
           
        return false;
      });
            

          });



$('#musicSearch').submit(function (){
        var userSearch = $("#musicInput").val();
$('.sc-next').live('click', function(event) {
    var currentNext = getNextTrack($('.sc-player').first()[0]);
    $(currentNext).trigger('click');
});
  (function(){
    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe),
        newSoundUrl = 'http://api.soundcloud.com/tracks/'+userSearch+'&autoplay=true';

    widget.bind(SC.Widget.Events.READY, function() {
      // load new widget
      widget.bind(SC.Widget.Events.FINISH, function() {
        widget.load(newSoundUrl {
        });
      });
    });

  }());
    return false;
});



