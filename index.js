function checkCashRegister(price, cash, cid) {
  cid = cid.reverse();
  let changeDue = cash - price;
  console.log("changeDue :", changeDue);

  const totalCash = cid => {
    totalSum = 0;
    cid
      .map(value => {
        return value[1];
      })
      .map(value => {
        return value;
      })
      .map(sum => {
        totalSum = Math.round((totalSum + sum) * 100) / 100;
        return sum;
      });

    return totalSum;
  };

  if (changeDue > totalCash(cid)) {
    console.log("line 23: insufficient funds");
    return null;
  }

  const calculateChange = changeDue => {
    // usedDenominationArray = [];
    let usedDenomination;
    change = [];

    // 1.gauti nominalus, kurie yra maziau uz change ir prideti prie naudotinu nominalu
    // cid.some(element => {
    //   if (changeDue > element.value && element.amount > 1) {
    //     // usedDenominationArray.unshift(element);
    //     usedDenomination = Object.create(element);
    //     element.amount--;
    //     console.log(element);
    //     console.log("hey", usedDenomination);
    //   } else {
    //     console.log("line 39: insufficient funds");
    //     return null;
    //   }
    // });
    cid.some(element => {
      if (changeDue > element.value && element.amount > 1) {
        // usedDenominationArray.unshift(element);
        usedDenomination = Object.create(element);
        element.amount--;
        console.log(element);
        return element;
        console.log("hey", usedDenomination);
      } else {
        console.log("line 39: insufficient funds");
        return null;
      }
    });

    // 2.is grazos atimame nominala
    changeDue = changeDue - usedDenomination.value;
    // 3.prie grazos array pridedame panaudota nominala
    change.push(usedDenomination);

    if (changeDue !== 0) {
      return calculateChange(changeDue);
    } else if (changeDue === 0) {
      //grazinti change array su esanciais nominalais.
      console.log("change: 0", change);
      return { status: "CLOSED", change };
    }
    // 4.griztame kartoti 1, 2 zingsnius
  };

  calculateChange(changeDue);
}

// checkCashRegister(19.5, 20, [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ]);
checkCashRegister(19.5, 20, [
  { name: "PENNY", amount: 101, value: 0.01 },
  { name: "NICKEL", amount: 45, value: 0.05 },
  { name: "DIME", amount: 31, value: 0.1 },
  { name: "QUARTER", amount: 17, value: 0.25 },
  { name: "ONE", amount: 90, value: 1 },
  { name: "FIVE", amount: 11, value: 5 },
  { name: "TEN", amount: 2, value: 10 },
  { name: "TWENTY", amount: 3, value: 20 },
  { name: "ONE HUNDRED", amount: 1, value: 100 }
]);

// cid = [
//     {name:"PENNY",       amount:101, value: 0.01},
//     {name:"NICKEL",      amount:45,  value: 0.05},
//     {name:"DIME",        amount:31,  value: 0.1},
//     {name:"QUARTER",     amount:17,  value: 0.25},
//     {name:"ONE",         amount:90,  value: 1},
//     {name:"FIVE",        amount:11,  value: 5},
//     {name:"TEN",         amount:2,   value: 10},
//     {name:"TWENTY",      amount:3,   value: 20},
//     {name:"ONE HUNDRED", amount:1,   value: 100},
// ]
