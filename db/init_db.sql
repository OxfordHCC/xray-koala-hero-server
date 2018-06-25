begin;

create table users(
    id                      serial      not null unique,
    study_id                text        not null primary key,
    password_hash           text        not null,
    last_auth               date,
    date_created            date
);

create table interactions(
    id                      serial      not null primary key,
    study_id                serial      references users(study_id),
    interaction_type        text        not null,
    interaction_datetime    datetime    not null,
    associated_app_id       text        not null,
    page_name               text        not null,
    additional_data         json        not null
);

create table phone_information(
    id                      serial      not null unique,
    study_id                text        references users(study_id)
    retrieval_datetime      datetime    not null,
    installed_apps          text[]      not null,
    top_ten_apps            text[]      not null,
);



commit;