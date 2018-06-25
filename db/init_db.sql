begin;

create table users(
    id              serial      not null unique,
    study_id           text        not null primary key,
    password_hash   text        not null,
    last_auth       date,
    date_created    date
);

commit;