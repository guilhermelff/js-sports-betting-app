$('#multiple-select-custom-field').select2({
    theme: "bootstrap-5",
    width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    placeholder: $(this).data('placeholder'),
    closeOnSelect: false,
    tags: true
});

$("li").hover(
    function () {
        $(this).find("span").stop().animate({
            width: "100%",
            opacity: "1",
        }, 400, function () {
        })
    }, function () {
        $(this).find("span").stop().animate({
            width: "0%",
            opacity: "0",
        }, 400, function () {
        })
    }
);


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})

function esconder() {
    document.getElementById('minimizar').style.display = 'none';
    document.getElementById('expandir').style.display = 'block';
}

function mostrar() {
    document.getElementById('minimizar').style.display = 'block';
    document.getElementById('expandir').style.display = 'none';
}


import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://qmkgsptmjfsyocbglppl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFta2dzcHRtamZzeW9jYmdscHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NjQ2NjksImV4cCI6MjAwNDE0MDY2OX0.0b0azCaqSYJR8qi3o5lglzjRAoPEDH11ALL3OHaSsgk')