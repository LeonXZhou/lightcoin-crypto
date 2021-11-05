class Transaction {

  constructor(amount, account) {
    if (this.constructor === Transaction) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.amount = amount;
    this.account = account;
  }

  isAllowed() {
    if (this.getAmount > 0 || this.account.getBalance + this.getAmount >= 0) {
      return true;
    }
    return false;
  }


  commit() {
    if (this.isAllowed()) {
      this.account.balance += this.getAmount;
      this.account.addTransaction(this);
      return true;
    }
    console.log('invalid transaction. withdraw greater than current balance')
    return false;
  }

}

class Deposit extends Transaction {

  get getAmount() {
    return this.amount;
  }

}

class Withdrawal extends Transaction {

  get getAmount() {
    return -this.amount;
  }
}

class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.balance = 0;
    this.transaction = [];
  }

  addTransaction(transaction) {
    this.transaction.push(transaction);
  }

  get getBalance() {
    return this.transaction.reduce((prev, curr) => {
      return prev.getAmount + curr.getAmount
    },new Deposit(0,0))
  }

}

const myAccount = new Account("snow-patrol");
t1 = new Withdrawal(50.25, myAccount);
//console.log(t1.commit());

t1 = new Withdrawal(50.25, myAccount);
//console.log(t1.commit());

t1 = new Withdrawal(50.25, myAccount);
//console.log(t1.commit());

t1 = new Deposit(2000, myAccount);
console.log(t1.commit());

t1 = new Withdrawal(50.25, myAccount);
//  console.log(t1.commit());

console.log(myAccount.getBalance)

// t1 = new Deposit(-50.25, myAccount);
// t1.commit();


// // t1 = new Transaction(50.25, myAccount);
// console.log(myAccount.getBalance);

// t1.commit();
// t1 = new Deposit(50.25, myAccount);
// t1  .commit();


// console.log(t1.account.balance);



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

// t1 = new Withdrawal(50.25);
// t1.commit();
// console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99);
// t2.commit();
// console.log('Transaction 2:', t2);

// console.log('Balance:', balance);
