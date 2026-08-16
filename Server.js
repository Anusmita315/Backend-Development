const express = require("express");
const app = express();

app.use(express.json());

const students = [
    { id: 1, name: "Aarav", branch: "CSE" },
    { id: 2, name: "Diya", branch: "ECE" },
    { id: 3, name: "Rohan", branch: "IT" }
];

app.get("/", (req, res) => {
    res.send("Student Management API");
});

app.get("/students", (req, res) => {
    res.json(students);
});

app.get("/students/branch/:branch", (req, res) => {
    const branch = req.params.branch.toUpperCase();

    const filteredStudents = students.filter(
        s => s.branch.toUpperCase() === branch
    );

    if (filteredStudents.length > 0) {
        res.json(filteredStudents);
    } else {
        res.status(404).json({
            error: "No students found in this branch"
        });
    }
});


app.post("/students", (req, res) => {
    const { name, branch } = req.body;

    if (!name || !branch) {
        return res.status(400).json({
            error: "Name and branch are required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name: name,
        branch: branch
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});


app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});