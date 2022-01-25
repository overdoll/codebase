package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"overdoll/applications/stella/internal/domain/club"
	"strconv"
	"time"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type clubDocument struct {
	Id                  string            `json:"id"`
	Slug                string            `json:"slug"`
	SlugAliases         []string          `json:"slug_aliases"`
	ThumbnailResourceId string            `json:"thumbnail_resource_id"`
	Name                map[string]string `json:"name"`
	CreatedAt           string            `json:"created_at"`
	MembersCount        int               `json:"members_count"`
	OwnerAccountId      string            `json:"owner_account_id"`
	Suspended           bool              `json:"suspended"`
	SuspendedUntil      *time.Time        `json:"suspended_until"`
}

const clubsIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"slug_aliases": {
		"type": "keyword"
	},
	"thumbnail_resource_id": {
		"type": "keyword"
	},
	"name": ` + localization.ESIndex + `
    "members_count": {
		"type": "integer"
	},
    "owner_account_id": {
		"type": "keyword"
	},
    "suspended": {
		"type": "bool"
	},
    "suspended_until": {
		"type": "date"
	},
	"created_at": {
		"type": "date"
	}
}
`

const clubsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties":` + clubsIndexProperties + `
	}
}`

const ClubsIndexName = "clubs"

type ClubIndexElasticSearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewClubIndexElasticSearchRepository(client *elastic.Client, session gocqlx.Session) ClubIndexElasticSearchRepository {
	return ClubIndexElasticSearchRepository{client: client, session: session}
}

func marshalClubToDocument(cat *club.Club) (*clubDocument, error) {

	parse, err := ksuid.Parse(cat.ID())

	if err != nil {
		return nil, err
	}

	return &clubDocument{
		Id:                  cat.ID(),
		Slug:                cat.Slug(),
		SlugAliases:         cat.SlugAliases(),
		ThumbnailResourceId: cat.ThumbnailResourceId(),
		Name:                localization.MarshalTranslationToDatabase(cat.Name()),
		CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
		MembersCount:        cat.MembersCount(),
		OwnerAccountId:      cat.OwnerAccountId(),
		Suspended:           cat.Suspended(),
		SuspendedUntil:      cat.SuspendedUntil(),
	}, nil
}

func (r ClubIndexElasticSearchRepository) IndexClub(ctx context.Context, club *club.Club) error {

	clb, err := marshalClubToDocument(club)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(ClubsIndexName).
		Id(clb.Id).
		BodyJson(*clb).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index club: %v", err)
	}

	return nil
}

func (r ClubIndexElasticSearchRepository) SearchClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *club.Filters) ([]*club.Club, error) {

	builder := r.client.Search().
		Index(ClubsIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	var sortingColumn string
	var sortingAscending bool

	if filter.SortBy() == club.PopularSort {
		sortingColumn = "members_count"
		sortingAscending = false
	}

	if err := cursor.BuildElasticsearch(builder, sortingColumn, "id", sortingAscending); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	query.Filter(elastic.NewTermQuery("suspended", filter.Suspended()))

	if filter.OwnerAccountId() != nil {
		query.Filter(elastic.NewTermQuery("owner_account_id", *filter.OwnerAccountId()))
	}

	if filter.Search() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(*filter.Search(), localization.GetESSearchFields("name")...).
				Type("best_fields"),
		)
	}

	if len(filter.Slugs()) > 0 {
		for _, id := range filter.Slugs() {
			query.Filter(elastic.NewTermQuery("slug", id))
		}
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed search clubs: %v", err)
	}

	var brands []*club.Club

	for _, hit := range response.Hits.Hits {

		var bd clubDocument

		err := json.Unmarshal(hit.Source, &bd)

		if err != nil {
			return nil, fmt.Errorf("failed search clubs - unmarshal: %v", err)
		}

		newBrand := club.UnmarshalClubFromDatabase(bd.Id, bd.Slug, bd.SlugAliases, bd.Name, bd.ThumbnailResourceId, bd.MembersCount, bd.OwnerAccountId, bd.Suspended, bd.SuspendedUntil)
		newBrand.Node = paging.NewNode(hit.Sort)

		brands = append(brands, newBrand)
	}

	return brands, nil
}

func (r ClubIndexElasticSearchRepository) IndexAllClubs(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, clubTable, func(iter *gocqlx.Iterx) error {

		var m clubs

		for iter.StructScan(&m) {

			parse, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			doc := clubDocument{
				Id:                  m.Id,
				Slug:                m.Slug,
				SlugAliases:         m.SlugAliases,
				ThumbnailResourceId: m.ThumbnailResourceId,
				Name:                m.Name,
				OwnerAccountId:      m.OwnerAccountId,
				CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
				Suspended:           m.Suspended,
				SuspendedUntil:      m.SuspendedUntil,
			}

			_, err = r.client.
				Index().
				Index(ClubsIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index brands: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r ClubIndexElasticSearchRepository) DeleteClubsIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(ClubsIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(ClubsIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(ClubsIndexName).BodyString(clubsIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
