module.exports = {
    'api': {
        'port':8084
    },
    'db': {
        'database':'xray_koala',
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
    },
    'audio' :  {
        'file_prefix' : 'koala',
        'file_suffix' : 'oxford-hcc',
        'out_dir' : '/etc/koala/'
    }
}