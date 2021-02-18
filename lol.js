class TodoList {
    constructor(button, ul, input, AJAXButton){
        this.button = button
        this.AJAXButton = AJAXButton
        this.ul = ul
        this.input = input

        this.items = []

        this.button.onclick = () => {
            this.render(this.pridat(this.input.value));
        }

        this.AJAXButton.onclick = () => {
            this.AJAXFun();
        }
        
        window.onload = () => {
            this.init();
        }

        addEventListener("click", this.delete);
        addEventListener("dblclick", this.editInput.bind(this));
        addEventListener("click", this.editAction);
    }

    init(){
        this.items = (JSON.parse(window.localStorage.getItem("items"))) ?? [];
        console.log(this.items);

        for (let index = 0; index < this.items.length; index++) {
            this.render(document.createTextNode(this.items[index]));      
        }
        
    }

    pridat(text){
        const spanText = document.createTextNode(text);

        this.items.push(spanText.textContent);
        window.localStorage.setItem("items",JSON.stringify(this.items));
        
        return spanText;
    }

    render(text){
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.appendChild(text);
        li.appendChild(span);

        const deleteButton = li.appendChild(document.createElement("button"));
        const buttonText = document.createTextNode("x");
        deleteButton.appendChild(buttonText);
        deleteButton.id = "deleteButton"
        
        this.ul.appendChild(li);
    }


    delete(e){
        if(e.target.id == "deleteButton"){
            e.target.parentNode.remove();
        }
    }

    editInput(e){
        if(e.target.nodeName == "SPAN"){
            const newInput = document.createElement("input");
            const editButton = document.createElement("button");
            const editButtonText = document.createTextNode("edit");
            editButton.appendChild(editButtonText);
            editButton.id = "editButton";
            
            
            e.target.parentNode.appendChild(newInput);
            e.target.parentNode.appendChild(editButton);
        }
    }

    editAction(e){
        if (e.target.id == "editButton") {
            let puvodniText = e.target.parentNode.querySelector("span").textContent;
            let novyText = e.target.parentNode.querySelector("input").value;

            //puvodniText = novyText;

            e.target.parentNode.querySelector("span").textContent = e.target.parentNode.querySelector("input").value;
        }
    }

    AJAXFun(){
        let request = new XMLHttpRequest();

        request.onreadystatechange  = function(){  
        if (request.readyState == 4) {  
            var jsonObj = JSON.parse(request.responseText);//JSON.parse() returns JSON object
            document.getElementById("AJAXButton").innerHTML =  jsonObj;  
            }  
        }

        request.open("GET", "http://127.0.0.1:5500/json.json", true);  
        request.send();  
    }
}

const todo = new TodoList(document.getElementById("buttonList"), document.getElementById("ulList"), document.getElementById("inputList"), document.getElementById("AJAXButton"));


