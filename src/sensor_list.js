class sensor_list{
    constructor(){
        this.list = [];
    }
    add(sensor){
        this.list.push(sensor);
    }
    remove(id){                                 //id of the list
        this.list.splice(id, 1);
        var n = id;
        while(n < this.list.length){            //the old sensor id's have to move up, because we cut a sensor out 
            this.list[n].reset(n+2, n+1);
            n++;
        }
    }

    length(){
        console.log("laenge");
        return this.list.length;
    }

    print_list(){
        return this.list;
    }
}