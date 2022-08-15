package games

import (
	"math/rand"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/passport"
)

var dice = []int{1, 2, 3, 4, 5, 6}

func rollDice(seed int64) int {
	rand.Seed(seed)
	return dice[rand.Intn(len(dice))]
}

type RouletteGameState struct {
	gameSessionId     string
	gameSessionSpinId int
	selectedPostId    string
	diceOne           int
	diceTwo           int
	diceThree         int
}

func SpinRoulette(previousRouletteGameStates []*RouletteGameState, passport *passport.Passport, session *Session, getPost func(seed int64) (*post.Post, error)) (*RouletteGameState, error) {

	// get a spin - this will run a rng, update the session and make sure we aren't in a closed session
	spin, err := session.Spin(passport)

	if err != nil {
		return nil, err
	}

	postId := ""

	// check the last game state of the roulette to see if we got a double or whatever
	if len(previousRouletteGameStates) > 0 {
		lastState := previousRouletteGameStates[len(previousRouletteGameStates)-1]

		// if the last spin was a double, keep the post
		if lastState.IsDouble() {
			postId = lastState.selectedPostId
		}
	}

	if postId == "" {

		pst, err := getPost(spin)

		if err != nil {
			return nil, err
		}

		postId = pst.ID()
	}

	diceOne := rollDice(spin)
	diceTwo := rollDice(spin)
	diceThree := rollDice(spin)

	// triple = lost to the current post
	if diceOne == diceTwo && diceTwo == diceThree && diceThree == diceOne {
		// close the session since we lost
		if err := session.Close(); err != nil {
			return nil, err
		}
	}

	return &RouletteGameState{
		gameSessionId:     session.id,
		gameSessionSpinId: session.currentSpinId,
		selectedPostId:    postId,
		diceOne:           diceOne,
		diceTwo:           diceTwo,
		diceThree:         diceThree,
	}, nil
}

func (r *RouletteGameState) IsDouble() bool {
	return r.diceOne == r.diceTwo || r.diceTwo == r.diceThree || r.diceThree == r.diceOne
}

func (r *RouletteGameState) GameSessionId() string {
	return r.gameSessionId
}

func (r *RouletteGameState) GameSessionSpinId() int {
	return r.gameSessionSpinId
}

func (r *RouletteGameState) SelectedPostId() string {
	return r.selectedPostId
}

func (r *RouletteGameState) DiceOne() int {
	return r.diceOne
}

func (r *RouletteGameState) DiceTwo() int {
	return r.diceTwo
}

func (r *RouletteGameState) DiceThree() int {
	return r.diceThree
}

func UnmarshalRouletteGameStateFromDatabase(gameSessionId string, gameSessionSpinId int, selectedPostId string, diceOne, diceTwo, diceThree int) *RouletteGameState {
	return &RouletteGameState{
		gameSessionId:     gameSessionId,
		gameSessionSpinId: gameSessionSpinId,
		selectedPostId:    selectedPostId,
		diceOne:           diceOne,
		diceTwo:           diceTwo,
		diceThree:         diceThree,
	}
}
