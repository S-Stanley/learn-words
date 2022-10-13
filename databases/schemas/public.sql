CREATE TABLE public.users
(
    id              UUID NOT NULL DEFAULT uuid_generate_v4(),
    email           VARCHAR(255) NOT NULL,
    password_hash   VARCHAR(255) NOT NULL
);

CREATE TABLE public.languages
(
    id          UUID NOT NULL DEFAULT uuid_generate_v4(),
    name        languages_type NOT NULL
);