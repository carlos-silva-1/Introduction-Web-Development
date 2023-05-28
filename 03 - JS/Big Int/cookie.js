/* Example of function call that sets the information that the slider position is equal to 50:
   setCookie("rangePosition", 50, 365) */
   function setCookie(cname, cvalue, exdays) {
    var d = new Date();

    // Default at 365 days.
    exdays = exdays || 365; 
  
    // Get unix milliseconds at current time plus number of days
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
  
    // cvalue must be encoded because it can be utf-8
    document.cookie = `${cname}=${encodeURIComponent(cvalue)};${expires};path=/`; // cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* Deletes a cookie with name equals to "cname". */
function deleteCookie(cname) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

/* When a new range position is chosen the cookies are deleted and substituted by a new one with updated position. */
function updateCookie(cname, cvalue, exdays) {
    deleteCookie(cname);
    setCookie(cname, cvalue, exdays);
}

/* Loads previous section's cookies. */
window.onload = function(){
    // cookie that saves current position of #n
    var rangePosition = getCookie("rangePosition");
    document.getElementById("i").innerHTML = rangePosition;

    // cookie that saves current position of #i1
    var i1 = getCookie("i1");
    document.getElementById("i1").innerHTML = i1;

    // cookie that saves current position of #prod
    var prod = getCookie("prod");
    document.getElementById("prod").innerHTML = prod;

    // cookie that saves current position of #prod2
    var prod2 = getCookie("prod2");
    document.getElementById("prod2").innerHTML = prod2;

    // cookie that saves current position of #range
    var range = getCookie("range");
    document.getElementById("range").innerHTML = range;

    // if current number is larger than Number.MAX_SAFE_INTEGER, indicates with color red
    if(i1 > 41){
        let mark = document.querySelectorAll("mark");
        mark.forEach(item => {
            item.style.color = "red";
        })
    }
}

/* Returns the value of the cookie. */
function getCookie(cname) {
    var name = cname.trimStart() + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    let cookie = ca.find((row) => row.indexOf(name) >= 0); // .startsWith(name));

    // needed to show all of the terms in the factorization, otherwise would just show the first
    if(cname === "prod2"){
        cookie = cookie.split("=")[1];
        for(let i = 4; i < ca.length-1; i++){
            cookie += ca[i];
        }
        return cookie;
    }

    return cookie == undefined ? "" : cookie.split("=")[1];
}
