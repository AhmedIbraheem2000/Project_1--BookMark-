let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let searchData =document.getElementById("searchData") ; 
let submitData = document.getElementById("submitData")
let bookCount = -1
let BookList = [];
if(localStorage.getItem("bookStorage") != null){
    BookList = JSON.parse(localStorage.getItem("bookStorage"));
    bookDisplay(BookList)
}
function addBook(){
    let bookData = {
        BookName:siteName.value,
        bookUrl:siteUrl.value,
    }
    BookList.push(bookData)
    console.log(BookList);
    localStorage.setItem("bookStorage",JSON.stringify(BookList))
    bookDisplay(BookList)
    clearBook()
}
let nameRegex = /^[A-Za-z_]{1,}/
function isNameValid(){
    if(nameRegex.test(siteName.value.value)){
        return true ; 
    }else{
        return false;   
    }
}
let urlRegex = /^(https:\/\/)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid(){
    if(urlRegex.test(siteUrl.value)){
        return true ;
    } else{
        return false;
    }
}
siteName.onkeyup = function(){
    if(isUrlValid() && isNameValid()){
        submitData.removeAttribute("disabled")
    }else{
        submitData.disabled = "true"
    }
}
siteUrl.onkeyup = function(){
    if(isUrlValid() && isNameValid()){
        submitData.removeAttribute("disabled")
    }else{
        submitData.disabled = "true"
    }
}

function bookDisplay(){
    bookShow = '';
    for(i = 0 ; i < BookList.length ; i++){
        bookShow += `<tr>
        <td>${[i]}</td>
        <td>${BookList[i].BookName}</td>
        <td>
            <a href="${BookList[i].siteUrl}" class="btn btn-outline-success ">
                <i class="fa-solid fa-eye"></i><span class="ps-2" >Visit</span>
            </a>
        </td>
        <td>
            <a href="#" class="btn btn-outline-danger" onclick='deleteBook(${i})'>
                <i class="fa-solid fa-trash"></i><span  class="ps-2">Delete</span>
            </a>
        </td>
        <td>
        <a href="#" class="btn btn-outline-warning" onclick='Update(${i})'>
        <i class="fa-solid fa-pen"></i><span  class="ps-2">Update</span>
        </a>
    </td>
</tr> `
    }
    document.getElementById("dataBody").innerHTML = bookShow;
}
function deleteBook(bookIndex){
    BookList.splice(bookIndex , 1 )
    localStorage.setItem("bookStorage",JSON.stringify(BookList))
    bookDisplay(BookList)
}
function clearBook(){
    siteName.value = ""
}

function search(){
    let serchVal = searchData.value.toLowerCase();
    let bookShow = '';
    for(let i = 0 ; i <  BookList.length ; i++){
        if(BookList[i].BookName.toLowerCase().includes(serchVal) == true){
            bookShow +=  `<tr>
                        <td>${[i]}</td>
                        <td>${BookList[i].BookName.toLowerCase().replace(serchVal,"<span class='text-warning'>"+serchVal+"</span>")}</td>
                        <td>
                            <a href="#" class="btn btn-outline-success">
                                <i class="fa-solid fa-eye"></i><span class="ps-2">Visit</span>
                            </a>
                        </td>
                        <td>
                            <a href="#" class="btn btn-outline-danger" onclick='deleteBook(${i})'>
                                <i class="fa-solid fa-trash"></i><span  class="ps-2">Delete</span>
                            </a>
                        </td>
                        <td>
                            <a href="#" class="btn btn-outline-warning" onclick='update(${i})'>
                            <i class="fa-solid fa-pen"></i><span  class="ps-2">Update</span>
                            </a>
                        </td>
                </tr> ` 
        };
    }
    document.getElementById("dataBody").innerHTML = bookShow;   
}
function Update(index){
    bookCount = index
    siteName.value = BookList[bookCount].BookName;
    document.getElementById("submitData").classList.add("d-none");
    document.getElementById("editData").classList.remove("d-none")
}
function edit(){
    BookList[bookCount].BookName  = siteName.value;
    document.getElementById("submitData").classList.remove("d-none");
    document.getElementById("editData").classList.add("d-none");
    bookDisplay()
}
