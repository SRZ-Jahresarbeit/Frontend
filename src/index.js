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
let dashboards = new dashboard_list();

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

function getSensorID(idname){       //Die Sensor ID ist immer die erste Zahl in der ID des Elemsents
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

function selectSensor(id){

    var dashboardID = getDashboardID(id);
    var selectButtonID = "#select" + dashboardID;
    var addDivID = "#add" + dashboardID;
    const selectButton = document.querySelector(selectButtonID);
    const addDiv = document.querySelector(addDivID);

    selectButton.classList.add("hidden");
    addDiv.classList.remove("hidden");

    //console.log("Liste der Sensoren:")
    //console.log(APIgetSensors());
}


function addSensor(id){

    var dashboardID = getDashboardID(id);
    var selectButtonID = "#select" + dashboardID;
    var addDivID = "#add" + dashboardID;
    const selectButton = document.querySelector(selectButtonID);
    const addDiv = document.querySelector(addDivID);

    selectButton.classList.remove("hidden");
    addDiv.classList.add("hidden");

    var choiceID = "#choice" + dashboardID;
    var value = document.querySelector(choiceID).value;


    //var name = document.querySelector("#sensorName").value;
    //var unit = document.querySelector("#sensorUnit").value;
    //var id = processAPICrSe(name, unit);

    var new_sensor = new sensor("", 0, 0);

    var new_sensorID = dashboards.list[parseInt(dashboardID)-1].length() + 1;
    new_sensor.create(new_sensorID, parseInt(dashboardID));
    dashboards.list[parseInt(dashboardID)-1].add(new_sensor);

    console.log(dashboards.list[parseInt(dashboardID)-1].print_list());

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
function createDashboard(){

    createDashboardCancel();

    var name = document.querySelector("#inputDName1").value;
    var div_id = dashboards.length() + 1;

    var new_dashboard = new dashboard(name);
    dashboards.add(new_dashboard);
    new_dashboard.create_dashboard(div_id);
    console.log(dashboards.print_list());
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
}
function renameDashboardCancel(){
    const addDashboard = document.querySelector("#addDashboard");
    const editDashboard = document.querySelector("#editDashboard");
    addDashboard.classList.remove("hidden");
    editDashboard.classList.add("hidden");

}
function deleteDashboard(id){
    var dashboardID = getDashboardID(id);
    
    var tab_id = "menuDashboard" + dashboardID;
    if(document.getElementById(tab_id).classList.contains("selectedTab")){
        selectTab("menuHomeSelect");
    }

    var listID = parseInt(dashboardID) - 1;
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
        }
    });

    if(id == "menuHomeSelect"){                                             //select menu tab
        document.querySelector("#menuHome").classList.remove("unselectedTab");
        document.querySelector("#menuHome").classList.add("selectedTab");
        if(document.querySelector("#contentHome").classList.contains("hidden")){
            document.querySelector("#contentHome").classList.remove("hidden");
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
        }
    }
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
