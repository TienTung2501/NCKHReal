import { useState } from 'react';

export default function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null, // Sửa giá trị ban đầu của trường file thành null
  });

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] }); // Lưu trữ tệp được chọn trong state
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('file', formData.file); // Thêm tệp vào FormData

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log(data); // In ra dữ liệu phản hồi từ server
      alert('SubmitForm Success');
      // Xử lý dữ liệu tại đây
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };
  const containerStyle = {
    marginTop:'100px',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
  };

  const textStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="file">File:</label>
        <input type="file" id="file" name="file" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
