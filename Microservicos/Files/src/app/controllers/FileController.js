
class FileController{
  async store(req, res){
    console.log(req)
    const [{filename:descricao_id}, {filename:imagem_id}]= req.files;
    return res.json({descricao:descricao_id,imagem:imagem_id})
    
  }
}

export default new FileController();