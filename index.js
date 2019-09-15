function checkCashRegister(price, cash, oldCid) {
  const newCid = [],
    change = [],
    change2 = [];

  const cid = JSON.parse(JSON.stringify(oldCid));

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
  const calcTotalCash = cid => {
    let totalSum = 0;
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

  //calculate initial due change
  changeDue = roundedToTwoDecimals(cash - price);

  const revertCid = change2 => {
    let prevName = "";
    change2.map(element => {
      if (prevName !== element.name) {
        change.push([element.name, element.value]);
      } else {
        change[change.length - 1][1] = roundedToTwoDecimals(
          change[change.length - 1][1] + element.value
        );
        // console.log(change);
      }
      prevName = element.name;
    });
  };

  const calculateChange = changeDue => {
    if (changeDue === calcTotalCash(cid)) {
      console.log(`{status: "CLOSED", change: cid}`);
      revertCid(change2);
      return { status: "CLOSED", change: oldCid };
    }
    console.log("ch due", changeDue);
    let usedDenomination;

    usedDenomination = newCid.find(element => {
      if (element.value <= changeDue && element.amount >= 1) {
        element.amount--;
        return element;
      }
    });

    if (usedDenomination) {
      changeDue = roundedToTwoDecimals(changeDue - usedDenomination.value);

      change2.push(usedDenomination);
    } else {
      changeDue = -1;
    }

    if (changeDue > 0 && changeDue !== totalCash) {
      return calculateChange(changeDue);
    } else if (changeDue === 0) {
      revertCid(change2);
      //   console.log(`{ status: "OPEN", change }`, change);
      return { status: "OPEN", change };
    } else if (changeDue === -1) {
      //   console.log(`{ status: "INSUFFICIENT_FUNDS", change }`, {
      //     status: "INSUFFICIENT_FUNDS",
      //     change: []
      //   });
      revertCid(change2);
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  };
  const answer = calculateChange(changeDue);
  console.log(answer);
  return answer;
}

checkCashRegister(19.5, 20, [
  ["PENNY", 0.5],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0]
]);
