begin;

create table users(
    id              serial      not null unique,
    email           text        not null primary key,
    password_hash   text        not null,
    last_auth       date,
    date_created    date
);

commit;