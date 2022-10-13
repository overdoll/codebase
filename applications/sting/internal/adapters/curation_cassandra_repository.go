package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/libraries/errors"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
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

type CurationCassandraRepository struct {
	session gocqlx.Session
}

func NewCurationCassandraRepository(session gocqlx.Session) CurationCassandraRepository {
	return CurationCassandraRepository{session: session}
}

func (r CurationCassandraRepository) getProfileByAccountId(ctx context.Context, accountId string) (*curation.Profile, error) {

	var personalProfile curationProfile

	if err := r.session.
		Query(curationProfileTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(curationProfile{AccountId: accountId}).
		GetRelease(&personalProfile); err != nil {

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

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get personalization profile by id")
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

func (r CurationCassandraRepository) GetProfileByAccountId(ctx context.Context, requester *principal.Principal, accountId string) (*curation.Profile, error) {

	profile, err := r.getProfileByAccountId(ctx, accountId)

	if err != nil {
		return nil, err
	}

	if err := profile.CanView(requester); err != nil {
		return nil, err
	}

	return profile, nil
}

func (r CurationCassandraRepository) updateProfile(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *curation.Profile) error, columns []string) (*curation.Profile, error) {

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
		WithContext(ctx).
		Idempotent(true).
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
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update curation profile")
	}

	return profile, nil
}

func (r CurationCassandraRepository) UpdateProfileDateOfBirth(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *curation.Profile) error) (*curation.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"date_of_birth", "date_of_birth_skipped"})
}

func (r CurationCassandraRepository) UpdateProfileCategory(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *curation.Profile) error) (*curation.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"category_ids", "category_ids_skipped"})
}

func (r CurationCassandraRepository) UpdateProfileAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(profile *curation.Profile) error) (*curation.Profile, error) {
	return r.updateProfile(ctx, requester, id, updateFn, []string{"audience_ids", "audience_ids_skipped"})
}

func (r CurationCassandraRepository) DeleteProfileOperator(ctx context.Context, accountId string) error {

	if err := r.session.
		Query(curationProfileTable.Delete()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(curationProfile{AccountId: accountId}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete curation profile")
	}

	return nil
}
