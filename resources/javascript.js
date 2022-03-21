
const tabs = document.querySelectorAll("[data-tab-target]")
const items = document.querySelectorAll(".item")
const tabContents = document.querySelectorAll("[data-tab-content]")




tabs.forEach((tab) => {
    tab.addEventListener("click", ()=> {  

        items.forEach(item => {item.setAttribute("class", "item")})
    
        tab.classList.toggle("click-" + tab.getAttribute("id"))

        if(tab.classList.contains("active")){

        document.querySelector("#" + tab.getAttribute("id") + "-dot").classList.toggle("hide")

    }

        tab.classList.toggle("increase-size")


        tabContents.forEach(tabContent => {tabContent.classList.remove('active')})

        const target = document.querySelector(tab.dataset.tabTarget)
        
        target.classList.add("active")
    })

})


tabs[0].click()

document.getElementById('category-home').addEventListener('click', function(){
        document.getElementById('category').innerText = "Home"})
document.getElementById('category-work').addEventListener('click', function(){
            document.getElementById('category').innerText = "Work"})
document.getElementById('category-personal').addEventListener('click', function(){
                document.getElementById('category').innerText = "Personal"})
        
            
    



//FIREBASE

const firebaseConfig = {
    apiKey: "AIzaSyDU81aCG7CBXE4mEAGraCVqDZoa5aBewTM",
    authDomain: "notes-app-9e64f.firebaseapp.com",
    projectId: "notes-app-9e64f",
    databaseURL: "https://notes-app-9e64f-default-rtdb.firebaseio.com/",
    storageBucket: "notes-app-9e64f.appspot.com",
    messagingSenderId: "570985825749",
    appId: "1:570985825749:web:d8cc3b58228a6f16bca95c",
    measurementId: "G-FKRD7TH8HC"
  };
  
// initiallize firebase
  firebase.initializeApp(firebaseConfig);

//reference for database
const DB = firebase.database();



document.getElementById("addTask-button").addEventListener('click', function(){

    if(document.getElementById("category").innerText == "Select A Category "){
      document.getElementById("category").innerText = "Home"
    }

    var category = document.getElementById("category").innerText
    var task = document.getElementById("task-field").value 
    var description = document.getElementById("description-field").value


   saveMessages(category, task, description)

   document.getElementById("task-field").value = ""
   document.getElementById("description-field").value = ""
   location.reload();
});


const saveMessages = (category, task, description) => {
    var newForm = DB.ref("/tasks/" + task);
    newForm.set({
        category: category,
        task: task,
        description: description,
    })
}


document.getElementById("clear-button").addEventListener('click', function(){
    DB.ref('/tasks').remove()
    location.reload()
})



function AddItemsToTable(category, task, description){

    var sections = ['all', 'home', 'work', 'personal']

    

    sections.forEach(element => {

        if(category.toLowerCase() === element || element === 'all'){


        
        var mainContent = document.getElementById(element + '-content')

        var task_tab = document.createElement('div')
        task_tab.classList.add('display')

        task_tab.classList.add(category.toLowerCase() + "-display")
        task_tab.innerHTML = "<div class='display-task'><div class='task-title'></div><div class='actions'><img class='removeButton' src='./resources/images/trash.png' ></div></div><div class='display-description'></div>"

        mainContent.appendChild(task_tab)

      



        task_tab.getElementsByClassName('display-task')[0].children[0].innerText = task
        task_tab.getElementsByClassName('display-description')[0].innerHTML = description
        var removeButton = task_tab.getElementsByClassName('display-task')[0].children[1]

        removeButton.addEventListener('click', function(){
          DB.ref('/tasks/' + task).remove()
          location.reload()
        })
      
        

    }

    });
  }

function SelectAllData(){
  DB.ref('/tasks/').once('value', function(AllRecords){
      AllRecords.forEach(
        function(CurrentRecord){
          var category = CurrentRecord.val().category
          var task = CurrentRecord.val().task
          var description = CurrentRecord.val().description

          AddItemsToTable(category, task, description)
        }
      );
  }) 
}


window.onload =   SelectAllData;





