
// Call main class of any pages
var home_page = document.querySelector("#home-page")
var add_question_page = document.querySelector('#add-question-page')

// Call the button for click
var btnCreateQuestion = document.querySelector("#btnCreate")
let btnBack = document.querySelector("#btnBack")
let addQuestion = (event) =>{
    // Hide the page don't need(home page)
    home_page.style.display = 'none'
    // Show the page add question
    add_question_page.style.display = 'block'
    // get element to input answer and choose the correct answer and add to data
    let choose = document.querySelector(".choice");
    let create = document.querySelector('.create')
    // Add the listener 
    choose.addEventListener('click',changOption);
    create.addEventListener('click', getQuestion);
    // create.addEventListener('click', );
    btnBack.addEventListener('click', homePage)
    // showTask()
}

// Function to change the type of the question(multiple choice or )===========================================
function changOption(){
    let inputAnswer = document.querySelectorAll('.type-of-input');
    if (document.querySelector(".choice").value == 'checkbox'){
        for (i=0; i<inputAnswer.length; i++){
            document.getElementsByClassName('type-of-input')[i].type = 'checkbox';
        }
    }else{
        for (i=0; i<inputAnswer.length; i++){
            document.getElementsByClassName('type-of-input')[i].type = 'radio';
        }
    }
}


// Get value from the input question=======================================================================
let getQuestion = () =>{
    // To the call the class of the question and aswers
    let titleQuestion = document.querySelector('.add-question');
    let answers = document.querySelectorAll('.answer')
    let selects = document.getElementsByName('answer')
    let choice = document.querySelector('.choice')
    var dataList = {}
    dataList.type_of_question = choice.value
    for (let i = 0; i < answers.length; i++){
        if (answers[i].value){
            dataList['answer_'+ (i+1)]= answers[i].value
        }
    }
    let corrected_answer = 1
    let choose_answer = false
    for (let i = 0; i < selects.length; i++){
        if (selects[i].checked){
            dataList[corrected_answer] = i;
            choose_answer = true
            corrected_answer += 1
            selects[i].checked=false
        }
    }
    // validation input=========================================================================
    // Alert to tell user when the user don't complete all the condition 
    if (titleQuestion.value !== "" && answers[0].value !== "" && answers[1].value !== ""&& answers[1].value !== ""&& answers[3].value !== "" && choose_answer){
        dataList.title_question = titleQuestion.value
        data.push(dataList)
        // reset the value to empty
        titleQuestion.value = ""
        for (input of answers){
            input.value = ""
        }
        // To alert when user don't create the question and click start
    }else if (titleQuestion.value == ""){
        window.alert("Please input your question!")
        // To alert when user don't input the answers and click start
    }else if(answers[0].value == "" || answers[1].value == ""|| answers[1].value == ""|| answers[3].value == ""){
        window.alert("You have to input your answer all places!")
    }else{
        window.alert("Please choose the correct answer!")
    }
    showTask();
}
function homePage(){
    // To hide the pages that don't need
    add_question_page.style.display = 'none'
    btnCreateQuestion.addEventListener('click', addQuestion)
    // Show the page that we need
    home_page.style.display = "block"
}
homePage()

// Variable to store data
let data = []

// To add data to local storage
let saveData = document.querySelector(".btn-save")


function addDataToLocalStorage(){
    let quizTitle = document.querySelector(".quiz-title").value
    if (data.length >0 && quizTitle !== "") {
        let title_quiz = {}
        title_quiz["title_quiz"] = quizTitle
        data.push(title_quiz)
        let data_dictionary = JSON.stringify(data);
        localStorage.setItem('data'+localStorage.length, data_dictionary)
        data = []
        location.reload();
    }else if(quizTitle == ""){
        window.alert("Please put your title of your quiz")
    }else{
        window.alert("Please Ceate Your Quiz")
    }
}
saveData.addEventListener('click', addDataToLocalStorage)

// ========================Function for random question================================
function shuffle(array) {
    for (let i = array.length-2; i > 0; i--) {
      let index = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[index];
      array[index] = temp;
    }
    return array;
  }
// show the task that user create
function showTask(){
    // Create element to contain the show task
    let removeObj = document.querySelector('#add-question-page');
    let ObjToRemove = document.getElementsByClassName('show-task');
    let comp = ObjToRemove.length;
    let comNum = 0;
    // Check to remove the previous answers
    if (data.length>=0){
        while(comNum<comp){
            removeObj.removeChild(ObjToRemove[0]);
            comNum += 1;
        }
    }
    // Check to Create all the value from data
    for (Index=0; Index<data.length; Index++){
        // create to contain all the element of showing the task user created
        let show_task = document.createElement('div');
        show_task.className='show-task';

        // create to add the question
        let show_question = document.createElement('div');
        show_question.className='show-question';
        show_question.textContent=data[Index]["title_question"];
        show_task.appendChild(show_question);
        

        // check to create and add the answer
        for (i=0; i<4; i++){
            let contain_answer = document.createElement('div');
            contain_answer.className='contain-answer';
    
            let answer_type = document.createElement('li');
            // if (data[Index]['type_of_question']=='radio'){     
            //     answer_type.className='radio';
            // } else{
            //     answer_type.className='checkbox'
            // }
            
            let answer_value = document.createElement('p');
            answer_value.className='answer-value';
            answer_value.textContent=data[Index]['answer'+'_' + (i+1)];

            // check to find the correct answers
            for (index=0; index<5; index++){
                if (i==data[Index][index]){
                    answer_type.className = 'correct';
                }
            }
            contain_answer.appendChild(answer_type);
            contain_answer.appendChild(answer_value);
            show_task.appendChild(contain_answer);
        }

        // create to contain the button delete and button edit
        let button_group = document.createElement('div');
        button_group.className='button-group';
        button_group.id=Index;
        // create for button edit
        let button_edit = document.createElement('button');
        button_edit.className='button-edit';
        button_edit.type='button';
        button_edit.textContent='Edit';
        button_edit.addEventListener('click', editeTask);
        button_group.appendChild(button_edit);

        // create for button delet
        let button_delete = document.createElement('button');
        button_delete.className='button-delete';
        button_delete.type='button';
        button_delete.textContent='Delete';
        button_group.appendChild(button_delete);
        show_task.appendChild(button_group);
        button_delete.addEventListener('click', deleteTask);
        document.querySelector('#add-question-page').appendChild(show_task);
    }
}

// delete the task when user click on button delete
function deleteTask(event){
    let pare = event.target;
    let deleteTask = pare.parentNode.id;
    data.splice(deleteTask, 1);
    showTask();
}

// Edite task when user click on button Edite
function editeTask(event){
    let editQuestion = document.querySelector('.add-question');
    let editAnswers = document.querySelectorAll('.answer');
    // let selects = document.getElementsByName('answer')
    // let choice = document.querySelector('.choice')
    if (editQuestion.value == "" && editAnswers[0].value == "" && editAnswers[1].value == ""&& editAnswers[1].value == ""&& editAnswers[3].value == ""){
        let edits = event.target.parentNode.id;
        let dataTask = data[edits];
        deleteTask(event);

        let editeQuestion = document.querySelector('.add-question');
        editeQuestion.value= dataTask['title_question'];
        for (i=0; i<4; i++){
            // for display the same answers that user want to edit
            let answerEdit = document.getElementsByClassName('answer')[i];
            answerEdit.value=dataTask['answer_'+(i+1)];
            
            // check for the correct answer that user had been check
            let check_answer_edit = document.getElementsByClassName('type-of-input');
            for (index=1; index<5; index++){
                if (i==dataTask[index]){
                    check_answer_edit[i].checked=true;
                }
            }
            
        }
    }else{
        window.alert('You need to make you create task Empty First')
    }
}

// ===========================Dispay Quiz========================VeangLy code---
// ------------------Data structure storage--------------------------------------
let dat_test= [
    {1: 1, 2: 3, 
    answer_1:"Love", 
    answer_2: "Hate",
    answer_3: "Fall in",
    answer_4: "Want date",
    title_question: "What do you mean?",
    type_of_question: "checkbox"
   },
    {   1:3,
        title_question: "Where do Bopha live?",
        answer_1: "BTB",
        answer_2: "RTK",
        answer_3: "KPC",
        answer_4: "BMC",
        type_of_question: "radio"
    },
    {   1:0, 2:1,3:3,
        title_question: "Who is Key crush Today?",
        answer_1: "Liza",
        answer_2: "Pisey",
        answer_3: "Yu Ry",
        answer_4: "Raby",
        type_of_question: "checkbox"
    },
    {   1:1,
        title_question: "What ...... you do for him?",
        answer_1: "Would",
        answer_2: "Will",
        answer_3: "Will be",
        answer_4: "Would be",
        type_of_question: "radio"
    },
    {   1:0,
        title_question: "He've......(be) to Cambodia about three time.",
        answer_1: "been",
        answer_2: "being",
        answer_3: "had been",
        answer_4: "have been",
        type_of_question: "radio"
    },
    {   1:2,
        title_question: "I live ...........Cambodia.",
        answer_1: "at",
        answer_2: "on",
        answer_3: "in",
        answer_4: "of",
        type_of_question: "radio"
    },
    {   1:0,
        title_question: "Ronal do is the ..... footbaler in the world.",
        answer_1: "best",
        answer_2: "good",
        answer_3: "Well",
        answer_4: "Exerlenct",
        type_of_question: "radio"
    },
    {   1:0, 2:1, 3: 3,
        title_question: "which word are the same meaning of the word ,mabybe?",
        answer_1: "approx",
        answer_2: "Similar",
        answer_3: "Look like",
        answer_4: "Same",
        type_of_question: "checkbox"
    },
    {   1:1,
        title_question: "What does IP stand for?",
        answer_1: "Internet Parking",
        answer_2: "Internet Protocol",
        answer_3: "Internet Price",
        answer_4: "Internet Push",
        type_of_question: "radio"
    },
    {   1:1, 2:2,
        title_question: "which there are many mountain in Cambodia?",
        answer_1: "Kratie",
        answer_2: "Modul Kiri",
        answer_3: "Ratanakiri",
        answer_4: "Seim Reap",
        type_of_question: "checkbox"
    },
    {title_quiz: "General Knowledge"}
];
let randomQuiz = shuffle(dat_test);
localStorage.setItem("data0",JSON.stringify(randomQuiz))
//------------------------------Create The template------------------------------
var global_Index = 0;
var total_Score = 0;
var allScores = 0;
var number_Click = 1;     // prevent for click..........
var btn1 = false;         // check first click .........
var btn2 = false;         // check second click.........
var btn3=  false;         // check third click .........
var isNotTrue = false;    // check for one click.......

function create_Quiz(parater) {   // Create the quiz by data structur to html..
    document.querySelector('.container-on-page-quiz').style.display="none";
    if( global_Index < parater.length-1 && number_Click > 0){       
        let start = parater[global_Index];             //Create button move question...
        document.getElementById("question_Add").textContent = start.title_question;
        document.getElementById("btn-1").textContent ="1. "+start.answer_1;
        document.getElementById("btn-2").textContent ="2. "+start.answer_2;
        document.getElementById("btn-3").textContent ="3. "+start.answer_3;
        document.getElementById("btn-4").textContent ="4. "+start.answer_4;
        document.getElementById("question_Number").textContent = global_Index+1 +"/"+ (parater.length-1);

        if(start.type_of_question == "checkbox"){
            document.getElementById("alert").textContent = "There are more than onn correct answer.";
        }else{document.getElementById("alert").textContent=""};
        
        if(global_Index == 0){      
            var div = document.createElement("div");     
            div.className = "btn_Move";
            document.body.appendChild(div);

            var move_btn = document.createElement("button");
            move_btn.id="move";
            move_btn.className="blue";
            move_btn.textContent="Next >";
            div.appendChild(move_btn);    

            var submith_btn = document.createElement("button");
            submith_btn.id="submith";
            submith_btn.className="blue";
            submith_btn.textContent="Submith >";
            div.appendChild(submith_btn);
            submith_btn.style.display="none";
                                                        // Move the question...
            move_btn.onclick = function (){create_Quiz(temperary_Data)}
        }else if(parater.length -2 == global_Index){
            document.getElementById("move").style.display = "none";
            document.getElementById("submith").style.display="block";
                                                        //btn for submith............
            document.getElementById("submith").onclick = function(){
            document.getElementsByClassName("quiz_Container")[0].style.display="none";
            correction()}
        }
        color_Change();
        global_Index += 1;
        sumScore();
    }else{
        alert("Please choose your answer!")
    }
}

// ---------------Color Change  Of Button---------------------------------------------------
function color_Change(){
    let btn = document.querySelectorAll(".btn");
    for(let i=0;i<btn.length;i++){
        btn[i].style.background = "white";
        btn[i].style.color = "black";
    }
    document.getElementById("move").style.background = "white";
    document.getElementById("move").style.color="black";
    document.querySelector("#submith").style.background="white";
    document.querySelector("#submith").style.color="black";
}
// ------------Correction display-------------------------------------
function correction(){
    sumScore()
    document.querySelector("#submith").style.display="none";
    let div = document.createElement("div");
    div.className="contain_result";      // div of correction...
    div.id="result";
    document.body.appendChild(div);
         // header.......
    let header =document.createElement("div");
    header.className = "header";
    div.appendChild(header);
    let h1 =document.createElement("h1");
    h1.textContent="Your Quiz has already completed";
    header.appendChild(h1);
        // show score conten....
    let show_container =document.createElement("div");
    show_container.className="show";
    div.appendChild(show_container);
    let h2 = document.createElement("h2");
    h2.textContent="Your Result here";
    show_container.appendChild(h2);
        // the score -----
    let score_container =document.createElement("div");
    score_container.className="total_Score";
    div.appendChild(score_container);
    let showScore = document.createElement("h2");
    showScore.textContent=total_Score +"/" + (allScores-1);
    showScore.style.color="blue";
    score_container.appendChild(showScore);
        ///       get view the result----
    let text_view =document.createElement("div");
    text_view.className="show";
    div.appendChild(text_view);
    let getView = document.createElement("h2");
    getView.textContent="To view your correction, Please click on button below.";
    text_view.appendChild(getView);
        //button gor got to check correction  ------
    let correction_contain =document.createElement("div");
    correction_contain.className="button_Correction";
    div.appendChild(correction_contain);

    let btn_Correction = document.createElement("button");
    btn_Correction.id="check_correction";
    btn_Correction.textContent="< Back";
    correction_contain.appendChild(btn_Correction);

    btn_Correction.onclick=function(){ 
        location.reload()
    }
}
// ----------------Sum score-------------------------
function sumScore(){
    if(isNotTrue == true){
        total_Score+=1;
        isNotTrue = false;
    }else if(number_Click == 2){
        if(btn1===btn2 || btn1===btn3 || btn2===btn3){
            total_Score +=1
        }
    }else if(number_Click == 3){
        if(btn1===btn2===btn3){
            total_Score+=1;
        }
    }else{total_Score+=0;}  
    number_Click = 0;
    btn1=false;
    btn2=false;
    btn3=false;
    allScores += 1
}
// -----------Create button Click---------------------------------------
let button_Click = document.getElementsByClassName("btn"); // Get button for click...
for(let click of button_Click){click.addEventListener("click",getClick);}
function getClick(event) {   // Click function...........
    var targets = event.target;
    var start = temperary_Data[global_Index-1];
    if(start.type_of_question == "checkbox"){
        if(number_Click < 3){
            for(let i = 0;i < button_Click.length;i++){
                if(targets.textContent == button_Click[i].textContent){
                    if(i == start[1]){
                        btn1 = true;
                    }else if(i == start[2]){
                        btn2 = true;
                    }else if(i == start[3]){
                        btn3 = true;
                    }
                }    
            }
            
        }else{
            alert("It's less than 4.")
        }
        targets.style.background="blue";
        targets.style.color="white";
    }else{
        if(number_Click == 0){
            for(let i = 0;i < button_Click.length;i++){
                if(targets.textContent == button_Click[i].textContent){
                    isNotTrue=true;
                    targets.style.background="blue";
                    targets.style.color="white";
                }
            }
        }else{
            alert("It has only one answer.");
        } 
    }
    number_Click =1
    document.querySelector(".blue").style.background="#32ff7e";
    document.querySelector(".blue").style.color="white";
}


// -------------------Computing Score----------------------------
let corrections = document.createElement("div");
corrections.className = "correction";
document.body.appendChild(corrections);
// function correction_View(){
//     let start = dat_test[global_Index];
//     let question_View=document.createElement("div");
//     question_View.id="question_view";
//     question_View.textContent= global_Index+1+".  "+start.title_question;
//     corrections.appendChild(question_View);

//     let ans_View1 = document.createElement("div");
//     ans_View1.className="answer_view";
//     ans_View1.textContent= "1. "+start.answer_1;
//     corrections.appendChild(ans_View1);

//     let ans_View2 = document.createElement("div");
//     ans_View2.className="answer_view";
//     ans_View2.textContent= "2. "+start.answer_2;
//     corrections.appendChild(ans_View2);

//     let ans_View3 = document.createElement("div");
//     ans_View3.className="answer_view";
//     corrections.appendChild(ans_View3)
//     ans_View3.textContent= "3. "+start.answer_3;

//     let ans_View4 = document.createElement("div");
//     ans_View4.className="answer_view";
//     ans_View4.textContent= "4. "+start.answer_4;
//     corrections.appendChild(ans_View4);
   
// }

// delete all the data from local storage ==========================================
function removeDataFromLocalStorage(){
    localStorage.clear();
}


// take all data storage ============================================================
function getAllDataStorage(){
    let forStorAllDataStorage = [];
    for(i=0; i<localStorage.length; i++){
        let data = JSON.parse(localStorage["data"+i]);
        forStorAllDataStorage.push(data);
    }
    return forStorAllDataStorage;
}


// add new data to local storage ======================================================
function addDatasToLocalStorage(v, i){
    let dataAddToLocal = JSON.stringify(v);
    localStorage.setItem('data'+i, dataAddToLocal);
    v = []
}
// getAllDataStorage();

// display quiz =========================================================================
function displayDataStorage(event){
    let allDataLocalstorage = getAllDataStorage();
    let indexOfData = event.target.parentNode.id;
    let getOneData = allDataLocalstorage[indexOfData];
    removeDataFromLocalStorage();
    let keyOfData = 0;
    for (let value of allDataLocalstorage){
        addDatasToLocalStorage(value, keyOfData)
        keyOfData +=1
    }
    document.getElementsByClassName("quiz_Container")[0].style.display = "block";
    temperary_Data = getOneData;
    create_Quiz(temperary_Data)
}

// delete quiz ============================================================
function deletDataStorage(event){
    document.querySelector('.container-on-page-quiz').remove();
    let allDataLocalstorage = getAllDataStorage();
    let indexOfData = event.target.parentNode.parentNode.id;
    allDataLocalstorage.splice(indexOfData, 1);
    removeDataFromLocalStorage();
    let keyOfData = 0
    for (let value of allDataLocalstorage){
        addDatasToLocalStorage(value, keyOfData)
        keyOfData +=1
    }
    // location.reload();
    menuTask();
    
}

// edit quiz ==============================================================
function editDataStorage(event){
    let allDataLocalstorage = getAllDataStorage();
    let indexOfData = event.target.parentNode.parentNode.id;
    let getOneData = allDataLocalstorage[indexOfData];
    getOneData.splice(getOneData.length-1, 1);
    allDataLocalstorage.splice(indexOfData, 1);
    removeDataFromLocalStorage();
    data=getOneData;
    let keyOfData = 0;
    for (let value of allDataLocalstorage){
        addDatasToLocalStorage(value, keyOfData)
        keyOfData +=1
    }
    document.querySelector('.container-on-page-quiz').remove();
    addQuestion();
    showTask();
    btnBack.style.display='none';
}

//  
function closePageQuiztoCreateQuestion(){
    document.querySelector('.container-on-page-quiz').remove();
    addQuestion();
}
function closePageQuiztoHomePage(){
    document.querySelector('.container-on-page-quiz').remove();
    homePage();
}
// Quiz menu =====================================================================================================
function menuTask(event){
    document.querySelector("#home-page").style.display="none";

    // button menu on page display quiz ------------------------------------------------------
    let container_on_page_quiz = document.createElement('div');
    container_on_page_quiz.className='container-on-page-quiz';

    let group_of_button = document.createElement('div');
    group_of_button.className='group-of-button';
// 
// 
// 
    // back to home page button problem===================================
// 
// 
// 
    let contain_button_back_to_homepage_on_page_quiz=document.createElement('div');
    contain_button_back_to_homepage_on_page_quiz.className='contain-button-back-to-homepage';
    let button_back_to_homepage_on_page_quiz = document.createElement('button');
    button_back_to_homepage_on_page_quiz.className='back-to-homepage home-page btn-back';
    button_back_to_homepage_on_page_quiz.id='btnBack';
    button_back_to_homepage_on_page_quiz.textContent='back';
    button_back_to_homepage_on_page_quiz.addEventListener('click', closePageQuiztoHomePage)
    contain_button_back_to_homepage_on_page_quiz.appendChild(button_back_to_homepage_on_page_quiz);
    group_of_button.appendChild(contain_button_back_to_homepage_on_page_quiz);

    // ===================================================================
    let contain_button_menu_on_page_quiz = document.createElement('div');
    contain_button_menu_on_page_quiz.className='contain-button-menu';

    // on page =====================================================
    let button_menu_quiz_on_page_quiz = document.createElement('button');
    button_menu_quiz_on_page_quiz.className = 'onpage button-on-page-quiz';
    button_menu_quiz_on_page_quiz.textContent='Quiz';
    contain_button_menu_on_page_quiz.appendChild(button_menu_quiz_on_page_quiz);

    // back to create quiz =========================================
    let button_menu_create_on_page_quiz = document.createElement('button');
    button_menu_create_on_page_quiz.className='button-on-page-quiz';
    button_menu_create_on_page_quiz.textContent='Create';
    button_menu_create_on_page_quiz.addEventListener('click', closePageQuiztoCreateQuestion)
    contain_button_menu_on_page_quiz.appendChild(button_menu_create_on_page_quiz);
    group_of_button.appendChild(contain_button_menu_on_page_quiz);
    container_on_page_quiz.appendChild(group_of_button);
    document.body.appendChild(container_on_page_quiz);



    // card of menu for display quiz ----------------------------------------------------------
    let container_quiz_card_on_page_quiz = document.createElement('div');
    container_quiz_card_on_page_quiz.className='contain-quiz-card';

    for (i=0; i<localStorage.length; i++){

        // get title quiz from local storage ===================================================
        // var localStorages = localStorage.getItem['data0'];
        var getting_data_from_localStorage = JSON.parse(localStorage.getItem('data'+i))


        // create card for user click display =================================================
        let quiz_card = document.createElement('div');
        quiz_card.className='quiz-card';
        quiz_card.id=i;
        
        // the place the user click to display ================================================
        let top = document.createElement('div');
        top.className='top';
        top.addEventListener('click', displayDataStorage);
        top.textContent=getting_data_from_localStorage[getting_data_from_localStorage.length-1]['title_quiz'];
        // the place the have the button the delete the quiz or edit the quiz =================
        let bottom = document.createElement('div');
        bottom.className='bottom';

        // place to contain the group of button in the cade ===================================
        let button_group_of_card = document.createElement('div');
        button_group_of_card.className='button-group-of-card';

        // create the button for edit the quiz ================================================
        let button_edit_of_card = document.createElement('button');
        button_edit_of_card.className='button-edit-of-card button-bottom';
        button_edit_of_card.textContent='Edit';
        button_edit_of_card.addEventListener('click', editDataStorage);
        bottom.appendChild(button_edit_of_card);

        // create the button for delete the quiz from local Storage ============================
        let button_delete_of_card = document.createElement('button');
        button_delete_of_card.className='button-delete-of-card button-bottom';
        button_delete_of_card.textContent='Delete'
        button_delete_of_card.addEventListener('click', deletDataStorage)
        bottom.appendChild(button_delete_of_card)

    
        quiz_card.appendChild(top);
        quiz_card.appendChild(bottom);
    
        container_quiz_card_on_page_quiz.appendChild(quiz_card);
    }
    container_on_page_quiz.appendChild(container_quiz_card_on_page_quiz);
}
let btn_get_Quiz= document.getElementById("btnQuiz");    //Get into the Quiz....
btn_get_Quiz.addEventListener("click",menuTask);

