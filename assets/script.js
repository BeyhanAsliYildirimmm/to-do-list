addEventListener("DOMContentLoaded", function (e) {
    //Tüm sayfa yüklendiğin de çalışır.

    //array'in prototype'na romove() diue fonk yazıyoruz.
    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;

    }

    let btnAddTaskList = document.querySelector("#btnAddTaskList");
    let btnCompletedTask = document.querySelector("#btnCompletedTask");
    let btnRemoveTask = document.querySelector("#btnRemoveTask");
    let btnSelectAll = document.querySelector("#btnSelectAll");
    let btnClearList = document.querySelector("#btnClearList");

    let inputSelect = this.document.querySelector(".select-task");

    let newTaskName = document.querySelector("#newTaskName");
    let taskListUl = document.querySelector("#taskListUl");
   let completedListUL = document.querySelector("#completedListUL");

    let taskList = []; //tüm taskların olduğu liste
    let completedTaskList = [];

    let selectedList = []; //task list 'den seçilmiş olan inputların id'sini tutar.

    btnAddTaskList.addEventListener("click", function (event) {
        event.preventDefault();

        if (newTaskName.value == null || newTaskName.value == '') {
            alert("New Task Name Boştur. !!");

        }
        else {
            //fonk. çağırıyoruz
            createLiElement();
        }

    });


    btnSelectAll.addEventListener("click", function (event) {
        event.preventDefault();
       
        if(taskList.length>selectedList.length){

            taskList.forEach(function(value, index, array){
                let selectInput =document.querySelector("#input-"+value);

                if(selectedList.indexOf(value) === -1){
                
                    selectedList.push(value);
                    selectInput.checked = true;

                }
        
               });
        }
        else{
            //hepsi eşit olduğu zaman
            
        taskList.forEach(function (value, index, array) {

            //inputların id'sini aldık.
            let selectInput = document.querySelector("#input-" + value);


            //inputlar seçili mi diye kontrol edicez.
            //hasAttribute("checked") --> bu aşamada input checked özelliğine sahip mi ona bakıyoruz.
            if (selectInput.checked) {
                //selectInput.removeAttribute("checked");
                selectInput.checked = false;

                let removeItemIndex = selectedList.indexOf(value);

                //if'in içinde yapılan işlem ile saydanın en yukarında  Array.prototype.remove = function(){....} işlemi aynı şeyi yapmaktadır.
                if (removeItemIndex !== -1) {
                    selectedList.splice(removeItemIndex, 1);
                }
                //selectedList.remove(value);
            }

        });

        }

    });


    btnRemoveTask.addEventListener("click", function (event) {
        event.preventDefault();

        if (!selectedList.length) {
            alert("Seçili bir task yok");
        }
        //btnRemoveTask button'una basıldığında  seçili input veya inputların listeden çıkarma işlemi yapılacak.
        selectedList.forEach(function (value, index, array) {

            // let selectInput = document.querySelector("#input-"+value);
            //if(selectInput.checked){
            let wrapperLiElement = document.querySelector("#wrapper-li-" + value);
            wrapperLiElement.remove();

            taskList.remove(value);

            //}
        });
        selectedList = [];
    });

    btnCompletedTask.addEventListener("click",function(event){

        event.preventDefault();

        if(!selectedList.length){

        alert(" Seçili task yok");
        }

        else{
        
            completedTaskList = selectedList.concat(completedTaskList);

            completedTaskList.forEach(function(value,index,array){
             
                console.log(selectedList);
                let label = document.querySelector('label[for="input-' + value + '"]');
                console.log(label);

            createCompletedElement(label.innerText);

            let deleteLi = document.querySelector("#wrapper-li-"+value);
           deleteLi.remove();
           selectedList.remove(value);
           taskList.remove(value);

            });
        }
    });
    
    btnClearList.addEventListener("click",function(event){
     event.preventDefault();

     let liList = document.querySelectorAll("completed-li");

     liList.forEach(function(value,index,array){
       value.remove();
     });

     completedTaskList = [];
    });


    function inputChangeAction(inputID) {

        let check = selectedList.indexOf(inputID);
        if (check === -1) {
            selectedList.push(inputID);
        }
        else {
            selectedList.remove(inputID);
        }


    };


    function createLiElement() {

        //input 'un id 'sini oluşturma işlemi

        let inputID = taskList.length + 1;
        taskList.push(inputID);

        /*ELEMENT OLUŞTURMA */

        // Lİ Oluşturuyoruz.

        let li = document.createElement("li");
        //li 'nin clasName'ini oluşturyoruz.

        li.className = "list-group-item task-list-item px-3 completed-li";

        //li 'nin id'sini belirliyoruz.
        li.id = "wrapper-li-" + inputID;

        /**
         * wrapper-li-1
         * wrapper-li-2
         * wrapper-li-3
    
         */

        let inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.className = "select-task me-3 select-task";
        inputElement.id = "input-" + inputID;
        //manual olarak task list'den input seçtiğimizde bunu taskList,selectedList eleme veta silme işlemi yapmıyordu. onuniçin bizde element'in onchange() metod'unu fonk. yazdık.
        inputElement.onchange = function () {

            inputChangeAction(inputID);

        };
        let labelEmenet = document.createElement("label");
        labelEmenet.setAttribute("for", "input-" + inputID);
        labelEmenet.innerText = newTaskName.value;

        let iElement = document.createElement("i");
        iElement.className = "fa fa-2x fa-trash text-primary float-end trashed";

        //li'i oluşturyoruz
        li.appendChild(inputElement);
        li.appendChild(labelEmenet);
        li.appendChild(iElement);



        // li'i oluşturduk şidi li 'i ul'un içine ekliyoruz.
        taskListUl.appendChild(li);
    }
    
   
    function createCompletedElement(lblText){

    

        /*Lİ Element'ini oluşturuyoruz*/
 
        let completedLi = document.createElement("li");
        completedLi.className ='ist-group-item task-list-item px-3 completed-li';
 
        let completedLabel = document.createElement("label");
        completedLabel.innerText = lblText;
 
        completedLi.appendChild(completedLabel);

        completedListUL.appendChild(completedLi);


     }
 
});