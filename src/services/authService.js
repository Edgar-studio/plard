import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const authService = {
  async login(email, password) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const users = response.data;
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const token = btoa(`${email}:${password}`); // Simple token generation
        return {
          success: true,
          user: { id: user.id, email: user.email, name: user.name, role: user.role },
          token
        };
      } else {
        return {
          success: false,
          message: 'Неверный email или пароль'
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка сервера. Попробуйте позже.'
      };
    }
  },

  async register(email, password, name) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const users = response.data;
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        return {
          success: false,
          message: 'Пользователь с таким email уже существует'
        };
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name
      };

      await axios.post(`${API_BASE_URL}/users`, newUser);
      
      return {
        success: true,
        message: 'Аккаунт успешно создан! Теперь вы можете войти.'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Ошибка сервера. Попробуйте позже.'
      };
    }
  }
};
