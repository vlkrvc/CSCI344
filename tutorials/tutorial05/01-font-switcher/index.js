let currentFontSize = 16; 

const makeBigger = () => {
   
   currentFontSize += 2; 
   document.querySelector("body").style.fontSize = `${currentFontSize}px`;
};

const makeSmaller = () => {
   
   currentFontSize -= 2; 
   if (currentFontSize >= 10) { 
       document.querySelector("body").style.fontSize = `${currentFontSize}px`;
   }
};
