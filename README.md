# nodeserver
Made a template auth server.

- cd into nodeserver
- `npm install`
- `touch config.js`
- put a secret in your config.js 
  ```
  module.exports = {
    secret: 'put-a-random-set-of-characters-in-here-instead-of-this-sentence'
  }
  ```
- `npm run dev`
- in a new terminal tab start mongo 
  - `mongod`
  - `mongo`
  
