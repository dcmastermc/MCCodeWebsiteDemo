var head = document.head || document.getElementsByTagName("head")[0];

var secondaryNavbarStyle = document.getElementById("secondaryNavbarStyle");

if (secondaryNavbarStyle == null) {
    secondaryNavbarStyle = document.createElement("style");
    secondaryNavbarStyle.type = "text/css";
    secondaryNavbarStyle.id = "secondaryNavbarStyle";
    head.appendChild(secondaryNavbarStyle);
    secondaryNavbarStyle = document.getElementById("secondaryNavbarStyle");
}

function adjustSecondaryNavbar(scrollY) {
    var height = 80 - scrollY;
    if (height > 80) {
        height = 80;
    } else if (height < 60) {
        height = 60;
    }
    var css = ".navbar-fixed-top { min-height: " + height + "px; height: " + height + "px; } .navbar-default .navbar-brand { line-height: " + height + "px; } .navbar-default .navbar-brand>img { margin-top: " + (height / 8) + "px; height: " + (height / 4 * 3) + "px; } .navbar-default .navbar-nav>li>a { line-height: " + height + "px; } html { height: calc(100% - " + height + "px); } body { margin-top: " + height + "px; } ";
    if (secondaryNavbarStyle.styleSheet) {
        secondaryNavbarStyle.styleSheet.cssText = css;
    } else {
        secondaryNavbarStyle.innerHTML = css;
    }
}

function unstyleSecondaryNavbar() {
    if (secondaryNavbarStyle.styleSheet) {
        secondaryNavbarStyle.styleSheet.cssText = "";
    } else {
        secondaryNavbarStyle.innerHTML = "";
    }
}

var documentElement = document.documentElement;
var lastKnownScrollX = (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0);
var lastKnownScrollY = (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0);

var scrollTicking = false;

window.addEventListener("scroll", function(e) {
    var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (deviceWidth >= 900) {
        var newScrollY = window.scrollY;
        if (!scrollTicking) {
            window.requestAnimationFrame(function() {
                adjustSecondaryNavbar(newScrollY);
                scrollTicking = false;
            });
        }
        lastKnownScrollY = newScrollY;
        scrollTicking = true;
    }
});

if(window.attachEvent) {
    window.attachEvent('onresize', function() {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (deviceWidth < 900) {
            unstyleSecondaryNavbar();
        }
    });
} else if(window.addEventListener) {
    window.addEventListener('resize', function() {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (deviceWidth < 900) {
            unstyleSecondaryNavbar();
        }
    }, true);
}
