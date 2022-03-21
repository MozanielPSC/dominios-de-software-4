import {v4 as uuidv4} from "uuid";
import {hash} from "bcryptjs";
import { createConnection } from "typeorm";

async function create() {
      const connection = await createConnection();
      const id = uuidv4();
      const password = await hash("testando",8);
      await connection.query(
        `INSERT INTO USERS(id,username,email,"isAdmin","isDriver","isEnterprise",created_at,password)
          values('${id}','Mozani','mozanielpcorrea@gmail.com','true','true','true','now()','${password}')
      `);
}

create().then(()=>{console.log("Admin created")});