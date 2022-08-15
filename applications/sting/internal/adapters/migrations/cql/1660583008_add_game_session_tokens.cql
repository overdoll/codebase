CREATE TABLE IF NOT EXISTS game_session_tokens
(
    id                   text,
    current_spin_id      int,
    seed                 text,
    game_type            text,
    initiator_account_id text,
    linked_device_id     text,
    session_state        text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS roulette_game_state
(
    game_session_token_id text,
    game_session_spin_id  int,
    selected_post_id      text,
    dice_one              int,
    dice_two              int,
    dice_three            int,
    primary key ( game_session_token_id, game_session_spin_id )
);
