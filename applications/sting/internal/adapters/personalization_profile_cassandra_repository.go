package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/personalization"
	"overdoll/libraries/principal"
	"time"
)

var personalizationProfileTable = table.New(table.Metadata{
	Name: "personalization_profile",
	Columns: []string{
		"account_id",
		"date_of_birth",
		"audience_ids",
		"category_ids",
		"date_of_birth_skipped",
		"audience_ids_skipped",
		"category_ids_skipped",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type personalizationProfile struct {
	AccountId          string     `db:"account_id"`
	DateOfBirth        *time.Time `db:"date_of_birth"`
	AudienceIds        []string   `db:"audience_ids"`
	CategoryIds        []string   `db:"audience_ids"`
	DateOfBirthSkipped bool       `db:"date_of_birth_skipped"`
	AudienceIdsSkipped bool       `db:"audience_ids_skipped"`
	CategoryIdsSkipped bool       `db:"category_ids_skipped"`
}

type PersonalizationProfileCassandraRepository struct {
	session gocqlx.Session
}

func NewPersonalizationProfileCassandraRepository(session gocqlx.Session) PersonalizationProfileCassandraRepository {
	return PersonalizationProfileCassandraRepository{session: session}
}

func (r PersonalizationProfileCassandraRepository) getProfileByAccountId(ctx context.Context, accountId string) (*personalization.Profile, error) {

	queryPersonalProfile := r.session.
		Query(personalizationProfileTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(personalizationProfile{AccountId: accountId})

	var personalProfile personalizationProfile

	if err := queryPersonalProfile.Get(&personalProfile); err != nil {

		if err == gocql.ErrNotFound {
			return personalization.UnmarshalProfileFromDatabase(
				accountId,
				nil,
				nil,
				nil,
				false,
				false,
				false,
			), nil
		}

		return nil, fmt.Errorf("failed to get personalization profile by id: %v", err)
	}

	return personalization.UnmarshalProfileFromDatabase(
		personalProfile.AccountId,
		personalProfile.DateOfBirth,
		personalProfile.AudienceIds,
		personalProfile.CategoryIds,
		personalProfile.DateOfBirthSkipped,
		personalProfile.CategoryIdsSkipped,
		personalProfile.AudienceIdsSkipped,
	), nil
}

func (r PersonalizationProfileCassandraRepository) GetProfileByAccountId(ctx context.Context, requester *principal.Principal, accountId string) (*personalization.Profile, error) {
	profile, err := r.getProfileByAccountId(ctx, accountId)

	if err != nil {
		return nil, err
	}

	if err := profile.CanView(requester); err != nil {
		return nil, err
	}

	return profile, nil
}

func (r PersonalizationProfileCassandraRepository) updateProfile(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *personalization.Profile) error, columns []string) (*personalization.Profile, error) {

	profile, err := r.GetProfileByAccountId(ctx, requester, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(profile); err != nil {
		return nil, err
	}

	if err := r.session.
		Query(postTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(personalizationProfile{
			AccountId:          profile.AccountId(),
			DateOfBirth:        profile.DateOfBirth(),
			AudienceIds:        profile.AudienceIds(),
			CategoryIds:        profile.CategoryIds(),
			DateOfBirthSkipped: profile.DateOfBirthSkipped(),
			AudienceIdsSkipped: profile.AudienceProfileSkipped(),
			CategoryIdsSkipped: profile.CategoryProfileSkipped(),
		}).
		ExecRelease(); err != nil {
		return nil, err
	}

	return profile, nil
}

func (r PersonalizationProfileCassandraRepository) UpdateProfileDateOfBirth(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *personalization.Profile) error) (*personalization.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"date_of_birth", "date_of_birth_skipped"})
}

func (r PersonalizationProfileCassandraRepository) UpdateProfileCategory(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *personalization.Profile) error) (*personalization.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"category_ids", "category_ids_skipped"})

}

func (r PersonalizationProfileCassandraRepository) UpdateProfileAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *personalization.Profile) error) (*personalization.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"audience_ids", "audience_ids_skipped"})
}
