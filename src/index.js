function switchMenuBar(){
    const menu = document.querySelector("#menu");
    if (menu.classList.contains("hidden")){
        menu.classList.remove("hidden");
    }else{
        menu.classList.add("hidden");
    }
}

let sensors = new sensor_list();

function selectSensor(){

    const add1 = document.querySelector("#add1");
    const add2 = document.querySelector("#add2");

    add1.classList.add("hidden");
    add2.classList.remove("hidden");

}

function addSensor(){

    const add1 = document.querySelector("#add1");
    const add2 = document.querySelector("#add2");

    add1.classList.remove("hidden");
    add2.classList.add("hidden");

    var value = document.querySelector("#choice").value;

    var name = "";
    var unit = "";
    var id = "";
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