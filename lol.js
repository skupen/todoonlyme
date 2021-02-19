function l(x) { console.log(x); }
class TodoList {

    constructor(button, ul, input, AJAXButton) {
        this.button = button
        this.AJAXButton = AJAXButton
        this.ul = ul
        this.input = input

        this.items = []
        l("construct");
        this.button.onclick = () => {
            this.render(this.pridat(this.input.value), this.items.length - 1);
        }

        this.AJAXButton.onclick = () => {
            this.AJAXFun();
        }

        window.onload = () => {
            this.init();
        }
    }

    init() {
        l("init");
        this.items = JSON.parse(window.localStorage.getItem("items")) ?? [];

        this.rerenderList();

    }

    rerenderList() {

        l("render list");
        this.ul.innerHTML = "";
        for (let index = 0; index < this.items.length; index++) {
            this.render(document.createTextNode(this.items[index]), index);
        }
    }

    pridat(text) {

        l("pridat");
        const spanText = document.createTextNode(text);

        this.items.push(spanText.textContent);
        window.localStorage.setItem("items", JSON.stringify(this.items));

        return spanText;
    }

    render(text, index) {

        l("render item");
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.appendChild(text);
        li.appendChild(span);

        li.setAttribute("data-index", index);

        const deleteButton = li.appendChild(document.createElement("button"));
        const buttonText = document.createTextNode("x");
        deleteButton.appendChild(buttonText);
        deleteButton.id = "deleteButton"

        this.ul.appendChild(li);

        l("span click register event callback");
        span.ondblclick = (e) => {

            l("span click");
            this.editInput(e);
        }

        deleteButton.onclick = (e) => {
            this.delete(e);
        }
    }


    delete(e) {
        this.items.splice(e.target.parentNode.getAttribute("data-index"), 1);
        window.localStorage.setItem("items", JSON.stringify(this.items));
        this.rerenderList();
        //e.target.parentNode.remove();
        return;
    }

    editInput(e) {
        const newInput = document.createElement("input");
        const editButton = document.createElement("button");
        const editButtonText = document.createTextNode("edit");
        editButton.appendChild(editButtonText);
        editButton.id = "editButton";


        e.target.parentNode.appendChild(newInput);
        e.target.parentNode.appendChild(editButton);

        editButton.onclick = (btnE) => {
            this.editAction(btnE);
            this.rerenderList();
        }
    }

    editAction(e) {
        e.target.parentNode.querySelector("span").textContent = e.target.parentNode.querySelector("input").value;
        this.items[e.target.parentNode.getAttribute("data-index")] = e.target.parentNode.querySelector("input").value;
        window.localStorage.setItem("items", JSON.stringify(this.items));
    }

    AJAXFun() {
        let request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                var jsonObj = JSON.parse(request.responseText);//JSON.parse() returns JSON object
                document.getElementById("AJAXButton").innerHTML = jsonObj;
            }
        }

        request.open("GET", "http://127.0.0.1:5500/json.json", true);
        request.send();
    }
}

const todo = new TodoList(document.getElementById("buttonList"), document.getElementById("ulList"), document.getElementById("inputList"), document.getElementById("AJAXButton"));