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
//Page d'un produit 

function displayModal(){
	$("#dialog").fadeIn(500);
	setTimeout(function() {
	    $("#dialog").fadeOut(500);
	},5000);
}

setCount();

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

let id = $.urlParam('id') - 1;

if ((Math.floor(id) == id && $.isNumeric(id)) && id > -1 && id < 13){
	
	$.getJSON('http://localhost:8000/data/products.json', function(data){
		let product = {
			name : data[id].name,
			price : "Prix: <strong>" + data[id].price + "&thinsp;$</strong>",
			image : "./assets/img/"+ data[id].image,
			description : data[id].description,
			features : data[id].features
		}
		$("#product-name").text(product.name);
		$("#product-image").attr("src",product.image);
		$("#product-image").attr("alt",product.name);
		$("#product-desc").empty().append(product.description);
		$("#product-price").empty().append(product.price);
		$("#product-features").empty();
		product.features.forEach(function(element) {
		  $("#product-features").append("<li>" + element + "</li>")
		});
	});

}
else {
	$("main").hide();
	$("main").after("<h1>Page non trouvée!</h1>");
}

$(document).on('submit', '#add-to-cart-form', function(event) {
    event.preventDefault();
    let c = parseInt(localStorage.getItem("count"));
    c += parseInt($("#product-quantity").val());
    localStorage.setItem("count",c);
    setCount();
    displayModal();
  });


