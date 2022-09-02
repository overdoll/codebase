package games

import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"hash/fnv"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/passport"
	"overdoll/libraries/uuid"
)

type Session struct {
	id                 string
	currentSpinId      int
	seed               string
	gameType           Type
	initiatorAccountId *string
	linkedDeviceId     string
	sessionState       State
}

func NewRouletteSession(passport *passport.Passport, askedSeed *string) (*Session, error) {

	var accountId *string

	if passport.Authenticated() == nil {
		acc := passport.AccountID()
		accountId = &acc
	}

	currentSeed := ""

	if askedSeed == nil {

		seed, err := generateSeed()

		if err != nil {
			return nil, err
		}

		currentSeed = seed
	} else {

		err := validator.New().Var(*askedSeed, "required,alphanum,max=25,excludesall= ")

		if err != nil {
			return nil, domainerror.NewValidation(err.Error())
		}

		currentSeed = *askedSeed
	}

	return &Session{
		id:                 uuid.New().String(),
		currentSpinId:      0,
		seed:               currentSeed,
		gameType:           Roulette,
		initiatorAccountId: accountId,
		linkedDeviceId:     passport.DeviceID(),
		sessionState:       Open,
	}, nil
}

func (s *Session) Id() string {
	return s.id
}

func (s *Session) CurrentSpinId() int {
	return s.currentSpinId
}

func (s *Session) Seed() string {
	return s.seed
}

func (s *Session) GameType() Type {
	return s.gameType
}

func (s *Session) InitiatorAccountId() *string {
	return s.initiatorAccountId
}

func (s *Session) LinkedDeviceId() string {
	return s.linkedDeviceId
}

func (s *Session) SessionState() State {
	return s.sessionState
}

func (s *Session) GetCurrentSpin() int64 {

	h := fnv.New64a()
	h.Write([]byte(fmt.Sprintf("%s-%d", s.seed, s.currentSpinId)))

	return int64(h.Sum64())
}

// Close - close the session
func (s *Session) Close() error {
	s.sessionState = Closed
	return nil
}

// Spin - generate a "spin" that can be used as a deterministic seed
func (s *Session) Spin(passport *passport.Passport) (int64, error) {

	if err := s.CanUpdate(passport); err != nil {
		return 0, err
	}

	s.currentSpinId += 1
	return s.GetCurrentSpin(), nil
}

func (s *Session) IsClosed() bool {
	return s.sessionState == Closed
}

func (s *Session) IsPlayer(passport *passport.Passport) bool {

	// first, if authenticated, can update game, even if device ID does not match
	if passport.Authenticated() == nil && s.initiatorAccountId != nil {
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

func (s *Session) CanUpdate(passport *passport.Passport) error {

	if s.IsPlayer(passport) {
		return nil
	}

	if s.sessionState != Open {
		return domainerror.NewValidation("game session is closed")
	}

	return domainerror.NewValidation("cannot update game state")
}

func UnmarshalSessionFromDatabase(id string, currentSpinId int, seed string, gameType string, initiatorAccountId *string, linkedDeviceId string, sessionState string) *Session {
	tp, _ := TypeFromString(gameType)
	st, _ := StateFromString(sessionState)
	return &Session{
		id:                 id,
		currentSpinId:      currentSpinId,
		seed:               seed,
		gameType:           tp,
		initiatorAccountId: initiatorAccountId,
		linkedDeviceId:     linkedDeviceId,
		sessionState:       st,
	}
}
