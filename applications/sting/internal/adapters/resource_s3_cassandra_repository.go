package adapters

import (
	"bytes"
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"net/http"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"overdoll/applications/sting/internal/domain/resource"
)

const (
	StaticBucket  = "overdoll-assets"
	UploadsBucket = "overdoll-uploads"
)

var resourcesTable = table.New(table.Metadata{
	Name: "resources",
	Columns: []string{
		"item_id",
		"resource_id",
		"type",
		"mime_types",
		"processed",
		"processed_prefix",
		"processed_id",
	},
	PartKey: []string{"item_id"},
	SortKey: []string{"resource_id"},
})

type resources struct {
	ItemId          string   `db:"item_id"`
	ResourceId      string   `db:"resource_id"`
	Type            int      `db:"type"`
	MimeTypes       []string `db:"mime_types"`
	Processed       bool     `db:"processed"`
	ProcessedPrefix string   `db:"processed_prefix"`
	ProcessedId     string   `db:"processed_id"`
}

type ResourceS3CassandraRepository struct {
	session   *session.Session
	dbSession gocqlx.Session
}

func NewResourceS3CassandraRepository(session *session.Session, dbSession gocqlx.Session) ResourceS3CassandraRepository {
	return ResourceS3CassandraRepository{session: session, dbSession: dbSession}
}

func marshalResourceToDatabase(r *resource.Resource) *resources {

	var typ int

	if r.IsVideo() {
		typ = 1
	}

	if r.IsImage() {
		typ = 0
	}

	return &resources{
		ItemId:          r.ItemId(),
		ResourceId:      r.ID(),
		Type:            typ,
		MimeTypes:       nil,
		Processed:       r.IsProcessed(),
		ProcessedPrefix: r.ProcessedPrefix(),
		ProcessedId:     r.ProcessedId(),
	}
}

func (r ResourceS3CassandraRepository) createResources(ctx context.Context, res []*resource.Resource) error {

	var b []*resources

	for _, i := range res {
		b = append(b, marshalResourceToDatabase(i))
	}

	insertResources := r.dbSession.
		Query(resourcesTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(b)

	if err := insertResources.ExecRelease(); err != nil {
		return fmt.Errorf("failed to insert new resources: %v", err)
	}

	return nil
}

func (r ResourceS3CassandraRepository) updateResources(ctx context.Context, resources []*resource.Resource) error {
	return nil
}

func (r ResourceS3CassandraRepository) GetResourcesByIds(ctx context.Context, itemId string, resourceIds []string) ([]*resource.Resource, error) {

	queryResources := resourcesTable.
		SelectBuilder().
		Where(qb.In("resource_id")).
		Query(r.dbSession).
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
		resourcesResult = append(resourcesResult, resource.UnmarshalResourceFromDatabase(i.ItemId, i.ResourceId, i.Type, i.MimeTypes, i.Processed, i.ProcessedPrefix, i.ProcessedId))
	}

	return resourcesResult, nil
}

func (r ResourceS3CassandraRepository) GetResourceById(ctx context.Context, itemId string, resourceId string) (*resource.Resource, error) {

	queryResources := r.dbSession.
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

	return resource.UnmarshalResourceFromDatabase(b.ItemId, b.ResourceId, b.Type, b.MimeTypes, b.Processed, b.ProcessedPrefix, b.ProcessedId), nil
}

func (r ResourceS3CassandraRepository) CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, uploadIds []string) ([]*resource.Resource, error) {

	var newUploadIds []string

	for _, uploadId := range uploadIds {
		// fix upload IDs
		newUploadIds = append(newUploadIds, getUploadIdWithoutExtension(uploadId))
	}

	// first, get all resources
	resourcesFromIds, err := r.GetResourcesByIds(ctx, itemId, newUploadIds)

	if err != nil {
		return nil, err
	}

	// now, get the resources that were not found, create the object and then create the record
	var idsNotFound []string

	for _, uploadId := range newUploadIds {

		foundResource := false

		for _, res := range resourcesFromIds {
			if res.ID() == uploadId {
				foundResource = true
				break
			}
		}

		if !foundResource {
			idsNotFound = append(idsNotFound, uploadId)
		}
	}

	var newResources []*resource.Resource

	// found at least 1 resource that was not created
	if len(idsNotFound) > 0 {
		// get the resources from our remote source - grabbing information like file info
		newResources, err = r.getResourcesRemote(ctx, itemId, idsNotFound)

		if err != nil {
			return nil, err
		}

		// now, we add a database entry to be used later
		if err := r.createResources(ctx, newResources); err != nil {
			return nil, err
		}
	}

	// merge 2 arrays: new resources + current resources
	return append(resourcesFromIds, newResources...), nil
}

func getUploadIdWithoutExtension(uploadId string) string {
	// strip any urls or extensions
	splitPath := strings.Split(uploadId, "/")
	idWithOrWithoutExtension := splitPath[len(strings.Split(uploadId, "/"))-1]

	return strings.Split(idWithOrWithoutExtension, ".")[0]
}

func (r ResourceS3CassandraRepository) DeleteResources(ctx context.Context, resources []*resource.Resource) error {

	s3Client := s3.New(r.session)

	for _, res := range resources {

		if !res.IsProcessed() {
			continue
		}

		// delete object
		_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{Bucket: aws.String(StaticBucket), Key: aws.String(res.Url())})

		if err != nil {
			return fmt.Errorf("unable to delete file %v", err)
		}
	}
	return nil
}

// createResourcesRemote will create resources from a list of IDs passed
// uploads are stored in uploads bucket - we HeadObject each file to determine the file format
func (r ResourceS3CassandraRepository) getResourcesRemote(ctx context.Context, itemId string, uploads []string) ([]*resource.Resource, error) {

	var resources []*resource.Resource

	s3Client := s3.New(r.session)

	for _, uploadId := range uploads {

		idWithoutExtension := getUploadIdWithoutExtension(uploadId)

		fileId := strings.Split(idWithoutExtension, "+")[0]

		resp, err := s3Client.HeadObject(&s3.HeadObjectInput{
			Bucket: aws.String(UploadsBucket),
			Key:    aws.String(fileId),
		})

		if err != nil {
			return nil, fmt.Errorf("failed to head file: %v", err)
		}

		// create a new resource - our url + the content type that came back from S3

		fileType := resp.Metadata["Filetype"]

		newResource, err := resource.NewResource(itemId, idWithoutExtension, *fileType)

		if err != nil {
			return nil, err
		}

		resources = append(resources, newResource)
	}

	return resources, nil
}

func (r ResourceS3CassandraRepository) ProcessResourcesFromIds(ctx context.Context, prefix, itemId string, resourceIds []string) error {

	// first, get all resources
	resourcesFromIds, err := r.GetResourcesByIds(ctx, itemId, resourceIds)

	if err != nil {
		return err
	}

	var resourcesNotProcessed []*resource.Resource

	// gather all resources that are processed = false
	for _, res := range resourcesFromIds {
		if !res.IsProcessed() {
			resourcesNotProcessed = append(resourcesNotProcessed, res)
		}
	}

	// process resources
	if err := r.processResources(ctx, prefix, resourcesNotProcessed); err != nil {
		return err
	}

	// update database entries for resources
	if err := r.updateResources(ctx, resourcesNotProcessed); err != nil {
		return err
	}

	return nil
}

// ProcessResources - do filetype validation on each resource, and add to to the static bucket, with a specified prefix
// expects that the resource that was passed into the method is a resource that originates in UploadsBucket, so in our case
// it was uploaded through TUS
func (r ResourceS3CassandraRepository) processResources(ctx context.Context, prefix string, resources []*resource.Resource) error {
	downloader := s3manager.NewDownloader(r.session)
	s3Client := s3.New(r.session)

	for _, target := range resources {

		// if target is processed, skip for now
		if target.IsProcessed() {
			continue
		}

		fileId := strings.Split(target.ID(), "+")[0]

		file, err := os.Create(fileId)

		if err != nil {
			return fmt.Errorf("failed to create file: %v", err)
		}

		// Download our file from the private bucket
		_, err = downloader.Download(file,
			&s3.GetObjectInput{
				Bucket: aws.String(UploadsBucket),
				Key:    aws.String(fileId),
			},
		)

		if err != nil {
			return fmt.Errorf("failed to download file: %v", err)
		}

		// process resource, by passing a prefix (where the file should be going) and the file that needs to be processed
		targetsToMove, err := target.ProcessResource(prefix, file)

		if err != nil {
			return fmt.Errorf("failed to process resource: %v", err)
		}

		// go through each new file from the filesystem (contained by resource) and upload to s3
		for _, target := range targetsToMove {

			file, err := os.Open(target.OsFileLocation())

			if err != nil {
				return err
			}

			fileInfo, _ := file.Stat()
			var size = fileInfo.Size()
			buffer := make([]byte, size)
			file.Read(buffer)

			// new file that was created
			_, err = s3Client.PutObject(&s3.PutObjectInput{
				Bucket:        aws.String(StaticBucket),
				Key:           aws.String(target.RemoteUrlTarget()),
				Body:          bytes.NewReader(buffer),
				ContentLength: aws.Int64(size),
				ContentType:   aws.String(http.DetectContentType(buffer)),
			})

			if err != nil {
				return fmt.Errorf("failed to put file: %v", err)
			}

			// wait until file is available in private bucket

			if err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{
				Bucket: aws.String(StaticBucket),
				Key:    aws.String(target.RemoteUrlTarget()),
			}); err != nil {
				return fmt.Errorf("failed to wait for file: %v", err)
			}

			// clean up file at the end to free up resources
			_ = file.Close()
			_ = os.Remove(target.OsFileLocation())
		}
	}

	return nil
}

// tusd composer for handling file uploads
func (r ResourceS3CassandraRepository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
	s3Client := s3.New(r.session)

	store := s3store.New(UploadsBucket, s3Client)

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	return composer, nil
}
