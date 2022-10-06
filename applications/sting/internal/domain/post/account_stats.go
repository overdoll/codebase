package post

import "time"

type AccountStats struct {
	accountId          string
	likesBuckets       bool
	lastLikeBucketDate time.Time
	clubsJoined        []string

	hasCurationProfileRecord bool
	rouletteGameSessions     int
	rouletteTotalSpins       int
}

func (t *AccountStats) AccountId() string {
	return t.accountId
}

func (t *AccountStats) HasCurationProfile() bool {
	return t.hasCurationProfileRecord
}

func (t *AccountStats) HasLikes() bool {
	return t.likesBuckets
}
func (t *AccountStats) LastLike() time.Time {
	return t.lastLikeBucketDate
}

func (t *AccountStats) ClubsJoined() []string {
	return t.clubsJoined
}

func (t *AccountStats) RouletteGameSessions() int {
	return t.rouletteGameSessions
}

func (t *AccountStats) RouletteTotalSpins() int {
	return t.rouletteTotalSpins
}

func (t *AccountStats) SetHasCurationProfile(has bool) {
	t.hasCurationProfileRecord = has
}

func (t *AccountStats) SetRouletteData(totalSessions int, totalSpins int) {
	t.rouletteGameSessions = totalSessions
	t.rouletteTotalSpins = totalSpins
}
