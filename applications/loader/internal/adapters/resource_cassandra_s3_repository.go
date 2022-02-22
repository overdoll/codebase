package adapters

import (
	"bytes"
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"net/http"
	"os"
	"overdoll/applications/loader/internal/domain/resource"
	"strings"
	"time"
)

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
}

type ResourceCassandraS3Repository struct {
	session         gocqlx.Session
	aws             *session.Session
	resourcesSigner *sign.URLSigner
}

func NewResourceCassandraS3Repository(session gocqlx.Session, aws *session.Session, resourcesSigner *sign.URLSigner) ResourceCassandraS3Repository {
	return ResourceCassandraS3Repository{session: session, aws: aws, resourcesSigner: resourcesSigner}
}

func unmarshalResourceFromDatabase(resourcesSigner *sign.URLSigner, a *session.Session, i resources) (*resource.Resource, error) {

	s3Client := s3.New(a)

	bucket := os.Getenv("UPLOADS_BUCKET")

	if i.Processed {
		bucket = os.Getenv("RESOURCES_BUCKET")
	}

	if i.Processed && i.IsPrivate {
		bucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
	}

	var urls []*resource.Url

	for _, mime := range i.MimeTypes {

		key := "/" + i.ItemId

		extension := ""

		format, err := resource.ExtensionByType(mime)

		if err == nil && i.Processed {
			extension = format
		}

		if i.Processed {
			key = "/" + i.ItemId + "/" + i.ProcessedId + extension
		}

		var url string

		if i.IsPrivate {

			if i.Processed {
				signedURL, err := resourcesSigner.Sign(os.Getenv("PRIVATE_RESOURCES_URL")+key, time.Now().Add(15*time.Minute))

				if err != nil {
					return nil, err
				}

				url = signedURL
			} else {

				req, _ := s3Client.GetObjectRequest(&s3.GetObjectInput{
					Bucket: aws.String(bucket),
					Key:    aws.String(key),
				})

				urlStr, err := req.Presign(15 * time.Minute)

				if err != nil {
					return nil, err
				}

				url = urlStr
			}

		} else {

			domain := os.Getenv("UPLOADS_URL")

			if i.Processed {
				domain = os.Getenv("RESOURCES_URL")
			}

			url = domain + key
		}

		urls = append(urls, resource.UnmarshalUrlFromDatabase(
			url,
			mime,
		))
	}

	var videoThumbnail *resource.Url

	if i.VideoThumbnail != "" {

		format, _ := resource.ExtensionByType(i.VideoThumbnailMimeType)

		signedURL, err := resourcesSigner.Sign(bucket+"/"+i.ItemId+"/"+i.VideoThumbnail+format, time.Now().Add(15*time.Minute))

		if err != nil {
			return nil, err
		}

		if err != nil {
			return nil, err
		}

		videoThumbnail = resource.UnmarshalUrlFromDatabase(
			signedURL,
			i.VideoThumbnailMimeType,
		)
	}

	return resource.UnmarshalResourceFromDatabase(
		i.ItemId,
		i.ResourceId,
		i.Type,
		i.IsPrivate,
		i.MimeTypes,
		i.Processed,
		i.ProcessedId,
		i.VideoDuration,
		i.VideoThumbnail,
		i.VideoThumbnailMimeType,
		i.Width,
		i.Height,
		urls,
		videoThumbnail,
	), nil
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
		IsPrivate:              r.IsPrivate(),
		Processed:              r.IsProcessed(),
		ProcessedId:            r.ProcessedId(),
		VideoThumbnailMimeType: r.VideoThumbnailMimeType(),
		VideoThumbnail:         r.VideoThumbnail(),
		Width:                  r.Width(),
		Height:                 r.Height(),
		VideoDuration:          r.VideoDuration(),
	}
}

func (r ResourceCassandraS3Repository) createResources(ctx context.Context, res []*resource.Resource) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, r := range res {
		// remove selected resources
		stmt, _ := resourcesTable.Insert()

		marshalled := marshalResourceToDatabase(r)

		batch.Query(stmt,
			marshalled.ItemId,
			marshalled.ResourceId,
			marshalled.Type,
			marshalled.IsPrivate,
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

func (r ResourceCassandraS3Repository) GetResourcesByIds(ctx context.Context, itemId, resourceIds []string) ([]*resource.Resource, error) {

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

				result, err := unmarshalResourceFromDatabase(r.resourcesSigner, r.aws, i)

				if err != nil {
					return nil, err
				}

				resourcesResult = append(resourcesResult, result)
				break
			}
		}
	}

	return resourcesResult, nil
}

func (r ResourceCassandraS3Repository) GetResourceById(ctx context.Context, itemId string, resourceId string) (*resource.Resource, error) {

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

	return unmarshalResourceFromDatabase(r.resourcesSigner, r.aws, i)
}

func (r ResourceCassandraS3Repository) updateResources(ctx context.Context, res []*resource.Resource) error {

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

func (r ResourceCassandraS3Repository) DeleteResources(ctx context.Context, resources []*resource.Resource) error {

	s3Client := s3.New(r.aws)

	for _, res := range resources {

		if !res.IsProcessed() {
			continue
		}

		// delete object
		_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{
			Bucket: aws.String(os.Getenv("RESOURCES_BUCKET")),
			Key:    aws.String("/" + res.ItemId() + "/" + res.ID()),
		})

		if err != nil {
			return fmt.Errorf("unable to delete file %v", err)
		}
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	for _, r := range resources {
		// remove selected resources
		stmt, _ := qb.Delete(resourcesTable.Name()).Where(qb.Eq("item_id")).ToCql()
		batch.Query(stmt, r.ItemId())
	}

	// execute batch.
	return r.session.ExecuteBatch(batch)
}

// GetAndCreateResources will create resources from a list of IDs passed
// uploads are stored in uploads bucket - we HeadObject each file to determine the file format
func (r ResourceCassandraS3Repository) GetAndCreateResources(ctx context.Context, itemId string, uploads []string, isPrivate bool) ([]*resource.Resource, error) {

	var resources []*resource.Resource

	s3Client := s3.New(r.aws)

	for _, uploadId := range uploads {

		fileId := strings.Split(uploadId, "+")[0]

		resp, err := s3Client.HeadObject(&s3.HeadObjectInput{
			Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
			Key:    aws.String(fileId),
		})

		if err != nil {
			return nil, fmt.Errorf("failed to head file: %v", err)
		}

		// create a new resource - our url + the content type that came back from S3

		fileType := resp.Metadata["Filetype"]

		var url string

		if isPrivate {
			req, _ := s3Client.GetObjectRequest(&s3.GetObjectInput{
				Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
				Key:    aws.String("/" + uploadId),
			})

			urlStr, err := req.Presign(15 * time.Minute)

			if err != nil {
				return nil, err
			}

			url = urlStr

		} else {
			url = os.Getenv("UPLOADS_URL") + "/" + uploadId
		}

		newResource, err := resource.NewResource(
			itemId,
			uploadId,
			*fileType,
			[]*resource.Url{
				resource.UnmarshalUrlFromDatabase(
					url,
					*fileType,
				),
			},
			isPrivate,
		)

		if err != nil {
			return nil, err
		}

		resources = append(resources, newResource)
	}

	if err := r.createResources(ctx, resources); err != nil {
		return nil, err
	}

	return resources, nil
}

// UploadProcessedResources - do filetype validation on each resource, and add to to the static bucket, with a specified prefix
// expects that the resource that was passed into the method is a resource that originates in UploadsBucket, so in our case
// it was uploaded through TUS
func (r ResourceCassandraS3Repository) UploadProcessedResources(ctx context.Context, resources []*resource.Resource) error {
	downloader := s3manager.NewDownloader(r.aws)
	s3Client := s3.New(r.aws)

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
				Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
				Key:    aws.String(fileId),
			},
		)

		if err != nil {
			return fmt.Errorf("failed to download file: %v", err)
		}

		// process resource, by passing a prefix (where the file should be going) and the file that needs to be processed
		targetsToMove, err := target.ProcessResource(file)

		if err != nil {
			return fmt.Errorf("failed to process resource: %v", err)
		}

		// go through each new file from the filesystem (contained by resource) and upload to s3
		for _, moveTarget := range targetsToMove {

			file, err := os.Open(moveTarget.OsFileLocation())

			if err != nil {
				return err
			}

			fileInfo, _ := file.Stat()
			var size = fileInfo.Size()
			buffer := make([]byte, size)
			file.Read(buffer)

			bucket := os.Getenv("RESOURCES_BUCKET")

			if target.IsPrivate() {
				bucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
			}

			// new file that was created
			_, err = s3Client.PutObject(&s3.PutObjectInput{
				Bucket:        aws.String(bucket),
				Key:           aws.String(moveTarget.RemoteUrlTarget()),
				Body:          bytes.NewReader(buffer),
				ContentLength: aws.Int64(size),
				ContentType:   aws.String(http.DetectContentType(buffer)),
			})

			if err != nil {
				return fmt.Errorf("failed to put file: %v", err)
			}

			// wait until file is available in private bucket

			if err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{
				Bucket: aws.String(bucket),
				Key:    aws.String(moveTarget.RemoteUrlTarget()),
			}); err != nil {
				return fmt.Errorf("failed to wait for file: %v", err)
			}

			// clean up file at the end to free up resources
			_ = file.Close()
			_ = os.Remove(moveTarget.OsFileLocation())
		}
	}

	if err := r.updateResources(ctx, resources); err != nil {
		return err
	}

	return nil
}

func (r ResourceCassandraS3Repository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
	s3Client := s3.New(r.aws)

	store := s3store.New(os.Getenv("UPLOADS_BUCKET"), s3Client)

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	return composer, nil
}
