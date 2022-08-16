package games

import (
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/passport"
)

type RouletteGameState struct {
	gameSessionId     string
	gameSessionSpinId int
	selectedPostId    string
	doublesCount      int
	diceOne           int
	diceTwo           int
	diceThree         int
}

func SpinRoulette(previousRouletteGameState *RouletteGameState, passport *passport.Passport, session *Session, getPost func(seed int64) (*post.Post, error)) (*RouletteGameState, error) {

	// get a spin - this will run a rng, update the session and make sure we aren't in a closed session
	spin, err := session.Spin(passport)

	if err != nil {
		return nil, err
	}

	postId := ""

	doublesCount := 0

	// check the last game state of the roulette to see if we got a double or whatever
	if previousRouletteGameState != nil {
		doublesCount = previousRouletteGameState.doublesCount
		// if the last spin was a double, keep the post
		if previousRouletteGameState.IsDouble() {
			postId = previousRouletteGameState.selectedPostId
			doublesCount += 1
		}
	}

	if postId == "" {

		pst, err := getPost(spin)

		if err != nil {
			return nil, err
		}

		postId = pst.ID()
	}

	roller := newDiceRoll(spin)

	diceOne := roller.Roll()
	diceTwo := roller.Roll()
	diceThree := roller.Roll()

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
		doublesCount:      doublesCount,
		selectedPostId:    postId,
		diceOne:           diceOne,
		diceTwo:           diceTwo,
		diceThree:         diceThree,
	}, nil
}

func (r *RouletteGameState) IsDouble() bool {
	return (r.diceOne == r.diceTwo && r.diceTwo != r.diceThree && r.diceThree == r.diceOne) ||
		(r.diceTwo == r.diceThree && r.diceOne != r.diceTwo && r.diceThree != r.diceOne) ||
		(r.diceThree == r.diceOne && r.diceOne != r.diceTwo && r.diceTwo != r.diceThree)
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

func (r *RouletteGameState) DoublesCount() int {
	return r.doublesCount
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

func UnmarshalRouletteGameStateFromDatabase(gameSessionId string, gameSessionSpinId int, selectedPostId string, diceOne, diceTwo, diceThree, doublesCount int) *RouletteGameState {
	return &RouletteGameState{
		gameSessionId:     gameSessionId,
		gameSessionSpinId: gameSessionSpinId,
		selectedPostId:    selectedPostId,
		diceOne:           diceOne,
		diceTwo:           diceTwo,
		diceThree:         diceThree,
		doublesCount:      doublesCount,
	}
}
