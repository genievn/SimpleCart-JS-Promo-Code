SimpleCart-JS-Promo-Code
========================

Promo code functionality for simple cart js

I have created a working promo code script for SimpleCart JS (simplecartjs.org). The problem with other solutions I 
found was that Pay Pal wouldnt' accept negative values. So what I did instead was grab all the items in the cart 
and add the discount to each of the items and then update the cart. The script creates a cookie if the promo code 
is correct. There is a script to check if the cookie exists and if it does, the promo code box is hidden to avoid 
the same promo code being submitted over and over. The cookie lasts for a day. 

This may not be the most elegant way to do it and has many security flaws, but it is better than any other 
solution that I could find.

Feel free to expand on this script and make it better.
Feel free to email me about it at seanpapanikolas@gmail.com
