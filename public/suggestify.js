const SUGGESTIFY_URL = "http://localhost:8080/api/suggest/";

class Suggestify{
    constructor(options={}){
        this.input = options.input;
        this.form = options.form;
        this.delay = options.delay || 0;
        this.token = options.token;
        this.minChars = options.minChars || 1;

        this.disableHtmlAutocomplete();
        this.wrapInput();
        this.createUI();
        this.bindEvents();

        this.reset();

        axios.defaults.headers.common['authorization'] = this.token;
    }

    disableHtmlAutocomplete(){
        this.input.setAttribute('autocomplete', 'off');
    }

    wrapInput(){
        var wrapper = document.createElement('div');
        wrapper.classList.add('auto-wrapper');
        this.input.parentNode.insertBefore(wrapper, this.input);
        wrapper.appendChild(this.input);
    }

    createUI(){
        var listUI = document.createElement('ui');
        listUI.style.top = this.input.getBoundingClientRect().height + 'px';
        listUI.classList.add('autocomplete-ui');
        this.input.parentNode.appendChild(listUI);
        this.listUI = listUI;
    }

    bindEvents(){
        this.input.addEventListener('input', this.valueChanged.bind(this));
        this.input.addEventListener('blur', this.handleBlur.bind(this));
        this.input.addEventListener('keydown', this.handleKeydown.bind(this));
        this.listUI.addEventListener('mousedown', this.handleMousedown.bind(this));

        if(this.form){
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    valueChanged(){
        var value = this.input.value;
        this.previousValue = value;
        if(value.length >= this.minChars){
            this.fetchSuggestions(value, suggestions => {
                this.visible = true;
                this.suggestions = suggestions;
                this.selectedIndex = null;
                this.bestSuggestionIndex = 0;
                this.draw();
            });
        }
        else{
            this.reset();
        }
    }

    reset(){
        this.visible = false;
        this.suggestions = [];
        this.selectedIndex = null;
        this.previousValue = null;
        this.bestSuggestionIndex = null;
        this.draw();
    }

    handleMousedown(){
        event.preventDefault();
        var element = event.target;

        if(element.classList.contains('suggestion')){
            element = element.parentNode;
        }

        if(element.classList.contains('suggestify-ui-choice')){
            this.input.value = element.textContent;
            this.reset();
        }
    }

    handleBlur(){
        if(!this.form){
            this.submitCompletion();
        }
        this.reset();
    }

    handleSubmit(e){
        e.preventDefault();
        this.submitCompletion();
        this.input.value = '';
        this.reset();
    }

    submitCompletion(){
        var completion = this.input.value;
        if(completion.length < this.minChars){ return; }

        axios.put(SUGGESTIFY_URL, {
            suggestion: completion
        });
    }

    fetchSuggestions(query, callback){
        axios.get(SUGGESTIFY_URL + query, {

        }).then(response => callback(response.data));
    }

    draw(){
        var child;
        while(child = this.listUI.lastChild){
            this.listUI.removeChild(child);
        }

        this.suggestions.forEach((suggestion, index) => {
            suggestion = suggestion.suggestion;
            console.log(suggestion);
            var li = document.createElement('li');
            var span1 = document.createElement('span');
            var span2 = document.createElement('span');

            li.classList.add('suggestify-ui-choice');

            if(index === this.selectedIndex){
                li.classList.add('selected');
                this.input.value = suggestion;
            }

            var typed = this.input.value.replace(/\s{2,}/, ' ');

            span1.classList.add('suggestion', 'typed');
            span2.classList.add('suggestion');

            if(this.selectedIndex === null){
                span1.textContent = suggestion.match(typed);
            }
            span2.textContent = suggestion.slice(span1.textContent.length);

            li.appendChild(span1);
            li.appendChild(span2);
            this.listUI.appendChild(li);
        });
    }

    handleKeydown(){
        switch(event.key){
            case 'Tab':
                if(this.bestSuggestionIndex !== null){
                    this.input.value = this.suggestions[this.bestSuggestionIndex];
                    event.preventDefault();
                }
                this.reset();
                break;
            case 'Enter':
                if(!this.form){
                    this.submitCompletion();
                    this.input.value = '';
                    this.reset();
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if(this.selectedIndex === null || this.selectedIndex ===0){
                    this.selectedIndex = this.suggestions.length -1;
                }
                else{
                    this.selectedIndex -= 1;
                }
                this.bestSuggestionIndex = null;
                this.draw();
                break;
            case 'ArrowDown':
                event.preventDefault();
                if(this.selectedIndex === null || this.selectedIndex === this.suggestions.length - 1){
                    this.selectedIndex = 0;
                }
                else{
                    this.selectedIndex += 1;
                }
                this.bestSuggestionIndex = null;
                this.draw();
                break;
            case 'Escape':
                this.input.value = this.previousValue;
                this.reset();
                break;
        }
    }
}