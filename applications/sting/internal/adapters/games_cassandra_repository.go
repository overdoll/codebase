package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/games"
	"overdoll/libraries/errors"
	"overdoll/libraries/support"
)

var gameSessionsTable = table.New(table.Metadata{
	Name: "game_sessions",
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

type gameSessions struct {
	Id                 string  `db:"id"`
	CurrentSpinId      int     `db:"current_spin_id"`
	Seed               string  `db:"seed"`
	GameType           string  `db:"game_type"`
	InitiatorAccountId *string `db:"initiator_account_id"`
	LinkedDeviceId     string  `db:"linked_device_id"`
	SessionState       string  `db:"session_state"`
}

var rouletteGameStateTable = table.New(table.Metadata{
	Name: "roulette_game_state",
	Columns: []string{
		"game_session_id",
		"game_session_spin_id",
		"selected_post_id",
		"dice_one",
		"dice_two",
		"dice_three",
	},
	PartKey: []string{"game_session_id"},
	SortKey: []string{"game_session_spin_id"},
})

type rouletteGameState struct {
	GameSessionId     string `db:"game_session_id"`
	GameSessionSpinId int    `db:"game_session_spin_id"`
	SelectedPostId    string `db:"selected_post_id"`
	DiceOne           int    `db:"dice_one"`
	DiceTwo           int    `db:"dice_two"`
	DiceThree         int    `db:"dice_three"`
}

type GamesCassandraRepository struct {
	session gocqlx.Session
}

func NewGamesCassandraRepository(session gocqlx.Session) GamesCassandraRepository {
	return GamesCassandraRepository{session: session}
}

func marshalRouletteGameState(session *games.RouletteGameState) rouletteGameState {
	return rouletteGameState{
		GameSessionId:     session.GameSessionId(),
		GameSessionSpinId: session.GameSessionSpinId(),
		SelectedPostId:    session.SelectedPostId(),
		DiceOne:           session.DiceOne(),
		DiceTwo:           session.DiceTwo(),
		DiceThree:         session.DiceThree(),
	}
}

func marshalGameSession(session *games.Session) gameSessions {
	return gameSessions{
		Id:                 session.Id(),
		CurrentSpinId:      session.CurrentSpinId(),
		Seed:               session.Seed(),
		GameType:           session.GameType().String(),
		InitiatorAccountId: session.InitiatorAccountId(),
		LinkedDeviceId:     session.LinkedDeviceId(),
		SessionState:       session.SessionState().String(),
	}
}

func (r GamesCassandraRepository) CreateGameSession(ctx context.Context, sessionToken *games.Session) error {

	if err := r.session.
		Query(gameSessionsTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalGameSession(sessionToken)).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create game session")
	}

	return nil
}

func (r GamesCassandraRepository) GetGameSession(ctx context.Context, id string) (*games.Session, error) {

	var sess gameSessions

	if err := r.session.
		Query(gameSessionsTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(gameSessions{Id: id}).
		GetRelease(&sess); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get game session")
	}

	return games.UnmarshalSessionFromDatabase(sess.Id, sess.CurrentSpinId, sess.Seed, sess.GameType, sess.InitiatorAccountId, sess.LinkedDeviceId, sess.SessionState), nil
}

func (r GamesCassandraRepository) UpdateRouletteGameState(ctx context.Context, session *games.Session, state *games.RouletteGameState) error {

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := gameSessionsTable.Update()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalGameSession(session),
	)

	stmt, names = rouletteGameStateTable.Update()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalRouletteGameState(state),
	)

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update roulette game state")
	}

	return nil
}

func (r GamesCassandraRepository) GetRouletteGameStatesForSession(ctx context.Context, session *games.Session) ([]*games.RouletteGameState, error) {

	var states []rouletteGameState

	if err := r.session.
		Query(rouletteGameStateTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(rouletteGameState{GameSessionId: session.Id()}).
		SelectRelease(&states); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get roulette game states for session")
	}

	var final []*games.RouletteGameState

	for _, state := range states {
		final = append(final, games.UnmarshalRouletteGameStateFromDatabase(state.GameSessionId, state.GameSessionSpinId, state.SelectedPostId, state.DiceOne, state.DiceTwo, state.DiceThree))
	}

	return final, nil
}
