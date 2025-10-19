import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001';

export const imageUploadService = {
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return {
        success: true,
        url: response.data.url,
        filename: response.data.filename
      };
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        message: 'Ошибка загрузки изображения'
      };
    }
  },

  async deleteImage(filename) {
    try {
      // In a real application, you would delete from cloud storage
      console.log(`Deleting image: ${filename}`);
      return {
        success: true,
        message: 'Изображение удалено'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка удаления изображения'
      };
    }
  }
};
