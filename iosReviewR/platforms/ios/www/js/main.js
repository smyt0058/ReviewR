/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//Global Variables
"use strict";
let key = "reviewr-smyt0058";
let reviews = [];
let currentReview = 0;


/***********************************************************************************************/
console.log("hello!");
if (document.deviceready){
    document.addEventListener('deviceready', onDeviceReady);
} else {
    document.addEventListener('DOMContentLoaded', onDeviceReady);
}

function onDeviceReady(){
    
    console.log("ready!");
//    localStorage.clear();
    if (!localStorage.getItem(key)) {
        console.log("No contact data: setting key");
        
        let first_review = {
            id: Date.now(),
            name: "LG G6",
            rating: 5,
            img: "lg-g6.png"
        }
        
        reviews.push(first_review);
        console.log(reviews);
        localStorage.setItem(key, JSON.stringify(reviews));
        
        
    }
    
    document.getElementById("pictureBtn").addEventListener("touchstart", takePicture);
    document.getElementById("saveReviewBtn").addEventListener("touchstart", saveReview);
    document.getElementById("cancelBtn").addEventListener("touchstart", togglePictureModal);
    
    showReviews();
    
}

/////////Picture Methods///////////////////////////////
function takePicture(){
    console.log("taking a picture!");
    let options = {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.PNG,
        mediaType: Camera.MediaType.PICTURE,
        pictureSourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300
    };
   
    navigator.camera.getPicture( onSuccess, onFail, options );
    
}
function onSuccess(imageURI){
    var image = document.getElementById('myImage');
    image.src = imageURI;
}
function onFail(message){
    alert('Failed because: ' + message);
}
///////////////////////////////////////////////////////

function saveReview(){
    console.log("save!");
    
    //create contact object
    let newContact = {
        id: Date.now(),
        name: document.getElementById("name").value,
        dob: document.getElementById("dob").value,
        ideas:[]
    }
    
    //grab array from LS
    tempPeople = JSON.parse(localStorage.getItem("giftr-smyt0058"));
//    console.log(tempPeople);
    
    //add newContact to the array
    tempPeople.push(newContact);
    
    //set array back into LS
    localStorage.setItem("giftr-smyt0058", JSON.stringify(tempPeople));
    
    //set modal value back to empty
    document.getElementById("name").value = "";
    document.getElementById("dob").value = "";
    
//    document.getElementById("saveContactBtn").removeEventListener("touchstart", saveContact);document.getElementById("saveContactBtn").removeEventListener("touchstart", saveContact);
    
    //close modal
    toggleContactModal();
    
    //refresh contact list
    showContacts();
    
}

function showReviews(){
    console.log("showing reviews!");
    let list = document.getElementById("reviewList");
    list.innerHTML = "";
    
    reviews = JSON.parse(localStorage.getItem(key));
    
    reviews.forEach(function(review){
        let name = review.name;
        let imgSRC = review.img;
        let rating = review.rating;
        let id = review.id;
        
        let ul = document.createElement("ul");
        ul.classList.add("table-view");
        list.appendChild(ul);
        
        
        let li = document.createElement("li");
        li.classList.add("table-view-cell");
        li.classList.add("media");
        li.setAttribute("data-id", id);
        console.log(id);
        ul.appendChild(li);
        
        let a = document.createElement("a");
        a.classList.add("navigate-right");
        li.appendChild(a);
        
        let img = document.createElement("img");
        img.classList.add("media-object");
        img.classList.add("pull-left");
        img.src = imgSRC;
        console.log(imgSRC);
        a.appendChild(img);
        
        let div = document.createElement("div");
        div.classList.add("media-body");
        let h2 = document.createElement("h2");
        let p = document.createElement("p");
        p.textContent = rating;
        console.log(rating);
        h2.textContent = name;
        console.log(name);
        div.appendChild(h2);
        div.appendChild(p);
        a.appendChild(div);
        
        
    })
    
    
    
}

function deleteReview(ev){
    let target = ev.currentTarget.parentElement;
    let ul = document.getElementById("contact-list");
    currentContact = target.id;
    //grab contacts from Ls
        let tempPeople = JSON.parse(localStorage.getItem("giftr-smyt0058"));
        
        let index = -1; //init to -1 = not found
        
         //finds the index of the element that matches the ID
        for (let i = 0, len = tempPeople.lenght; i < len; i++) {
            if(tempPeople[i].id == currentContact) {
                index = i;
                break;
            }
        }
        
    //if we found it remove it from the contacts list
    tempPeople.splice(index, 1);
    //sets the updated array into LS
    localStorage.setItem("giftr-smyt0058", JSON.stringify(tempPeople));
    //removes the html
    ul.removeChild(target);
}

//closes the contact modal
function toggleDeleteModal(){
    let modal = document.querySelector("#deleteModal");
    modal.classList.toggle("active");
}

//closes idea modal
function togglePictureModal(){
    console.log("closing the modal");
    let modal = document.querySelector("#pictureModal")
    modal.classList.toggle("active");
}












