class sensor {
    constructor(name, unit, id) {
        this.sensor_name = name;
        this.sensor_unit = unit;
        this.sensor_id = id;
        this.content = null;

    }

    create(div_id) {                       //create div-box
        const clone = document.querySelector("#sensor0")
        this.content = clone.cloneNode(true);
        this.content.classList.remove("hidden");

        this.content.id = "sensor" + div_id;

        this.reset(0, div_id);

        this.content.classList.add(div_id);

        document.querySelector("#sensors").appendChild(this.content);
    }
    
    delete() {                       //delete div-box
        var item = document.getElementById(this.content.id);
        document.querySelector("#sensors").removeChild(item);
    }

    reset(old_div_id, new_div_id) {

        this.content.id = "sensor" + new_div_id;
        this.content.childNodes.forEach(ele => {
            ele.childNodes.forEach(ele1 => {
                ele1.childNodes.forEach(ele2 => {
                    if (ele2.id == old_div_id) {
                        ele2.id = new_div_id;
                    }else{
                        console.log("Element nicht gefunden")
                    }
                })
            })
        });
        this.content.childNodes.forEach(ele => {
            ele.childNodes.forEach(ele1 => {
                ele1.childNodes.forEach(ele2 =>{
                    if (ele2.id == ("o" + old_div_id)) {
                        ele2.id = "o"+ new_div_id;
                    }
                })
            })
        });
        this.content.childNodes.forEach(ele => {
            ele.childNodes.forEach(ele1 => {
                ele1.childNodes.forEach(ele2 =>{
                    if (ele2.id == ("i" + old_div_id)) {
                        ele2.id = "i"+ new_div_id;
                    }
                })
            })
        });
        this.content.childNodes.forEach(ele =>{
            if(ele.id == ("d" + old_div_id)){
                ele.id = "d" + new_div_id;
            }
        });

    }
}