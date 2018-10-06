var data = {
    series: [
        {
            name: "Serie 1",
            values:[0.5, 0.3, 0.7, 0.2]
        },
        {
            name: "Serie 2",
            values:[0.4, 0.2, 0.9, 0.3]
        },
        {
            name: "Serie 3",
            values:[0.2, 0.1, 0.6, 0.4]
        },
        {
            name: "Serie 4",
            values:[0.9, 0.7, 0.5, 0.8]
        }
    ],
    colonnes: ["Colonne 1", "Colonne 2", "Colonne 3", "Colonne 4"]
};

var largeur =1000
var hauteur = 800
var paper = Raphael("inselberg", largeur, hauteur)
paper.rect(0, 0, largeur, hauteur).attr({
    fill: "#DDFFFF"
});

var nbColonnes = data.colonnes.length;
console.log(nbColonnes);

var marge = 20
var largGraph =largeur - 2*marge;
var hautGraph = hauteur - 3*marge;
var distanceCol = largGraph/nbColonnes;

var xPos = [];
for(var i=1; i<=nbColonnes; i++){
    xPos.push(distanceCol*i+marge);
}
var yPos =[marge*2, hauteur-marge];
console.log(xPos,yPos);

//ajouter axes
for(var i=0; i<xPos.length;i++){
    //var path = paper.path("M"+xPos[i]+","+yPos[0]+"L"+xPos[i]+","+yPos[1]);
    var path = paper.path(`M${xPos[i]},${yPos[0]}L${xPos[i]},${yPos[1]}`);
    paper.text(xPos[i]-10,marge,data.colonnes[i])
    
}
// ajouter etiquettes
var nbSeries = data.series.length;
var couleur=[];
for(var i=1; i<=nbSeries;i++){
    teint = 360/nbSeries+i*90;
    couleur.push(`hsla(${teint},50%,80%,60%)`);
}
for(var i=0; i<nbSeries;i++){
    var rect = paper.rect(marge*3,hautGraph*data.series[i].values[0]-15,100,30,5).attr({fill: couleur[i]});
    var text = paper.text(marge*3+50,hautGraph*data.series[i].values[0], data.series[i].name).attr({"font-size":"15px"});
    //Ajouter des intersctions avec des colonnes
    
    for(var j=0;j<4;j++){
        var ch =paper.path(`M${xPos[i]},${hautGraph*data.series[j].values[i]}L${xPos[i+1]},${hautGraph*data.series[j].values[i+1]}`);
        var intersections = paper.circle(xPos[i],hautGraph*data.series[j].values[i],5);
        intersections.attr({fill:couleur[j]});        
        ch.attr({"stroke-width":"1px", "stroke": couleur[j]})
    }
}
