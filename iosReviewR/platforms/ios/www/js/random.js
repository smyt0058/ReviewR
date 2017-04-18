var app = {
    image: null,
    imgOptions: null,
    key: 'reviewr-smyt0058',
    currentIndex: -1,
    data: {},
    initialize: function () {
        document.addEventListener('DOMContentLoaded', this.onReady.bind(this), false);
    },
    onReady: function () {
        localStorage.clear();
        console.log(navigator.camera);
        if (localStorage.getItem(app.key)) {
            app.data = JSON.parse(localStorage.getItem(app.key));
        } else {
            console.log("dont have it");
            app.data = {
                "reviews": [
                    {
                        "id": Date.now(),
                        "name": "Timmies",
                        "rating": 4,
                        "img": "path/and/filename/on/device.png"
                }
                , {
                        "id": Date.now(),
                        "name": "Starbucks",
                        "rating": 4,
                        "img": "path/and/filename/on/device.png"
                }

                ]
            };
            localStorage.setItem(app.key, JSON.stringify(app.data));
        }
        console.log(app.data);
        let addItem = document.getElementById("addItemBtn");
        let wModal = document.getElementById("pictureModal");
//        let wbuttons = wModal.getElementsByTagName("button");
        let photoBtn = document.getElementById("pictureBtn");
        let cancelBtn = document.getElementById("cancelBtn");
        let saveBtn = document.getElementById("saveBtn");
        let deleteModal = document.getElementById("deleteModal");
        let dButton = dModal.getElementsById("deleteBtn");
        dButton.addEventListener("touchstart", app.deleteButton);
        photoBtn.addEventListener("touchstart", function () {
            app.callCamera();
        });
        cancelBtn.addEventListener("touchstart", app.cancelButton);
        saveBtn.addEventListener("touchstart", app.saveButton);
        addItem.addEventListener("touchstart", function () {
            app.writeModalScreen();
        });

        app.displayList();
    },
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    },
    displayList: function () {
        app.data = JSON.parse(localStorage.getItem(app.key));

        console.dir(app.data);
        var content = document.querySelector('#reviewList');
        content.innerHTML = "";
        let ul = document.createElement("ul");
        ul.classList.add("table-view");
        
        app.data.reviews.forEach(function (element, index) {
            let li = document.createElement("li");
            let a = document.createElement('a');
            let span = document.createElement('span');
            let img = document.createElement("img");
            let rateDiv = document.createElement("div");

            rateDiv.className = "stars";
            for (let i = 0; i < 5; i++) {
                let spanStar = document.createElement("span");
                spanStar.content = '&#2606;';
                spanStar.className = "star";
                rateDiv.appendChild(spanStar);
            }

            let runRun = rateDiv.getElementsByClassName("star");
            for (let j = 0; j < element.rating; j++) {
                runRun[j].classList.add("rated");
            }

            img.src = element.img;
            img.className += "media-object pull-left";
            li.className += "table-view-cell";
            span.className += "name";
            // span.style = "padding-left:5px";
            span.appendChild(rateDiv);
            //span.innerHTML = element.rating;
            a.href = "#deleteModal";
            a.setAttribute("data-id", index);
            a.innerHTML = element.name;
            a.addEventListener("touchstart", function () {
                app.currentIndex = index;
                app.deleteModalScreen();
            });
            li.appendChild(img);
            li.appendChild(a);
            li.appendChild(span);
            ul.appendChild(li);
            content.appendChild(ul);
        });
    },
    cancelButton: function () {
        let modal = document.getElementById('pictureModal');
        let inputItem = document.getElementById("item");
        let inputRate = document.getElementById("rating");
        inputItem.value = "";
        inputRate.value = "";
        app.currentIndex = -1;
        modal.classList.toggle("active");
    },
    saveButton: function () {
        let modal = document.getElementById('pictureModal');
        let inputItem = document.getElementById("iitem");
        let inputRate = document.getElementById("rating");
        let ids = Date.now().toString();
        let review = {
            id: ids,
            name: inputItem.value,
            rating: inputRate.value,
            img: app.image
        };
        console.log(review);
        app.data.reviews.push(review);
        localStorage.setItem(app.key, JSON.stringify(app.data));
        inputItem.value = "";
        inputRate.value = "";
        app.currentIndex = -1;
        modal.classList.toggle("active");
        app.displayList();
    },
    deleteButton: function () {
        app.data.reviews.splice(app.currentIndex, 1);
        app.currentIndex = -1;
        let modal = document.getElementById('deleteModal');
        // localStorage.removeItem(app.key);
        localStorage.setItem(app.key, JSON.stringify(app.data));
        modal.classList.toggle("active");
        app.displayList();
    },
    writeModalScreen: function () {
        console.log("inside write modal screen");
        let inputItem = document.getElementById("inputItem");
        let inputRate = document.getElementById("inputRating");
        inputItem.value = "";
        inputRate.value = "";
        app.eventStars();
    },
    deleteModalScreen: function () {
        console.log(app.currentIndex);
        console.log("inside delete modal screen");
        let inputItem = document.getElementById("delItem");
        let inputRate = document.getElementById("delRating");
        let img = document.createElement("img");
        let imgDiv = document.getElementById("imageBox");
        let doodle = app.data.reviews[app.currentIndex];
        imgDiv.innerHTML = "";
        img.src = review.img;
        imgDiv.appendChild(img);
        inputItem.value = review.name;
        inputRate.value = review.rating;

        let modal = document.getElementById("deleteModal");
        let starsArr = modal.getElementsByClassName("star");

        for (let i = 0; i < review.rating; i++) {
            starsArr[i].classList.toggle("rated");
        }

    },
    callCamera: function () {
        app.imgOptions = {
            "quality": 80,
            "destinationType": navigator.camera.DestinationType.FILE_URI,
            "encodingType": navigator.camera.EncodingType.PNG,
            "mediaType": navigator.camera.MediaType.PICTURE,
            "pictureSourceType": navigator.camera.PictureSourceType.CAMERA,
            "allowEdit": true,
            "targetWidth": 300,
            "targetHeight": 300
        }

        navigator.camera.getPicture(app.imgSuccess, app.imgFail, app.imgOptions);
    },
    imgSuccess: function (imageURI) {
        app.image = imageURI;
        console.log("Image loaded just fine");

    },
    imgFail: function (msg) {
        console.log("Failed to get image: " + msg);
    },
    eventStars: function () {
        let modal = document.getElementById("writeModal");
        console.log(modal);
        let starSpan = modal.getElementsByClassName("star");
        let netRating = document.getElementById("inputRating");
        console.dir(starSpan);
        for (var a = 0; a < starSpan.length; a++) {
            // console.log(a);
            starSpan[a].addEventListener("touchstart", function (a) {
                return function () {
                    //console.log(a + 1);
                    netRating.value = a + 1;

                    for (let i = 0; i < 5; i++) {
                        if (i < netRating.value) {
                            starSpan[i].className = "star rated";
                        } else
                            starSpan[i].className = "star";
                    }
                };
            }(a));
        }


    }
};
app.initialize();
