class dashboard_list{
    constructor(){
        this.list = [];
    }
    add(dashboard){
        this.list.push(dashboard);
    }
    remove(id){                                 //id of the list
        this.list.splice(id, 1);
        var n = id;
        while(n < this.list.length){            //the old dashboard id's have to move up, because we cut a sensor out 
            this.list[n].reset(n+2, n+1);
            n++;
        }
    }
    length(){
        return this.list.length;
    }
    print_list(){
        return this.list;
    }
}