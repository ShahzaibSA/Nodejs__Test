const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const users = [{ username: 'testuser', password: 'testpassword' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.status(200).json({ message: 'Login successful' });
});

function romanToInt(s) {
    const romanToValue = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const current = romanToValue[s[i]];
        const next = romanToValue[s[i + 1]];
        
        // if(next &&){}
        // if (next && current < next) {
        //     total = total - current;
        // } else {
        //     total = total + current;
        // }
    }
    
    return total;
}

console.log(romanToInt('III'));  // Output: 3
console.log(romanToInt('IV'));   // Output: 4
console.log(romanToInt('IX'));   // Output: 9
console.log(romanToInt('LVIII')); // Output: 58
console.log(romanToInt('MCMXCIV')); // Output: 1994


module.exports = app;
