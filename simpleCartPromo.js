//This function checks to see if a cookie has been created, if so hide the promo input box
function getCookie(name) {
    var nameEquals = name + '=';
    var crumbs = document.cookie.split(';');
    for (var i = 0; i<crumbs.length; i++) {
        var crumb = crumbs[i];
        if (crumb.indexOf(nameEquals) == 0) {
            return unescape(crumb.substring(nameEquals.length, crumb.length));
        }
    }
    return null;
}
//if the cookie exists
if(getCookie("promo")){ 
    //the ID for my promo code input box
    $('#promoCodeDiv').hide(); 
}  else{
    $('#promoCodeDiv').show();
}

//This is called when promo code submit button is clicked
$("#promoSub").click(function Discount() {
    //Interact with PHP file and check for valid Promo Code
    jQuery.post("discount.php", { code: jQuery('#code').val() } , function(data) {
        console.log(jQuery('#code').val());
        if (data=="") { 
            console.log("Wrong Code"); 
        }
        else {
            //create our cookie function if promo code is valid
            function createCookie(name,value,days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    var expires = "; expires="+date.toGMTString();
                } else{
                    var expires = "";
                    document.cookie = name+"="+value+expires+"; path=/";
                }
                    //create cookie for 1 day
                    createCookie("promo","true",1);
                    var y = (data/100);
                for(var i=0; i<simpleCart.items().length; i++){
                        var itemPrice = simpleCart.items()[i].price();
                        var theDiscount = itemPrice * y;
                        var newPrice = itemPrice - theDiscount;
                        simpleCart.items()[i].set("price", newPrice)
                }
                //hides the promo box so people cannot add the same promo over and over
                $('#promoCodeDiv').hide();
            }
        }
    });
});
simpleCart.update();
