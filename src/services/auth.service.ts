import axiosInstance from '../utils/axios-interceptor'

class AuthService {
  login(email: string, password: string) {
    return axiosInstance
      .post('user/login', {
        email,
        password
      })
      .then((response) => {
        console.log(response.data)
        if (response.data.data) {
          localStorage.setItem('user', JSON.stringify(response.data.data))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }
}

export default new AuthService()
