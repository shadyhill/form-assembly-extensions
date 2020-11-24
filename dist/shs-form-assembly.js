/*!
 * shs-form-assembly v1.0.0
 * (c) 2020 Shady Hill Studios, LLC
 * GNU GENERAL PUBLIC LICENSE
 * https://github.com/shadyhill/form-assembly-extensions
 */

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", fieldGroupSizer);
    document.addEventListener("DOMContentLoaded", setFormVars);
} else {
    // `DOMContentLoaded` has already fired
    fieldGroupSizer();
    setFormVars();
}

function fieldGroupSizer() {
    var formBlock = document.querySelector('form');
    var fieldGroupCollection = formBlock.getElementsByClassName('section group');
    var fieldGroups = Array.prototype.slice.call(fieldGroupCollection);
    for(var i = 0; i < fieldGroups.length; i++) {
        var kids = fieldGroups[i].querySelectorAll('.oneField').length;
        if (kids >= 3) {
            fieldGroups[i].classList.add('cl-33');
        } else if (kids === 2) {
            fieldGroups[i].classList.add('cl-50');
        } else {
            fieldGroups[i].classList.add('cl-100');
        }
    }
}

function setFormVars() {
    // get any URL vars
    var urlQueryString = window.location.search;
    var urlParams = new URLSearchParams(urlQueryString);

    // FA Field Value : URL Key
    var varsArray = {
        ga_content: 'utm_content',
        ga_term: 'utm_term',
        ga_source: 'utm_source',
        ga_campaign: 'utm_campaign',
        ga_medium: 'utm_medium',
        POI: 'POI',
        fa_referrer: 'fa_referrer',
        lead_source: 'lead_source'
    };

    for (key in varsArray) {
        var target = document.querySelector("input[default='"+key+"']");
        if (target) {
            if (urlParams.has(varsArray[key])) {
                target.setAttribute('value', urlParams.get(varsArray[key]));
            } else {
                target.setAttribute('value', '');
            }
        }
    }

    // Set the fa_referrer if it exists
    var refInput = document.querySelector("input[default='fa_referrer']");
    if (refInput) {
        var ref = location.protocol + '//' + location.host + location.pathname;
        refInput.setAttribute('value', ref);
    }
}