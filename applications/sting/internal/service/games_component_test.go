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
	GameSession  types.GameSession
	GameState    *RouletteGameStateModified
	TotalRolls   int
	TotalDoubles int
	Score        int
}

type GameSessionStatus struct {
	GameSessionStatus *struct {
		Item RouletteStatusModified `graphql:"... on RouletteStatus"`
	} `graphql:"gameSessionStatus(reference: $reference)"`
}

type SpinRoulette struct {
	SpinRoulette struct {
		RouletteGameState *RouletteGameStateModified `graphql:"rouletteGameState"`
	} `graphql:"spinRoulette(input: $input)"`
}

type CreateGameSession struct {
	CreateGameSession struct {
		GameSession *types.GameSession `graphql:"gameSession"`
	} `graphql:"createGameSession(input: $input)"`
}

func getGameSessionStatus(t *testing.T, client *graphql.Client, reference string) *RouletteStatusModified {

	var gameSessionStatus GameSessionStatus

	err := client.Query(context.Background(), &gameSessionStatus, map[string]interface{}{
		"reference": graphql.String(reference),
	})

	require.NoError(t, err, "no error finding game session")

	return &gameSessionStatus.GameSessionStatus.Item
}

func TestCreateRouletteAndPlay(t *testing.T) {
	t.Parallel()

	// play game as anonymous user, with a persistent device ID
	//seedTriples := "doz0bwwa"
	//seedTriples := "11202wwa"
	seedTriples := "11242wwa"
	client := getGraphqlClientWithDeviceId(t, uuid.New().String())

	var createGameSession CreateGameSession

	err := client.Mutate(context.Background(), &createGameSession, map[string]interface{}{
		"input": types.CreateGameSessionInput{
			GameType: types.GameTypeRoulette,
			Seed:     &seedTriples,
		},
	})

	require.NoError(t, err, "no error creating a new game session")

	require.False(t, createGameSession.CreateGameSession.GameSession.IsClosed, "created a non closed game session")
	require.True(t, createGameSession.CreateGameSession.GameSession.ViewerIsPlayer, "viewer should be the player")
	require.Equal(t, seedTriples, createGameSession.CreateGameSession.GameSession.Seed, "correct seed")
	require.Equal(t, types.GameTypeRoulette, createGameSession.CreateGameSession.GameSession.GameType, "correct game type")

	status := getGameSessionStatus(t, client, createGameSession.CreateGameSession.GameSession.Reference)

	require.False(t, status.GameSession.IsClosed, "created a non closed game session")
	require.True(t, status.GameSession.ViewerIsPlayer, "viewer should be the player")
	require.Equal(t, seedTriples, status.GameSession.Seed, "correct seed")
	require.Equal(t, types.GameTypeRoulette, status.GameSession.GameType, "correct game type")

	anonymousClient := getGraphqlClientWithDeviceId(t, uuid.New().String())
	status = getGameSessionStatus(t, anonymousClient, createGameSession.CreateGameSession.GameSession.Reference)
	require.False(t, status.GameSession.ViewerIsPlayer, "viewer should not be player since this is a different user")

	var spinRoulette SpinRoulette

	err = client.Mutate(context.Background(), &spinRoulette, map[string]interface{}{
		"input": types.SpinRouletteInput{
			GameSessionID: createGameSession.CreateGameSession.GameSession.ID,
		},
	})

	//pst := spinRoulette.SpinRoulette.RouletteGameState.Post.Reference

	require.Equal(t, 6, spinRoulette.SpinRoulette.RouletteGameState.DiceOne, "correct dice 1")
	require.Equal(t, 6, spinRoulette.SpinRoulette.RouletteGameState.DiceTwo, "correct dice 2")
	require.Equal(t, 3, spinRoulette.SpinRoulette.RouletteGameState.DiceThree, "correct dice 3")

	err = client.Mutate(context.Background(), &spinRoulette, map[string]interface{}{
		"input": types.SpinRouletteInput{
			GameSessionID: createGameSession.CreateGameSession.GameSession.ID,
		},
	})

	require.NoError(t, err, "no error spinning the roulette")

	require.Equal(t, 3, spinRoulette.SpinRoulette.RouletteGameState.DiceOne, "correct dice 1")
	require.Equal(t, 5, spinRoulette.SpinRoulette.RouletteGameState.DiceTwo, "correct dice 2")
	require.Equal(t, 6, spinRoulette.SpinRoulette.RouletteGameState.DiceThree, "correct dice 3")
	//require.Equal(t, pst, spinRoulette.SpinRoulette.RouletteGameState.Post.Reference, "correct post")

	// do a doubles session
	seedDoubles := "71TestPersistentSeed5"

	err = client.Mutate(context.Background(), &createGameSession, map[string]interface{}{
		"input": types.CreateGameSessionInput{
			GameType: types.GameTypeRoulette,
			Seed:     &seedDoubles,
		},
	})

	require.NoError(t, err, "no error creating a new game session")

	err = client.Mutate(context.Background(), &spinRoulette, map[string]interface{}{
		"input": types.SpinRouletteInput{
			GameSessionID: createGameSession.CreateGameSession.GameSession.ID,
		},
	})

	require.NoError(t, err, "no error spinning the roulette")

	require.Equal(t, 4, spinRoulette.SpinRoulette.RouletteGameState.DiceOne, "correct dice 1")
	require.Equal(t, 4, spinRoulette.SpinRoulette.RouletteGameState.DiceTwo, "correct dice 2")
	require.Equal(t, 4, spinRoulette.SpinRoulette.RouletteGameState.DiceThree, "correct dice 3")

	status = getGameSessionStatus(t, client, createGameSession.CreateGameSession.GameSession.Reference)

	require.True(t, status.GameSession.IsClosed, "game session is closed")
	require.Equal(t, 0, status.TotalDoubles, "correct total doubles")
	require.Equal(t, 1, status.TotalRolls, "correct total doubles")
	require.Equal(t, 0, status.Score, "0 score since no doubles occurred")
	require.Equal(t, 4, status.GameState.DiceThree, "correct last game state 3")
	require.Equal(t, 4, status.GameState.DiceTwo, "correct last game state 2")
	require.Equal(t, 4, status.GameState.DiceOne, "correct last game state 1")
}
