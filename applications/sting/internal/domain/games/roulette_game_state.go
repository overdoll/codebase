package games

import (
	"math/rand"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/passport"
)

//CREATE TABLE IF NOT EXISTS roulette_game_state
//(
//game_session_token_id text,
//game_session_spin_id  text,
//selected_post_id      text,
//dice_1                int,
//dice_2                int,
//dice_3                int,
//primary key ( game_session_token_id, game_session_spin_id )
//);

var dice = []int{1, 2, 3, 4, 5, 6}

func rollDice(seed int64) int {
	rand.Seed(seed)
	return dice[rand.Intn(len(dice))]
}

type RouletteGameState struct {
	gameSessionTokenId string
	gameSessionSpinId  int
	selectedPostId     string
	diceOne            int
	diceTwo            int
	diceThree          int
}

func SpinRoulette(previousRouletteGameStates []*RouletteGameState, passport *passport.Passport, session *SessionToken, getPost func(seed int64) (*post.Post, error)) (*RouletteGameState, error) {

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
		gameSessionTokenId: session.id,
		gameSessionSpinId:  session.currentSpinId,
		selectedPostId:     postId,
		diceOne:            diceOne,
		diceTwo:            diceTwo,
		diceThree:          diceThree,
	}, nil
}

func (r *RouletteGameState) IsDouble() bool {
	return r.diceOne == r.diceTwo || r.diceTwo == r.diceThree || r.diceThree == r.diceOne
}

func (r *RouletteGameState) GameSessionTokenId() string {
	return r.gameSessionTokenId
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
