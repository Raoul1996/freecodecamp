/**
 * Created by RaoulChou on 2016/11/17.
 */
var colors=[
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];
var currentQutoe="", currentAuthor="";
function getQuote() {
    $.ajax({
        headers:{
            'X-Mashape-Key': 'OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V',
            Accept:'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success:function (response) {
            var response =JSON.parse(response);
            currentAuthor=response.author;
            currentQutoe=response.quote;
            $(".text-quote").text(currentQutoe);
            $(".text-author").text("————"+currentAuthor).css("text-align","right");
            var color =Math.floor(Math.random()*colors.length);
            $('html body').css('backgroundColor',colors[color]).css('color',colors[color]);
        }
    });
}
$(document).ready(function () {
    getQuote();
    $(".btn").on('click',getQuote);
});