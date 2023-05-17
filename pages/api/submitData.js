const fs = require('fs');
const path = require('path');
export default function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;
    const filePath = path.join(__dirname,'../../../../','public','data', 'dataSubmit.json');
  // Ghi dữ liệu vào file
  fs.writeFile(filePath, JSON.stringify(formData), (error) => {
    if (error) {
      console.error('error to write data to file:', error);
      res.status(500).json({ error: 'error to write data to file:' });
        return ;
    } else {
      console.log('Write data success!');
      return ;
    }
  });
    res.status(200).json({ success: true, data: {formData } });
    console.log({formData})
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
  // res.get('/api/form-submit',(req,res)=>{
  //   res.send(`success: true, data: ${ name, email, message }`)
  // })
}
