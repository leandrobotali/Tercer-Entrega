import {userModel} from "../models/Models.js"

const users = {};

//------------------------------------------
//functions

users.save = async (user) => {
    try {
        const newUser = new userModel(user)
        newUser.password = await newUser.encryptPassword(user.password);
        await newUser.save()

        return { 'messaje': 'usuario Agregado' }
    } catch (err) {
        return err
    }
}

users.find = async(email) => {
    try{
        return await userModel.findOne({ email: email }).lean()
    }catch(err){
        return err
    }
}

users.findById = async(id) => {
    try{
        return await userModel.findOne({_id: id}).lean()
    }catch(err){
        return err
    }
}

users.updateImg = async(req) => {
    try{
        const getUpdProd = await userModel.updateOne({_id:req.user.id},{
            $set:{
                "img": "/img/" + req.file.filename
            }
          })
        return getUpdProd
    }catch(err){
        return err
    }
}

export default users;