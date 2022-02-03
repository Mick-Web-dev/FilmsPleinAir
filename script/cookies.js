 /**
 * Afficher l'avertissement sur l'utilisation des cookies
 * http://www.fobec.com/tuto/1172/afficher-avertissement-sur-utilisation-cookies.html
 * @author Fobec septembre 2015
 */
  var Cookie_Eu = {
    //Ecrire un cookie contenant la date d'acceptation
    write: function(d) {
        var buf = '';
        if (d) {
            var date = new Date();
            date.setTime(date.getTime() + (d * 24 * 60 * 60 * 1000));
            buf = "cookie_policy_validation=agree; expires=" + date.toGMTString() + "; domain=" + document.domain + ";";
            document.cookie = buf;
 
            var div = document.getElementById('cookie_policy_msg');
            if (div) {
                div.parentNode.removeChild(div);
            }
        }
    },
    //Cherche le cookie contenant la date d'acceptation
    isSet: function()
    {
        var nameEQ = "cookie_policy_validation=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                var val = c.substring(nameEQ.length, c.length);
                if (val.trim() === 'agree') {
                    return true;
                }
            }
        }
        return false;
    },
    //Afficher le bandeau d'avertissement
    askForAgree: function() {
        if (this.isSet() == false) {
            var docbody = document.body || document.getElementsByTagName('body')[0];
 
            var div_cookie = document.createElement('div');
            div_cookie.id = 'cookie_policy_msg';
            div_cookie.className = 'cookie_policy_msg';
            var t = "<div>En poursuivant votre navigation sur ce site, vous acceptez l’utilisation de Cookies utilisés pour les publicités et pour les statistiques de visites,";
            t += '<a href="http://monsite.com/politique-cookie.html">en savoir plus</a><a href="javascript:Cookie_Eu.write(365);">OK</a></div>';
 
            div_cookie.innerHTML = t;
            docbody.insertBefore(div_cookie, docbody.childNodes[0]);
        }
    }
};
//Lancer le test d'existance du cookie
Cookie_Eu.askForAgree();