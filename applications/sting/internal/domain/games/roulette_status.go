package games

import "overdoll/libraries/passport"

type RouletteStatus struct {
	session   *SessionToken
	gameState []*RouletteGameState
}

func (r *RouletteStatus) IsDone() bool {
	return r.session.sessionState == Closed
}

func (r *RouletteStatus) IsViewerPlayer(passport *passport.Passport) bool {
	return r.session.IsPlayer(passport)
}

func (r *RouletteStatus) TotalDoubles() int {

	if !r.IsDone() {
		return 0
	}

	return 0
}

func (r *RouletteStatus) TotalRolls() int {

	if !r.IsDone() {
		return 0
	}

	return 0
}

func (r *RouletteStatus) Probability() float64 {

	if !r.IsDone() {
		return 0
	}

	return 0
}

func (r *RouletteStatus) Score() float64 {

	if !r.IsDone() {
		return 0
	}

	return 0
}
