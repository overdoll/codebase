package curation

import (
	"overdoll/libraries/principal"
	"time"
)

type PostsFeedData struct {
	accountId            string
	generatedAt          *time.Time
	nextRegenerationTime *time.Time
	viewedAt             *time.Time
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

func (p *PostsFeedData) ViewedAt() *time.Time {
	return p.viewedAt
}

func (p *PostsFeedData) MakeGenerated() error {
	tm := time.Now()
	p.nextRegenerationTime = nil
	p.viewedAt = nil
	p.generatedAt = &tm
	return nil
}

func (p *PostsFeedData) NextRegenerationTimeDuration() time.Duration {
	return time.Hour
}

func (p *PostsFeedData) WasViewed(requester *principal.Principal) error {

	if err := requester.BelongsToAccount(p.accountId); err != nil {
		return err
	}

	tm := time.Now().Add(p.NextRegenerationTimeDuration())
	tmNow := time.Now()
	p.nextRegenerationTime = &tm
	p.viewedAt = &tmNow
	return nil
}

func UnmarshalPostsFeedData(accountId string, generatedAt, nextRegenerationTime *time.Time, viewedAt *time.Time) *PostsFeedData {
	return &PostsFeedData{
		accountId:            accountId,
		generatedAt:          generatedAt,
		nextRegenerationTime: nextRegenerationTime,
		viewedAt:             viewedAt,
	}
}
