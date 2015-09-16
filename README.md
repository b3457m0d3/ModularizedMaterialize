#ModularizedMaterialize
MaterializeCSS broken down & separated into Require.js-flavored asynchronous module definitions.  Use Materialize with Require.js &amp; load only the components you need, when you need them.

##Installation
####Dependencies
Materialize itself relies on **jQuery**, **Hammer.js**, and **Velocity** to work it's magic, & you'll also need to use **Require.js** to load the modules, and Require's **domReady** plugin _all of which are included in this repo_.  
####HTML
Include Require.js and set the data-main attribute to your init script
```html 
<script data-main="js/main" src="js/require.js"></script>
```
####JavaScript
Require the core module, and once the DOM is ready you can begin adding in the modules you'll be using  
```javascript
require(["Materialize"], function(Materialize){
  require(["domReady!","card","dropDown"], function(doc){
  	//initialize components (if necessary)
  	$('.dropdown-button').dropdown();
  });
});
```
###Further documentation
The official [MaterializeCSS](http://materializecss.com/) page provides markup snippets and initialization calls (where applicable) for using the components listed below, and many more!

##Module List
 * **boxed**       - lightbox alternative
 * **card**        - content cards
 * **charCounter** - display how many characters have been typed
 * **chip**        - useful for contacts or tags
 * **collapsible** - accordion-type elements
 * **datePicker**  - a calendar ui for selecting the date 
 * **dropDown**    - reveal more options on click or hover
 * **easing**      - formulas for controlling animations
 * **fabMenu**     - Fixed Action Button shows more options on hover
 * **fileInput**   - single or multiple file selection
 * **form**        - form field behaviors and validation
 * **modal**       - dismissable content overlay
 * **noUiSlider**  - full-featured range slider 
 * **parallax**    - scroll effect giving the illusion of distance
 * **picker**      - core picker datePicker derives from
 * **pushpin**     - affix an element to the given coordinates
 * **range**       - basic range slider 
 * **scrollSpy**   - sync active nav items to scroll position
 * **select**      - a list of options to choose from
 * **sideNav**     - slide out content panel
 * **slider**      - transition between a list of images & content
 * **dismissable** - react to items being swiped left or right
 * **tabs**        - organize and navigate content 
 * **textarea**    - makes textarea resize to fit content
 * **tooltipped**  - attach contextual messages to elements
 * **Waves**       - generate a ripple effect triggered via click
