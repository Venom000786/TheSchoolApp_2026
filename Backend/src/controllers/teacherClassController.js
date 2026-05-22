const TeacherClass =
require("../models/teacherClass");

const User =
require("../models/user");




// CREATE CLASS
exports.createClass =
async (req, res) => {

  try {

    const {

      className,

      section

    } = req.body;



    const existing =
    await TeacherClass.findOne({

      className,
      section
    });



    if (existing) {

      return res.status(400).json({

        message:
        "Class already exists"
      });
    }



    const newClass =
    await TeacherClass.create({

      className,

      section,

      teacherId:
      req.user.id
    });



    res.json(newClass);

  } catch (err) {

    res.status(500).json({

      message: err.message
    });
  }
};




// GET TEACHER CLASSES
exports.getTeacherClasses =
async (req, res) => {

  try {

    const classes =
    await TeacherClass.find({

      teacherId:
      req.user.id
    })

    .populate(
      "students",
      "name email"
    )

    .sort({
      createdAt: -1
    });



    res.json(classes);

  } catch (err) {

    res.status(500).json({

      message: err.message
    });
  }
};




// ADD STUDENT
exports.addStudentToClass =
async (req, res) => {

  try {

    const {

      classId,

      studentId

    } = req.body;



    const teacherClass =
    await TeacherClass.findById(
      classId
    );



    if (!teacherClass) {

      return res.status(404).json({

        message:
        "Class not found"
      });
    }



    if (

      teacherClass.students.includes(
        studentId
      )

    ) {

      return res.status(400).json({

        message:
        "Student already added"
      });
    }



    teacherClass.students.push(
      studentId
    );



    await teacherClass.save();



    res.json({

      message:
      "Student added successfully"
    });

  } catch (err) {

    res.status(500).json({

      message: err.message
    });
  }
};