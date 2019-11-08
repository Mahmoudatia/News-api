
//navigation bar links to slide category
let Links = document.querySelectorAll(".nav-link");

//connected navigation bar links with category to slide between various topics 
// i made a for loop that loobs over the links and with addEventListener i got click in the links 
// and function that contain event (e) as a parameter i can get what was written in the linke 
// and catched it in variable category that httpRequest(); use it as a parameter 
// invoking  httpRequest(category) cause after every click you got a new topic 
let req; 
let posts = ""
changeCategory();
function changeCategory(){
    for(let i= 0 ; i <Links.length ; i++){
        Links[i].addEventListener("click",function(e){
        let category = e.target.innerHTML
        httpRequest(category);
        })
    }
}

// my main function 
// starts with if satament to check a browsers version if it allow new xmlhttprequest or the old one active x object 
// then i got api free link and open the connection between server with GET method 
// making if statement to check the status and the readystate of each request and get save response 
// transpile response formate to object from string and send request function  
httpRequest("general");
function httpRequest(category){
    if(window.XMLHttpRequest)
    {
    req = new XMLHttpRequest();
    }
    else
    {
        req = new ActiveXObject('microsoft.Xmlhttp')
    }
    let Newslink = `https://newsapi.org/v2/top-headlines?country=eg&category=${category}&apiKey=779174e962544d29a29637865011dcc1`
    req.open("GET", Newslink)

    req.onreadystatechange = function(){
        if(req.status == 200 && req.readyState == 4)
        {
            posts = JSON.parse(req.response);
            posts = posts.articles
            displayNews();
        }
    }
    req.send();
}
// function that makeing for loob over JSON date to display it in grid system   
let row = document.getElementById("row")
function displayNews(){
    temp= "";
    for(let i = 0 ; i<posts.length ; i++)
    {
        temp +=`<div class="col-md-6 ">
                <div class="mb-2">
                    <img alt="${posts[i].title}" class="img-fluid   border border-bottom-2 " src="${posts[i].urlToImage}">
                </div>
                <div class="desc bg-light">
                    <a href="${posts[i].url}" target="_blank"><h3 class="font-weight-bold text-center">${posts[i].title}</h3></a>
                    <p class="text-muted">${posts[i].description}</p>
                    <span class="text-danger font-weight-bold" > author : </span>
                    <span class="text-dark font-weight-bold" >${posts[i].author}</span>
        </div>
    </div>`
    }
    row.innerHTML = temp ;
}


