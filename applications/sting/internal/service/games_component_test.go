package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"
)

type RouletteGameStateModified struct {
	ID        relay.ID
	DiceOne   int
	DiceTwo   int
	DiceThree int
	Post      struct {
		Id        string
		Reference string
	}
}
type RouletteStatusModified struct {
	GameSession   *types.GameSession
	LastGameState *RouletteGameStateModified
	AllGameStates []*RouletteGameStateModified
	TotalRolls    int
	TotalDoubles  int
	Probability   float64
	Score         int
}

type GameSessionStatus struct {
	GameSessionStatus struct {
		Item *RouletteStatusModified `graphql:"... on RouletteStatus"`
	} `graphql:"gameSessionStatus(reference: $reference)"`
}

type SpinRoulette struct {
	RouletteGameState *RouletteGameStateModified `graphql:"spinRoulette(input: $input)"`
}

type CreateGameSession struct {
	GameSession *types.GameSession `graphql:"createGameSession(input: $input)"`
}

func getGameSessionStatus(t *testing.T, client *graphql.Client, reference string) *RouletteStatusModified {

	var gameSessionStatus GameSessionStatus

	err := client.Query(context.Background(), &gameSessionStatus, map[string]interface{}{
		"reference": graphql.String(reference),
	})

	require.NoError(t, err, "no error finding game session")

	return gameSessionStatus.GameSessionStatus.Item
}

func TestCreateRouletteAndPlay(t *testing.T) {
	t.Parallel()

	// play game as anonymous user, with a persistent device ID
	seed := "TestPersistentSeed"
	client := getGraphqlClientWithDeviceId(t, uuid.New().String())

	var createGameSession CreateGameSession

	err := client.Mutate(context.Background(), &createGameSession, map[string]interface{}{
		"input": types.CreateGameSessionInput{
			GameType: types.GameTypeRoulette,
			Seed:     &seed,
		},
	})

	require.NoError(t, err, "no error creating a new game session")

	require.False(t, createGameSession.GameSession.IsClosed, "created a non closed game session")
	require.True(t, createGameSession.GameSession.ViewerIsPlayer, "viewer should be the player")
	require.Equal(t, seed, createGameSession.GameSession.Seed, "correct seed")
	require.Equal(t, types.GameTypeRoulette, createGameSession.GameSession.GameType, "correct game type")

	status := getGameSessionStatus(t, client, createGameSession.GameSession.Reference)

	require.False(t, status.GameSession.IsClosed, "created a non closed game session")
	require.True(t, status.GameSession.ViewerIsPlayer, "viewer should be the player")
	require.Equal(t, seed, status.GameSession.Seed, "correct seed")
	require.Equal(t, types.GameTypeRoulette, status.GameSession.GameType, "correct game type")

	anonymousClient := getGraphqlClientWithDeviceId(t, uuid.New().String())
	status = getGameSessionStatus(t, anonymousClient, createGameSession.GameSession.Reference)
	require.False(t, status.GameSession.ViewerIsPlayer, "viewer should not be player since this is a different user")

	var spinRoulette SpinRoulette

	err = client.Mutate(context.Background(), &spinRoulette, map[string]interface{}{
		"input": types.SpinRouletteInput{
			GameSessionID: createGameSession.GameSession.ID,
		},
	})

	require.NoError(t, err, "no error spinning the roulette")

	require.Equal(t, 2, spinRoulette.RouletteGameState.DiceOne, "correct dice 1")
	require.Equal(t, 3, spinRoulette.RouletteGameState.DiceTwo, "correct dice 2")
	require.Equal(t, 1, spinRoulette.RouletteGameState.DiceThree, "correct dice 3")

	status = getGameSessionStatus(t, client, createGameSession.GameSession.Reference)
	require.False(t, status.GameSession.IsClosed, "game session should be closed now")
	require.NotNil(t, status.LastGameState, "should have the last game state")
	require.Equal(t, 1, status.LastGameState.DiceThree, "correct last game state 3")
	require.Equal(t, 1, status.LastGameState.DiceTwo, "correct last game state 2")
	require.Equal(t, 1, status.LastGameState.DiceOne, "correct last game state 1")

	// TODO: find a seed that will let us test singles, doubles, and triples. this is after the play is done fully
	status = getGameSessionStatus(t, client, createGameSession.GameSession.Reference)

	require.True(t, status.GameSession.IsClosed, "game session should be closed now")
	require.Equal(t, 1, status.Score, "correct score")
	require.Equal(t, 1, status.Probability, "correct probability")
	require.Equal(t, 1, status.TotalDoubles, "correct total doubles")
	require.Equal(t, 1, status.TotalRolls, "correct total doubles")
	require.Equal(t, 1, len(status.AllGameStates), "correct game states")
	require.Equal(t, 1, status.LastGameState.DiceThree, "correct last game state 3")
	require.Equal(t, 1, status.LastGameState.DiceTwo, "correct last game state 2")
	require.Equal(t, 1, status.LastGameState.DiceOne, "correct last game state 1")

}
