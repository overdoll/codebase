package adapters

import (
	"bytes"
	"context"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
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
	"io"
	"net/http"
	"os"
	"overdoll/applications/loader/internal/domain/resource"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/support"
	"path/filepath"
	"strings"
	"sync"
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
		"preview",
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
}

type ResourceCassandraS3Repository struct {
	session         gocqlx.Session
	aws             *session.Session
	resourcesSigner *sign.URLSigner
}

func NewResourceCassandraS3Repository(session gocqlx.Session, aws *session.Session, resourcesSigner *sign.URLSigner) ResourceCassandraS3Repository {
	return ResourceCassandraS3Repository{session: session, aws: aws, resourcesSigner: resourcesSigner}
}
func unmarshalResourceFromDatabase(i resources) *resource.Resource {
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
		nil,
		nil,
		i.Preview,
	)
}

func unmarshalResourceFromDatabaseWithSignedUrls(resourcesSigner *sign.URLSigner, a *session.Session, i resources) (*resource.Resource, error) {

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

		key := "/" + i.ResourceId

		extension := ""

		format, err := resource.ExtensionByType(mime)

		if err == nil && i.Processed {
			extension = format
		}

		if i.Processed {
			key = "/" + i.ItemId + "/" + i.ProcessedId + extension
		}

		var url string

		if i.IsPrivate && i.Processed {

			signedURL, err := resourcesSigner.Sign(os.Getenv("PRIVATE_RESOURCES_URL")+key, time.Now().Add(15*time.Minute))

			if err != nil {
				return nil, errors.Wrap(err, "could not generate signed url")
			}

			url = signedURL

		} else if !i.IsPrivate && !i.Processed {

			req, _ := s3Client.GetObjectRequest(&s3.GetObjectInput{
				Bucket: aws.String(bucket),
				Key:    aws.String(key),
			})

			urlStr, err := req.Presign(15 * time.Minute)

			if err != nil {
				return nil, errors.Wrap(err, "could not generate signed url")
			}

			url = urlStr
		} else if !i.IsPrivate && i.Processed {

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

		if i.IsPrivate {

			signedURL, err := resourcesSigner.Sign(os.Getenv("PRIVATE_RESOURCES_URL")+"/"+i.ItemId+"/"+i.VideoThumbnail+format, time.Now().Add(15*time.Minute))

			if err != nil {
				return nil, errors.Wrap(err, "could not generate video thumbnail signed url")
			}

			videoThumbnail = resource.UnmarshalUrlFromDatabase(
				signedURL,
				i.VideoThumbnailMimeType,
			)
		} else {
			videoThumbnail = resource.UnmarshalUrlFromDatabase(
				os.Getenv("RESOURCES_URL")+"/"+i.ItemId+"/"+i.VideoThumbnail+format,
				i.VideoThumbnailMimeType,
			)
		}

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
		i.Preview,
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
		Preview:                r.Preview(),
	}
}

func (r ResourceCassandraS3Repository) createResources(ctx context.Context, res []*resource.Resource) error {

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	for _, r := range res {
		// remove selected resources
		stmt, names := resourcesTable.Insert()
		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			marshalResourceToDatabase(r),
		)
	}

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create resources")
	}

	return nil
}

// GetResourcesByIdsWithUrls - concurrently generate resource IDs with urls because RSA signing can be slow
func (r ResourceCassandraS3Repository) GetResourcesByIdsWithUrls(ctx context.Context, itemId, resourceIds []string) ([]*resource.Resource, error) {

	b, err := r.getResourcesByIds(ctx, itemId, resourceIds)

	if err != nil {
		return nil, err
	}

	var wg sync.WaitGroup

	wg.Add(len(b))

	errs := make(chan error)

	resourcesResult := make([]*resource.Resource, len(b))

	for i, z := range b {
		go func(index int, z resources) {
			defer wg.Done()
			result, err := unmarshalResourceFromDatabaseWithSignedUrls(r.resourcesSigner, r.aws, z)

			if err == nil {
				resourcesResult[index] = result
			} else {
				errs <- errors.Wrap(err, "error unmarshalling resource")
			}
		}(i, z)
	}

	go func() {
		wg.Wait()
		close(errs)
	}()

	// return the first error
	for err := range errs {
		if err != nil {
			return nil, err
		}
	}

	return resourcesResult, nil
}

func (r ResourceCassandraS3Repository) getResourcesByIds(ctx context.Context, itemId, resourceIds []string) ([]resources, error) {

	var b []resources

	if err := qb.
		Select(resourcesTable.Name()).
		Where(qb.In("item_id")).
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		BindMap(map[string]interface{}{
			"item_id": itemId,
		}).
		SelectRelease(&b); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get resources by ids")
	}

	var final []resources

	for _, i := range b {

		for _, target := range resourceIds {
			if target == i.ResourceId {
				final = append(final, i)
				break
			}
		}
	}

	return final, nil
}

func (r ResourceCassandraS3Repository) GetResourcesByIds(ctx context.Context, itemId, resourceIds []string) ([]*resource.Resource, error) {

	b, err := r.getResourcesByIds(ctx, itemId, resourceIds)

	if err != nil {
		return nil, err
	}

	var resourcesResult []*resource.Resource

	for _, i := range b {
		resourcesResult = append(resourcesResult, unmarshalResourceFromDatabase(i))
	}

	return resourcesResult, nil
}

func (r ResourceCassandraS3Repository) getResourceById(ctx context.Context, itemId string, resourceId string) (*resources, error) {

	var i resources

	if err := r.session.
		Query(resourcesTable.Get()).
		WithContext(ctx).
		Consistency(gocql.One).
		Idempotent(true).
		BindStruct(resources{ItemId: itemId, ResourceId: resourceId}).
		GetRelease(&i); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("resource", resourceId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get resource by id")
	}

	return &i, nil
}

func (r ResourceCassandraS3Repository) GetResourceById(ctx context.Context, itemId string, resourceId string) (*resource.Resource, error) {

	i, err := r.getResourceById(ctx, itemId, resourceId)

	if err != nil {
		return nil, err
	}

	return unmarshalResourceFromDatabase(*i), nil
}

func (r ResourceCassandraS3Repository) updateResources(ctx context.Context, res []*resource.Resource) error {

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	for _, r := range res {

		stmt, names := resourcesTable.Update(
			"mime_types",
			"processed",
			"processed_id",
			"video_duration",
			"video_thumbnail",
			"video_thumbnail_mime_type",
			"width",
			"height",
			"preview",
		)

		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			marshalResourceToDatabase(r),
		)
	}

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update resources")
	}

	return nil
}

func (r ResourceCassandraS3Repository) DeleteResources(ctx context.Context, resourceItems []*resource.Resource) error {

	s3Client := s3.New(r.aws)

	for _, target := range resourceItems {

		bucket := ""

		if target.IsProcessed() {
			bucket = os.Getenv("RESOURCES_BUCKET")

			if target.IsPrivate() {
				bucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
			}
		}

		for _, mime := range target.MimeTypes() {

			if target.IsProcessed() {

				format, _ := resource.ExtensionByType(mime)

				fileId := "/" + target.ItemId() + "/" + target.ProcessedId() + format

				// delete object from originating bucket
				_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{
					Bucket: aws.String(bucket),
					Key:    aws.String(fileId),
				})

				if err != nil {
					return errors.Wrap(err, "unable to delete file")
				}
			}

			// delete from uploads bucket
			_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{
				Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
				Key:    aws.String("/" + target.ID()),
			})

			if err != nil {
				// ignore no such key errors since uploaded files will expire in the bucket after 30 days
				if aerr, ok := err.(awserr.Error); ok && aerr.Code() != s3.ErrCodeNoSuchKey {
					return errors.Wrap(err, "unable to delete file")
				}
			}
		}

		if target.IsVideo() && target.IsProcessed() {

			thumbnailType, _ := resource.ExtensionByType(target.VideoThumbnailMimeType())

			// delete object
			_, err := s3Client.DeleteObject(&s3.DeleteObjectInput{
				Bucket: aws.String(bucket),
				Key:    aws.String("/" + target.ItemId() + "/" + target.VideoThumbnail() + thumbnailType),
			})

			if err != nil {
				return errors.Wrap(err, "unable to delete video thumbnail file")
			}
		}
	}

	for _, resour := range resourceItems {
		if err := r.session.
			Query(qb.Delete(resourcesTable.Name()).Where(qb.Eq("item_id")).ToCql()).
			WithContext(ctx).
			Idempotent(true).
			BindStruct(resources{ItemId: resour.ItemId()}).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to delete resources")
		}
	}

	return nil
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
			return nil, errors.Wrap(err, "failed to head file")
		}

		// create a new resource - our url + the content type that came back from S3

		fileType := resp.Metadata["Filetype"]
		newResource, err := resource.NewResource(
			itemId,
			uploadId,
			*fileType,
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

func (r ResourceCassandraS3Repository) DownloadVideoThumbnailForResource(ctx context.Context, target *resource.Resource) (*os.File, error) {

	format, _ := resource.ExtensionByType(target.VideoThumbnailMimeType())
	fileId := "/" + target.ItemId() + "/" + target.VideoThumbnail() + format

	return r.downloadResource(ctx, fileId, target.IsProcessed(), target.IsPrivate())
}

func (r ResourceCassandraS3Repository) DownloadResource(ctx context.Context, target *resource.Resource) (*os.File, error) {
	fileId := strings.Split(target.ID(), "+")[0]

	if target.IsProcessed() {
		format, _ := resource.ExtensionByType(target.LastMimeType())
		fileId = "/" + target.ItemId() + "/" + target.ProcessedId() + format
	}

	return r.downloadResource(ctx, fileId, target.IsProcessed(), target.IsPrivate())
}

func (r ResourceCassandraS3Repository) downloadResource(ctx context.Context, fileId string, isProcessed, isPrivate bool) (*os.File, error) {
	downloader := s3manager.NewDownloader(r.aws)

	file, err := os.Create(strings.Split(fileId, "/")[len(strings.Split(fileId, "/"))-1])

	if err != nil {
		return nil, errors.Wrap(err, "failed to create file")
	}

	bucket := os.Getenv("UPLOADS_BUCKET")

	if isProcessed {
		bucket = os.Getenv("RESOURCES_BUCKET")

		if isPrivate {
			bucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
		}
	}

	// Download our file from the private bucket
	_, err = downloader.Download(file,
		&s3.GetObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(fileId),
		},
	)

	if err != nil {
		return nil, errors.Wrap(err, "failed to download file")
	}

	return file, nil
}

func (r ResourceCassandraS3Repository) UploadAndCreateResource(ctx context.Context, file *os.File, target *resource.Resource) error {
	s3Client := s3.New(r.aws)

	// seek to beginning of files
	_, _ = file.Seek(0, io.SeekStart)

	fileInfo, err := file.Stat()

	if err != nil {
		return errors.Wrap(err, "failed to stat file")
	}

	var size = fileInfo.Size()
	buffer := make([]byte, size)

	if _, err := file.Read(buffer); err != nil {
		return errors.Wrap(err, "failed to read file")
	}

	bucket := os.Getenv("RESOURCES_BUCKET")

	if target.IsPrivate() {
		bucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
	}

	url := "/" + target.ItemId() + "/" + target.ProcessedId() + filepath.Ext(fileInfo.Name())

	input := &s3.PutObjectInput{
		Bucket:        aws.String(bucket),
		Key:           aws.String(url),
		Body:          bytes.NewReader(buffer),
		ContentLength: aws.Int64(size),
		ContentType:   aws.String(http.DetectContentType(buffer)),
	}

	if !target.IsPrivate() {
		// grant read access to non-public objects
		input.ACL = aws.String("public-read")
	}

	// new file that was created
	if _, err := s3Client.PutObject(input); err != nil {
		return errors.Wrap(err, "failed to put file")
	}

	// wait until file is available in private bucket

	if err := s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(url),
	}); err != nil {
		return errors.Wrap(err, "failed to wait for file")
	}

	// clean up file at the end to free up resources
	_ = file.Close()

	if err := r.createResources(ctx, []*resource.Resource{target}); err != nil {
		return err
	}

	return nil
}

// UploadProcessedResource - do filetype validation on each resource, and add to to the static bucket, with a specified prefix
// expects that the resource that was passed into the method is a resource that originates in UploadsBucket, so in our case
// it was uploaded through TUS
func (r ResourceCassandraS3Repository) UploadProcessedResource(ctx context.Context, moveTarget []*resource.Move, target *resource.Resource) error {
	s3Client := s3.New(r.aws)

	// go through each new file from the filesystem (contained by resource) and upload to s3
	for _, moveTarget := range moveTarget {

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

		input := &s3.PutObjectInput{
			Bucket:        aws.String(bucket),
			Key:           aws.String(moveTarget.RemoteUrlTarget()),
			Body:          bytes.NewReader(buffer),
			ContentLength: aws.Int64(size),
			ContentType:   aws.String(http.DetectContentType(buffer)),
		}

		if !target.IsPrivate() {
			// grant read access to non public objects
			input.ACL = aws.String("public-read")
		}

		// new file that was created
		_, err = s3Client.PutObject(input)

		if err != nil {
			return errors.Wrap(err, "failed to put file")
		}

		// wait until file is available in private bucket

		if err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(moveTarget.RemoteUrlTarget()),
		}); err != nil {
			return errors.Wrap(err, "failed to wait for file")
		}

		// clean up file at the end to free up resources
		_ = file.Close()
		_ = os.Remove(moveTarget.OsFileLocation())
	}

	if err := r.updateResources(ctx, []*resource.Resource{target}); err != nil {
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
