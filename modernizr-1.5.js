
window.Modernizr = (function(window,doc,undefined){
    
    var version = '1.5',
    
    ret = {},

    enableHTML5 = true,
    
  
    fontfaceCheckDelay = 75,
    
    
    docElement = doc.documentElement,

    
    mod = 'modernizr',
    m = doc.createElement( mod ),
    m_style = m.style,

   
    f = doc.createElement( 'input' ),
    

    
    canvas = 'canvas',
    canvastext = 'canvastext',
    rgba = 'rgba',
    hsla = 'hsla',
    multiplebgs = 'multiplebgs',
    backgroundsize = 'backgroundsize',
    borderimage = 'borderimage',
    borderradius = 'borderradius',
    boxshadow = 'boxshadow',
    opacity = 'opacity',
    cssanimations = 'cssanimations',
    csscolumns = 'csscolumns',
    cssgradients = 'cssgradients',
    cssreflections = 'cssreflections',
    csstransforms = 'csstransforms',
    csstransforms3d = 'csstransforms3d',
    csstransitions = 'csstransitions',
    fontface = 'fontface',
    geolocation = 'geolocation',
    video = 'video',
    audio = 'audio',
    input = 'input',
    inputtypes = input + 'types',
    // inputtypes is an object of its own containing individual tests for
    // various new input types, such as search, range, datetime, etc.
    
    svg = 'svg',
    smil = 'smil',
    svgclippaths = svg+'clippaths',
    
    background = 'background',
    backgroundColor = background + 'Color',
    canPlayType = 'canPlayType',
    
    // FF gets really angry if you name local variables as these, but camelCased.
    localstorage = 'localStorage',
    sessionstorage = 'sessionStorage',
    applicationcache = 'applicationCache',
    
    webWorkers = 'webworkers',
    hashchange = 'hashchange',
    crosswindowmessaging = 'crosswindowmessaging',
    historymanagement = 'historymanagement',
    draganddrop = 'draganddrop',
    websqldatabase = 'websqldatabase',
    indexedDB = 'indexedDB',
    websockets = 'websockets',
    smile = ':)',
    
    // IE7 gets mad if you name a local variable `toString`
    tostring = Object.prototype.toString,
    
    // list of property values to set for css tests. see ticket #21
    prefixes = ' -o- -moz- -ms- -webkit- -khtml- '.split(' '),

    tests = {},
    inputs = {},
    attrs = {},
    
    classes = [],
    
    
    isEventSupported = (function(){
  
        var TAGNAMES = {
          'select':'input','change':'input',
          'submit':'form','reset':'form',
          'error':'img','load':'img','abort':'img'
        }, 
        cache = { };
        
        function isEventSupported(eventName, element) {
            var canCache = (arguments.length == 1);
            
            // only return cached result when no element is given
            if (canCache && cache[eventName]) {
                return cache[eventName];
            }
            
            element = element || document.createElement(TAGNAMES[eventName] || 'div');
            eventName = 'on' + eventName;
            
            // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize"
            // `in` "catches" those
            var isSupported = (eventName in element);
            
            if (!isSupported && element.setAttribute) {
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] == 'function';
            }
            
            element = null;
            return canCache ? (cache[eventName] = isSupported) : isSupported;
        }
        
        return isEventSupported;
    })();    
    
    
    var _hasOwnProperty = ({}).hasOwnProperty, hasOwnProperty;
    if (typeof _hasOwnProperty !== 'undefined' && typeof _hasOwnProperty.call !== 'undefined') {
      hasOwnProperty = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProperty = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && typeof object.constructor.prototype[property] === 'undefined');
      };
    }
    
    /**
     * set_css applies given styles to the Modernizr DOM node.
     */
    function set_css( str ) {
        m_style.cssText = str;
    }

    /**
     * set_css_all extrapolates all vendor-specific css strings.
     */
    function set_css_all( str1, str2 ) {
        return set_css(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return (''+str).indexOf( substr ) !== -1;
    }

    /**
     * test_props is a generic CSS / DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     *   A supported CSS property returns empty string when its not yet set.
     */
    function test_props( props, callback ) {
        for ( var i in props ) {
            if ( m_style[ props[i] ] !== undefined && ( !callback || callback( props[i], m ) ) ) {
                return true;
            }
        }
    }

   
    function test_props_all( prop, callback ) {
        var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1),
    
        props = [
            prop,
            'Webkit' + uc_prop,
            'Moz' + uc_prop,
            'O' + uc_prop,
            'ms' + uc_prop,
            'Khtml' + uc_prop
        ];

        return !!test_props( props, callback );
    }
    

    /**
     * Tests
     */
     
    tests[canvas] = function() {
        return !!doc.createElement( canvas ).getContext;
    };
    
    tests[canvastext] = function() {
        return !!(tests[canvas]() && typeof doc.createElement( canvas ).getContext('2d').fillText == 'function');
    };
    
   
    tests[geolocation] = function() {
        return !!navigator.geolocation;
    };

    tests[crosswindowmessaging] = function() {
      return !!window.postMessage;
    };

    tests[websqldatabase] = function() {
      var result = !!window.openDatabase;
      if (result){
        try {
          result = !!openDatabase("testdb", "1.0", "html5 test db", 200000);
        } catch(err) {
          result = false;
        }
      }
      return result;
    };
    
    tests[indexedDB] = function(){
      return !!window[indexedDB];
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests[hashchange] = function() {
      return isEventSupported(hashchange, window) && ( document.documentMode === undefined || document.documentMode > 7 );
    };

    tests[historymanagement] = function() {
      return !!(window.history && history.pushState);
    };

    tests[draganddrop] = function() {
        return isEventSupported('drag')
            && isEventSupported('dragstart')
            && isEventSupported('dragenter')
            && isEventSupported('dragover')
            && isEventSupported('dragleave')
            && isEventSupported('dragend')
            && isEventSupported('drop');
    };

    
    tests[websockets] = function(){
        return ('WebSocket' in window);
    };
    
    
    // http://css-tricks.com/rgba-browser-support/
    tests[rgba] = function() {
        // Set an rgba() color and check the returned value
        
        set_css( background + '-color:rgba(150,255,150,.5)' );
        
        return contains( m_style[backgroundColor], rgba );
    };
    
    tests[hsla] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally
        
        set_css( background + '-color:hsla(120,40%,100%,.5)' );
        
        return contains( m_style[backgroundColor], rgba );
    };
    
    tests[multiplebgs] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!
        
        set_css( background + ':url(//:),url(//:),red url(//:)' );
        
        // If the UA supports multiple backgrounds, there should be three occurrences
        //  of the string "url(" in the return value for elem_style.background

        return new RegExp("(url\\s*\\(.*?){3}").test(m_style[background]);
    };
    

    tests[backgroundsize] = function() {
        return test_props_all( background + 'Size' );
    };
    
    tests[borderimage] = function() {
        //  set_css_all( 'border-image:url(m.png) 1 1 stretch' );
        return test_props_all( 'borderImage' );
    };
    
    
    // super comprehensive table about all the unique implementations of 
    // border-radius: http://muddledramblings.com/table-of-css3-border-radius-compliance
    
    tests[borderradius] = function() {
        //  set_css_all( 'border-radius:10px' );
        return test_props_all( 'borderRadius', '', function( prop ) {
            return contains( prop, 'orderRadius' );
        });
    };
    
    
    tests[boxshadow] = function() {
        //  set_css_all( 'box-shadow:#000 1px 1px 3px' );
        return test_props_all( 'boxShadow' );
    };
    
    
    tests[opacity] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.
        
        set_css_all( 'opacity:.5' );
        
        return contains( m_style[opacity], '0.5' );
    };
    
    
    tests[cssanimations] = function() {
        //  set_css_all( 'animation:"animate" 2s ease 2', 'position:relative' );
        return test_props_all( 'animationName' );
    };
    
    
    tests[csscolumns] = function() {
        //  set_css_all( 'column-count:3' );
        return test_props_all( 'columnCount' );
    };
    
    
    tests[cssgradients] = function() {
        
        var str1 = background + '-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';
        
        set_css(
            (str1 + prefixes.join(str2 + str1) + prefixes.join(str3 + str1)).slice(0,-str1.length)
        );
        
        return contains( m_style.backgroundImage, 'gradient' );
    };
    
    
    tests[cssreflections] = function() {
        //  set_css_all( 'box-reflect:right 1px' );
        return test_props_all( 'boxReflect' );
    };
    
    
    tests[csstransforms] = function() {
        //  set_css_all( 'transform:rotate(3deg)' );
        return !!test_props([ 'transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ]);
    };
    
    
    tests[csstransforms3d] = function() {
        //  set_css_all( 'perspective:500' );
        
        var ret = !!test_props([ 'perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective' ]);
  
        if (ret){
            var st = document.createElement('style'),
                div = doc.createElement('div');
                
            // webkit allows this media query to succeed only if the feature is enabled.    
            // "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){#modernizr{height:3px}}"
            st.textContent = '@media ('+prefixes.join('transform-3d),(')+'modernizr){#modernizr{height:3px}}';
            doc.getElementsByTagName('head')[0].appendChild(st);
            div.id = 'modernizr';
            docElement.appendChild(div);
            
            ret = div.offsetHeight === 3;
            
            st.parentNode.removeChild(st);
            div.parentNode.removeChild(div);
        }
        return ret;
    };
    
    
    tests[csstransitions] = function() {
        //  set_css_all( 'transition:all .5s linear' );
        return test_props_all( 'transitionProperty' );
    };

    tests[fontface] = function(){

        var fontret;
        if (/*@cc_on@if(@_jscript_version>=5)!@end@*/0) fontret = true;
  
        else {
      
          // Create variables for dedicated @font-face test
          var st  = doc.createElement('style'),
            spn = doc.createElement('span'),
            size, isFakeBody = false, body = doc.body,
            callback, isCallbackCalled;
  
          // The following is a font-face + glyph definition for the . character:
          st.textContent = "@font-face{font-family:testfont;src:url('data:font/ttf;base64,AAEAAAAMAIAAAwBAT1MvMliohmwAAADMAAAAVmNtYXCp5qrBAAABJAAAANhjdnQgACICiAAAAfwAAAAEZ2FzcP//AAMAAAIAAAAACGdseWYv5OZoAAACCAAAANxoZWFk69bnvwAAAuQAAAA2aGhlYQUJAt8AAAMcAAAAJGhtdHgGDgC4AAADQAAAABRsb2NhAIQAwgAAA1QAAAAMbWF4cABVANgAAANgAAAAIG5hbWUgXduAAAADgAAABPVwb3N03NkzmgAACHgAAAA4AAECBAEsAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAACAAMDAAAAAAAAgAACbwAAAAoAAAAAAAAAAFBmRWQAAAAgqS8DM/8zAFwDMwDNAAAABQAAAAAAAAAAAAMAAAADAAAAHAABAAAAAABGAAMAAQAAAK4ABAAqAAAABgAEAAEAAgAuqQD//wAAAC6pAP///9ZXAwAAAAAAAAACAAAABgBoAAAAAAAvAAEAAAAAAAAAAAAAAAAAAAABAAIAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEACoAAAAGAAQAAQACAC6pAP//AAAALqkA////1lcDAAAAAAAAAAIAAAAiAogAAAAB//8AAgACACIAAAEyAqoAAwAHAC6xAQAvPLIHBADtMrEGBdw8sgMCAO0yALEDAC88sgUEAO0ysgcGAfw8sgECAO0yMxEhESczESMiARDuzMwCqv1WIgJmAAACAFUAAAIRAc0ADwAfAAATFRQWOwEyNj0BNCYrASIGARQGKwEiJj0BNDY7ATIWFX8aIvAiGhoi8CIaAZIoN/43KCg3/jcoAWD0JB4eJPQkHh7++EY2NkbVRjY2RgAAAAABAEH/+QCdAEEACQAANjQ2MzIWFAYjIkEeEA8fHw8QDxwWFhwWAAAAAQAAAAIAAIuYbWpfDzz1AAsEAAAAAADFn9IuAAAAAMWf0i797/8zA4gDMwAAAAgAAgAAAAAAAAABAAADM/8zAFwDx/3v/98DiAABAAAAAAAAAAAAAAAAAAAABQF2ACIAAAAAAVUAAAJmAFUA3QBBAAAAKgAqACoAWgBuAAEAAAAFAFAABwBUAAQAAgAAAAEAAQAAAEAALgADAAMAAAAQAMYAAQAAAAAAAACLAAAAAQAAAAAAAQAhAIsAAQAAAAAAAgAFAKwAAQAAAAAAAwBDALEAAQAAAAAABAAnAPQAAQAAAAAABQAKARsAAQAAAAAABgAmASUAAQAAAAAADgAaAUsAAwABBAkAAAEWAWUAAwABBAkAAQBCAnsAAwABBAkAAgAKAr0AAwABBAkAAwCGAscAAwABBAkABABOA00AAwABBAkABQAUA5sAAwABBAkABgBMA68AAwABBAkADgA0A/tDb3B5cmlnaHQgMjAwOSBieSBEYW5pZWwgSm9obnNvbi4gIFJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgT3BlbiBGb250IExpY2Vuc2UuIEtheWFoIExpIGdseXBocyBhcmUgcmVsZWFzZWQgdW5kZXIgdGhlIEdQTCB2ZXJzaW9uIDMuYmFlYzJhOTJiZmZlNTAzMiAtIHN1YnNldCBvZiBKdXJhTGlnaHRiYWVjMmE5MmJmZmU1MDMyIC0gc3Vic2V0IG9mIEZvbnRGb3JnZSAyLjAgOiBKdXJhIExpZ2h0IDogMjMtMS0yMDA5YmFlYzJhOTJiZmZlNTAzMiAtIHN1YnNldCBvZiBKdXJhIExpZ2h0VmVyc2lvbiAyIGJhZWMyYTkyYmZmZTUwMzIgLSBzdWJzZXQgb2YgSnVyYUxpZ2h0aHR0cDovL3NjcmlwdHMuc2lsLm9yZy9PRkwAQwBvAHAAeQByAGkAZwBoAHQAIAAyADAAMAA5ACAAYgB5ACAARABhAG4AaQBlAGwAIABKAG8AaABuAHMAbwBuAC4AIAAgAFIAZQBsAGUAYQBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAdABlAHIAbQBzACAAbwBmACAAdABoAGUAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUALgAgAEsAYQB5AGEAaAAgAEwAaQAgAGcAbAB5AHAAaABzACAAYQByAGUAIAByAGUAbABlAGEAcwBlAGQAIAB1AG4AZABlAHIAIAB0AGgAZQAgAEcAUABMACAAdgBlAHIAcwBpAG8AbgAgADMALgBiAGEAZQBjADIAYQA5ADIAYgBmAGYAZQA1ADAAMwAyACAALQAgAHMAdQBiAHMAZQB0ACAAbwBmACAASgB1AHIAYQBMAGkAZwBoAHQAYgBhAGUAYwAyAGEAOQAyAGIAZgBmAGUANQAwADMAMgAgAC0AIABzAHUAYgBzAGUAdAAgAG8AZgAgAEYAbwBuAHQARgBvAHIAZwBlACAAMgAuADAAIAA6ACAASgB1AHIAYQAgAEwAaQBnAGgAdAAgADoAIAAyADMALQAxAC0AMgAwADAAOQBiAGEAZQBjADIAYQA5ADIAYgBmAGYAZQA1ADAAMwAyACAALQAgAHMAdQBiAHMAZQB0ACAAbwBmACAASgB1AHIAYQAgAEwAaQBnAGgAdABWAGUAcgBzAGkAbwBuACAAMgAgAGIAYQBlAGMAMgBhADkAMgBiAGYAZgBlADUAMAAzADIAIAAtACAAcwB1AGIAcwBlAHQAIABvAGYAIABKAHUAcgBhAEwAaQBnAGgAdABoAHQAdABwADoALwAvAHMAYwByAGkAcAB0AHMALgBzAGkAbAAuAG8AcgBnAC8ATwBGAEwAAAAAAgAAAAAAAP+BADMAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAQACAQIAEQt6ZXJva2F5YWhsaQ==')}";
          doc.getElementsByTagName('head')[0].appendChild(st);
      
          // we don't use `serif` and we don't use `monospace`
          // http://github.com/Modernizr/Modernizr/issues/closed#issue/39
          // http://neugierig.org/software/chromium/notes/2009/09/monospace-fonts-workaround.html
          spn.setAttribute('style','font:99px _,arial,helvetica;position:absolute;visibility:hidden'); 
      
          if  (!body){
            body = docElement.appendChild(doc.createElement(fontface));
            isFakeBody = true;
          } 
      
          // the data-uri'd font only has the . glyph; which is 3 pixels wide.
          spn.innerHTML = '........';
          spn.id        = 'fonttest';
      
          body.appendChild(spn);
          size = spn.offsetWidth*spn.offsetHeight;
          spn.style.font = '99px testfont,_,arial,helvetica';
      
          // needed for the CSSFontFaceRule false positives (ff3, chrome, op9)
          fontret = size !== spn.offsetWidth*spn.offsetHeight;
      
          function delayedCheck(){
            if (!body.parentNode) return;
            fontret = ret[fontface] = size !== spn.offsetWidth*spn.offsetHeight;
            docElement.className = docElement.className.replace(/(no-)?fontface\b/,'') + (fontret ? ' ' : ' no-') + fontface;
          }

          setTimeout(delayedCheck,fontfaceCheckDelay);
          setTimeout(delayedCheck,fontfaceCheckDelay*2);
          addEventListener('load',function(){
              delayedCheck();
              (isCallbackCalled = true) && callback && callback(fontret);
              setTimeout(function(){
                  if (!isFakeBody) body = spn;
                  body.parentNode.removeChild(body);
                  st.parentNode.removeChild(st);
              }, 50);
          },false);
        }

        // allow for a callback
        ret._fontfaceready = function(fn){
          (isCallbackCalled || fontret) ? fn(fontret) : (callback = fn);
        }
      
        return fontret || size !== spn.offsetWidth;
    
    };
    
    tests[video] = function() {
        var elem = doc.createElement(video),
            bool = !!elem[canPlayType];
        
        if (bool){  
            bool      = new Boolean(bool);  
            bool.ogg  = elem[canPlayType]('video/ogg; codecs="theora"');
            bool.h264 = elem[canPlayType]('video/mp4; codecs="avc1.42E01E"');
            bool.webm = elem[canPlayType]('video/webm; codecs="vp8, vorbis"');
        }
        return bool;
    };
    
    tests[audio] = function() {
        var elem = doc.createElement(audio),
            bool = !!elem[canPlayType];
        
        if (bool){  
            bool      = new Boolean(bool);  
            bool.ogg  = elem[canPlayType]('audio/ogg; codecs="vorbis"');
            bool.mp3  = elem[canPlayType]('audio/mpeg;');
            
            // mimetypes accepted: 
            //   https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
            //   http://bit.ly/iphoneoscodecs
            bool.wav  = elem[canPlayType]('audio/wav; codecs="1"');
            bool.m4a  = elem[canPlayType]('audio/x-m4a;') || elem[canPlayType]('audio/aac;');
        }
        return bool;
    };

    
    tests[localstorage] = function() {
        return ('localStorage' in window) && window[localstorage] !== null;
    };

    tests[sessionstorage] = function() {
        // try/catch required for pissy FF behavior
        try {
            return ('sessionStorage' in window) && window[sessionstorage] !== null;
        } catch(e){
            return false;
        }
    };


    tests[webWorkers] = function () {
        return !!window.Worker;
    };


    tests[applicationcache] =  function() {
        var cache = window[applicationcache];
        return !!(cache && (typeof cache.status != 'undefined') && (typeof cache.update == 'function') && (typeof cache.swapCache == 'function'));
    };

 
    // thanks to Erik Dahlstrom
    tests[svg] = function(){
        return !!doc.createElementNS && !!doc.createElementNS( "http://www.w3.org/2000/svg", "svg").createSVGRect;
    };
    
    // thanks to F1lt3r and lucideer
    // http://github.com/Modernizr/Modernizr/issues#issue/35
    tests[smil] = function(){
        return !!doc.createElementNS && /SVG/.test(tostring.call(doc.createElementNS('http://www.w3.org/2000/svg','animate')));
    };

    tests[svgclippaths] = function(){
        // returns a false positive in saf 3.2?
        return !!doc.createElementNS && /SVG/.test(tostring.call(doc.createElementNS('http://www.w3.org/2000/svg','clipPath')));
    };


    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // hold this guy to execute in a moment.
    function webforms(){
    
        ret[input] = (function(props) {
            for (var i = 0,len=props.length;i<len;i++) {
                attrs[ props[i] ] = !!(props[i] in f);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));

       
        // Big thx to @miketaylr for the html5 forms expertise. http://miketaylr.com/
        ret[inputtypes] = (function(props) {
            for (var i = 0,bool,len=props.length;i<len;i++) {
                f.setAttribute('type', props[i]);
                bool = f.type !== 'text';
                
                // chrome likes to falsely purport support, so we feed it a textual value
                // if that doesnt succeed then we know there's a custom UI
                if (bool){  

                    f.value = smile;
                    
                            
                    if (/tel|search/.test(f.type)){
                      // spec doesnt define any special parsing or detectable UI 
                      //   behaviors so we pass these through as true
                      
                    } else if (/url|email/.test(f.type)) {
                      // real url and email support comes with prebaked validation.
                      bool = f.checkValidity && f.checkValidity() === false;
                      
                    } else {
                      bool = f.value != smile;
                    }
                }
                
                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));

    }

    for ( var feature in tests ) {
        if ( hasOwnProperty( tests, feature ) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            classes.push( ( ( ret[ feature.toLowerCase() ] = tests[ feature ]() ) ?  '' : 'no-' ) + feature.toLowerCase() );
        }
    }
    
    // input tests need to run.
    if (!ret[input]) webforms();

    ret.addTest = function (feature, test) {
      feature = feature.toLowerCase();
      
      if (ret[ feature ]) {
        return; // quit if you're trying to overwrite an existing test
      } 
      test = !!(test());
      docElement.className += ' ' + (test ? '' : 'no-') + feature; 
      ret[ feature ] = test;
      return ret; // allow chaining.
    };

    set_css( '' );
    m = f = null;

    if ( enableHTML5 && (function(){ var elem = doc.createElement("div");
                                      elem.innerHTML = "<elem></elem>";
                                      return elem.childNodes.length !== 1; })()) {
        // iepp v1.5.1 MIT @jon_neal  http://code.google.com/p/ie-print-protector/
        (function(p,e){function q(a,b){if(g[a])g[a].styleSheet.cssText+=b;else{var c=r[l],d=e[j]("style");d.media=a;c.insertBefore(d,c[l]);g[a]=d;q(a,b)}}function s(a,b){for(var c=new RegExp("\\b("+m+")\\b(?!.*[;}])","gi"),d=function(k){return".iepp_"+k},h=-1;++h<a.length;){b=a[h].media||b;s(a[h].imports,b);q(b,a[h].cssText.replace(c,d))}}function t(){for(var a,b=e.getElementsByTagName("*"),c,d,h=new RegExp("^"+m+"$","i"),k=-1;++k<b.length;)if((a=b[k])&&(d=a.nodeName.match(h))){c=new RegExp("^\\s*<"+d+"(.*)\\/"+d+">\\s*$","i");i.innerHTML=a.outerHTML.replace(/\r|\n/g," ").replace(c,a.currentStyle.display=="block"?"<div$1/div>":"<span$1/span>");c=i.childNodes[0];c.className+=" iepp_"+d;c=f[f.length]=[a,c];a.parentNode.replaceChild(c[1],c[0])}s(e.styleSheets,"all")}function u(){for(var a=-1,b;++a<f.length;)f[a][1].parentNode.replaceChild(f[a][0],f[a][1]);for(b in g)r[l].removeChild(g[b]);g={};f=[]}for(var r=e.documentElement,i=e.createDocumentFragment(),g={},m="abbr|article|aside|audio|canvas|command|datalist|details|figure|figcaption|footer|header|hgroup|keygen|mark|meter|nav|output|progress|section|source|summary|time|video",n=m.split("|"),f=[],o=-1,l="firstChild",j="createElement";++o<n.length;){e[j](n[o]);i[j](n[o])}i=i.appendChild(e[j]("div"));p.attachEvent("onbeforeprint",t);p.attachEvent("onafterprint",u)})(this,doc);
    }

    // Assign private properties to the return object with prefix
    ret._enableHTML5     = enableHTML5;
    ret._version         = version;

    // Remove "no-js" class from <html> element, if it exists:
    docElement.className=docElement.className.replace(/\bno-js\b/,'') + ' js';

    // Add the new classes to the <html> element.
    docElement.className += ' ' + classes.join( ' ' );
    
    return ret;

})(this,this.document);
