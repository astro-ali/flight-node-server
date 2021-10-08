import { createConnections } from "typeorm";
import { Admin } from "../entity/Admin";
import * as bcrypt from "bcryptjs";

const insertAdmin = {
  first_name: "",
  last_name: "",
  username: "astro_ali",
  password: "",
};

createConnections()
  .then(async (connection) => {
    // check if username is already exists in DB
    let admin = await Admin.findOne({
      where: { username: insertAdmin.username },
    });
    if(admin){
        console.log(`Admin [${admin.username}] is already exists`);
    }else {
        // hash the password
        let salt = await bcrypt.genSalt(12);
        let hashedPassword = await bcrypt.hash(insertAdmin.password, salt);

        // add the new admin to DB
        let newAdmin = Admin.create({
            first_name: insertAdmin.first_name,
            last_name: insertAdmin.last_name,
            username: insertAdmin.username,
            password: hashedPassword
        });

        //save in DB
        await newAdmin.save();
        console.log(newAdmin);
        console.log(`admin [${newAdmin.username}] added successfully`);
    }
  })
  .catch((error) => console.log(error));
