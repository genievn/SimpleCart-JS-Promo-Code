(function(){
    // create a cookie function
    function createCookie(name,value,days) {
        if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
        } else{
            var expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }

    //This function checks to see if a cookie has been created, if so hide the promo input box
    var getCookie = function(name) {
        var start = document.cookie.indexOf(name + '=');
        if(start < 0){
            return null;
        }
        start = start + name.length + 1;
        var end = document.cookie.indexOf(';', start);
        if(end < 0){
            end = document.cookie.length;
        }
        while(document.cookie.charAt(start) == ' ') {
        start++;
        }
        return unescape(document.cookie.substring(start, end));
    }

    //if the cookie exists
    if(getCookie("promo")){ 
        //the ID for my promo code input box
        jQuery('#promoCodeDiv').hide(); 
    }  else{
        jQuery('#promoCodeDiv').show();
    }

    //This is called when promo code submit button is clicked
    jQuery("#promoSub").click(function Discount() {
        //Interact with PHP file and check for valid Promo Code
        jQuery.post("discount.php", { code: jQuery('#code').val() } , function(data) {
            console.log(jQuery('#code').val());
            if (data=="0" || data=='') { 
                console.log("Wrong Code"); 
            }
            else {
                //create our cookie function if promo code is valid
                //create cookie for 1 day
                createCookie("promo","true",1);
                var y = (data/100);
                for(var i=0; i<simpleCart.items().length; i++){
                    var itemPrice = simpleCart.items()[i].price();
                    var theDiscount = itemPrice * y;
                    var newPrice = itemPrice - theDiscount;
                    simpleCart.items()[i].set("price", newPrice)
                }
                simpleCart.update();
                //hides the promo box so people cannot add the same promo over and over
                jQuery('#promoCodeDiv').hide();
                
            }
        });
    });
})();
