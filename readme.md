This is backend only api for creating, sharing notes.
---

**Install**
---
Using db: redis, mysql.
Need to create two databases into mysql: first for app default using, second for testing.

Create some user into mysql and grant all privileges to it for both databases.

Put your config to "\__dirname/config/" default and test configs.

---
**How to use**
---
Firstly, type commands "npm run init" and "npm run init_test" for creating empty tables into databases.

Next, don't forget to launch redis.

To test type "npm run test"
To launch app type "npm run start"

go to localhost:"your port"/ for instruction.
