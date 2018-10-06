      
                var tab=[];

               // var dic_name_number = {}; // 定义一个字典
                var dic_name={};
                var a=2004,b=12;
             
             for(var i=0;i<2;i++){
                 var dic=
                     {"annee": a,
                      "number":b   
                     }
                 tab.push(dic);
                 a=2010;
                 b=10;
                 
             }
                 dic_name["jiaqian"]=tab;     

var chart = AmCharts.makeChart( "chartdiv", {
  "type": "serial",
  "theme": "light",
  "dataProvider": tab,
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
