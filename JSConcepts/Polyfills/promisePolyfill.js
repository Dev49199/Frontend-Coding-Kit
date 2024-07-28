//Ideal Promise

const originalPromise = new Promise((resolve, reject) => {
  // resolve("Original promise resolution synchronous")

//   setTimeout(() => {
//     resolve("Original promise resolution synchronous");
//   }, 3000);

setTimeout(() => {
    reject("Original promise rejection synchronous");
  }, 3000);
});

// originalPromise.then((result) => {
//   console.log("*** RESOVED Original Promise", result);
// });

originalPromise.catch((result) => {
    console.log("*** Rejected Original Promise", result);
    return result+ " add rejected data";
  }).catch((rejectedData)=>{
    console.log("*** RECEIVED after rejection", rejectedData);
  }).then((receivedData)=>{
    console.log("**** Receivd data after rejection in then block", receivedData);
  })


class CustomPromise {
  resolvedValue = null;
  rejectedValue = null;
  resolvedChain = [];
  rejectedChain = []
  constructor(executorFn) {
    const resolve = (value) => {
      this.resolvedValue = value;
      this.resolvedValue=this.resolvedChain.reduce((acc, curr) => {
        acc = curr(acc);
        return acc;
      }, this.resolvedValue);
    };

    const reject = (value) => {
      this.rejectedValue = value;
      this.rejectedValue = this.rejectedChain.reduce((acc, curr) => {
        acc = curr(acc);
        return acc;
      }, this.rejectedValue);
    };

    executorFn(resolve, reject);
  }

  then(callBackFn) {
    this.resolvedChain.push(callBackFn);
    if (this.resolvedValue) {
      this.resolvedValue = this.resolvedChain.reduce((acc, curr) => {
        acc = curr(acc);
        return acc;
      }, this.resolvedValue);
    }

    return this;
  }
  //After execution of catch block values goes into then block if data returned, it does not goes to catch again
  catch(callBackFn) {
    this.rejectedChain.push(callBackFn);
    if (this.rejectedValue) {
      this.rejectedValue = this.rejectedChain.reduce((acc, curr) => {
        acc = curr(acc);
        return acc;
      }, this.rejectedValue);
    }

    return this;
  }
}

console.log("******* CUSTOM PROMISE ********");

const customPromise = new CustomPromise((resolve, reject) => {
  // resolve("Custom promise resolution synchronous")
//   setTimeout(() => {
//     resolve("Custom promise resolution synchronous");
//   }, 3000);
setTimeout(() => {
    reject("Custom promise resolution synchronous");
  }, 3000);
});

// customPromise.then((result) => {
//   console.log("*** RESOVED Custom Promise", result);
// });

customPromise.catch((result) => {
    console.log("*** Rejected custom Promise", result);
    return result+ " add rejected data";
  }).catch((rejectedData)=>{
    console.log("*** RECEIVED after rejection custom promise", rejectedData);
  }).then((receivedData)=>{
    console.log("**** Receivd data after rejection in then block custom promise", receivedData);
  })