TRUNCATE TABLE public.users;

INSERT INTO
    public.users (email, password_hash)
VALUES
(
    'demo'::VARCHAR(255),
    'mdp'::VARCHAR(255)
);