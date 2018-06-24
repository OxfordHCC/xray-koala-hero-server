module.exports = {
    'api': {
        'port':8084
    },
    'db': {
        'database':'xray_csm',
        'host':'localhost',
        'port':5432
    },
    'roles': {
        'koala': {
            'user':'postgres',
            'password':'password'
        }
    },
    'auth' : {
        'secret':'shhhh',
        'expires_in' : 86400
    }
}