let IsDotPressed = false;
let previousDot = false;
function Action(text){
    const input_text = document.getElementById("main-input");
    const result_box = document.getElementById("result");

    // removing one character from the input
    if(text === 'C'){
        index = (input_text.innerHTML.length - 1);
        // If dot or operational signs are removed should dot be pressed ?
        // That's what this part is for
        if(input_text.innerHTML[index] === ".")
            IsDotPressed = false;
        else if(input_text.innerHTML[index] === " ")
        {
            input_text.innerHTML = input_text.innerHTML.substring(0, index-2);
            IsDotPressed = previousDot;
        }
        // Clearing last character
        input_text.innerHTML = input_text.innerHTML.substring(0, index);
        Calculate(input_text.innerHTML);
    }
    else if(text === 'DEL'){
        // Emptying input boxes
        input_text.innerHTML = "";
        result_box.innerHTML = "";
    }
    else if(text === '='){
        // Moving the values
        if(result_box.innerHTML.length > 0)
            input_text.innerHTML = result_box.innerHTML;
        result_box.innerHTML = "";
    }
}

function Numbers(text){
    // showing the input by user
    const input_text = document.getElementById("main-input");
    let index = input_text.innerHTML.length - 1;

    // Avoiding duplicates and allowing dot to be pressed when a operational sign is pressed
    // There is text !== "." for this condition "457+.75"
    if(isNaN(input_text.innerHTML[index]) && isNaN(text) && text !== ".")
        return 0;
    else if(isNaN(text) && text !== ".")
    {
        if(IsDotPressed)
            previousDot = true;
        text = " "+text+" ";
        IsDotPressed = false;
    }

    input_text.innerHTML = input_text.innerHTML.concat(text)
    Calculate(input_text.innerHTML);
}

function Calculate(expression){
    // calculating result and showing on webpage
    const result_box = document.getElementById("result");
    index = expression.length - 1;

    // Removing a char if its a sign to avoid console error
    if(isNaN(expression[index]))
        expression = expression.substring(0, index);

    result_box.innerHTML = eval(expression)
}

function Start(){
    const buttons = document.querySelectorAll(".buttonclass");
    document.addEventListener("keypress",function(event){
        event.preventDefault();
        document.getElementById(event.key).click();
    })

    for(let i = 0; i < buttons.length; i++)
    {
        // checking for buttons click
        buttons[i].onclick = function(){
            const get_button = this;
            text = get_button.innerHTML;
            
            // Converting and setting value of IsDotPressed
            if(text === '×')
                text = '*';
            else if(text === '.' && IsDotPressed === false)
                IsDotPressed = true;
            else if(text === '.' && IsDotPressed === true)
                text = "";

            // Calling numbers or other actions
            if(text != "C" && text != "DEL" && text != "=")
                Numbers(text);
            else
                Action(text);
        }
    }
}
