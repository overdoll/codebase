package adapters

import (
	"context"
	"github.com/go-redis/redis/v8"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
	"overdoll/libraries/support"
	"strings"
	"time"
)

var clubTable = table.New(table.Metadata{
	Name: "clubs",
	Columns: []string{
		"id",
		"slug",
		"slug_aliases",
		"name",
		"thumbnail_resource",
		"banner_resource",
		"characters_enabled",
		"characters_limit",
		"members_count",
		"total_likes",
		"links",
		"total_posts",
		"members_count_last_update_id",
		"owner_account_id",
		"suspended",
		"supporter_only_posts_disabled",
		"suspended_until",
		"next_supporter_post_time",
		"has_created_supporter_only_post",
		"terminated",
		"terminated_by_account_id",
		"created_at",
		"updated_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type clubs struct {
	Id                          string            `db:"id"`
	Slug                        string            `db:"slug"`
	SlugAliases                 []string          `db:"slug_aliases"`
	Links                       []string          `db:"links"`
	Name                        map[string]string `db:"name"`
	ThumbnailResource           string            `db:"thumbnail_resource"`
	BannerResource              string            `db:"banner_resource"`
	CharactersEnabled           bool              `db:"characters_enabled"`
	CharactersLimit             int               `db:"characters_limit"`
	TotalLikes                  int               `db:"total_likes"`
	TotalPosts                  int               `db:"total_posts"`
	MembersCount                int               `db:"members_count"`
	MembersCountLastUpdateId    gocql.UUID        `db:"members_count_last_update_id"`
	OwnerAccountId              string            `db:"owner_account_id"`
	Suspended                   bool              `db:"suspended"`
	SuspendedUntil              *time.Time        `db:"suspended_until"`
	SupporterOnlyPostsDisabled  bool              `db:"supporter_only_posts_disabled"`
	NextSupporterPostTime       *time.Time        `db:"next_supporter_post_time"`
	HasCreatedSupporterOnlyPost bool              `db:"has_created_supporter_only_post"`
	Terminated                  bool              `db:"terminated"`
	TerminatedByAccountId       *string           `db:"terminated_by_account_id"`
	CreatedAt                   time.Time         `db:"created_at"`
	UpdatedAt                   time.Time         `db:"updated_at"`
}

var clubSlugTable = table.New(table.Metadata{
	Name: "clubs_slugs",
	Columns: []string{
		"club_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

type clubSlugs struct {
	ClubId string `db:"club_id"`
	Slug   string `db:"slug"`
}

var accountClubsTable = table.New(table.Metadata{
	Name: "account_clubs",
	Columns: []string{
		"account_id",
		"club_id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"club_id"},
})

type accountClubs struct {
	ClubId    string `db:"club_id"`
	AccountId string `db:"account_id"`
}

var clubSuspensionLogTable = table.New(table.Metadata{
	Name: "club_suspension_log",
	Columns: []string{
		"club_id",
		"id",
		"action_account_id",
		"is_suspension_removal",
		"reason",
		"suspended_until",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"id"},
})

type clubSuspensionLog struct {
	ClubId              string     `db:"club_id"`
	Id                  string     `db:"id"`
	ActionAccountId     *string    `db:"action_account_id"`
	IsSuspensionRemoval bool       `db:"is_suspension_removal"`
	Reason              *string    `db:"reason"`
	SuspendedUntil      *time.Time `db:"suspended_until"`
}

var clubCharactersTable = table.New(table.Metadata{
	Name: "club_characters",
	Columns: []string{
		"club_id",
		"character_id",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"character_id"},
})

type clubCharacters struct {
	ClubId      string `db:"club_id"`
	CharacterId string `db:"character_id"`
}

type ClubCassandraElasticsearchRepository struct {
	session            gocqlx.Session
	client             *elastic.Client
	cache              *redis.Client
	resourceSerializer *resource.Serializer
}

func NewClubCassandraElasticsearchRepository(session gocqlx.Session, client *elastic.Client, cache *redis.Client, resourcesSerializer *resource.Serializer) ClubCassandraElasticsearchRepository {
	return ClubCassandraElasticsearchRepository{session: session, client: client, cache: cache, resourceSerializer: resourcesSerializer}
}

func marshalClubToDatabase(cl *club.Club) (*clubs, error) {

	marshalled, err := resource.MarshalResourceToDatabase(cl.ThumbnailResource())

	if err != nil {
		return nil, err
	}

	marshalledBanner, err := resource.MarshalResourceToDatabase(cl.BannerResource())

	if err != nil {
		return nil, err
	}

	return &clubs{
		Id:                          cl.ID(),
		Slug:                        cl.Slug(),
		SlugAliases:                 cl.SlugAliases(),
		Name:                        localization.MarshalTranslationToDatabase(cl.Name()),
		ThumbnailResource:           marshalled,
		BannerResource:              marshalledBanner,
		SupporterOnlyPostsDisabled:  cl.SupporterOnlyPostsDisabled(),
		MembersCount:                cl.MembersCount(),
		CharactersLimit:             cl.CharactersLimit(),
		CharactersEnabled:           cl.CharactersEnabled(),
		TotalLikes:                  cl.TotalLikes(),
		TotalPosts:                  cl.TotalPosts(),
		MembersCountLastUpdateId:    gocql.TimeUUID(),
		OwnerAccountId:              cl.OwnerAccountId(),
		Suspended:                   cl.Suspended(),
		SuspendedUntil:              cl.SuspendedUntil(),
		NextSupporterPostTime:       cl.NextSupporterPostTime(),
		HasCreatedSupporterOnlyPost: cl.HasCreatedSupporterOnlyPost(),
		Terminated:                  cl.Terminated(),
		TerminatedByAccountId:       cl.TerminatedByAccountId(),
		CreatedAt:                   cl.CreatedAt(),
		UpdatedAt:                   cl.UpdatedAt(),
		Links:                       cl.Links(),
	}, nil
}

func (r ClubCassandraElasticsearchRepository) unmarshalClubFromDatabase(ctx context.Context, b *clubs) (*club.Club, error) {

	unmarshalled, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, b.ThumbnailResource)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, b.BannerResource)

	if err != nil {
		return nil, err
	}

	return club.UnmarshalClubFromDatabase(
		b.Id,
		b.Slug,
		b.SlugAliases,
		b.Name,
		unmarshalled,
		unmarshalledBanner,
		b.MembersCount,
		b.OwnerAccountId,
		b.Suspended,
		b.SuspendedUntil,
		b.NextSupporterPostTime,
		b.HasCreatedSupporterOnlyPost,
		b.Terminated,
		b.TerminatedByAccountId,
		b.SupporterOnlyPostsDisabled,
		b.CreatedAt,
		b.UpdatedAt,
		b.CharactersEnabled,
		b.CharactersLimit,
		b.TotalLikes,
		b.TotalPosts,
		b.Links,
	), nil
}

func (r ClubCassandraElasticsearchRepository) CreateClubSuspensionLog(ctx context.Context, suspensionLog *club.SuspensionLog) error {

	var reason *string

	if suspensionLog.SuspensionReason() != nil {
		r := suspensionLog.SuspensionReason().String()
		reason = &r
	}

	if err := r.session.
		Query(clubSuspensionLogTable.Insert()).
		Consistency(gocql.LocalQuorum).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(clubSuspensionLog{
			ClubId:              suspensionLog.ClubId(),
			Id:                  suspensionLog.Id(),
			ActionAccountId:     suspensionLog.AccountId(),
			IsSuspensionRemoval: suspensionLog.IsSuspensionRemoval(),
			Reason:              reason,
			SuspendedUntil:      suspensionLog.SuspendedUntil(),
		}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create club suspension log")
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) GetClubSuspensionLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, clubId string) ([]*club.SuspensionLog, error) {

	clb, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	if err := club.CanViewClubSuspensionLogs(requester, clb); err != nil {
		return nil, err
	}

	var clubLogs []*clubSuspensionLog

	builder := clubSuspensionLogTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubSuspensionLog{
			ClubId: clubId,
		}).
		SelectRelease(&clubLogs); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club suspension logs")
	}

	var logs []*club.SuspensionLog

	for _, log := range clubLogs {
		lg := club.UnmarshalSuspensionLogFromDatabase(
			log.Id,
			log.ClubId,
			log.ActionAccountId,
			log.Reason,
			log.SuspendedUntil,
			log.IsSuspensionRemoval,
		)
		lg.Node = paging.NewNode(log.Id)
		logs = append(logs, lg)
	}

	return logs, nil
}

func (r ClubCassandraElasticsearchRepository) getClubSlug(ctx context.Context, slug string) (*clubSlugs, error) {

	var b clubSlugs

	if err := r.session.
		Query(clubSlugTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.One).
		BindStruct(clubSlugs{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("club", slug)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club by slug")
	}

	return &b, nil
}

func (r ClubCassandraElasticsearchRepository) GetClubBySlug(ctx context.Context, requester *principal.Principal, slug string) (*club.Club, error) {

	b, err := r.getClubSlug(ctx, slug)

	if err != nil {
		return nil, err
	}

	result, err := r.GetClubById(ctx, b.ClubId)

	if err != nil {
		return nil, err
	}

	if !result.CanView(requester) {
		return nil, apperror.NewNotFoundError("club", result.ID())
	}

	return result, nil
}

func (r ClubCassandraElasticsearchRepository) getClubById(ctx context.Context, clubId string) (*clubs, error) {

	var b clubs

	if err := r.session.
		Query(clubTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubs{Id: clubId}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("club", clubId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club by id")
	}

	return &b, nil
}

func (r ClubCassandraElasticsearchRepository) GetClubById(ctx context.Context, brandId string) (*club.Club, error) {

	b, err := r.getClubById(ctx, brandId)

	if err != nil {
		return nil, err
	}

	return r.unmarshalClubFromDatabase(ctx, b)
}

func (r ClubCassandraElasticsearchRepository) GetClubSupporterMembershipsCount(ctx context.Context, requester *principal.Principal, clubId string) (int64, error) {

	clb, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return 0, err
	}

	if err := clb.CanViewSupporterCount(requester); err != nil {
		return 0, err
	}

	return r.getClubsSupporterMembershipCount(ctx, clubId)
}

func (r ClubCassandraElasticsearchRepository) UpdateClubSlug(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {

	currentClub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	oldAliasDefault := currentClub.Slug()

	err = updateFn(currentClub)

	if err != nil {
		return nil, err
	}

	aliasDefault := currentClub.Slug()

	// to update the club slug, we basically:
	// remove the slug from the alias list
	// put the old slug into the alias list
	// put the new slug
	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := clubTable.UpdateBuilder("updated_at").Remove("slug_aliases").ToCql()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubs{
			Id:          clubId,
			SlugAliases: []string{aliasDefault},
			UpdatedAt:   currentClub.UpdatedAt(),
		},
	)

	stmt, names = clubTable.UpdateBuilder().Add("slug_aliases").ToCql()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubs{
			Id:          clubId,
			SlugAliases: []string{oldAliasDefault},
		},
	)

	stmt, names = clubTable.UpdateBuilder().Set("slug").ToCql()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubs{
			Id:   clubId,
			Slug: aliasDefault,
		},
	)

	// execute batch.
	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update club slug")
	}

	if err := r.indexClub(ctx, currentClub); err != nil {
		return nil, err
	}

	return currentClub, nil
}

func (r ClubCassandraElasticsearchRepository) UpdateClubSlugAliases(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {

	currentClub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	oldSlugs := currentClub.SlugAliases()

	err = updateFn(currentClub)

	if err != nil {
		return nil, err
	}

	newSlugs := currentClub.SlugAliases()

	pst, err := marshalClubToDatabase(currentClub)

	if err != nil {
		return nil, err
	}

	newAliasSlugToAdd := ""
	aliasSlugToRemove := ""

	// check for slug removals
	for _, s := range oldSlugs {
		found := false

		for _, v := range newSlugs {
			if v == s {
				found = true
				break
			}
		}

		if !found {
			aliasSlugToRemove = s
			break
		}
	}

	// no new slug additions, look for slug removals
	if aliasSlugToRemove == "" {
		for _, s := range newSlugs {
			found := false

			for _, v := range oldSlugs {
				if v == s {
					found = true
				}
			}

			if !found {
				newAliasSlugToAdd = s
				break
			}
		}
	}

	if aliasSlugToRemove == "" && newAliasSlugToAdd == "" {
		return nil, domainerror.NewValidation("no removals or additions found")
	}

	// SLUG ADDITION
	if newAliasSlugToAdd != "" {
		if err := r.createUniqueClubSlug(ctx, pst.Id, newAliasSlugToAdd); err != nil {
			return nil, err
		}

		if err := clubTable.
			UpdateBuilder().
			Add("slug_aliases").
			Query(r.session).
			WithContext(ctx).
			Idempotent(true).
			BindMap(map[string]interface{}{
				"id":           pst.Id,
				"slug_aliases": []string{newAliasSlugToAdd},
			}).
			ExecRelease(); err != nil {

			if err := r.deleteUniqueClubSlug(ctx, pst.Id, newAliasSlugToAdd); err != nil {
				return nil, err
			}

			return nil, errors.Wrap(support.NewGocqlError(err), "failed to add club slug alias")
		}

		return currentClub, nil
	}

	// SLUG REMOVAL
	if err := r.deleteUniqueClubSlug(ctx, pst.Id, aliasSlugToRemove); err != nil {
		return nil, err
	}

	if err := clubTable.
		UpdateBuilder("updated_at").
		Remove("slug_aliases").
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		BindMap(map[string]interface{}{
			"id":           pst.Id,
			"slug_aliases": []string{aliasSlugToRemove},
			"updated_at":   time.Now(),
		}).
		ExecRelease(); err != nil {

		if err := r.createUniqueClubSlug(ctx, pst.Id, aliasSlugToRemove); err != nil {
			return nil, err
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to remove club slug alias")
	}

	if err := r.indexClub(ctx, currentClub); err != nil {
		return nil, err
	}

	return currentClub, nil
}

func (r ClubCassandraElasticsearchRepository) UpdateClubCharacters(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"characters_limit", "characters_enabled"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubName(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"name"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubThumbnail(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"thumbnail_resource"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubBanner(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"banner_resource"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubSuspensionStatus(ctx context.Context, clubId string, updateFn func(club *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"suspended", "suspended_until"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubNextSupporterPostTime(ctx context.Context, clubId string, updateFn func(club *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"next_supporter_post_time", "has_created_supporter_only_post"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubTerminationStatus(ctx context.Context, clubId string, updateFn func(club *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"terminated", "terminated_by_account_id"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubTotalLikesCount(ctx context.Context, clubId string, updateFn func(club *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"total_likes"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubTotalPostsCount(ctx context.Context, clubId string, updateFn func(club *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"total_posts"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubSupporterOnlyPostsDisabled(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) (*club.Club, error) {
	return r.updateClubRequest(ctx, clubId, updateFn, []string{"supporter_only_posts_disabled", "next_supporter_post_time", "has_created_supporter_only_post"})
}

func (r ClubCassandraElasticsearchRepository) UpdateClubMembersCount(ctx context.Context, clubId string, updateFn func(cl *club.Club) error) error {

	clb, err := r.getClubById(ctx, clubId)

	if err != nil {
		return err
	}

	unmarshalled, err := r.unmarshalClubFromDatabase(ctx, clb)

	if err != nil {
		return err
	}

	if err := updateFn(unmarshalled); err != nil {
		return err
	}

	ok, err := clubTable.UpdateBuilder("members_count", "members_count_last_update_id", "updated_at").
		If(qb.EqLit("members_count_last_update_id", clb.MembersCountLastUpdateId.String())).
		Query(r.session).
		WithContext(ctx).
		BindStruct(clubs{Id: clubId, MembersCount: unmarshalled.MembersCount(), MembersCountLastUpdateId: gocql.TimeUUID(), UpdatedAt: unmarshalled.UpdatedAt()}).
		SerialConsistency(gocql.Serial).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update club member count")
	}

	if !ok {
		return errors.Wrap(support.NewGocqlTransactionError(), "failed to update club member count")
	}

	return r.indexClub(ctx, unmarshalled)
}

func (r ClubCassandraElasticsearchRepository) updateClubRequest(ctx context.Context, clubId string, updateFn func(cl *club.Club) error, columns []string) (*club.Club, error) {

	currentClub, err := r.GetClubById(ctx, clubId)

	if err != nil {
		return nil, err
	}

	if err := updateFn(currentClub); err != nil {
		return nil, err
	}

	pst, err := marshalClubToDatabase(currentClub)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(clubTable.Update(append(columns, "updated_at")...)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update club")
	}

	if err := r.indexClub(ctx, currentClub); err != nil {
		return nil, err
	}

	return currentClub, nil
}

func (r ClubCassandraElasticsearchRepository) GetClubCharactersCount(ctx context.Context, requester *principal.Principal, clubId string) (int, error) {

	if err := club.ViewClubCharactersCount(requester, clubId); err != nil {
		return 0, err
	}

	type clubCharactersCount struct {
		Count int `db:"count"`
	}

	var clubCharacter clubCharactersCount

	if err := clubCharactersTable.
		SelectBuilder().
		CountAll().
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubCharacters{
			ClubId: clubId,
		}).
		GetRelease(&clubCharacter); err != nil {
		return 0, errors.Wrap(support.NewGocqlError(err), "failed to get club characters count")
	}

	return clubCharacter.Count, nil
}

func (r ClubCassandraElasticsearchRepository) getAccountClubsCount(ctx context.Context, accountId string) (int, error) {
	type accountClubsCount struct {
		Count int `db:"count"`
	}

	var clubsCount accountClubsCount

	if err := accountClubsTable.
		SelectBuilder().
		CountAll().
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubs{
			AccountId: accountId,
		}).
		GetRelease(&clubsCount); err != nil {
		return 0, errors.Wrap(support.NewGocqlError(err), "failed to get account clubs by account count")
	}

	return clubsCount.Count, nil
}

func (r ClubCassandraElasticsearchRepository) GetAccountClubsCount(ctx context.Context, requester *principal.Principal, accountId string) (int, error) {

	if err := club.CanViewAccountClubs(requester, accountId); err != nil {
		return 0, err
	}

	return r.getAccountClubsCount(ctx, accountId)
}

func (r ClubCassandraElasticsearchRepository) deleteClub(ctx context.Context, cla *clubs) error {

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, _ := clubTable.Delete()

	// create actual club table entry
	batch.Query(stmt, cla.Id)

	stmt, _ = accountClubsTable.Delete()

	// create entry for account's clubs
	batch.Query(stmt, cla.OwnerAccountId, cla.Id)

	if err := r.addDeleteInitialClubMemberToBatch(ctx, batch, cla.Id, cla.OwnerAccountId); err != nil {
		return err
	}

	// execute batch.
	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete club batch")
	}

	return nil
}
func (r ClubCassandraElasticsearchRepository) ReserveSlugForClub(ctx context.Context, clb *club.Club) error {

	cla, err := marshalClubToDatabase(clb)

	if err != nil {
		return err
	}

	if err := r.createUniqueClubSlug(ctx, cla.Id, cla.Slug); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) DeleteReservedSlugForClub(ctx context.Context, club *club.Club) error {

	cla, err := marshalClubToDatabase(club)

	if err != nil {
		return err
	}

	// if fails, release unique slug
	if err := r.deleteUniqueClubSlug(ctx, cla.Id, cla.Slug); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) UpdateClubOwner(ctx context.Context, clubId, accountId string) error {

	clb, err := r.getClubById(ctx, clubId)

	if err != nil {
		return err
	}

	// save old owner so we can remove them
	oldOwnerAccountId := clb.OwnerAccountId

	// update to new owner
	clb.OwnerAccountId = accountId

	// unmarshal, so we can index it
	unmarshalled, err := r.unmarshalClubFromDatabase(ctx, clb)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	// DELETE OLD ACCOUNT
	stmt, names := accountClubsTable.Delete()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		accountClubs{
			ClubId:    clubId,
			AccountId: oldOwnerAccountId,
		},
	)

	if err := r.removeInitialClubMemberToBatch(ctx, batch, clubId, oldOwnerAccountId); err != nil {
		return err
	}

	// ADD NEW ACCOUNT
	stmt, names = accountClubsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		accountClubs{
			ClubId:    clubId,
			AccountId: accountId,
		},
	)

	stmt, names = clubTable.Update("owner_account_id")
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clb,
	)

	if err := r.addInitialClubMemberToBatch(ctx, batch, clubId, accountId, time.Now()); err != nil {
		return err
	}

	// execute batch.
	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create club batch")
	}

	// index club with new owner
	if err := r.indexClub(ctx, unmarshalled); err != nil {
		return err
	}

	// clear digest cache for both old owner and new owner
	if err := r.clearAccountDigestCache(ctx, oldOwnerAccountId); err != nil {
		return err
	}
	if err := r.clearAccountDigestCache(ctx, accountId); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) CreateClub(ctx context.Context, club *club.Club) error {

	cla, err := marshalClubToDatabase(club)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := clubTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		cla,
	)

	// create actual club table entry
	stmt, names = accountClubsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		accountClubs{
			ClubId:    cla.Id,
			AccountId: cla.OwnerAccountId,
		},
	)

	if err := r.addInitialClubMemberToBatch(ctx, batch, cla.Id, cla.OwnerAccountId, time.Now()); err != nil {
		return err
	}

	// execute batch.
	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create club batch")
	}

	if err := r.indexClub(ctx, club); err != nil {
		return err
	}

	if err := r.clearAccountDigestCache(ctx, cla.OwnerAccountId); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) deleteUniqueClubSlug(ctx context.Context, clubId, slug string) error {

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := r.session.
		Query(clubSlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		BindStruct(clubSlugs{
			Slug:   strings.ToLower(slug),
			ClubId: clubId,
		}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to release club slug")
	}

	if !applied {
		return errors.Wrap(support.NewGocqlTransactionError(), "failed to release club slug")
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) createUniqueClubSlug(ctx context.Context, clubId, slug string) error {

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := clubSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(clubSlugs{
			Slug:   strings.ToLower(slug),
			ClubId: clubId,
		}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique slug")
	}

	if !applied {
		return club.ErrClubSlugNotUnique
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) GetAccountClubsCountOperator(ctx context.Context, accountId string) (int, error) {
	return r.getAccountClubsCount(ctx, accountId)
}

func (r ClubCassandraElasticsearchRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	del, err := r.hasNonTerminatedClubs(ctx, accountId)

	if err != nil {
		return err
	}

	if del {
		return domainerror.NewValidation("cannot delete account data")
	}

	return r.deleteAccountClubMemberships(ctx, accountId)
}

func (r ClubCassandraElasticsearchRepository) hasNonTerminatedClubs(ctx context.Context, accountId string) (bool, error) {

	var clubsData []accountClubs

	if err := accountClubsTable.
		SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubs{
			AccountId: accountId,
		}).
		SelectRelease(&clubsData); err != nil {
		return false, errors.Wrap(support.NewGocqlError(err), "failed to get account clubs by account terminated")
	}

	hasActiveClubs := false

	for _, c := range clubsData {
		clb, err := r.getClubById(ctx, c.ClubId)

		if err != nil {
			return false, err
		}

		if !clb.Terminated {
			hasActiveClubs = true
			break
		}
	}

	return hasActiveClubs, nil
}

func (r ClubCassandraElasticsearchRepository) HasNonTerminatedClubs(ctx context.Context, requester *principal.Principal, accountId string) (bool, error) {

	if requester != nil {
		if !requester.IsStaff() {
			if err := requester.BelongsToAccount(accountId); err != nil {
				return false, err
			}
		}
	}

	return r.hasNonTerminatedClubs(ctx, accountId)
}
