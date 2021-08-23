package resource

import (
	"encoding/json"
	"errors"
	"fmt"
	"image"
	_ "image/png"
	"io"
	"mime"
	"os"

	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/h2non/filetype"
	"go.uber.org/zap"
	"overdoll/libraries/uuid"
)

var (
	ErrAlreadyProcessed   = errors.New("resource already processed")
	ErrFileTypeNotAllowed = errors.New("filetype not allowed")
)

type resourceType int

const (
	imageType resourceType = 1
	videoType              = 2
)

// accepted formats
var (
	imageAcceptedTypes = []string{"image/png"}
	videoAcceptedTypes = []string{"video/mp4"}
)

type marshalled struct {
	Url       string   `json:"url"`
	MimeTypes []string `json:"mimeTypes"`
	Sizes     []int    `json:"sizes"`
	Type      int      `json:"type"`
	Processed bool     `json:"processed"`
}

// Move is a struct that contains the info that would tell a repository where a file is located in the OS,
// and where it needs to be moved in a remote storage (s3, etc...)
type Move struct {
	osFileLocation  string
	remoteUrlTarget string
}

func (r *Move) OsFileLocation() string {
	return r.osFileLocation
}

func (r *Move) RemoteUrlTarget() string {
	return r.remoteUrlTarget
}

type Url struct {
	fullUrl  string
	mimeType string
}

func (r *Url) GetFullUrl() string {
	return r.fullUrl
}

func (r *Url) GetMimeType() string {
	return r.mimeType
}

// Resource represents a media resource that can either be an image or a video
// it will contain an ID to identify the resource, as well as the available mimeTypes for the specific resource
// it is most often useful for static content such as posts or thumbnails for tags, where we need image & video fallbacks as
// well as a universal way to get links
type Resource struct {
	// url should be a Url to the resource (since sometimes an object might want to have different URLs for each resource
	// the Url should NOT contain an extension or else it will be stripped (we keep track of mimetypes and sizes already so it's not necessary)
	url          string
	mimeTypes    []string
	sizes        []int
	resourceType resourceType
	processed    bool
}

func NewResource(url, mimeType string) (*Resource, error) {

	// initial mimetype we dont care about until we do a processing step later that determines the type
	var rType resourceType

	for _, m := range imageAcceptedTypes {
		if m == mimeType {
			rType = imageType
		}
	}

	for _, m := range videoAcceptedTypes {
		if m == mimeType {
			rType = videoType
		}
	}

	if rType == 0 {
		return nil, ErrFileTypeNotAllowed
	}

	return &Resource{
		url:          url,
		mimeTypes:    []string{mimeType},
		sizes:        []int{},
		resourceType: rType,
		processed:    false,
	}, nil
}

// process resource - should be at a new Url and any additional mimetypes that are available
// must pass the file that needs to be processed (usually the current file, gotten from Url())
func (r *Resource) ProcessResource(prefix string, file *os.File) ([]*Move, error) {

	var mimeTypes []string
	var moveTargets []*Move

	head := make([]byte, 261)
	_, err := file.Read(head)

	if err != nil {
		return nil, err
	}

	// do a mime type check on the file to make sure its an accepted file and to get our extension
	kind, _ := filetype.Match(head)
	if kind == filetype.Unknown {
		return nil, fmt.Errorf("uknown file type: %s", kind)
	}

	var newFileName string
	var newFileExtension string
	currentFileName := file.Name()

	// seek file so we can read it again (first time we only grab a few bytes)
	_, _ = file.Seek(0, io.SeekStart)

	if kind.MIME.Value == "image/png" {
		// image is in an accepted format - convert to webp

		src, _, err := image.Decode(file)

		if err != nil {
			return nil, fmt.Errorf("failed to decode png %v", err)
		}

		newFileExtension = ".webp"

		newFileName = currentFileName + newFileExtension

		newFile, err := os.Create(newFileName)
		if err != nil {
			return nil, err
		}

		// lossless encoder
		enc := webpbin.Encoder{Quality: 100}

		if err := enc.Encode(newFile, src); err != nil {
			_ = newFile.Close()
			return nil, err
		}

		// our resource will contain 2 mimetypes - a PNG and a webp
		mimeTypes = append(mimeTypes, "image/webp")
		mimeTypes = append(mimeTypes, "image/png")
		r.resourceType = imageType

	} else if kind.MIME.Value == "video/mp4" {
		// TODO: video processing pipeline??
		mimeTypes = append(mimeTypes, "video/mp4")

		r.resourceType = videoType

	} else {
		return nil, fmt.Errorf("invalid resource format: %s", kind.MIME.Value)
	}

	fileName := uuid.New().String()
	fileKey := prefix + fileName

	// the second file we need to move - a file that was existing already
	moveTargets = append(moveTargets, &Move{
		osFileLocation:  currentFileName,
		remoteUrlTarget: fileKey + "." + kind.Extension,
	})

	if newFileExtension != "" {
		// the first file that needs to be moved - a file that we created
		moveTargets = append(moveTargets, &Move{
			osFileLocation:  newFileName,
			remoteUrlTarget: fileKey + newFileExtension,
		})
	}

	r.url = fileKey
	r.mimeTypes = mimeTypes
	r.processed = true

	if err := file.Close(); err != nil {
		return nil, fmt.Errorf("failed to close file: %v", err)
	}

	return moveTargets, nil
}

func (r *Resource) Url() string {
	return r.url
}

func (r *Resource) MakeImage() error {
	r.resourceType = imageType
	return nil
}

func (r *Resource) MakeVideo() error {
	r.resourceType = videoType
	return nil
}

func (r *Resource) IsProcessed() bool {
	return r.processed
}

func (r *Resource) IsImage() bool {
	return r.resourceType == imageType
}

func (r *Resource) IsVideo() bool {
	return r.resourceType == videoType
}

func (r *Resource) FullUrls() []*Url {

	var generatedContent []*Url

	for _, m := range r.mimeTypes {

		formats, _ := mime.ExtensionsByType(m)

		extension := ""

		if formats != nil {
			extension = formats[0]
		}

		domain := os.Getenv("APP_URL")

		if r.processed {
			domain = os.Getenv("STATIC_URL")
		}

		// generate the proper content url
		generatedContent = append(generatedContent, &Url{
			fullUrl:  domain + r.url + extension,
			mimeType: m,
		})
	}

	return generatedContent
}

func UnmarshalResourceFromDatabase(resource string) *Resource {

	var target marshalled

	if err := json.Unmarshal([]byte(resource), &target); err != nil {
		zap.S().Error("invalid resource: ", zap.String("resource", resource), zap.Error(err))
		return nil
	}

	return &Resource{
		url:          target.Url,
		mimeTypes:    target.MimeTypes,
		sizes:        target.Sizes,
		resourceType: resourceType(target.Type),
		processed:    target.Processed,
	}
}

// usually we don't include marshalling functions inside of the domain (since the adapter layer should be handling this)
// but we want consistent formats that can be parsed easily across adapters so we include one. However, database adapters are free to not use this function -
// it's simply a helper
func (r *Resource) MarshalResourceToDatabase() (string, error) {
	toMarshal := &marshalled{
		Url:       r.url,
		MimeTypes: r.mimeTypes,
		Sizes:     r.sizes,
		Type:      int(r.resourceType),
		Processed: r.processed,
	}

	b, err := json.Marshal(toMarshal)

	if err != nil {
		return "", err
	}

	return string(b), nil
}
