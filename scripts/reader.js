$(document).ready(function() {
    //kept in to check loading of extension
    console.log("Accessibility Rocks!");

    //universal variable for accessing specific hover content
    var content;

    $("*:not(body)").hover(function(ev) {
            //EXECUTED WHEN MOUSE HOVERS OVER ELEMENT
            content = $(this); //update content

            //make sure nothing else is highlighted
            $(".highlight").removeClass('highlight');

            //highlight this and stop
            content.addClass("highlight");
            ev.stopPropagation();
        },
        function() {
            //stop highlighting when done hovering
            $(this).removeClass("highlight");
        })

    document.addEventListener('keydown', function(e) {
        // EXECUTED ON KEY DOWN
        if (e.code == '' || e.code == 'Unidentified' || e.code == 'Space') {
            //IF KEY IS SPACEBAR
            //stop it from scrolling on spacebar
            e.preventDefault();

            var alttext = content.attr("alt");
            var srcofimg = content.attr("src");
            if (alttext) {
                //EXECUTE IF CONTENT IS IMAGE & ALT TEXT EXISTS
                //make sure no other talking is happening
                speechSynthesis.cancel();
                //speak the alt text
                speechSynthesis.speak(new SpeechSynthesisUtterance(alttext));

            } else if (srcofimg) {
                //EXECUTE IF CONTENT IS IMAGE & ALT TEXT DOESN'T EXIST
                //make sure no other talking is happening
                speechSynthesis.cancel();
                //speak the source file name
                speechSynthesis.speak(new SpeechSynthesisUtterance(srcofimg));
            } else {
                //EXECUTE IF CONTENT IS TEXT
                //make sure no other talking is happening
                speechSynthesis.cancel();
                //speak the content
                speechSynthesis.speak(new SpeechSynthesisUtterance(content.text()));
            }

        } else {
            //EXECUTED ON KEY PRESS WHICH IS NOT SPACEBAR
            //stop talking
            speechSynthesis.cancel();
        }
    });

})