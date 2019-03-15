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

    
}