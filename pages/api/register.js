import {connectToDatabase} from "../../util/mongodb"

export default function handler(req, res) {
  if(req.method == 'POST'){
    console.log(req.body.name)
    const {db} = connectToDatabase();
    db.collection("userlists").insertMany(req.body);
    res.status(200).json(req.body)
  }
  else{
    res.status(200).json({ user: 'Ada Lovelace' })
  }
}