// 1.deposit some money
// 2. detemine number of line bet
// 3.collect a bet amount
// 4.spin the slot machine
// 5.check if the user won
// 6.give the user their winning 
// 7.play again

//function deposit(){}
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS=3;
const SYMBOL_COUNT = {
  A:2,
  B:4,
  C:6,
  D:8
}
const SYMBOL_VALUES={
  A:5,
  B:4,
  C:3,
  D:2
}

const deposit=() => {
    while(true){
        const depositamount=prompt("Enter a deposit amount : ");
           const NumberdepositAmount=parseFloat(depositamount);
      
              if(isNaN(NumberdepositAmount) || NumberdepositAmount<=0){
                   console.log("Invalid Deposit Amount , try Again");
                }
                else{
                  return NumberdepositAmount;
                }
    }
};

const getlinebet=() => {
  while(true){
      const Lines=prompt("Enter a number of Lines (1-3) : ");
         const getlines=parseFloat(Lines);
    
            if(isNaN(getlines) || getlines<=0 || getlines > 3){
                 console.log("Invalid number of lines");
              }
              else{
                return getlines;
              }
  }
};

const getbet=(balance,lines) => {
  while(true){
      const amount=prompt("Enter a bet Amount : ");
         const betamount=parseFloat(amount);
    
            if(isNaN(betamount) || betamount<=0 || betamount > (balance/lines)){
                 console.log("Invalid bet amount");
              }
              else{
                return betamount;
              }
  }
};

const spin=() => {
  const symbols=[];
  for(const [symbol,count] of Object.entries(SYMBOL_COUNT)){
    for(let i=0;i<count;i++){
      symbols.push(symbol);
    }
  }
  const reels=[[],[],[]];
  for(let i = 0 ; i < COLS ; i++){
    
      const reelsymbols=[...symbols];
    for(let j = 0 ; j < ROWS ; j++){
      const RandomIndex=Math.floor(Math.random()*reelsymbols.length);
       const selectedsymbol = reelsymbols[RandomIndex];
         reels[i].push(selectedsymbol);
         reelsymbols.splice(RandomIndex,1);
    }
  }
  return reels;
};
const transpose=(reels) =>{
  const rows=[];

  for(let i =0 ; i < ROWS ; i++){
    rows.push([]);
    for(let j = 0 ; j < COLS ; j++){
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printrows=(trans) =>{
   for(const row of trans){
     let rowstring = "";
     for(let i = 0 ; i < row.length ; i++){
        rowstring += row[i];
        if(i != row.length-1){
          rowstring += " |  ";
        }
     }
     console.log(rowstring);
   }
};

const getwinning=(trans,betting,lines) => {
   let winning=0;

     for(let row=0 ; row < lines ; row++){
        const symbols= trans[row];
        let allsame=true;
        for(let symbol of symbols){
          if(symbol != symbols[0]){
            allsame=false;
            break;
          }
        }
        
        if(allsame){
          winning += betting * SYMBOL_VALUES[symbols[0]];
        }
     }
     return winning;
};

const game=() => {


  let balance=deposit();

  while(true){
  console.log("Your balance = " + balance);
  const getnumline=getlinebet();
  const betting=getbet(balance,getnumline);
  balance -= betting * getnumline;
  const spins=spin();
  const trans=transpose(spins);
  printrows(trans);
  const win = getwinning(trans,betting,getnumline);
  balance += win ;
  console.log(" you win amount " + win.toString());
     if(balance <= 0){
        console.log("Insufficient balance ! please check your balance");
        break;
      }
           const str=prompt("you want to play again (yes/no) ?");
          if(str != "yes"){
            break;
          }
          else{
            console.log("thank you for playing");
          }
  }
  
};

game();