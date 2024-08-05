const { Worker, isMainThread, parentPort } = require('worker_threads');
const http = require('http');

if (isMainThread) {
  //! USING WORKER THREADS
  console.log('Using worker threads');
  //! COMMENT HTTP SERVER CODE AND RUN THIS.
  //   const fibonacciWorker = new Worker(__filename);
  //   fibonacciWorker.postMessage({ n: 10 });
  //   fibonacciWorker.on('message', (result) => {
  //     console.log(`Fibonacci(10) = ${result}`);
  //   });

  //! USING HTTP SERVER
  const server = http.createServer((req, res) => {
    const fibonacciWorker = new Worker(__filename);
    fibonacciWorker.postMessage({ n: 10 });
    fibonacciWorker.on('message', (result) => {
      //Result print in browser on localhost:3000
      res.end('Fibonacci(10) =>', result);
    });
  });

  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
} else {
  const calculateFibonacci = (n) => {
    if (n <= 1) return n;
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
  };

  parentPort.on('message', ({ n }) => {
    const result = calculateFibonacci(n);
    parentPort.postMessage(result);
  });
}
