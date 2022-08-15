package games

import (
	"fmt"
	"hash/fnv"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/passport"
	"overdoll/libraries/uuid"
)

type SessionToken struct {
	id                 string
	currentSpinId      int
	seed               string
	gameType           Type
	initiatorAccountId *string
	linkedDeviceId     string
	sessionState       SessionState
}

func NewRouletteSession(passport *passport.Passport) (*SessionToken, error) {

	var accountId *string

	if passport.Authenticated() == nil {
		acc := passport.AccountID()
		accountId = &acc
	}

	seed, err := generateSeed()

	if err != nil {
		return nil, err
	}

	return &SessionToken{
		id:                 uuid.New().String(),
		currentSpinId:      0,
		seed:               seed,
		gameType:           Roulette,
		initiatorAccountId: accountId,
		linkedDeviceId:     passport.DeviceID(),
		sessionState:       Open,
	}, nil
}

func (s *SessionToken) Id() string {
	return s.id
}

func (s *SessionToken) CurrentSpinId() int {
	return s.currentSpinId
}

func (s *SessionToken) Seed() string {
	return s.seed
}

func (s *SessionToken) GameType() Type {
	return s.gameType
}

func (s *SessionToken) InitiatorAccountId() *string {
	return s.initiatorAccountId
}

func (s *SessionToken) LinkedDeviceId() string {
	return s.linkedDeviceId
}

func (s *SessionToken) SessionState() SessionState {
	return s.sessionState
}

func (s *SessionToken) GetCurrentSpin() int64 {

	h := fnv.New64a()
	h.Write([]byte(fmt.Sprintf("%s-%d", s.seed, s.currentSpinId)))

	return int64(h.Sum64())
}

// Close - close the session
func (s *SessionToken) Close() error {
	s.sessionState = Closed
	return nil
}

// Spin - generate a "spin" that can be used as a deterministic seed
func (s *SessionToken) Spin(passport *passport.Passport) (int64, error) {

	if err := s.CanUpdate(passport); err != nil {
		return 0, err
	}

	s.currentSpinId += 1
	return s.GetCurrentSpin(), nil
}

func (s *SessionToken) IsPlayer(passport *passport.Passport) bool {

	// first, if authenticated, can update game even if device ID does not match
	if passport.Authenticated() == nil {
		if passport.AccountID() == *s.initiatorAccountId {
			return true
		}
	}

	// or, device ID matches, then we are the player
	if s.linkedDeviceId == passport.DeviceID() {
		return true
	}

	return false
}

func (s *SessionToken) CanUpdate(passport *passport.Passport) error {

	if s.IsPlayer(passport) {
		return nil
	}

	if s.sessionState != Open {
		return domainerror.NewValidation("game session is closed")
	}

	return domainerror.NewValidation("cannot update game state")
}
