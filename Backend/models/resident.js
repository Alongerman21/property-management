const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema(
    {
      _id: { type: String },
      name: { type: String, required: true },
      url: {
        type: String,
        default:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrNNNNepn2DcQBB590qojcCr39yb6NDry9L4a4-0FCHgMKEP-hsEJnSj9z-_Vz-Dw4maA&usqp=CAU",
      },
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  );

const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;
