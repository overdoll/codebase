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
		ItemId:      r.ItemId(),
		ResourceId:  r.ID(),
		Type:        typ,
		MimeTypes:   r.MimeTypes(),
		Processed:   r.IsProcessed(),
		ProcessedId: r.ProcessedId(),
	}
}

func (r ResourceCassandraRepository) CreateResources(ctx context.Context, res []*resource.Resource) error {

	var b []*resources

	for _, i := range res {
		b = append(b, marshalResourceToDatabase(i))
	}

	insertResources := r.session.
		Query(resourcesTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(b)

	if err := insertResources.ExecRelease(); err != nil {
		return fmt.Errorf("failed to insert new resources: %v", err)
	}

	return nil
}

func (r ResourceCassandraRepository) GetResourcesByIds(ctx context.Context, itemId string, resourceIds []string) ([]*resource.Resource, error) {

	queryResources := resourcesTable.
		SelectBuilder().
		Where(qb.In("resource_id")).
		Query(r.session).
		BindMap(map[string]interface{}{
			"item_id":     itemId,
			"resource_id": resourceIds,
		})

	var b []resources

	if err := queryResources.Select(&b); err != nil {
		return nil, fmt.Errorf("failed to get resources by ids: %v", err)
	}

	var resourcesResult []*resource.Resource

	for _, i := range b {
		resourcesResult = append(resourcesResult, resource.UnmarshalResourceFromDatabase(i.ItemId, i.ResourceId, i.Type, i.MimeTypes, i.Processed, i.ProcessedId))
	}

	return resourcesResult, nil
}

func (r ResourceCassandraRepository) GetResourceById(ctx context.Context, itemId string, resourceId string) (*resource.Resource, error) {

	queryResources := r.session.
		Query(resourcesTable.Get()).
		Consistency(gocql.One).
		BindStruct(resources{ItemId: itemId, ResourceId: resourceId})

	var b resources

	if err := queryResources.Get(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, resource.ErrResourceNotFound
		}

		return nil, fmt.Errorf("failed to get resource by id: %v", err)
	}

	return resource.UnmarshalResourceFromDatabase(b.ItemId, b.ResourceId, b.Type, b.MimeTypes, b.Processed, b.ProcessedId), nil
}

func (r ResourceCassandraRepository) UpdateResources(ctx context.Context, resources []*resource.Resource) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, r := range resources {
		// update all resources
		stmt, _ := resourcesTable.Update("mime_types", "processed", "processed_id")
		batch.Query(stmt, r.ItemId(), r.ID(), r.MimeTypes(), r.IsProcessed(), r.ProcessedId())
	}

	// execute batch.
	return r.session.ExecuteBatch(batch)
}

func (r ResourceCassandraRepository) DeleteResources(ctx context.Context, resources []*resource.Resource) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, r := range resources {
		// remove selected resources
		stmt, _ := resourcesTable.Delete()
		batch.Query(stmt, r.ItemId(), r.ID())
	}

	// execute batch.
	return r.session.ExecuteBatch(batch)
}
