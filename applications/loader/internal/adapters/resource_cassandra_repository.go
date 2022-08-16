package adapters

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
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
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/support"
	"strings"
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

var resourcesProgressTable = table.New(table.Metadata{
	Name: "resource_progress",
	Columns: []string{
		"item_id",
		"resource_id",
		"progress",
	},
	PartKey: []string{"item_id"},
	SortKey: []string{"resource_id"},
})

type resourcesProgress struct {
	ItemId     string  `db:"item_id"`
	ResourceId string  `db:"resource_id"`
	Progress   float64 `db:"progress"`
}

type ResourceCassandraS3Repository struct {
	session gocqlx.Session
	aws     *session.Session
}

func NewResourceCassandraS3Repository(session gocqlx.Session, aws *session.Session) ResourceCassandraS3Repository {
	return ResourceCassandraS3Repository{session: session, aws: aws}
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
		i.Preview,
		i.ResourceToken,
		i.Failed,
		i.CopiedFromId,
		i.VideoNoAudio,
	)
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
		ResourceToken:          r.Token(),
		Failed:                 r.Failed(),
		CopiedFromId:           r.CopiedFromId(),
		VideoNoAudio:           r.VideoNoAudio(),
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

func (r ResourceCassandraS3Repository) CreateResource(ctx context.Context, res *resource.Resource) error {
	return r.createResources(ctx, []*resource.Resource{res})
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

	for _, res := range res {
		if err := r.session.
			Query(resourcesTable.Update("mime_types",
				"processed",
				"processed_id",
				"video_duration",
				"video_thumbnail",
				"video_thumbnail_mime_type",
				"video_no_audio",
				"type",
				"width",
				"height",
				"preview",
			)).
			Idempotent(true).
			BindStruct(marshalResourceToDatabase(res)).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to update resource")
		}
	}

	return nil
}

func (r ResourceCassandraS3Repository) UpdateResourcePrivacy(ctx context.Context, resourceItems []*resource.Resource, private bool) error {

	s3Client := s3.New(r.aws)

	targetBucket := os.Getenv("RESOURCES_BUCKET")

	if private {
		targetBucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
	}

	for _, target := range resourceItems {

		if !target.IsProcessed() {
			return domainerror.NewValidation("resource not yet processed")
		}

		bucket := os.Getenv("RESOURCES_BUCKET")

		if target.IsPrivate() {
			bucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
		}

		for _, mime := range target.MimeTypes() {

			format, _ := resource.ExtensionByType(mime)
			fileId := "/" + target.ItemId() + "/" + target.ProcessedId() + format

			copyObject := &s3.CopyObjectInput{
				CopySource: aws.String(bucket + fileId),
				Bucket:     aws.String(targetBucket),
				Key:        aws.String(fileId),
			}

			if !private {
				copyObject.ACL = aws.String("public-read")
			}

			// copy object from original bucket to regular bucket
			_, err := s3Client.CopyObject(copyObject)

			if err != nil {
				return errors.Wrap(err, "unable to copy object")
			}

			if err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{
				Bucket: aws.String(targetBucket),
				Key:    aws.String(fileId),
			}); err != nil {
				return errors.Wrap(err, "failed to wait for file")
			}

			// delete original file to save on space
			_, err = s3Client.DeleteObject(&s3.DeleteObjectInput{
				Bucket: aws.String(bucket),
				Key:    aws.String(fileId),
			})

			if err != nil {
				return errors.Wrap(err, "unable to delete file")
			}
		}

		if target.IsVideo() {

			thumbnailType, _ := resource.ExtensionByType(target.VideoThumbnailMimeType())
			thumbnailFileId := "/" + target.ItemId() + "/" + target.VideoThumbnail() + thumbnailType

			copyObject := &s3.CopyObjectInput{
				CopySource: aws.String(bucket + thumbnailFileId),
				Bucket:     aws.String(targetBucket),
				Key:        aws.String(thumbnailFileId),
			}

			if !private {
				copyObject.ACL = aws.String("public-read")
			}

			// copy object from original bucket to regular bucket
			_, err := s3Client.CopyObject(copyObject)

			if err != nil {
				return errors.Wrap(err, "unable to copy video thumbnail")
			}

			if err = s3Client.WaitUntilObjectExists(&s3.HeadObjectInput{
				Bucket: aws.String(targetBucket),
				Key:    aws.String(thumbnailFileId),
			}); err != nil {
				return errors.Wrap(err, "failed to wait for video thumbnail file")
			}

			// delete object
			_, err = s3Client.DeleteObject(&s3.DeleteObjectInput{
				Bucket: aws.String(bucket),
				Key:    aws.String(thumbnailFileId),
			})

			if err != nil {
				return errors.Wrap(err, "unable to delete video thumbnail file")
			}
		}

		if err := r.session.
			Query(resourcesTable.Update("is_private")).
			WithContext(ctx).
			Idempotent(true).
			BindStruct(resources{ItemId: target.ItemId(), ResourceId: target.ID(), IsPrivate: private}).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to update resources privacy")
		}

		target.SetPrivate(private)
	}

	return nil
}

func (r ResourceCassandraS3Repository) UpdateResourceFailed(ctx context.Context, resource *resource.Resource) error {

	if err := r.session.
		Query(resourcesTable.Update("failed")).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(resources{ItemId: resource.ItemId(), ResourceId: resource.ID(), Failed: resource.Failed()}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update resources failed")
	}

	return nil
}

func (r ResourceCassandraS3Repository) DeleteResources(ctx context.Context, resourceItems []*resource.Resource) error {

	s3Client := s3.New(r.aws)

	for _, target := range resourceItems {

		if !target.IsProcessed() && !target.Failed() {
			return apperror.NewRecoverableError("resource not yet processed")
		}

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

		if err := r.session.
			Query(qb.Delete(resourcesTable.Name()).Where(qb.Eq("item_id"), qb.Eq("resource_id")).ToCql()).
			WithContext(ctx).
			Idempotent(true).
			BindStruct(resources{ItemId: target.ItemId(), ResourceId: target.ID()}).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to delete resources")
		}
	}

	return nil
}

// GetAndCreateResources will create resources from a list of IDs passed
// uploads are stored in uploads bucket - we HeadObject each file to determine the file format
func (r ResourceCassandraS3Repository) GetAndCreateResources(ctx context.Context, upload *resource.Upload) ([]*resource.Resource, error) {

	var resources []*resource.Resource

	s3Client := s3.New(r.aws)

	for _, uploadId := range upload.UploadIds() {

		fileId := strings.Split(uploadId, "+")[0]

		resp, err := s3Client.HeadObject(&s3.HeadObjectInput{
			Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
			Key:    aws.String(fileId),
		})

		if err != nil {
			return nil, errors.Wrap(err, "failed to head file")
		}

		getResp, err := s3Client.GetObject(&s3.GetObjectInput{
			Bucket: aws.String(os.Getenv("UPLOADS_BUCKET")),
			Key:    aws.String(fileId + ".info"),
		})

		if err != nil {
			return nil, errors.Wrap(err, "failed to get object")
		}

		b, err := io.ReadAll(getResp.Body)

		if err != nil {
			return nil, errors.Wrap(err, "failed to read body")
		}

		type UploadMetaData struct {
			Size int
		}

		var data *UploadMetaData

		if err := json.Unmarshal(b, &data); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal upload metadata")
		}

		if err != nil {
			return nil, errors.Wrap(err, "failed to parse content length")
		}

		if int64(data.Size) != *resp.ContentLength {
			return nil, domainerror.NewValidation("file not yet fully uploaded")
		}

		// create a new resource - our url + the content type that came back from S3
		fileType := resp.Metadata["Filetype"]
		newResource, err := resource.NewResource(
			upload.ItemId(),
			uploadId,
			*fileType,
			upload.IsPrivate(),
			upload.Token(),
			upload.AllowImages(),
			upload.AllowVideos(),
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

func (r ResourceCassandraS3Repository) DownloadResourceUpload(ctx context.Context, target *resource.Resource) (*os.File, error) {
	// only download the upload - useful for running process pipelines again, as long as the originating resource still exists in the upload bucket
	return r.downloadResource(ctx, strings.Split(target.ID(), "+")[0], false, target.IsPrivate())
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

func (r ResourceCassandraS3Repository) uploadResource(ctx context.Context, moveTarget *resource.Move, target *resource.Resource) error {
	s3Client := s3.New(r.aws)

	remoteUrlTarget := target.ItemId() + "/" + moveTarget.FileName()

	file, err := os.Open(moveTarget.FileName())

	if err != nil {
		return err
	}

	defer file.Close()
	defer os.Remove(moveTarget.FileName())

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
		Key:           aws.String(remoteUrlTarget),
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
		Key:    aws.String(remoteUrlTarget),
	}); err != nil {
		return errors.Wrap(err, "failed to wait for file")
	}

	return nil
}

// UploadProcessedResource - do filetype validation on each resource, and add to to the static bucket, with a specified prefix
// expects that the resource that was passed into the method is a resource that originates in UploadsBucket, so in our case
// it was uploaded through TUS
func (r ResourceCassandraS3Repository) UploadProcessedResource(ctx context.Context, moveTarget []*resource.Move, target *resource.Resource) error {
	// go through each new file from the filesystem (contained by resource) and upload to s3
	for _, moveTarget := range moveTarget {
		if err := r.uploadResource(ctx, moveTarget, target); err != nil {
			return err
		}
	}

	if err := r.updateResources(ctx, []*resource.Resource{target}); err != nil {
		return err
	}

	return nil
}

func (r ResourceCassandraS3Repository) UpdateResourceProgress(ctx context.Context, itemId, resourceId string, prog float64) error {

	if err := r.session.
		Query(resourcesProgressTable.Update("progress")).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(resourcesProgress{ItemId: itemId, ResourceId: resourceId, Progress: prog}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update resources progress")
	}

	return nil
}

func (r ResourceCassandraS3Repository) GetProgressForResources(ctx context.Context, itemIds, resourceIds []string) ([]*resource.Progress, error) {

	var progresses []*resource.Progress

	for _, itemId := range itemIds {

		var progressItems []*resourcesProgress

		if err := r.session.
			Query(qb.Select(resourcesProgressTable.Name()).Where(qb.Eq("item_id")).ToCql()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.One).
			BindStruct(resourcesProgress{ItemId: itemId}).
			SelectRelease(&progressItems); err != nil {
			return nil, errors.Wrap(support.NewGocqlError(err), "failed to get resource progress")
		}

		for _, progress := range progressItems {
			for _, resourceId := range resourceIds {
				if progress.ResourceId == resourceId {
					progresses = append(progresses, resource.NewProgress(progress.ItemId, progress.ResourceId, progress.Progress))
				}
			}
		}
	}

	return progresses, nil
}

func (r ResourceCassandraS3Repository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
	s3Client := s3.New(r.aws)

	store := &s3store.S3Store{
		Bucket:             os.Getenv("UPLOADS_BUCKET"),
		Service:            s3Client,
		MaxPartSize:        50 * 1024 * 1024,
		MinPartSize:        5 * 1024 * 1024,
		PreferredPartSize:  10 * 1024 * 1024,
		MaxMultipartParts:  10000,
		MaxObjectSize:      1024 * 1024 * 1024,
		MaxBufferedParts:   20,
		TemporaryDirectory: "",
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	return composer, nil
}
