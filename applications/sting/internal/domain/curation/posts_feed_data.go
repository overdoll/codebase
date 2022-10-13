package curation

import "time"

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

func UnmarshalPostsFeedData(accountId string, generatedAt, nextRegenerationTime *time.Time, wasViewedSinceGeneration bool) *PostsFeedData {
	return &PostsFeedData{
		accountId:                accountId,
		generatedAt:              generatedAt,
		nextRegenerationTime:     nextRegenerationTime,
		wasViewedSinceGeneration: wasViewedSinceGeneration,
	}
}
