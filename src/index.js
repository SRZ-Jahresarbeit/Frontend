function switchMenuBar(){
    const menu = document.querySelector("#menu");
    if (menu.classList.contains("hidden")){
        menu.classList.remove("hidden");
    }else{
        menu.classList.add("hidden")
    }
}