/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const studentsPerPageCount = 9;
const linkListUL = document.querySelector('ul.link-list');
const headerDiv = document.querySelector('header.header');
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/


//displays student information
function showPage(studentData, pageParam){
   const startIndex = (pageParam  * studentsPerPageCount) - studentsPerPageCount;
   const endIndex = (pageParam  * studentsPerPageCount);

   const studentListDiv = document.querySelector('.student-list');
   studentListDiv.innerHTML = '';

   for(let i = 0; i < studentData.length; i++){
      if(i >= startIndex && i < endIndex){
        const student = studentData[i];

        const html = `
               <li class="student-item cf">
                     <div class="student-details">
                        <img class="avatar" src="${student.picture.large}" alt="${student.name.first}'s Profile Picture">
                        <h3>${student.name.first} ${student.name.last}</h3>
                        <span class="email">${student.email}</span>
                     </div>
                     <div class="joined-details">
                        <span class="date">${student.registered.date}</span>
                     </div>
               </li>`
        studentListDiv.insertAdjacentHTML('beforeend',html);
      }
   }
}

//creates the search bar ui
// decided to dynamically create elements instead of using template literals
function createSearchBar(){
   const label = createElement('label','for:search','class:student-search');
   const input = createElement('input','id:search','placeholder:Search by name...');
   const button = createElement('button',);
   const img = createElement('img', 'src:img/icn-search.svg','alt:Search icon');

   button.appendChild(img);
   label.appendChild(input);
   label.appendChild(button);

   headerDiv.appendChild(label);
}

//This function will create an html element and set properties as needed, can handle a variable number of arguments
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
function createElement(elementType, variableArgumentList){
   let elem = document.createElement(elementType);
   for(var i in arguments){
      if(i > 0){
         const args = arguments[i].split(":");
         elem.setAttribute(args[0], args[1]);
      }
   }
   return elem;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(studentData){
   const buttonCount = Math.ceil(studentData.length/studentsPerPageCount);
   linkListUL.innerHTML = '';
   for(let i = 1; i <=  buttonCount; i++){
      const liElem = createElement('li');
      const liButton = createElement('button','type:button');
      liButton.textContent = i;
      liElem.appendChild(liButton);

      linkListUL.appendChild(liElem);
   }
   setActiveLinkButton(1);
}

//function search data 
//searchs for matched data or uses the full data set. Then sets the page page based on the results
function searchData(displayPage){
   let filteredStudentList = [];
   const searchTerm = document.getElementById('search').value;
   if(searchTerm){
      for(let i = 0; i < data.length; i++){
         const firstNameMatch = data[i].name.first.toLowerCase().indexOf(searchTerm.toLowerCase());
         const lastNameMatch = data[i].name.last.toLowerCase().indexOf(searchTerm.toLowerCase());
         if((+firstNameMatch != -1) || (+lastNameMatch != -1)){
             filteredStudentList.push(data[i]);
         }
      }
   } else {
      filteredStudentList = data;
   }

   if(!displayPage){
      displayPage = 1;
   }
   //always check to clear any leftover error displays
   clearError();

   //if no results are found no data will be displayed
   showPage(filteredStudentList, displayPage);
   addPagination(filteredStudentList);
   setActiveLinkButton(displayPage)

   //display an error screen if needed
   if(filteredStudentList.length <= 0){
      const errString = `No results found for the term <b>"${document.getElementById('search').value}"</b>. <br/>Please try again.`;
      displayErrorPage(errString, 'no-results');
   }
}

//display an error screen
function displayErrorPage(message, classString){
   const pageDiv = document.querySelector('.page');
   const noResultsDiv = `<div id='error' class="${classString}">${message}</div>`;
   pageDiv.children[2].insertAdjacentHTML('beforebegin', noResultsDiv);
}

//Check if there is an error screen and if so clear it
function clearError(){
   let clearPreviousErr = document.getElementById('error');
   if(clearPreviousErr){
      clearPreviousErr.remove();
   }

}

//sets active on needed button
function setActiveLinkButton(itemToActivate){
   //account for zero based indexing
   itemToActivate --;
   for(let i = 0; i < linkListUL.children.length; i++){
      if(i === itemToActivate){
         linkListUL.children[i].firstElementChild.className = 'active';
      } else {
         linkListUL.children[i].firstElementChild.className = '';
      }
   }
}

// Add event listners 
//-----------------------------------------------------------------------------------------------------
//added event listner on pagination buttons
linkListUL.addEventListener('click', (event) => {
   const elem = event.target;
   if(elem.tagName === 'BUTTON'){
      searchData(+elem.textContent);
   }
});

//event listner for search icon
headerDiv.addEventListener('click', (event) => {
   if(event.target.tagName === 'IMG'){
      searchData();
   }
});

//event listener for search input box
headerDiv.addEventListener('keyup', (event) => {
   if(event.target.tagName === 'INPUT'){
      searchData();
   }
});



// Call functions
createSearchBar();
searchData()

// The pagination function is tied to the search data function and invoked inline inside of this function

