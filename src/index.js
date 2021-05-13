function switchMenuBar(){
    const menu = document.querySelector("#menu");
    if (menu.classList.contains("hidden")){
        menu.classList.remove("hidden");
    }else{
        menu.classList.add("hidden");
    }
}

function foldInfoldOut(this_id){

    
    var id = this_id.charAt(1);
    var id1 = "#" + "o" + id;
    var id2 = "#" + "i" + id;
    var id3 = "#" + "d" + id;

    const div_fold_out = document.querySelector(id1);
    const div_fold_in = document.querySelector(id2);
    const div_data = document.querySelector(id3);

    if (div_fold_out.classList.contains("hidden")){
        div_fold_in.classList.add("hidden");
        div_fold_out.classList.remove("hidden");
        div_data.classList.remove("hidden");
        
    }else{
        div_fold_out.classList.add("hidden");
        div_fold_in.classList.remove("hidden");
        div_data.classList.add("hidden");
        console.log("test");
    }
}

let sensors = new sensor_list();

function selectSensor(){

    const add1 = document.querySelector("#add1");
    const add2 = document.querySelector("#add2");

    add1.classList.add("hidden");
    add2.classList.remove("hidden");

    console.log("Liste der Sensoren:")
    console.log(APIgetSensors());
}

function addSensor(){

    const add1 = document.querySelector("#add1");
    const add2 = document.querySelector("#add2");

    add1.classList.remove("hidden");
    add2.classList.add("hidden");

    var value = document.querySelector("#choice").value;

    var name = document.querySelector("#sensorName").value;
    var unit = document.querySelector("#sensorUnit").value;
    var id = processAPICrSe(name, unit);

    var new_sensor = new sensor(name, unit, id);

    var div_id = sensors.length() + 1;
    new_sensor.create(div_id);
    sensors.add(new_sensor);

    console.log(sensors.print_list());

}

function removeSensor(id){

    //var list_id = 1  -1;
    var list_id = parseInt(id)-1;
    sensors.list[list_id].delete();
    sensors.remove(list_id);

    console.log(sensors.print_list());
}

async function APIcreateSensor(name, unit){
    const data = {
        "name": name,
        "unit": unit
    }

    try{
        const response = await fetch("http://localhost:8080/sensor", {
            headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;
    }catch(error){
        //alert(error);
        console.error(error)
    }
}

async function processAPICrSe(name, unit){
    const APIresponseData = await APIcreateSensor(name, unit);
    const id = APIresponseData.id;

    return id;
}

async function APIgetSensors(){
    var path = "http://localhost:8080/sensor";
    try{
        const response = await fetch(path, {
            headers: {
                Accept: "*/*"
            },
            method: "GET"
        });
        const responseData = await response.json();
        return responseData;
    }
    catch(error){
        //alert(error);
        console.error(error);
    }
}

async function processAPIGeSe(){
    const APIresponseData = await APIgetSensors();

    return APIresponseData;
}

async function APIgetData(id, timefrom, timeto, resolution){
    //Time Example: 2021-04-30T12%3A33%3A00Z  -  2021-04-30T12:33:00Z

    timefrom = convertTime(timefrom); //Convert ISO 8601 Format to required format for fetching


    if(timeto != 0 || timeto != null){
        timeto = convertTime(timeto); //Convert ISO 8601 Format to required format for fetching
        var path = "http://localhost:8080/sensor/" + id + "/data/?from=" + timefrom + "&to=" + timeto + "&resolution=" + resolution; //set path for fetching from the API
    }else{
        var path = "http://localhost:8080/sensor/" + id + "/data/?from=" + timefrom + "&&resolution=" + resolution; //set path for fetching from the API
    }

    try{
        const response = await fetch(path , {
            headers: {
                Accept: "*/*"
            }
        });
        const responseData = await response.json();
        return responseData;
    }
    catch(error){
        console.error(error);
    }
    
}

async function processAPIGeDa(){
    //id, timefrom, timeto, resolution

    var id = "2e6b4d73-776c-48cb-a118-47b79916df64";
    var timefrom = "2021-05-13T19:30:00Z";
    var timeto = "2021-05-13T19:32:44Z";
    var resolution = "MINUTELY";

    const APIresponseData = await APIgetData(id, timefrom, timeto, resolution);
    var ChartData = [];

    for(var i = 0; i < APIresponseData.length; i++){
        ChartData[i] = {
          x: APIresponseData[i].timestamp,
          y: APIresponseData[i].value
        }
    }

    /*
    var options = {
        chart: {
            type: 'line'
        },
        stroke: {
            curve: 'straight'
        },
        series: [{
            data: ChartData
        }],
        xaxis: {
            type: 'category'
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
    */

    var options = {
        chart: {
          type: 'line'
        },
        series: [{
          name: 'sales',
          data: [30,40,35,50,49,60,70,91,125]
        }],
        xaxis: {
          categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
        }
      }
      
      var chart = new ApexCharts(document.querySelector(".chart"), options);
      
      chart.render();

    //1620934260
}

function createChart(){
    processAPIGeDa()
}

function convertTime(time){

    var temp1 = time.substring(0,13)
    var temp2 = time.substring(14,16)
    var temp3 = time.substring(17,20)


    var convertedTime = temp1 + "%3A" + temp2 + "%3A" + temp3;

    return convertedTime;
}
