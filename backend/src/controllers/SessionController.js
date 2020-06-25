const User = require('../models/User');

 module.exports = {
     async store(req, res) {
         const { email } = req.body;

         let user = await User.findOne({ email });

         if (!user){
            user = await User.create({ email });
            return res.json(user);
         } else {
                return res.json({ message: "Usuário já cadastrado" });
                }
        
     }
 };


 /*  Métodos disponíveis:
 * index (listagem), show (listar uma única), store (criando), update(alterando), destroy(excluindo)
 */