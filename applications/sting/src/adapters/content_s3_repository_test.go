package adapters_test

import (
	"context"
	"log"
	"os"
	"path"
	"testing"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/bazelbuild/rules_go/go/tools/bazel"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/adapters"
	storage "overdoll/libraries/aws"
)

// TestContentS3Repository_ProcessContent - process content, put into the public bucket, and finally delete it all at the end
func TestContentS3Repository_ProcessContent(t *testing.T) {
	t.Parallel()

	prefix := ksuid.New().String()
	fileId := ksuid.New().String()

	// upload fixture
	uploadFileFixture(t, adapters.ImageUploadsBucket, fileId, "applications/sting/src/adapters/content_fixtures/test_file_1.png")

	content := newContentRepository(t)

	// we need to add the "+" because the file is uploaded that way by tus
	res, err := content.ProcessContent(context.Background(), prefix, []string{fileId + "+some-random-stuff"})

	require.NoError(t, err)
	// uploaded at least 1 file
	require.Len(t, res, 1)

	// reassign file id to new ID
	fileId = res[0]

	// make content public
	res, err = content.MakeProcessedContentPublic(context.Background(), prefix, []string{fileId})
	require.NoError(t, err)
	require.Len(t, res, 1)

	// delete public content
	err = content.DeletePublicContent(context.Background(), []string{res[0]})
	require.NoError(t, err)

	// delete processed content
	err = content.DeleteProcessedContent(context.Background(), prefix, []string{fileId})
	require.NoError(t, err)

}
func newS3Client(t *testing.T) *s3.S3 {
	session, err := storage.CreateAWSSession()

	require.NoError(t, err)

	return s3.New(session)
}

func uploadFileFixture(t *testing.T, bucket, fileKey, filePath string) {

	session, err := storage.CreateAWSSession()

	require.NoError(t, err)

	client := s3manager.NewUploader(session)

	// use bazel runfiles path
	dir, err := bazel.RunfilesPath()
	require.NoError(t, err)

	file, err := os.Open(path.Join(dir, filePath))

	require.NoError(t, err)

	defer file.Close()

	_, err = client.Upload(&s3manager.UploadInput{
		Body:   file,
		Bucket: aws.String(bucket),
		Key:    aws.String(fileKey),
	})

	require.NoError(t, err)
}

func newContentRepository(t *testing.T) adapters.ContentS3Repository {

	s, err := storage.CreateAWSSession()

	require.NoError(t, err)

	return adapters.NewContentS3Repository(s)
}

// create buckets before running tests
func seedBuckets() bool {
	session, err := storage.CreateAWSSession()

	if err != nil {
		log.Println(err)
		return false
	}

	s3c := s3.New(session)

	buckets := []string{adapters.ImageStaticBucket, adapters.ImageUploadsBucket, adapters.PostContentBucket}

	for _, bucket := range buckets {
		_, err = s3c.CreateBucket(&s3.CreateBucketInput{Bucket: aws.String(bucket)})

		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case s3.ErrCodeBucketAlreadyOwnedByYou:
				log.Println("already exists")
			default:
				return false
			}
		}
	}

	return true
}

func TestMain(m *testing.M) {
	if !seedBuckets() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
