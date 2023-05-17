const fs = require('fs');
const path = require('path');
export default function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;
    const filePath = path.join(__dirname,'../../../../','public','data', 'dataMint.json');
  // Ghi dữ liệu vào file
  fs.writeFile(filePath, JSON.stringify(formData), (error) => {
    if (error) {
      console.error('Lỗi khi ghi dữ liệu vào file:', error);
      res.status(500).json({ error: 'Lỗi khi ghi dữ liệu vào file' });
        return ;
    } else {
      console.log('Dữ liệu đã được ghi thành công vào file!');
      return ;
    }
  });
    // Xử lý dữ liệu form ở đây (ví dụ: lưu vào cơ sở dữ liệu, gửi email, ...)
    res.status(200).json({ success: true, data: {formData } });
    console.log({formData})
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
  // res.get('/api/form-submit',(req,res)=>{
  //   res.send(`success: true, data: ${ name, email, message }`)
  // })
}
