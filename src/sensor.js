class sensor {
    constructor(name, unit, id) {
        this.sensor_name = name;
        this.sensor_unit = unit;
        this.sensor_id = id;
        this.content = null;

        this.dashboard_id = 0;

        this.timefrom = null;
        this.timeto = null;

    }

    create(new_div_id, new_dashboard_id) {                       //create div-box
        var cloneID = "0sensor" + new_dashboard_id;
        const clone = document.getElementById(cloneID);
        this.content = clone.cloneNode(true);
        this.content.classList.remove("hidden");

        this.content.id = new_div_id + "sensor" + new_dashboard_id;
        this.reset(0, new_div_id, new_dashboard_id, new_dashboard_id);
        this.dashboard_id = new_dashboard_id;

        var sensorsId = "#sensors" + new_dashboard_id;
        document.querySelector(sensorsId).appendChild(this.content);

        var id = new_div_id + "sensorName" + new_dashboard_id;
        document.getElementById(id).innerText = this.sensor_name + ": " + this.sensor_unit;
    }

    delete() {                       //delete div-box
        var sensor = document.getElementById(this.content.id);
        var id = "#sensors" + this.dashboard_id;
        document.querySelector(id).removeChild(sensor);
    }

    reset(old_div_id, new_div_id, old_dashboard_id, new_dashboard_id) {         //reset div-id's
        	                                                                    //all values are strings
        this.content.id = new_div_id + "sensor" + new_dashboard_id;      
        this.dashboard_id = new_dashboard_id;

        this.content.childNodes.forEach(ele => {
            ele.childNodes.forEach(ele2 =>{
                ele2.childNodes.forEach(ele3 =>{
                    if(ele3.id == old_div_id + "i" + old_dashboard_id){
                        ele3.id = new_div_id + "i" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "o" + old_dashboard_id){
                        ele3.id = new_div_id + "o" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "r" + old_dashboard_id){
                        ele3.id = new_div_id + "r" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "r" + old_dashboard_id){
                        ele3.id = new_div_id + "r" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "resolutionPlus" + old_dashboard_id){
                        ele3.id = new_div_id + "resolutionPlus" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "resolutionMinus" + old_dashboard_id){
                        ele3.id = new_div_id + "resolutionMinus" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "resolutionStatus" + old_dashboard_id){
                        ele3.id = new_div_id + "resolutionStatus" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "changeChartSettings" + old_dashboard_id){
                        ele3.id = new_div_id + "changeChartSettings" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "inputFrom" + old_dashboard_id){
                        ele3.id = new_div_id + "inputFrom" + new_dashboard_id;
                    }
                    if(ele3.id == old_div_id + "inputTo" + old_dashboard_id){
                        ele3.id = new_div_id + "inputTo" + new_dashboard_id;
                    }
                    ele3.childNodes.forEach(ele4 => {
                        if(ele4.id == old_div_id + "editChartButton" + old_dashboard_id){
                            ele4.id = new_div_id + "editChartButton" + new_dashboard_id;
                        }
                        if(ele4.id == old_div_id + "editChartCancelButton" + old_dashboard_id){
                            ele4.id = new_div_id + "editChartCancelButton" + new_dashboard_id;
                        }
                    });
                });
                if(ele2.id == old_div_id + "sensorName" + old_dashboard_id){
                    ele2.id = new_div_id + "sensorName" + new_dashboard_id;
                }
                if(ele2.id == old_div_id + "editChart" + old_dashboard_id){
                    ele2.id = new_div_id + "editChart" + new_dashboard_id;
                }
                if(ele2.id == old_div_id + "chart" + old_dashboard_id){
                    ele2.id = new_div_id + "chart" + new_dashboard_id;
                }
            });
            if(ele.id == old_div_id + "d" + old_dashboard_id){
                ele.id = new_div_id + "d" + new_dashboard_id;
            }
        });

    }
}