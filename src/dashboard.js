class dashboard{
    constructor(name){
        this.list = [];
        this.dashboard_name = name;
        this.content = null;
        this.menuTab = null;
    }
    add(sensor){
        this.list.push(sensor);
    }
    remove(id){                                 //id of the list
        this.list.splice(id, 1);
        var n = id;
        while(n < this.list.length){            //the old sensor id's have to move up, because we cut a sensor out 
            var contentID = this.content.id;
            var dashboardID = contentID.substring(9, contentID.length);
            this.list[n].reset(n+2, n+1, dashboardID, dashboardID);
            n++;
        }
    }
    length(){
        return this.list.length;
    }
    reset(old_dashboard_id, new_dashboard_id){
        this.content.id = "dashboard" + new_dashboard_id;

        if(this.menuTab != null){
            this.menuTab.id = "menuDashboard" + new_dashboard_id;
            this.menuTab.childNodes.forEach(ele => {
                if(ele.id == "menuDashboardSelect" + old_dashboard_id){
                    ele.id = "menuDashboardSelect" + new_dashboard_id;
                }
                if(ele.id == "change" + old_dashboard_id){
                    ele.id = "change" + new_dashboard_id;
                }
            });
            this.menuTab.childNodes.forEach(ele => {
                ele.childNodes.forEach(ele1 => {         
                    if (ele1.id == ("name" + old_dashboard_id)) {
                        ele1.id = "name"+ new_dashboard_id;
                    }
                })
            });

        }

        this.content.childNodes.forEach(ele => {
            if(ele.id == "select" + old_dashboard_id){
                ele.id = "select" + new_dashboard_id;
            }
            if(ele.id == "add" + old_dashboard_id){
                ele.id = "add" + new_dashboard_id;
                ele.childNodes.forEach(ele2 =>{
                    ele2.childNodes.forEach(ele3 =>{
                        if(ele3.id == "choice" + old_dashboard_id){
                            ele3.id = "choice" + new_dashboard_id;
                        }
                        if(ele3.id == "refresh" + old_dashboard_id){
                            ele3.id = "refresh" + new_dashboard_id;
                        }
                    });
                    if(ele2.id == "createSensor" + old_dashboard_id){
                        ele2.id = "createSensor" + new_dashboard_id;
                    }
                    if(ele2.id == "sensorName" + old_dashboard_id){
                        ele2.id = "sensorName" + new_dashboard_id;
                    }
                    if(ele2.id == "sensorUnit" + old_dashboard_id){
                        ele2.id = "sensorUnit" + new_dashboard_id;
                    }
                    if(ele2.id == "sensorID" + old_dashboard_id){
                        ele2.id = "sensorID" + new_dashboard_id;
                    }
                });
            }
            
            if(ele.id == "sensors" + old_dashboard_id){
                ele.id = "sensors" + new_dashboard_id;
            }

            ele.childNodes.forEach(ele4 =>{
                if(ele4.id == "0sensor" + old_dashboard_id){
                    ele4.id = "0sensor" + new_dashboard_id;

                    ele4.childNodes.forEach(ele5 => {
                        ele5.childNodes.forEach(ele6 =>{
                            ele6.childNodes.forEach(ele7 =>{
                                if(ele7.id == "0i" + old_dashboard_id){
                                    ele7.id = "0i" + new_dashboard_id;
                                }
                                if(ele7.id == "0o" + old_dashboard_id){
                                    ele7.id = "0o" + new_dashboard_id;
                                }
                                if(ele7.id == "0r" + old_dashboard_id){
                                    ele7.id = "0r" + new_dashboard_id;
                                } 
                            });
                        });
                        if(ele5.id == "0d" + old_dashboard_id){
                            ele5.id = "0d" + new_dashboard_id;
                        }
                    });
                }
                
            });
            
        });
    }
    print_list(){
        return this.list;
    }

    create_dashboard(id){
        const clone = document.querySelector("#dashboard0");
        this.content = clone.cloneNode(true);
        this.content.id = "dashboard" + id;
        this.reset(0, id);
        document.querySelector("#container").appendChild(this.content);

        const cloneMenuTab = document.querySelector("#menuDashboard0");
        this.menuTab = cloneMenuTab.cloneNode(true);
        this.menuTab.id = "menuDashboard" + id;
        this.reset(0, id);
        this.menuTab.classList.remove("hidden")
        document.querySelector("#menu").appendChild(this.menuTab);

        this.menuTab.childNodes.forEach(ele => {
            ele.childNodes.forEach(ele1 => {         
                if (ele1.id == ("name" + id)) {
                    ele1.innerHTML = this.dashboard_name;
                }
            })
        });
    }
    delete_dashboard(){
        var dashboard_tab = document.getElementById(this.menuTab.id);
        var dashboard = document.getElementById(this.content.id);
        document.getElementById("menu").removeChild(dashboard_tab);
        document.getElementById("container").removeChild(dashboard);
    }
}