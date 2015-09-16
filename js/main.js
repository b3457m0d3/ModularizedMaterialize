'use strict';
require.config({
  locale: "en_ca",
  paths:{
   /*[Frameworks]==================================================================================*/
    "jquery"       : "https:cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery.min",
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
    "dismissable"  : "materialize/dismissable",
    "tabs"         : "materialize/tabs",
    "textarea"     : "materialize/textarea",
    "tooltipped"   : "materialize/tooltipped",
    "Waves"        : "materialize/Waves",
  },
  shim: {
    "Velocity"     : ["jquery"],
    "velocity-ui"  : ["Velocity"]
  }
});
require(["Materialize"], function(Materialize){
  require([
    "domReady!",
    "noUiSlider",
    "boxed",
    "card",
    "charCounter",
    "collapsible",
    "datePicker",
    "dismissable",
    "dropDown",
    "fabMenu",
    "fileInput",
    "form",
    "modal",
    "parallax",
    "pushpin",
    "range",
    "scrollSpy",
    "select",
    "sideNav",
    "slider",
    "tabs",
    "textarea",
    "tooltipped"
  ], function(doc,noUiSlider){
    Materialize.Waves();
    Materialize.toast('I am a toast!', 4000);
    Materialize.scrollFire([{selector: '#ScrollFireTest', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' }]);
    $('.materialboxed').materialbox();
    $('input, textarea').characterCounter();
    $('.collapsible').collapsible({ accordion : false });
    $('.datepicker').pickadate({ selectMonths: true, selectYears: 15 });
    $('.dropdown-button').dropdown();
    $('.modal-trigger').leanModal();
    noUiSlider.create($("#range-input")[0], { start: [50], step: 1, range: { 'min': 0, 'max': 100 }, format: wNumb({ decimals: 0 }) });
    $('.button-collapse').sideNav();
    $('ul.tabs').tabs();
    $('.tooltipped').tooltip({delay: 50});
	});
});
