var tmp = function(){};
tmp.prototype = YTVID.prototype;

Trailer = function(paramaters,dispatcher) {
    /*---------------------------------------------------
        VARIABLES
    --------------------------------------------------*/
    this.paramaters = paramaters;
    this.containerID = paramaters.containerID;
    this.updateTime;

    paramaters.width = "100%";
    paramaters.height = "100%";
    this.createFullViewPort();

    paramaters.containerID = paramaters.containerID+"-child";

    YTVID.call(this, paramaters,dispatcher);
    this.bindEvents();
    if(this.paramaters.customControls) this.onVideoResize();
};

Trailer.prototype = new tmp();

Trailer.prototype.constructor = Trailer,

Trailer.prototype.createFullViewPort = function(){
    this.view = document.getElementById(this.containerID);
    this.view.style.position = "fixed";
    this.view.style.left = "100vw";
    this.view.style.top = "0px";
    this.view.style.width = "100vw";
    this.view.style.height = "100vh";
    this.view.style.overflow = "hidden";
    this.view.style.zIndex = 99999;
    if(!this.paramaters.customBackground) this.view.style.backgroundColor = "black";

    this.ytChild = document.createElement("div");
    this.ytChild.id = this.containerID + "-child";
    this.view.appendChild(this.ytChild);
};

Trailer.prototype.bindEvents = function(){
   document.getElementById(this.paramaters.closeBtn).addEventListener("click",this.onTrailerClose.bind(this));
   this.dispatcher.addEventlistener("SHOW_TRAILER",this.show.bind(this));
    // Custom Controls
   this.dispatcher.addEventlistener("PLAY_TRAILER",this.play.bind(this));
   this.dispatcher.addEventlistener("PAUSE_TRAILER",this.pause.bind(this));
};

Trailer.prototype.onTrailerClose = function(event){
    this.hide();
}

Trailer.prototype.show = function(){
    this.visible= true;
    document.documentElement.style.overflow = document.body.style.overflow =  "hidden";
    // if(this.view.hidden){
        TweenMax.set(this.view,{display:"block"});
        TweenMax.fromTo(this.view, 0.625, {left: "100vw"}, {left: "0vw", ease: Power4.easeInOut, onComplete: function() {
            if(Detectizr.device.type ==="desktop") this.play();
        }.bind(this)});
    // }
},

Trailer.prototype.hide = function(){
    this.visible= false;
    document.documentElement.style.overflow = document.body.style.overflow =  "auto";
    this.view.hidden = true;
    this.stop();

    app.sounds.unMute()
    TweenMax.fromTo(this.view, 0.625, {left: "0vw"}, {left: "100vw", ease: Power4.easeInOut, onComplete:function(){
        this.view.style.display = "none";
    }.bind(this)})
},

Trailer.prototype.swapSrc = function(id){
      if(Detectizr.device.type ==="desktop")  this.player.loadVideoById(id);
      else this.player.cueVideoById(id);
}


