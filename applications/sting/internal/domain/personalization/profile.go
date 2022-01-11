package personalization

import (
	"overdoll/libraries/principal"
	"time"
)

type Profile struct {
	accountId   string
	dateOfBirth *time.Time

	audienceIds []string
	categoryIds []string

	dateOfBirthSkipped bool
	audienceIdsSkipped bool
	categoryIdsSkipped bool
}

func (m *Profile) AccountId() string {
	return m.accountId
}

func (m *Profile) DateOfBirth() *time.Time {
	return m.dateOfBirth
}

func (m *Profile) AudienceIds() []string {
	return m.audienceIds
}

func (m *Profile) CategoryIds() []string {
	return m.categoryIds
}

func (m *Profile) DateOfBirthSkipped() bool {
	return m.dateOfBirthSkipped
}

func (m *Profile) CategoryProfileSkipped() bool {
	return m.categoryIdsSkipped
}

func (m *Profile) AudienceProfileSkipped() bool {
	return m.audienceIdsSkipped
}

func (m *Profile) UpdateDateOfBirth(dateOfBirth *time.Time, skipped bool) error {
	m.dateOfBirth = dateOfBirth
	m.dateOfBirthSkipped = skipped
	return nil
}

func (m *Profile) UpdateCategory(categoryIds []string, skipped bool) error {
	m.categoryIds = categoryIds
	m.categoryIdsSkipped = skipped
	return nil
}

func (m *Profile) UpdateAudience(audienceIds []string, skipped bool) error {
	m.audienceIds = audienceIds
	m.audienceIdsSkipped = skipped
	return nil
}

func (m *Profile) AudienceProfileCompleted() bool {
	return len(m.audienceIds) > 0 || (len(m.audienceIds) == 0 && m.audienceIdsSkipped)
}

func (m *Profile) CategoryProfileCompleted() bool {
	return len(m.categoryIds) > 0 || (len(m.categoryIds) == 0 && m.categoryIdsSkipped)
}

func (m *Profile) DateOfBirthProfileCompleted() bool {
	return m.dateOfBirth != nil || (m.dateOfBirth == nil && m.dateOfBirthSkipped)
}

func (m *Profile) IsCompleted() bool {
	return m.AudienceProfileCompleted() && m.CategoryProfileCompleted() && m.DateOfBirthProfileCompleted()
}

func (m *Profile) CanUpdate(requester *principal.Principal) error {
	return requester.BelongsToAccount(m.accountId)
}

func (m *Profile) CanView(requester *principal.Principal) error {
	return requester.BelongsToAccount(m.accountId)
}

func UnmarshalProfileFromDatabase(accountId string, dateOfBirth *time.Time, audienceIds, categoryIds []string, dateOfBirthSkipped, categoryIdsSkipped, audienceIdsSkipped bool) *Profile {
	return &Profile{
		accountId:          accountId,
		dateOfBirth:        dateOfBirth,
		audienceIds:        audienceIds,
		categoryIds:        categoryIds,
		dateOfBirthSkipped: dateOfBirthSkipped,
		categoryIdsSkipped: categoryIdsSkipped,
		audienceIdsSkipped: audienceIdsSkipped,
	}
}
