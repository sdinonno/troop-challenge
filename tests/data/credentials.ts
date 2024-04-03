export default {
    valid: { 
        username: 'tomsmith', 
        password: 'SuperSecretPassword!', 
        error: ''
    },
    invalid: [
        { username: 'tomsmith', password: '/cursos', error: 'wrong password' },
        { username: 'tomsmith', password: '', error: 'empty password' },
        { username: '###', password: 'SuperSecretPassword!', error: 'wrong username' },
        { username: '', password: 'SuperSecretPassword!', error: 'empty username' },
        { username: '', password: '', error:'empty username and empty password'}
    ]
}