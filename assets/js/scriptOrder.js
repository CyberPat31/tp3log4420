// Script entier en mode strict
"use strict";

//en tete et gestion de la pastille rouge 
function setCount(){
	if (localStorage.getItem("count") == null){
		localStorage.setItem("count",0);
	}

	let count = localStorage.getItem("count");

	if (count < 1){
		$(".shopping-cart > .count").hide();
	}
	else {
		$(".shopping-cart > .count").text(count).show();

	}
}

setCount();

$("#order-form").validate({
  rules: {
    phone: {
      required: true,
      phoneUS: true
    },
    "credit-card": {
      required: true,
      creditcard: true
    },
    "credit-card-expiry": {
    	required: true,
    	"regex": /^((0[1-9])|(1[0-2]))\/(\d{4})$/
    }
  }
});

jQuery.validator.addMethod(
  "regex",
   function(value, element, regexp) {
       if (regexp.constructor != RegExp)
          regexp = new RegExp(regexp);
       else if (regexp.global)
          regexp.lastIndex = 0;
          return this.optional(element) || regexp.test(value);
   },"La date d\'expiration de votre carte de crédit est invalide."
);

$(document).on('submit', '#order-form', function(event) {
    
	let lname = $("#last-name").val();
	let fname = $("#first-name").val();
	if (localStorage.getItem("commandnb") == null){
		localStorage.setItem("commandnb",0);
	}
	let commandnb = parseInt(localStorage.getItem("commandnb")) + 1;

	localStorage.setItem("commandnb",commandnb);
	localStorage.setItem("lname",lname);
	localStorage.setItem("fname",fname);
	localStorage.setItem("count",0);

    setCount();
  });



