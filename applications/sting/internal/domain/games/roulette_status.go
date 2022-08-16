package games

type RouletteStatus struct {
	session   *Session
	gameState *RouletteGameState
}

func (r *RouletteStatus) RouletteGameState() *RouletteGameState {
	return r.gameState
}

func (r *RouletteStatus) Session() *Session {
	return r.session
}

func (r *RouletteStatus) isDone() bool {
	return r.session.sessionState == Closed
}

func (r *RouletteStatus) TotalDoubles() int {

	if !r.isDone() {
		return 0
	}

	return 0
}

func (r *RouletteStatus) TotalRolls() int {

	if !r.isDone() {
		return 0
	}

	return r.gameState.gameSessionSpinId
}

func (r *RouletteStatus) Probability() float64 {

	if !r.isDone() {
		return 0
	}

	return 0
}

func (r *RouletteStatus) Score() int {

	if !r.isDone() {
		return 0
	}

	return 0
}

func RouletteStatusFromSession(session *Session, states *RouletteGameState) *RouletteStatus {
	return &RouletteStatus{
		session:   session,
		gameState: states,
	}
}
