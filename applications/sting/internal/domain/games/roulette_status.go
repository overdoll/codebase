package games

type RouletteStatus struct {
	session   *Session
	gameState []*RouletteGameState
}

func (r *RouletteStatus) AllGameStates() []*RouletteGameState {

	if r.isDone() {
		return r.gameState
	}

	return nil
}

func (r *RouletteStatus) LastRouletteGameState() *RouletteGameState {

	if len(r.gameState) == 0 {
		return nil
	}

	return r.gameState[len(r.gameState)-1]
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

	total := 0

	for _, state := range r.gameState {
		if state.IsDouble() {
			total += 1
		}
	}

	return total
}

func (r *RouletteStatus) TotalRolls() int {

	if !r.isDone() {
		return 0
	}

	return len(r.gameState)
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

func RouletteStatusFromSession(session *Session, states []*RouletteGameState) *RouletteStatus {
	return &RouletteStatus{
		session:   session,
		gameState: states,
	}
}
