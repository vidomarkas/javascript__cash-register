function checkCashRegister(price, cash, cid) {
  const newCid = [],
    change = [];

  let totalCash, changeDue;

  //round number to two decimals
  const roundedToTwoDecimals = element => {
    return Math.round(element * 100) / 100;
  };

  //convert the cash-in-drawer to a more manageable data structure
  const convertCid = () => {
    //add value to each denomination
    cid[0][2] = 0.01;
    cid[1][2] = 0.05;
    cid[2][2] = 0.1;
    cid[3][2] = 0.25;
    cid[4][2] = 1;
    cid[5][2] = 5;
    cid[6][2] = 10;
    cid[7][2] = 20;
    cid[8][2] = 100;

    cid.forEach(el => {
      newCid.unshift(
        new Object({
          name: el[0],
          amount: Math.round(el[1] / el[2]),
          value: el[2]
        })
      );
    });
  };

  convertCid(cid);

  //calculate total cash amount in register
  const calcTotalCash = newCid => {
    totalSum = 0;
    newCid
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

  //calculate initial due change
  changeDue = roundedToTwoDecimals(cash - price);

  const calculateChange = changeDue => {
    let usedDenomination;

    usedDenomination = newCid.find(element => {
      if (element.value <= changeDue && element.amount >= 1) {
        element.amount--;
        return element;
      }
    });

    if (usedDenomination) {
      changeDue = roundedToTwoDecimals(changeDue - usedDenomination.value);
      console.log("changeDue", changeDue);
      console.log(usedDenomination);

      change.push(usedDenomination);
    } else {
      changeDue = -1;
    }

    if (changeDue === calcTotalCash(newCid)) {
      console.log(`{status: "CLOSED", change: [...]}`);
      return { status: "CLOSED", change };
    } else if (changeDue > 0 && changeDue !== totalCash) {
      return calculateChange(changeDue);
    } else if (changeDue === 0) {
      console.log(`{ status: "CLOSED", change }`, change);
      return { status: "CLOSED", change };
    } else if (changeDue === -1) {
      console.log(`{ status: "INSUFFICIENT_FUNDS", change }`, {
        status: "INSUFFICIENT_FUNDS",
        change: []
      });
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  };

  calculateChange(changeDue);
}

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);

// [
//   ["TWENTY", 60],
//   ["TEN", 20],
//   ["FIVE", 15],
//   ["ONE", 1],
//   ["QUARTER", 0.5],
//   ["DIME", 0.2],
//   ["PENNY", 0.04]
// ]
