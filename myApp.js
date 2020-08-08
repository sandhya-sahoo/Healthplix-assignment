(function(window){
    function Page(){
        
        this.tagContainer = document.querySelector(".tag-container");
        this.tagsList = document.querySelector(".tags");
        this.createTagInput = document.querySelector('.creat-tag-input');
        this.storeEl = document.querySelector('.show-all-tags');
    
        // Creating the tags
        this.store = ["java", "javaScript", "css" ,"html", "react", "redux"];
        this.tempStore= this.store.slice(0);;
    }
    //utility methods 
    Page.prototype.createTags= function(inputValue, parentEl){
        const div = document.createElement('div');
        const button = document.createElement('button');
        const span = document.createElement('span');
        
        div.setAttribute('class', 'tag');
        button.setAttribute('class', 'close-btn');

        button.innerHTML= "X";
        span.innerHTML = inputValue;
        
        if(parentEl != this.storeEl) {
            div.appendChild(button);
        }
        div.appendChild(span);
        parentEl.appendChild(div);
    }
    Page.prototype.resetTags=function(){
        this.storeEl.innerHTML = '';
    }
    Page.prototype.filterTagsWithSearch= function (searched) {
        var res = [], tis = this;
        for (var j=0; j<tis.store.length; j++) {
            if (tis.store[j].match (searched)) {
                res.push(tis.store[j]);
            }
        }
        return res;
    }
    Page.prototype.checkDuplicate = function(value, arr) {
        var isDuplicate = false;
        isDuplicate = arr.includes(value);
        return isDuplicate;
    }

    //Methods used to register all events
    Page.prototype.addTagEvents= function() {
        // prventing ',' from printing
        this.createTagInput.addEventListener('oninput', (e) => {
            if(e.which == 188) {
                e.preventDefault();
            }
        });
        this.createTagInput.addEventListener('keyup', (e) => {
            // replace , value from target value and update
            e.target.value = e.target.value.replace(/,/g, '');
            if(e.which == 13 || e.which == 188) {
                //create a tag in input area
                this.createTags(e.target.value, this.tagsList);
                if(!this.checkDuplicate(e.target.value, this.tempStore)) {
                    this.tempStore.push(e.target.value);
                } 
                this.resetTags();
                this.showTagsInStore(this.tempStore);
                e.target.value = '';
            }
        });
    }
    Page.prototype.removeTagEvents= function() {
        document.addEventListener('click' , (e) => {
            var target = e.target;
            if(target.className == 'close-btn') {
                e.target.parentNode.remove()
            }
        })
    }
    Page.prototype.searchEvents= function() {
        this.createTagInput.addEventListener('keyup', (e) => {
            var searched = e.target.value;
            if(e.which !== 8 && searched !== '') {
                var filteredRes = this.filterTagsWithSearch(searched);
                if(filteredRes.length) {
                    this.resetTags();
                    this.showTagsInStore(filteredRes);
                }
            }
        })
    }

    //initilization and event bind
    Page.prototype.showTagsInStore= function(params) {
        if(params.length && params.length <= 50) {
            var tis = this;
            params.map((item) => {
                tis.createTags(item, tis.storeEl);
            })
        }
    }
    Page.prototype.bindEvents = function(){
        this.addTagEvents();
        this.removeTagEvents();
        this.searchEvents();
    };
    Page.prototype.init = function() {
        this.bindEvents();
        this.showTagsInStore(this.store);
    };
    window.Page = Page;
})(window);