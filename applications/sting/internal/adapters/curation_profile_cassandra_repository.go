package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/libraries/principal"
	"time"
)

var curationProfileTable = table.New(table.Metadata{
	Name: "curation_profile",
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

type curationProfile struct {
	AccountId          string     `db:"account_id"`
	DateOfBirth        *time.Time `db:"date_of_birth"`
	AudienceIds        []string   `db:"audience_ids"`
	CategoryIds        []string   `db:"category_ids"`
	DateOfBirthSkipped bool       `db:"date_of_birth_skipped"`
	AudienceIdsSkipped bool       `db:"audience_ids_skipped"`
	CategoryIdsSkipped bool       `db:"category_ids_skipped"`
}

type CurationProfileCassandraRepository struct {
	session gocqlx.Session
}

func NewCurationProfileCassandraRepository(session gocqlx.Session) CurationProfileCassandraRepository {
	return CurationProfileCassandraRepository{session: session}
}

func (r CurationProfileCassandraRepository) getProfileByAccountId(ctx context.Context, accountId string) (*curation.Profile, error) {

	queryPersonalProfile := r.session.
		Query(curationProfileTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(curationProfile{AccountId: accountId})

	var personalProfile curationProfile

	if err := queryPersonalProfile.Get(&personalProfile); err != nil {

		if err == gocql.ErrNotFound {
			return curation.UnmarshalProfileFromDatabase(
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

	return curation.UnmarshalProfileFromDatabase(
		personalProfile.AccountId,
		personalProfile.DateOfBirth,
		personalProfile.AudienceIds,
		personalProfile.CategoryIds,
		personalProfile.DateOfBirthSkipped,
		personalProfile.CategoryIdsSkipped,
		personalProfile.AudienceIdsSkipped,
	), nil
}

func (r CurationProfileCassandraRepository) GetProfileByAccountId(ctx context.Context, requester *principal.Principal, accountId string) (*curation.Profile, error) {
	profile, err := r.getProfileByAccountId(ctx, accountId)

	if err != nil {
		return nil, err
	}

	if err := profile.CanView(requester); err != nil {
		return nil, err
	}

	return profile, nil
}

func (r CurationProfileCassandraRepository) updateProfile(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *curation.Profile) error, columns []string) (*curation.Profile, error) {

	profile, err := r.GetProfileByAccountId(ctx, requester, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(profile); err != nil {
		return nil, err
	}

	if err := r.session.
		Query(curationProfileTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(&curationProfile{
			AccountId:          profile.AccountId(),
			DateOfBirth:        profile.DateOfBirth(),
			AudienceIds:        profile.AudienceIds(),
			CategoryIds:        profile.CategoryIds(),
			DateOfBirthSkipped: profile.DateOfBirthSkipped(),
			AudienceIdsSkipped: profile.AudienceProfileSkipped(),
			CategoryIdsSkipped: profile.CategoryProfileSkipped(),
		}).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update curation profile: %v", err)
	}

	return profile, nil
}

func (r CurationProfileCassandraRepository) UpdateProfileDateOfBirth(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *curation.Profile) error) (*curation.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"date_of_birth", "date_of_birth_skipped"})
}

func (r CurationProfileCassandraRepository) UpdateProfileCategory(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *curation.Profile) error) (*curation.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"category_ids", "category_ids_skipped"})

}

func (r CurationProfileCassandraRepository) UpdateProfileAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *curation.Profile) error) (*curation.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"audience_ids", "audience_ids_skipped"})
}
