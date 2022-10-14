package curation

import (
	"overdoll/libraries/principal"
	"time"
)

type PostsFeedData struct {
	accountId                string
	generatedAt              *time.Time
	nextRegenerationTime     *time.Time
	wasViewedSinceGeneration bool
}

func (p *PostsFeedData) AccountId() string {
	return p.accountId
}

func (p *PostsFeedData) GeneratedAt() *time.Time {
	return p.generatedAt
}

func (p *PostsFeedData) NextRegenerationTime() *time.Time {
	return p.nextRegenerationTime
}

func (p *PostsFeedData) WasViewedSinceGeneration() bool {
	return p.wasViewedSinceGeneration
}

func (p *PostsFeedData) WasViewed(requester *principal.Principal) error {

	if err := requester.BelongsToAccount(p.accountId); err != nil {
		return err
	}

	tm := time.Now().Add(time.Hour * 24)
	p.nextRegenerationTime = &tm
	p.wasViewedSinceGeneration = true
	return nil
}

func UnmarshalPostsFeedData(accountId string, generatedAt, nextRegenerationTime *time.Time, wasViewedSinceGeneration bool) *PostsFeedData {
	return &PostsFeedData{
		accountId:                accountId,
		generatedAt:              generatedAt,
		nextRegenerationTime:     nextRegenerationTime,
		wasViewedSinceGeneration: wasViewedSinceGeneration,
	}
}
