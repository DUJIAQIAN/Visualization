var dic_name=[];
let annee=2004;
let URL= `https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_prenoms_2004_a_2012&q=annee%3D${annee}&rows=10000&facet=sexe&facet=annee&facet=prenoms`;
//use JQuery.Ajax.get to get data from the site
$.get(URL,function(data,status){
    traitement(data);              
})  


            
function traitement(data){
    //console.log(annee);
    //console(data);
    //console.log(data.records);
//put data into a Array like:["jiaqian":[{"annee":2004,"number":10},{"annee=2006,"number"=2}]]
    data.records.forEach(element =>{
         // console.log(`${element.fields.prenoms}:${element.fields.nombre}`); 
        if(dic_name.hasOwnProperty(element.fields.prenoms)==true){
            var dic={
                        "annee":annee,
                        "number":element.fields.nombre
                    }
                        
            dic_name[element.fields.prenoms].push(dic); 
        }else{
           var table =[{"annee": annee, "number":element.fields.nombre}];
           dic_name[element.fields.prenoms]=table; 
             }
    });
// put names into slection list of html page                      
    if(annee==2017){
            console.log(Object.keys(dic_name));
            
            for(var i=0;i<Object.keys(dic_name).length;i++){
                var option = new Option(Object.keys(dic_name)[i],Object.keys(dic_name)[i]);
                var sel=document.getElementById("prenoms");
                sel.options.add(option);
            }
    }
//Loop function traitement until year is 2006
    if(annee<2017){
            annee++;
            URL=`https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_prenoms_2004_a_2012&q=${annee}&rows=10000&facet=sexe&facet=annee&facet=prenoms`;
                        
            $.get(URL, function(data, status){
                traitement(data);
            })     
    }
}

// Show data on a Simple-Column-Chart            
function visualization(value){
    console.log(dic_name);
    var chart = AmCharts.makeChart( "chartdiv", {
                "type": "serial",
                "theme": "light",
                "dataProvider": dic_name[value], 
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [ {
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "number"
                } ],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "annee",
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                },
                "export": {
                "enabled": true
                }

  } );
}