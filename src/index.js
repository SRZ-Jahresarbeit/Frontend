var timefrom = "";
var timeto = "";

var resolutionList = ["MINUTELY", "HOURLY", "DAILY"];
var resolutionStatus = 1;

function resetChartPeriod(){
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; //e.g. 5th month = 4
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();

    

    var new_month;
    if(month < 10){
        new_month = "0" + month.toString();
    }
    if(resolutionList[resolutionStatus] == "MINUTELY"){
        timefrom = "" + year + "-" + new_month + "-" + day + "T" + (hour-1) + ":" + minute + ":" + second + "Z";
    }
    if(resolutionList[resolutionStatus] == "HOURLY"){
        timefrom = "" + year + "-" + new_month + "-" + (day-1) + "T" + hour + ":" + minute + ":" + second + "Z";
    }
    if(resolutionList[resolutionStatus] == "DAILY"){
        month -= 1;
        if(month < 10){
            new_month = "0" + month.toString();
        }
        timefrom = "" + year + "-" + new_month + "-" + day + "T" + hour + ":" + minute + ":" + second + "Z";
    }

    //timefrom = "" + year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "Z";
    timeto = "" + year + "-" + new_month + "-" + day + "T" + hour + ":" + minute + ":" + second + "Z";  
}
resetChartPeriod();


async function loadDashboardsAndSensorsFromBackend(){

    var dashboard_list = await APIgetDashboards();
    console.log(APIgetDashboards());
    for(var i = 0; i < dashboard_list.length; i++){
        var dashboard_name = dashboard_list[i].name;
        var dashboard_id = dashboard_list[i].id;
        var dashboard_sensors = dashboard_list[i].sensors;

        var dashboard_div_id = dashboards.length() + 1;
        var new_dashboard = new dashboard(dashboard_name, dashboard_id);
        dashboards.add(new_dashboard); 
        new_dashboard.create_dashboard(dashboard_div_id);

        for(var x = 0; x < dashboard_sensors.length; x++){

            var sensorID = dashboard_sensors[x];
            var sensorName;
            var sensorUnit;
            var sensors = await APIgetSensors();
            for(var y = 0; y < sensors.length; y++){
                if(sensorID == sensors[y].id){
                    sensorName = sensors[y].name;
                    sensorUnit = sensors[y].unit;
                }
            }            
            var new_sensor = new sensor(sensorName, sensorUnit, sensorID);
            
            resetChartPeriod();
            new_sensor.timefrom = timefrom;
            new_sensor.timeto = timeto;
            var sensor_div_id = dashboards.list[dashboard_div_id-1].length() + 1;
            new_sensor.create(sensor_div_id, dashboard_div_id);
            dashboards.list[dashboard_div_id-1].add(new_sensor);

            var id2 = sensor_div_id + "resolutionStatus" + dashboard_div_id;
            document.getElementById(id2).innerText = resolutionList[1];

            processAPIGeDa(sensorID, new_sensor.timefrom, resolutionList[resolutionStatus], new_sensor.timeto, sensor_div_id, dashboard_div_id);
        }
        
    }
}
var dashboards = new dashboard_list();
loadDashboardsAndSensorsFromBackend();

function switchMenuBar(){
    const menu = document.querySelector("#menu");
    if (menu.classList.contains("hidden")){
        menu.classList.remove("hidden");
    }else{
        menu.classList.add("hidden");
    }
}

function foldInfoldOut(this_id){

    
    var dashboardID = getDashboardID(this_id);
    var sensorID = getSensorID(this_id);
    var id1 = sensorID + "o" + dashboardID;
    var id2 = sensorID + "i" + dashboardID;
    var id3 = sensorID + "d" + dashboardID;

    const div_fold_out = document.getElementById(id1);
    const div_fold_in = document.getElementById(id2);
    const div_data = document.getElementById(id3);

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

//let sensors = new dashboard("n");

function getDashboardID(idname){    //Die Dashboard ID ist immer die letzte Zahl in der ID des Elements
                                    //die Funktion returnt "", wenn es keine DashboardID gibt
    var dashboardID = "";
    for(var i = 0; i < idname.length; i++){
        var zeichen = idname.substring(i, i+1);
        var test = isNaN(zeichen);
        if (test == false){
            dashboardID += zeichen;
        }else{
            dashboardID = "";
            //console.log("zeichen ist keine Zahl");
        }
    }
    return dashboardID;
}

function getSensorID(idname){       //Die Sensor ID ist immer die erste Zahl in der ID des Elements
                                    //die Funktion returnt "", wenn es keine SensorID gibt
    var sensorID = "";
    for(var i = 0; i < idname.length; i++){
        var zeichen = idname.substring(i, i+1);
        var test = isNaN(zeichen);
        if (test == false){
            sensorID += zeichen;
        }else{
            //console.log("zeichen ist keine Zahl");
            return sensorID;
        }
    }
    return "";
}

async function selectSensor(id){

    var dashboardID = getDashboardID(id);
    var selectButtonID = "#select" + dashboardID;
    var addDivID = "#add" + dashboardID;
    const selectButton = document.querySelector(selectButtonID);
    const addDiv = document.querySelector(addDivID);

    selectButton.classList.add("hidden");
    addDiv.classList.remove("hidden");

    var id2 = "#choice0";
    var id3 = "choice" + dashboardID;
    const clone = document.querySelector(id2);
    var content = clone.cloneNode(true);
    content.id = "choice" + dashboardID;

    var parent = document.getElementById(id3).parentNode;
    parent.removeChild(document.getElementById(id3));
    var sensors = await APIgetSensors();
    console.log("sensors");
    console.log(sensors);

    for(var i = 0; i < sensors.length; i++){
        var option = document.createElement("option");
        option.text = sensors[i].name;
        option.value = sensors[i].id;
        content.add(option, content[i]);
    }

    parent.appendChild(content);
    refreshSensorData(id);

}

async function refreshSensorData(id){

    var dashboardID = getDashboardID(id);
    var choiceID = "choice" + dashboardID;
    var sensorNameID = "sensorName" + dashboardID;
    var sensorUnitID = "sensorUnit" + dashboardID;
    var sensorIDID = "sensorID" + dashboardID;

    var choice = document.getElementById(choiceID);
    var sensorName = document.getElementById(sensorNameID);
    var sensorUnit = document.getElementById(sensorUnitID);
    var sensorID = document.getElementById(sensorIDID)

    var sensors = await APIgetSensors();
    console.log(sensors);
    var value = choice.value;
    if(value == "--------"){
        sensorName.innerText = "";
        sensorUnit.innerText = "";
        sensorID.innerText = "";
    }
    for(var i = 0; i < sensors.length; i++){
        console.log(sensors[i].id + i);
        i = i;
        if(value == sensors[i].id){
            sensorName.innerText = sensors[i].name
            sensorUnit.innerText = sensors[i].unit
            sensorID.innerText = sensors[i].id;
        }
    }  
}

async function addSensor(id){

    var dashboardID = getDashboardID(id);
    var selectButtonID = "#select" + dashboardID;
    var addDivID = "#add" + dashboardID;
    const selectButton = document.querySelector(selectButtonID);
    const addDiv = document.querySelector(addDivID);

    selectButton.classList.remove("hidden");
    addDiv.classList.add("hidden");

    var choiceID = "#choice" + dashboardID;
    var value = document.querySelector(choiceID).value;
    var sensorName;
    var sensorUnit;
    var sensorID;
    var sensors = await APIgetSensors();
    for(var i = 0; i < sensors.length; i++){
        console.log(sensors[i].id + i);
        i = i;
        if(value == sensors[i].id){
            sensorName = sensors[i].name
            sensorUnit = sensors[i].unit
            sensorID = sensors[i].id;
        }
    }
    var new_sensor
    if (sensorID != null){
        new_sensor = new sensor(sensorName, sensorUnit, sensorID);
    }else{  
        new_sensor = new sensor(sensorName, sensorUnit, sensorID);  //später soll das hier weg; jetzt: nur zum test
    }

    resetChartPeriod();
    new_sensor.timefrom = timefrom;
    new_sensor.timeto = timeto;
    var new_sensor_div_ID = dashboards.list[parseInt(dashboardID)-1].length() + 1;
    new_sensor.create(new_sensor_div_ID, parseInt(dashboardID));
    dashboards.list[parseInt(dashboardID)-1].add(new_sensor);
    dashboards.list[parseInt(dashboardID)-1].APISaveDashboardvalues();

    console.log(dashboards.list[parseInt(dashboardID)-1].print_list());
    //createChart(sensorID, "2021-05-13T19:30:00Z", resolutionList[resolutionStatus], 0);
    
    processAPIGeDa(sensorID, new_sensor.timefrom, resolutionList[resolutionStatus], new_sensor.timeto, new_sensor_div_ID, dashboardID);

    var id2 = new_sensor_div_ID + "resolutionStatus" + dashboardID;
    document.getElementById(id2).innerText = resolutionList[1];
}

function removeSensor(id){

    var dashboardID = getDashboardID(id);
    var sensorID = getSensorID(id);
    var dashboardIDInt = parseInt(dashboardID);
    var sensorIDInt = parseInt(sensorID);

    var dashboardListID = dashboardIDInt-1;
    let dashboard = dashboards.list[dashboardListID];
    var sensorListID = sensorIDInt - 1;
    dashboard.list[sensorListID].delete();
    dashboard.remove(sensorListID);
    dashboard.APISaveDashboardvalues();
}



function changeResolutionStatus(id){
    var dashboard_div_id = getDashboardID(id);
    var sensor_div_id = getSensorID(id);
    var resolutionPlus = false;
    if(id == sensor_div_id + "resolutionPlus" + dashboard_div_id){
        resolutionPlus = true;
    }
    if(resolutionPlus == true && resolutionStatus != 2){
        resolutionStatus += 1;
    }
    if(resolutionPlus == false && resolutionStatus != 0){
        resolutionStatus -= 1;
    }
    var id2 = sensor_div_id + "resolutionStatus" + dashboard_div_id;
    document.getElementById(id2).innerText = resolutionList[resolutionStatus];

    var id3 = sensor_div_id + "chart" + dashboard_div_id;
    var chart = document.getElementById(id3);
    document.getElementById(id3).parentNode.removeChild(chart);
    var sensor = dashboards.list[parseInt(dashboard_div_id) - 1].list[parseInt(sensor_div_id) - 1];
    var sensorID = sensor.sensor_id;
    processAPIGeDa(sensorID, sensor.timefrom, resolutionList[resolutionStatus], sensor.timeto, sensor_div_id, dashboard_div_id);

}

function changeChartSettings(id){
    var dashboard_div_id = getDashboardID(id);
    var sensor_div_id = getSensorID(id);

    document.getElementById(sensor_div_id + "editChart" + dashboard_div_id).classList.remove("hidden");

}

function editChartCancel(id){
    var dashboard_div_id = getDashboardID(id);
    var sensor_div_id = getSensorID(id);

    document.getElementById(sensor_div_id + "editChart" + dashboard_div_id).classList.add("hidden");
}

function editChart(id){
    var dashboard_div_id = getDashboardID(id);
    var sensor_div_id = getSensorID(id);

    document.getElementById(sensor_div_id + "editChart" + dashboard_div_id).classList.add("hidden");

    var id3 = sensor_div_id + "chart" + dashboard_div_id;
    var chart = document.getElementById(id3);
    document.getElementById(id3).parentNode.removeChild(chart);
    var from = document.getElementById(sensor_div_id + "inputFrom" + dashboard_div_id).value;
    var to = document.getElementById(sensor_div_id + "inputTo" + dashboard_div_id).value;
    if(to == "now"){
        to = "0";
    }
    var sensor = dashboards.list[parseInt(dashboard_div_id) - 1].list[parseInt(sensor_div_id) - 1];
    var sensorID = sensor.sensor_id;
    processAPIGeDa(sensorID, from, resolutionList[resolutionStatus], to, sensor_div_id, dashboard_div_id);

    sensor.timefrom = from;
    sensor.timeto = to;

}

function addDashboard(){
    const addDashboard = document.querySelector("#addDashboard");
    const createDashboard = document.querySelector("#createDashboard");
    addDashboard.classList.add("hidden");
    createDashboard.classList.remove("hidden");

}
function createDashboardCancel(){
    const addDashboard = document.querySelector("#addDashboard");
    const createDashboard = document.querySelector("#createDashboard");
    addDashboard.classList.remove("hidden");
    createDashboard.classList.add("hidden");
}
async function createDashboard(){

    var name = document.querySelector("#inputDName1").value;
    if(name.length > 0 && name.length <= 255){
        createDashboardCancel();
        var div_id = dashboards.length() + 1;

        console.log(APIgetDashboards());
        var id = await processAPICrDashboard(name);

        var new_dashboard = new dashboard(name, id);
        dashboards.add(new_dashboard);
        new_dashboard.create_dashboard(div_id);
        new_dashboard.APISaveDashboardvalues();
        console.log(dashboards.print_list());
    }else{
        alert("the name can't be empty");
        alert("the max name length is 255");
    }


}
function changeDashboardSettings(id){
    const addDashboard = document.querySelector("#addDashboard");
    const editDashboard = document.querySelector("#editDashboard");
    addDashboard.classList.add("hidden");
    editDashboard.classList.remove("hidden");

    var dashboardID = getDashboardID(id);
    var listID = parseInt(dashboardID) - 1;
    var name = dashboards.list[listID].dashboard_name;
    let dashboard_name = document.getElementById("inputDName2");
    dashboard_name.value = name;

    document.getElementById("rename").childNodes.forEach(ele =>{
        var div_id = ele.id;
        if(div_id != null && div_id.includes("rename")){
            ele.id = "rename" + dashboardID;
        }
    });
    document.getElementById("delete").childNodes.forEach(ele =>{
        var div_id = ele.id;
        if(div_id != null && div_id.includes("delete")){
            ele.id = "delete" + dashboardID;
        }
    });
}

function renameDashboard(id){
    var dashboardID = getDashboardID(id);
    var listID = parseInt(dashboardID) - 1;
    var name = document.getElementById("inputDName2").value;
    dashboards.list[listID].dashboard_name = name;
    var name_id = "name" + dashboardID;
    document.getElementById(name_id).innerHTML = name;

    dashboards.list[listID].APISaveDashboardvalues();
}
function renameDashboardCancel(){
    const addDashboard = document.querySelector("#addDashboard");
    const editDashboard = document.querySelector("#editDashboard");
    addDashboard.classList.remove("hidden");
    editDashboard.classList.add("hidden");

}
function deleteDashboard(id){
    var div_dashboardID = getDashboardID(id);
    
    var tab_id = "menuDashboard" + div_dashboardID;
    if(document.getElementById(tab_id).classList.contains("selectedTab")){
        selectTab("menuHomeSelect");
    }

    var listID = parseInt(div_dashboardID) - 1;
    dashboards.list[listID].delete_dashboard();
    dashboards.remove(listID);

    renameDashboardCancel();

    
}

function selectTab(id){

    document.querySelector("#menu") .childNodes.forEach(ele => {    	    //unselect all Tabs
        if (ele.id == "menuHome" && ele.classList.contains("selectedTab")) {
            ele.classList.remove("selectedTab");
            ele.classList.add("unselectedTab");
            if(!document.querySelector("#contentHome").classList.contains("hidden")){
                document.querySelector("#contentHome").classList.add("hidden");
            }
            
        }
        for(var i = 1; i <= dashboards.length(); i++ ){
            if(ele.id == "menuDashboard" + i && ele.classList.contains("selectedTab")){
                ele.classList.remove("selectedTab");
                ele.classList.add("unselectedTab");
                var id2 = "#dashboard" + i;
                if(!document.querySelector(id2).classList.contains("hidden")){
                    document.querySelector(id2).classList.add("hidden")
                }
            }
            var id3 = "name" + i;
            if(document.getElementById(id3).classList.contains("font-bold")){
                document.getElementById(id3).classList.remove("font-bold");
                document.getElementById(id3).classList.add("font-medium");
            }
        }
    });
    var menuHome = document.getElementById("menuHome");
    if(document.getElementById("nameHome").classList.contains("font-bold")){
        document.getElementById("nameHome").classList.remove("font-bold");
        document.getElementById("nameHome").classList.add("font-medium");
    }

    if(id == "menuHomeSelect"){                                             //select menu tab
        document.querySelector("#menuHome").classList.remove("unselectedTab");
        document.querySelector("#menuHome").classList.add("selectedTab");
        if(document.querySelector("#contentHome").classList.contains("hidden")){
            document.querySelector("#contentHome").classList.remove("hidden");
        } 
        if(!document.getElementById("nameHome").classList.contains("font-bold")){
            document.getElementById("nameHome").classList.add("font-bold");
            document.getElementById("nameHome").classList.remove("font-medium");
        }
    }
    for(var i = 1; i <= dashboards.length(); i++ ){                         //select dashboard tab with id
        if(id == "menuDashboardSelect"+i){
            var id2 = "#menuDashboard" + i;
            document.querySelector(id2).classList.remove("unselectedTab");
            document.querySelector(id2).classList.add("selectedTab");
            var id3 = "#dashboard" + i;
            if(document.querySelector(id3).classList.contains("hidden")){
                document.querySelector(id3).classList.remove("hidden");
           
            }
            var id4 = "name" + i;
            if(!document.getElementById(id4).classList.contains("font-bold")){
                document.getElementById(id4).classList.add("font-bold");
                document.getElementById(id4).classList.remove("font-medium");
            }
        }
    }
}

function ausgabe(){
    console.log(APIgetSensors());
}

async function APIgetDashboards(){
    var path = "http://localhost:8080/dashboard";
    try{
        const response = await fetch(path, {
            headers: {
                Accept: "*/*"
            },
            method: "GET"
        });
        const responseData = await response.json();
        console.log("get dashboards");
        return responseData;
    }
    catch(error){
        console.error(error);
        alert("Backend kann nicht erreicht werden")
        alert(error);
    }
}

async function APIcreateDashboard(name){
    const data = {
        "name": name,
        "sensors": []
    }

    try{
        const response = await fetch("http://localhost:8080/dashboard", {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        console.log("dashboard");
        console.log(responseData);
        return responseData;
    }catch(error){
        alert(error);
        console.error(error);
    }
}

async function processAPICrDashboard(name){                     //create dashboard and return dashboard_id
    const APIresponseData = await APIcreateDashboard(name);
    const id = APIresponseData.id;

    console.log("Created Sensor")

    printSensors()

    return id;
}

async function APIdeleteDashboard(id){
    var url = "http://localhost:8080/dashboard/" + id;
    try{
        const response = await fetch(url, {
            headers: {
                Accept: "*/*"
            },
            method: "DELETE",
        });
        //const responseData = await response.json();
        console.log("dashboard");
        //console.log(responseData);
        //return responseData;
    }catch(error){
        alert(error);
        console.error(error);
    }
}

async function APIputDashboard(id, name, sensors){
    const data = {
        "name": name,
        "sensors": sensors,
        "id": id
    }
    try{
        url = "http://localhost:8080/dashboard/" + id;
        const response = await fetch(url, {
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        console.log("dashboard");
        console.log(responseData);
        return responseData;
    }catch(error){
        //alert(error);
        console.error(error);
    }
}

var path = "localhost:8080";

function getPath(){
    var value = document.getElementById('APIPath').value;

    if(value.substring(0,7) == "http://"){
        window.path = value.substring(7);
    }else{
        window.path = value;
    }

     
}

getPath()

async function APIcreateSensor(name, unit){
    const data = {
        "name": name,
        "unit": unit
    }

    try{
        const response = await fetch("http://" + window.path +"/sensor", {
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

    console.log("Created Sensor")

    printSensors()

    return id;
}

async function APIgetSensors(){
    var path = "http://" + window.path +"/sensor";
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
        alert("Backend kann nicht erreicht werden")
        alert(error);
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
        var path = "http://" + window.path +"/sensor/" + id + "/data/?from=" + timefrom + "&to=" + timeto + "&resolution=" + resolution; //set path for fetching from the API
    }else{
        var path = "http://" + window.path +"/sensor/" + id + "/data/?from=" + timefrom + "&resolution=" + resolution; //set path for fetching from the API
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

async function processAPIGeDa(id, timefrom, resolution, timeto, div_sensor_id, div_dashboard_id){

    /*var id = "2e6b4d73-776c-48cb-a118-47b79916df64";
    var timefrom = "2021-05-13T19:30:00Z";
    var timeto = "2021-05-13T19:32:44Z";
    var resolution = "MINUTELY";*/

    const APIresponseData = await APIgetData(id, timefrom, timeto, resolution);
    var ChartData = [];

    for(var i = 0; i < APIresponseData.length; i++){
        ChartData[i] = {
          x: APIresponseData[i].timestamp,
          y: APIresponseData[i].value
        }
    }

    
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
        },
        markers: {
            size: 4
        }
    }
    var div_id = div_sensor_id + "chart" + div_dashboard_id;
    var chart = new ApexCharts(document.getElementById(div_id), options);
    chart.render();

    //1620934260
}

function createChart(id, timefrom, resolution, timeto){
    var id;
    var timefrom;
    var resolution;
    var timeto;

    processAPIGeDa(id, timefrom, resolution, timeto);
}

function convertTime(time){

    var temp1 = time.substring(0,13)
    var temp2 = time.substring(14,16)
    var temp3 = time.substring(17,20)

    if(time != "0"){
        var convertedTime = temp1 + "%3A" + temp2 + "%3A" + temp3;
    }

    return convertedTime;
}

async function printSensors(){
    const APIresponseData = await APIgetSensors();
    var temp = "<h1 class='mt-6 sm:text-lg xl:text-xl'>Sensoren</h1><table class='table-fixed'><tr><th class='w-1/5 text-left'>Name</th><th class='w-16'>Unit</th><th class='w-80 text-left'>id</th></tr>";
    var i = 0;
    for (const sensor in APIresponseData) {
        if (Object.hasOwnProperty.call(APIresponseData, sensor)) {
            const element = APIresponseData[sensor];
            temp += "<tr id='tr-" + i + "'><td name='name'>" + element.name + "</td><td class='text-center' name='unit'>" + element.unit + "</td><td name='id'>" + element.id + "</td><td><button type='button' onclick='changeSensorDiv(`tr-" + i + "`)'>" + 
            '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'+
            '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button></td></tr>';
            i++;
        }
    }
    temp += "</table>";

    document.querySelector("#allSensors").innerHTML = temp;
    document.querySelector("#sName").value = "";
    document.querySelector("#sUnit").value = "";
}

function changeSensorDiv(id){
    var data = document.getElementById(id);
    const elements = data.getElementsByTagName('td');
    var innerhtml = "";
    var i = 0;

    for (const key in elements) {
        if (Object.hasOwnProperty.call(elements, key)) {
            const element = elements[key];
            if(i < 2){
                innerhtml += "<input class='mt-2 h-6' type='text' value='" + element.innerText + "'><br>";
            }else if(i < 3){
                innerhtml += "<p>" + element.innerText + "</p>";
            }

            i++;
        }
    }

    //console.log(data.getElementsByTagName('td')[0].innerText)
    document.querySelector("#changeSensor").innerHTML = innerhtml + "<button type='button' onclick='changeSensor()' class='mt-2 border-4 border-red-600 hover:shadow-xl hover:bg-red-600 hover:text-white transition ease-out duration-500 rounded-md p-2 uppercase text-base font-bold cursor-pointer tracking-wider'>Change</button>";
    document.getElementById('changeSensor').style.display = "block";
}

async function changeSensor(){
    const data = document.getElementById('changeSensor')
    var i = 0;

    const elements = data.getElementsByTagName("input");

    var name = "";
    var unit = "";

    for (const key in elements) {
        if (Object.hasOwnProperty.call(elements, key)) {
            const element = elements[key];
            if(i == 0){
                name = element.value;
            }else{
                unit = element.value;
            }
            i++;
        }
    }

    const id = data.getElementsByTagName('p')[0].innerHTML;

    const APIresponseData = await APIchangeSensor(name, unit, id);

    printSensors()

    document.getElementById('changeSensor').style.display = "none";
}

async function APIchangeSensor(name, unit, id){

    const data = {
        "name": name,
        "unit": unit,
        "id": id
    }

    try{
        const response = await fetch("http://" + window.path +"/sensor/" + id, {
            headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        return responseData;
    }catch(error){
        //alert(error);
        console.error(error)
    }
}