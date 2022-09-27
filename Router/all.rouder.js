const{Router} = require('express');
const fs = require('fs');

const crudRouter = Router();

crudRouter.get("/",(req,res)=>{

    fs.readFile('./posts.json',(err,data)=>{
        if(err){
            res.send("ERROR")
        }
        res.send(data);
    })

})


const postmiddleware = (req,res,next) =>{
       let vflag = true;
    let rdata = req.body;
      let check = ['number','string','string','string']
      let key = ['id','title','content','author'];

      key.forEach(element => {
          if(rdata[element] === undefined || rdata[element] === 0){
            vflag = false;
          }
      });
    
      key.forEach((element, index) => {
        if(typeof rdata[element] !==  check[index] ){
          vflag = false;
        }
    });
      
    if(vflag){
        next();
    }else{
        res.send("Validation Failed");
    }
       

  
}

crudRouter.post("/create",postmiddleware,(req,res)=>{
    fs.readFile('./posts.json',(err,data)=>{
        if(err){
            res.send("ERROR")
        }
      
      let data2 = JSON.parse(data);
    let bdata = req.body;

      data2.posts = [...data2.posts,bdata]

  fs.writeFile("./posts.json",JSON.stringify(data2),{encoding :"utf-8"},()=>{   
    res.send("added data");
  })
    })

})




const guard = (req,res,next)=>{

  const {password} = req.query;
  if(password == 54123){
    next();
  }else{
    res.send("You are not authorised to do this operation");
  }
  
 

}


crudRouter.delete("/:postId",guard,(req,res)=>{
    const {postId} = req.params;
   let id = parseInt(postId);
   fs.readFile('./posts.json',(err,data)=>{
    if(err){
        res.send("ERROR")
    }
  
  let data2 = JSON.parse(data);
  data2.posts = data2.posts.filter((res)=>{
     return res.id != id;
   })  
    

fs.writeFile("./posts.json",JSON.stringify(data2),{encoding :"utf-8"},()=>{   
res.send("delete data");
})
})


})


crudRouter.put("/:postId", guard ,(req,res)=>{
    const {postId} = req.params;
    let bdata = req.body;
    
    fs.readFile('./posts.json',(err,data)=>{
        if(err){
            res.send("ERROR")
        }
      let data2 = JSON.parse(data);
      let obj = data2.posts.find((res)=>{
       return res.id == postId;
      })
 
      let nput = {...obj,...bdata};

      let ndata = data2.posts.filter((res)=>{
        return res.id != postId;
      })
       data2.posts = [...ndata,nput]

  fs.writeFile("./posts.json",JSON.stringify(data2),{encoding :"utf-8"},()=>{   
    res.send("data changed");
  })

})

})

module.exports = crudRouter;