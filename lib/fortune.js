//Fotunes cookies
var fortunesCookies = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know",
    "Whenever possible, keep it simple",
];

//외부에서 사용할수 있게하기 위해 exports에 추가해 둔다.
exports.getFortune = function(){
    var idx = Math.floor(Math.random()*fortunesCookies.length);
    return fortunesCookies[idx];
};