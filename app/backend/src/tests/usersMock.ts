const usersMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',             
} 

const userLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const invalidPass = {
  email: 'admin@admin.com',
  passwrod: 'mengo'
}

const invalidEmail = {
  email: 'zada.co',
  password: 'admin123'
}

export { usersMock, userLogin, invalidPass, invalidEmail }
