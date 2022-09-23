package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/loader/internal/domain/media_storage"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/media"
	"overdoll/libraries/support"
)

var storageTable = table.New(table.Metadata{
	Name: "media_storage",
	Columns: []string{
		"linked_id",
		"id",
		"data",
	},
	PartKey: []string{"linked_id"},
	SortKey: []string{"id"},
})

type mediaStorage struct {
	LinkedId string  `db:"linked_id"`
	Id       string  `db:"id"`
	Data     *string `db:"data"`
}

var resourcesTable = table.New(table.Metadata{
	Name: "resources",
	Columns: []string{
		"item_id",
		"resource_id",
		"type",
		"is_private",
		"mime_types",
		"processed",
		"processed_id",
		"video_duration",
		"video_thumbnail",
		"video_thumbnail_mime_type",
		"width",
		"height",
		"preview",
		"resource_token",
		"failed",
		"copied_from_id",
		"video_no_audio",
	},
	PartKey: []string{"item_id"},
	SortKey: []string{"resource_id"},
})

type resources struct {
	ItemId      string   `db:"item_id"`
	ResourceId  string   `db:"resource_id"`
	Type        int      `db:"type"`
	MimeTypes   []string `db:"mime_types"`
	Processed   bool     `db:"processed"`
	ProcessedId string   `db:"processed_id"`

	IsPrivate bool `db:"is_private"`

	VideoDuration          int    `db:"video_duration"`
	VideoThumbnail         string `db:"video_thumbnail"`
	VideoThumbnailMimeType string `db:"video_thumbnail_mime_type"`
	Width                  int    `db:"width"`
	Height                 int    `db:"height"`
	Preview                string `db:"preview"`
	ResourceToken          string `db:"resource_token"`
	Failed                 bool   `db:"failed"`
	CopiedFromId           string `db:"copied_from_id"`
	VideoNoAudio           bool   `db:"video_no_audio"`
}

type MediaStorageCassandraRepository struct {
	session gocqlx.Session
}

func NewMediaStorageCassandraRepository(session gocqlx.Session) MediaStorageCassandraRepository {
	return MediaStorageCassandraRepository{session: session}
}

func (r MediaStorageCassandraRepository) GetLegacyResourcesByItemId(ctx context.Context, itemId string) ([]*media_storage.LegacyResource, error) {

	var storages []resources

	if err := r.session.
		Query(resourcesTable.SelectBuilder().Where(qb.Eq("item_id")).ToCql()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(resources{ItemId: itemId}).
		SelectRelease(&storages); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get resources")
	}

	var results []*media_storage.LegacyResource

	for _, store := range storages {

		unmarshalled, err := media_storage.UnmarshalLegacyResourceFromDatabase(store.ResourceId, store.ItemId, store.ResourceToken, store.CopiedFromId)

		if err != nil {
			return nil, err
		}

		results = append(results, unmarshalled)
	}

	return results, nil
}

func (r MediaStorageCassandraRepository) GetSingleMediaByLinkAndId(ctx context.Context, link *media.Link, id string) (*media.Media, error) {

	var storage mediaStorage

	if err := r.session.
		Query(storageTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(mediaStorage{LinkedId: link.LinkedId(), Id: id}).
		GetRelease(&storage); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("media", id)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get media by id")
	}

	return media.UnmarshalMediaFromDatabase(ctx, storage.Data)
}

func (r MediaStorageCassandraRepository) GetMediaByLink(ctx context.Context, link *media.Link) ([]*media.Media, error) {

	var storages []mediaStorage

	if err := r.session.
		Query(storageTable.SelectBuilder().Where(qb.Eq("linked_id")).ToCql()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(mediaStorage{LinkedId: link.LinkedId()}).
		SelectRelease(&storages); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get media by link")
	}

	var results []*media.Media

	for _, store := range storages {
		unmarshalled, err := media.UnmarshalMediaFromDatabase(ctx, store.Data)

		if err != nil {
			return nil, err
		}

		results = append(results, unmarshalled)
	}

	return results, nil
}

func (r MediaStorageCassandraRepository) StoreMedia(ctx context.Context, m *media.Media) error {

	result, err := media.MarshalMediaToDatabase(m)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(storageTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(mediaStorage{LinkedId: m.LinkedId(), Id: m.ID(), Data: result}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to store media")
	}

	return nil
}
