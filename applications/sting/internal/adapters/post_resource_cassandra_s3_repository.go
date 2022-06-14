package adapters

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	"io"
	"net/http"
	"os"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

type resources struct {
	ItemId      string   `json:"item_id"`
	ResourceId  string   `json:"resource_id"`
	Type        int      `json:"type"`
	MimeTypes   []string `json:"mime_types"`
	Processed   bool     `json:"processed"`
	ProcessedId string   `json:"processed_id"`

	IsPrivate bool `db:"is_private"`

	VideoDuration          int    `json:"video_duration"`
	VideoThumbnail         string `json:"video_thumbnail"`
	VideoThumbnailMimeType string `json:"video_thumbnail_mime_type"`
	Width                  int    `json:"width"`
	Height                 int    `json:"height"`
	Preview                string `json:"preview"`
}

func unmarshalResourceFromDatabase(i resources) *post.Resource {
	return post.UnmarshalResourceFromDatabase(
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

func unmarshalResourceFromDatabaseWithSignedUrls(resourcesSigner *sign.URLSigner, a *session.Session, i resources) (*post.Resource, error) {

	s3Client := s3.New(a)

	bucket := os.Getenv("UPLOADS_BUCKET")

	if i.Processed {
		bucket = os.Getenv("RESOURCES_BUCKET")
	}

	if i.Processed && i.IsPrivate {
		bucket = os.Getenv("PRIVATE_RESOURCES_BUCKET")
	}

	var urls []*post.Url

	for _, mime := range i.MimeTypes {

		key := "/" + i.ResourceId

		extension := ""

		format, err := post.ExtensionByType(mime)

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

		urls = append(urls, post.UnmarshalUrlFromDatabase(
			url,
			mime,
		))
	}

	var videoThumbnail *post.Url

	if i.VideoThumbnail != "" {

		format, _ := post.ExtensionByType(i.VideoThumbnailMimeType)

		if i.IsPrivate {

			signedURL, err := resourcesSigner.Sign(os.Getenv("PRIVATE_RESOURCES_URL")+"/"+i.ItemId+"/"+i.VideoThumbnail+format, time.Now().Add(15*time.Minute))

			if err != nil {
				return nil, errors.Wrap(err, "could not generate video thumbnail signed url")
			}

			videoThumbnail = post.UnmarshalUrlFromDatabase(
				signedURL,
				i.VideoThumbnailMimeType,
			)
		} else {
			videoThumbnail = post.UnmarshalUrlFromDatabase(
				os.Getenv("RESOURCES_URL")+"/"+i.ItemId+"/"+i.VideoThumbnail+format,
				i.VideoThumbnailMimeType,
			)
		}

	}

	return post.UnmarshalResourceFromDatabase(
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

func marshalResourceToDatabase(r *post.Resource) *resources {

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

func (r PostsCassandraElasticsearchRepository) unmarshalResources(ctx context.Context, resourcesList []string) ([]*post.Resource, error) {

	var res []resources

	for _, rString := range resourcesList {

		var re resources

		if err := json.Unmarshal([]byte(rString), &re); err != nil {
			return nil, err
		}

		res = append(res, re)
	}

	var wg sync.WaitGroup

	wg.Add(len(res))

	errs := make(chan error)

	resourcesResult := make([]*post.Resource, len(res))

	for i, z := range res {
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

func (r PostsCassandraElasticsearchRepository) DeleteResources(ctx context.Context, resourceItems []*post.Resource) error {

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

				format, _ := post.ExtensionByType(mime)

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

			thumbnailType, _ := post.ExtensionByType(target.VideoThumbnailMimeType())

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

	for _, _ = range resourceItems {
		// TODO: delete resources from post
	}

	return nil
}

// GetAndCreateResourcesForPost will create resources from a list of IDs passed
// uploads are stored in uploads bucket - we HeadObject each file to determine the file format
func (r PostsCassandraElasticsearchRepository) GetAndCreateResourcesForPost(ctx context.Context, pst *post.Post, uploads []string, isPrivate bool) ([]*post.Resource, error) {

	var newUploadIds []string

	for _, uploadId := range uploads {
		// fix upload IDs
		newUploadIds = append(newUploadIds, getUploadIdWithoutExtension(uploadId))
	}

	var newResources []*post.Resource

	s3Client := s3.New(r.aws)

	for _, uploadId := range newUploadIds {

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
		newResource, err := post.NewResource(
			pst.ID(),
			uploadId,
			*fileType,
			isPrivate,
		)

		if err != nil {
			return nil, err
		}

		newResources = append(newResources, newResource)
	}

	return newResources, nil
}

func (r PostsCassandraElasticsearchRepository) DownloadVideoThumbnailForResource(ctx context.Context, target *post.Resource) (*os.File, error) {

	format, _ := post.ExtensionByType(target.VideoThumbnailMimeType())
	fileId := "/" + target.ItemId() + "/" + target.VideoThumbnail() + format

	return r.downloadResource(ctx, fileId, target.IsProcessed(), target.IsPrivate())
}

func (r PostsCassandraElasticsearchRepository) DownloadResource(ctx context.Context, target *post.Resource) (*os.File, error) {
	fileId := strings.Split(target.ID(), "+")[0]

	if target.IsProcessed() {
		format, _ := post.ExtensionByType(target.LastMimeType())
		fileId = "/" + target.ItemId() + "/" + target.ProcessedId() + format
	}

	return r.downloadResource(ctx, fileId, target.IsProcessed(), target.IsPrivate())
}

func (r PostsCassandraElasticsearchRepository) downloadResource(ctx context.Context, fileId string, isProcessed, isPrivate bool) (*os.File, error) {
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

func (r PostsCassandraElasticsearchRepository) UploadResource(ctx context.Context, file *os.File, target *post.Resource) error {

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
	_ = os.Remove(file.Name())

	return nil
}

// UploadProcessedResource - do filetype validation on each resource, and add to to the static bucket, with a specified prefix
// expects that the resource that was passed into the method is a resource that originates in UploadsBucket, so in our case
// it was uploaded through TUS
func (r PostsCassandraElasticsearchRepository) UploadProcessedResource(ctx context.Context, moveTarget []*post.Move, target *post.Resource) error {
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

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetComposer(ctx context.Context) (*tusd.StoreComposer, error) {
	s3Client := s3.New(r.aws)

	store := s3store.New(os.Getenv("UPLOADS_BUCKET"), s3Client)

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	return composer, nil
}

func getUploadIdWithoutExtension(uploadId string) string {
	// strip any urls or extensions
	splitPath := strings.Split(uploadId, "/")
	idWithOrWithoutExtension := splitPath[len(strings.Split(uploadId, "/"))-1]

	return strings.Split(idWithOrWithoutExtension, "+")[0]
}
