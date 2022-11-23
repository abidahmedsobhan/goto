const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM users WHERE not id = 3", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// // Route to get one post
app.get("/getuser/:email", (req, res) => {
  const email = req.params.email;
  db.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/creategroup/:id", (req, res) => {
  const groupcreator = req.params.id;
  const admin1 = groupcreator;
  const title = req.body.title;
  const members = req.body.members;
  // const admin = req.body.admin;

  let json = JSON.stringify(members);
  db.query(
    "INSERT INTO groups(title1,members2,admin1)VALUES(?,?,?)",
    [title, json, admin1],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/getgroups/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT * FROM groups WHERE members2 LIKE '%,${id},%' OR members2 LIKE '%,${id}' OR admin1 = '${id}' OR admin2 = '${id}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

// app.get("/getgroups/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("SELECT id ,members2,admin1,admin2 FROM groups", (err, result) => {
//     if (err) {
//       console.log(err);
//     }

//     res.send(result);
//   });
// });

// app.get("/getgroups/:id", (req, res) => {
//   const id = req.params.id;
//   db.query(
//     "SELECT * FROM groups WHERE [members2,admin1,admin2]=id",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }

//       res.send(result);
//     }
//   );
// });

app.post("/groupmessage", (req, res) => {
  const g_id = req.body.g_id;
  const sender = req.body.sender;
  const message = req.body.message;
  db.query(
    "INSERT INTO group_message(g_id,sender,message)VALUES(?,?,?)",
    [g_id, sender, message],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send("message created");
    }
  );
});

app.get("/getgroupmessage/:g_id", (req, res) => {
  console.log("g_id", req.params.g_id);
  const g_id = req.params.g_id;
  db.query(
    "SELECT * FROM group_message WHERE g_id = ?",
    g_id,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.get("/getgroupsformem/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM groups WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/getuserlistArray/", (req, res) => {
  let members2 = req.body.members2;
  members2 = JSON.parse(members2);
  console.log(members2);

  db.query(
    "SELECT * FROM users WHERE id IN ('" + members2.join("','") + "')",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.put("/updateadmin/:g_id", (req, res) => {
  console.log(req.params.g_id);
  console.log(req.body.item);
  const g_id = req.params.g_id;
  const admin2 = req.body.item;

  db.query(
    "UPDATE groups SET admin2=? WHERE id = ?",
    [admin2, g_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
