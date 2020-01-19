window.console = window.console || { log: function() {} };
console.log('here');
var consoleRedirect = function() {
    var that = this;

    
    this.wrap;
    this.inputField;
    this.inputButton;
    this.clearButton;
    this.output;
    
    this.oldConole = window.console.log;
    
    this.multiClick = function(e) {
        if ( e.target !== this ) return;
        
        this.classList.toggle('open');
    }
 
    this.clearClick = function(e) {
        while (that.output.firstChild) that.output.removeChild(that.output.firstChild);
    }   
    
    this.submitClick = function(e) {
        let cmd = that.inputField.value;
        console.log( eval( cmd ) );
        that.inputField.value = '';
    }
    
    this.enterPressed = function(event) {
       if (event.which == 13 || event.keyCode == 13) {
            that.submitClick(null);
            return false;
        }
        return true;
    }
    
    //Creates the debug console and appends it to the page.
    this.initialize = function() {
        that.output = document.createElement( 'ul' );
        that.output.setAttribute('id', 'debug-console-output' );
        
        that.inputField = document.createElement( 'input' );
        that.inputField.setAttribute('id', 'debug-console-input' );
        that.inputField.setAttribute('type', 'text');
        that.inputField.onkeypress = that.enterPressed;
        
        that.inputButton = document.createElement( 'input' );
        that.inputButton.setAttribute('id', 'debug-console-input-button' );
        that.inputButton.setAttribute('type', 'button');
        that.inputButton.setAttribute('value', 'Submit');
        that.inputButton.onclick = that.submitClick;
    
        that.clearButton = document.createElement( 'input' );
        that.clearButton.setAttribute('id', 'debug-console-clear-button' );
        that.clearButton.setAttribute('type', 'button');
        that.clearButton.setAttribute('value', 'Clear Console');
        that.clearButton.onclick = that.clearClick;
        
        
        let inputWrap = document.createElement( 'div' );
        inputWrap.setAttribute('id', 'debug-console-input-wrap' );
        inputWrap.appendChild( that.inputField );
        inputWrap.appendChild( that.inputButton );
        inputWrap.appendChild( that.clearButton );
        
        let header = document.createElement( 'h3' );
        header.innerText = "Debug Console";
            
        that.wrap = document.createElement( 'div' );
        that.wrap.setAttribute('id', 'debug-console-wrap' );
        that.wrap.appendChild( header );
        that.wrap.appendChild( that.output );
        that.wrap.appendChild( inputWrap );
        
    
        if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
          document.body.appendChild(that.wrap);
        } else {
          document.addEventListener("DOMContentLoaded", function() {
              document.body.appendChild(that.wrap);
          });
        }
    }



    
    this.printObject = function(obj, container, type = false, firstLevel = false) {
        for (var key in obj) {
            let itemWrap = document.createElement( 'li' );
            itemWrap.className = 'debug-item';
            if ( type ) {
                itemWrap.className += ' ' + type;
            }
            
            if ( typeof( obj[key] ) !== 'object') {
                if ( firstLevel ) {
                    itemWrap.innerText = obj[key];
                } else {
                    itemWrap.innerText = key + ': ' + obj[key].toString().replace(/(\r\n|\n|\r)/gm," ");    
                }
                itemWrap.className += ' single';
                
                
            } else {
                if ( ! firstLevel ) {
                    itemWrap.innerText = key;    
                }
                
                itemWrap.className += ' multi';
                itemWrap.onclick = that.multiClick;
                let subContainer = document.createElement( 'ul' );
                itemWrap.appendChild( subContainer );
                that.printObject( obj[key], subContainer );
            }
            container.appendChild( itemWrap );
        }
            
        return container;
    }
    
    this.appendOutput = function( attributes, type = 'information' ) {
        that.oldConole.apply(console, attributes);
        that.printObject( attributes, that.output, type, true );
    }
    

    window.console.log = function() {
        that.appendOutput( arguments, false );
    }
    
    window.console.info = function() {
        that.appendOutput( arguments, 'information' );
    }
    
    window.console.warn = function() {
        that.appendOutput( arguments, 'warning' );
    }
    
    window.console.error = function() {
        that.appendOutput( arguments, 'error' );
    }

    
    

    this.initialize();


    console.log( window.console );

}

consoleRedirect();


