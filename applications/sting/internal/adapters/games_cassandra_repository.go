package adapters

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/games"
)

var gameSessionTokensTable = table.New(table.Metadata{
	Name: "game_session_tokens",
	Columns: []string{
		"id",
		"current_spin_id",
		"seed",
		"game_type",
		"initiator_account_id",
		"linked_device_id",
		"session_state",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type gameSessionTokens struct {
	Id                 string `db:"id"`
	CurrentSpinId      int    `db:"current_spin_id"`
	Seed               string `db:"seed"`
	GameType           string `db:"game_type"`
	InitiatorAccountId string `db:"initiator_account_id"`
	LinkedDeviceId     string `db:"linked_device_id"`
	SessionState       string `db:"session_state"`
}

var rouletteGameStateTable = table.New(table.Metadata{
	Name: "roulette_game_state",
	Columns: []string{
		"game_session_token_id",
		"game_session_spin_id",
		"selected_post_id",
		"dice_one",
		"dice_two",
		"dice_three",
	},
	PartKey: []string{"game_session_token_id"},
	SortKey: []string{"game_session_spin_id"},
})

type rouletteGameState struct {
	GameSessionTokenId string `db:"game_session_token_id"`
	GameSessionSpinId  int    `db:"game_session_spin_id"`
	SelectedPostId     string `db:"selected_post_id"`
	DiceOne            int    `db:"dice_one"`
	DiceTwo            int    `db:"dice_two"`
	DiceThree          int    `db:"dice_three"`
}

type GamesCassandraRepository struct {
	session gocqlx.Session
}

func NewGamesCassandraRepository(session gocqlx.Session) GamesCassandraRepository {
	return GamesCassandraRepository{session: session}
}

func (g GamesCassandraRepository) CreateGameSessionToken(ctx context.Context, sessionToken *games.SessionToken) error {
	//TODO implement me
	panic("implement me")
}

func (g GamesCassandraRepository) GetGameSessionToken(ctx context.Context, id string) (*games.SessionToken, error) {
	//TODO implement me
	panic("implement me")
}

func (g GamesCassandraRepository) UpdateRouletteGameState(ctx context.Context, session *games.SessionToken, state *games.RouletteGameState) error {
	//TODO implement me
	panic("implement me")
}

func (g GamesCassandraRepository) GetRouletteGameStatesForSession(ctx context.Context, session *games.SessionToken) ([]*games.RouletteGameState, error) {
	//TODO implement me
	panic("implement me")
}

func (g GamesCassandraRepository) GetRouletteStatus(ctx context.Context, id string) (*games.RouletteStatus, error) {
	//TODO implement me
	panic("implement me")
}
