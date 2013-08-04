
    if (typeof Leap == 'undefined') { // typeof jQuery=='undefined' works too
        var jsCode = document.createElement('script');
        jsCode.setAttribute('src', 'http://designfission.com/leaprevealjs/leap.min.js');
        jsCode.onload=runScript;
        document.body.appendChild(jsCode);
    }
    else {
        runScript();
    }

    function runScript() {
        var fingers = {};
        var spheres = {};

        var _html = document.body;

        var now;
        var lastSwipe = 0;


        Leap.loop({enableGestures: true}, function(frame) {

            now = new Date().getTime();


            if(lastSwipe === 0){
                lastSwipe = now;
            }

            if ( now - lastSwipe > 500 )
            {
                
                var gestures = frame.data.gestures;
                for ( var i = 0; i < gestures.length; i++ )
                {
                    var gesture = gestures[i];
                    
                    // Swipe Gesture
                    if ( gesture.type == "swipe" )
                    {
                        var swipe = gesture;

                        if ( swipe.speed > 1000 && Math.abs( swipe.direction[0] ) > Math.abs( swipe.direction[1] ) )
                        {

                            if ( swipe.direction[0] > 0 )
                            {
                                console.log('left');
                                Reveal.navigateLeft();
                            }
                            else if ( swipe.direction[0] < 0 )
                            {
                                console.log('right');
                                Reveal.navigateRight();
                            }

                            lastSwipe = now;
                            break;
                        }else{
                            if ( swipe.direction[1] < 0 )
                            {
                                console.log('up');
                                Reveal.navigateUp();
                            }
                            else if ( swipe.direction[1] > 0 )
                            {
                                console.log('down');
                                Reveal.navigateDown();
                            }


                            lastSwipe = now;
                            break;
                        }
                    }
                    
                }
                
            }

            
        });
    }


