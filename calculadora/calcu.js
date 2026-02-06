const buttons = document.querySelectorAll('button')
const display = document.getElementById('display')

buttons.forEach( button => {
    button.addEventListener('click',()=>{
        const value = button.textContent

            if(value === '='){
                try {
                        display.value = eval(display.value); 
                    } catch (error) {
                        display.value = console.log(error);
                        
                    }
            }else if( value === 'C'){
                display.value = ''
            }else if( value === 'CE'){
                display.value = display.value.slice(0, -1)
            }else{
                display.value +=value
            }
        })
    })
