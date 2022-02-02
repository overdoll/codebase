package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/loader/internal/domain/resource"
)

var resourcesTable = table.New(table.Metadata{
	Name: "resources",
	Columns: []string{
		"item_id",
		"resource_id",
		"type",
		"mime_types",
		"processed",
		"processed_id",
		"video_duration",
		"video_thumbnail",
		"video_thumbnail_mime_type",
		"width",
		"height",
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

	VideoDuration          int    `db:"video_duration"`
	VideoThumbnail         string `db:"video_thumbnail"`
	VideoThumbnailMimeType string `db:"video_thumbnail_mime_type"`
	Width                  int    `db:"width"`
	Height                 int    `db:"height"`
}

type ResourceCassandraRepository struct {
	session gocqlx.Session
}

func NewResourceCassandraRepository(session gocqlx.Session) ResourceCassandraRepository {
	return ResourceCassandraRepository{session: session}
}

func marshalResourceToDatabase(r *resource.Resource) *resources {

	var typ int

	if r.IsVideo() {
		typ = 2
	}

	if r.IsImage() {
		typ = 1
	}

	return &resources{
		ItemId:                 r.ItemId(),
		ResourceId:             r.ID(),
		Type:                   typ,
		MimeTypes:              r.MimeTypes(),
		Processed:              r.IsProcessed(),
		ProcessedId:            r.ProcessedId(),
		VideoThumbnailMimeType: r.VideoThumbnailMimeType(),
		VideoThumbnail:         r.VideoThumbnail(),
		Width:                  r.Width(),
		Height:                 r.Height(),
		VideoDuration:          r.VideoDuration(),
	}
}

func (r ResourceCassandraRepository) CreateResources(ctx context.Context, res []*resource.Resource) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, r := range res {
		// remove selected resources
		stmt, _ := resourcesTable.Insert()

		marshalled := marshalResourceToDatabase(r)

		batch.Query(stmt,
			marshalled.ItemId,
			marshalled.ResourceId,
			marshalled.Type,
			marshalled.MimeTypes,
			marshalled.Processed,
			marshalled.ProcessedId,
			marshalled.VideoDuration,
			marshalled.VideoThumbnail,
			marshalled.VideoThumbnailMimeType,
			marshalled.Width,
			marshalled.Height,
		)
	}

	// execute batch.
	return r.session.ExecuteBatch(batch)
}

func (r ResourceCassandraRepository) GetResourcesByIds(ctx context.Context, itemId, resourceIds []string) ([]*resource.Resource, error) {

	var b []resources

	if err := qb.
		Select(resourcesTable.Name()).
		Where(qb.In("item_id")).
		Query(r.session).
		BindMap(map[string]interface{}{
			"item_id": itemId,
		}).
		Select(&b); err != nil {
		return nil, fmt.Errorf("failed to get resources by ids: %v", err)
	}

	var resourcesResult []*resource.Resource

	for _, i := range b {

		for _, target := range resourceIds {
			if target == i.ResourceId {
				resourcesResult = append(resourcesResult, resource.UnmarshalResourceFromDatabase(
					i.ItemId,
					i.ResourceId,
					i.Type,
					i.MimeTypes,
					i.Processed,
					i.ProcessedId,
					i.VideoDuration,
					i.VideoThumbnail,
					i.VideoThumbnailMimeType,
					i.Width,
					i.Height,
				))
				break
			}
		}
	}

	return resourcesResult, nil
}

func (r ResourceCassandraRepository) GetResourceById(ctx context.Context, itemId string, resourceId string) (*resource.Resource, error) {

	var i resources

	if err := r.session.
		Query(resourcesTable.Get()).
		Consistency(gocql.One).
		BindStruct(resources{ItemId: itemId, ResourceId: resourceId}).
		Get(&i); err != nil {

		if err == gocql.ErrNotFound {
			return nil, resource.ErrResourceNotFound
		}

		return nil, fmt.Errorf("failed to get resource by id: %v", err)
	}

	return resource.UnmarshalResourceFromDatabase(
		i.ItemId,
		i.ResourceId,
		i.Type,
		i.MimeTypes,
		i.Processed,
		i.ProcessedId,
		i.VideoDuration,
		i.VideoThumbnail,
		i.VideoThumbnailMimeType,
		i.Width,
		i.Height,
	), nil
}

func (r ResourceCassandraRepository) UpdateResources(ctx context.Context, res []*resource.Resource) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, r := range res {
		stmt, _ := resourcesTable.Update(
			"mime_types",
			"processed",
			"processed_id",
			"video_duration",
			"video_thumbnail",
			"video_thumbnail_mime_type",
			"width",
			"height",
		)
		batch.Query(stmt, r.MimeTypes(), r.IsProcessed(), r.ProcessedId(), r.VideoDuration(), r.VideoThumbnail(), r.VideoThumbnailMimeType(), r.Width(), r.Height(), r.ItemId(), r.ID())
	}

	// execute batch.
	return r.session.ExecuteBatch(batch)
}

func (r ResourceCassandraRepository) DeleteResources(ctx context.Context, resources []*resource.Resource) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, r := range resources {
		// remove selected resources
		stmt, _ := qb.Delete(resourcesTable.Name()).Where(qb.Eq("item_id")).ToCql()
		batch.Query(stmt, r.ItemId())
	}

	// execute batch.
	return r.session.ExecuteBatch(batch)
}
