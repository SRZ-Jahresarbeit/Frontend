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
        this.content.childNodes.forEach(ele => {
            ele.childNodes.forEach(ele1 => {
                if (ele1.id == "0") {
                    ele1.id = div_id;
                }
            })
        })
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
                if (ele1.id == old_div_id) {
                    ele1.id = new_div_id;
                }else{
                    console.log("nichts")
                }
            })
        })
    }
}