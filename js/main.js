'use strict';
require.config({
  locale: "en_ca",
  paths:{
   /*[Frameworks]==================================================================================*/
    "jquery"       : "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery.min",
    "domReady"     : "domReady",
    "Materialize"  : "materialize",
    "Hammer"       : "Hammer",
    "hammerify"    : "hammerify",
    "Velocity"     : "velocity",
    "velocity-ui"  : "velocity-ui",
    /*[Component Modules]===========================================================================*/
    "boxed"        : "materialize/boxed",
    "card"         : "materialize/card",
    "charCounter"  : "materialize/charCounter",
    "chip"         : "materialize/chip",
    "collapsible"  : "materialize/collapsible",
    "datePicker"   : "materialize/datePicker",
    "dropDown"     : "materialize/dropDown",
    "easing"       : "materialize/easing",
    "fabMenu"      : "materialize/fabMenu",
    "fileInput"    : "materialize/fileInput",
    "form"         : "materialize/form",
    "modal"        : "materialize/modal",
    "noUiSlider"   : "materialize/noUiSlider",
    "parallax"     : "materialize/parallax",
    "picker"       : "materialize/picker",
    "pushpin"      : "materialize/pushpin",
    "range"        : "materialize/range",
    "scrollSpy"    : "materialize/scrollSpy",
    "select"       : "materialize/select",
    "sideNav"      : "materialize/sideNav",
    "slider"       : "materialize/slider",
    "staggeredList": "materialize/staggeredList",
    "tabs"         : "materialize/tabs",
    "textarea"     : "materialize/textarea",
    "tooltipped"   : "materialize/tooltipped",
    "Waves"        : "materialize/Waves",
  },
  shim: {
    "velocity"     : ["jquery"],
    "velocity-ui"  : ["velocity"]
  }
});
require(["Materialize"], function(Materialize){
  require(["domReady!","boxed","card","charCounter","collapsible","datePicker","dropDown","fabMenu","fileInput","form","modal","noUiSlider",
    "parallax","picker","pushpin","range","scrollSpy","select","sideNav","slider","staggeredList","tabs","textarea","tooltipped"], function(doc){
    Materialize.Waves();
    Materialize.toast('I am a toast!', 4000);
    Materialize.scrollFire([{selector: '#ScrollFireTest', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' }]);
    $('.materialboxed').materialbox();
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    $('.button-collapse').sideNav();
    $('ul.tabs').tabs();
    $('.modal-trigger').leanModal();
    $('.dropdown-button').dropdown();
    $('.tooltipped').tooltip({delay: 50});
    $('select').material_select();


    var slider = doc.getElementById('range-input');
    noUiSlider.create(slider, {
     start: [50],
     step: 1,
     range: {
       'min': 0,
       'max': 100
     },
     format: wNumb({
       decimals: 0
     })
    });
	});
});
