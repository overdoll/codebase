package resource

import (
	"errors"
	"fmt"
	"image"
	_ "image/png"
	"io"
	"mime"
	"os"

	"github.com/h2non/filetype"
	"overdoll/libraries/uuid"
)

var (
	ErrResourceNotFound   = errors.New("resource not found")
	ErrFileTypeNotAllowed = errors.New("filetype not allowed")
)

// accepted formats
var (
	imageAcceptedTypes = []string{"image/png"}
	videoAcceptedTypes = []string{"video/mp4"}
)

// Resource represents a media resource that can either be an image or a video
// it will contain an ID to identify the resource, as well as the available mimeTypes for the specific resource
// it is most often useful for static content such as posts or thumbnails for tags, where we need image & video fallbacks as
// well as a universal way to get links
type Resource struct {

	// the item ID that the resource is attached to
	itemId string

	// the actual identifier for the resource
	id string

	// url should be a Url to the resource (since sometimes an object might want to have different URLs for each resource
	// the Url should NOT contain an extension or else it will be stripped (we keep track of mimetypes and sizes already so it's not necessary)

	processed   bool
	processedId string

	mimeTypes    []string
	sizes        []int
	resourceType Type
}

func NewResource(itemId, id, mimeType string) (*Resource, error) {

	// initial mimetype we dont care about until we do a processing step later that determines the type
	var rType Type

	for _, m := range imageAcceptedTypes {
		if m == mimeType {
			rType = Image
		}
	}

	for _, m := range videoAcceptedTypes {
		if m == mimeType {
			rType = Video
		}
	}

	if rType.Int() == 0 {
		return nil, ErrFileTypeNotAllowed
	}

	return &Resource{
		id:           id,
		itemId:       itemId,
		mimeTypes:    []string{mimeType},
		sizes:        []int{},
		resourceType: rType,
		processed:    false,
	}, nil
}

// ProcessResource process resource - should be at a new Url and any additional mimetypes that are available
// must pass the file that needs to be processed (usually the current file, gotten from Url())
func (r *Resource) ProcessResource(file *os.File) ([]*Move, error) {

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
		r.resourceType = Image

	} else if kind.MIME.Value == "video/mp4" {
		// TODO: video processing pipeline??
		mimeTypes = append(mimeTypes, "video/mp4")

		r.resourceType = Video

	} else {
		return nil, fmt.Errorf("invalid resource format: %s", kind.MIME.Value)
	}

	fileName := uuid.New().String()
	fileKey := r.itemId + "/" + fileName

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

	r.processedId = fileName
	r.mimeTypes = mimeTypes
	r.processed = true

	if err := file.Close(); err != nil {
		return nil, fmt.Errorf("failed to close file: %v", err)
	}

	return moveTargets, nil
}

func (r *Resource) ID() string {
	return r.id
}

func (r *Resource) ItemId() string {
	return r.itemId
}

func (r *Resource) Url() string {

	if r.processed {
		return "/" + r.itemId + "/" + r.processedId
	}

	return r.id
}

func (r *Resource) MimeTypes() []string {
	return r.mimeTypes
}

func (r *Resource) MakeImage() error {
	r.resourceType = Image
	return nil
}

func (r *Resource) MakeVideo() error {
	r.resourceType = Video
	return nil
}

func (r *Resource) IsProcessed() bool {
	return r.processed
}

func (r *Resource) ProcessedId() string {
	return r.processedId
}

func (r *Resource) IsImage() bool {
	return r.resourceType == Image
}

func (r *Resource) IsVideo() bool {
	return r.resourceType == Video
}

func (r *Resource) FullUrls() []*Url {

	var generatedContent []*Url

	for _, m := range r.mimeTypes {

		formats, _ := mime.ExtensionsByType(m)

		extension := ""

		if formats != nil {
			extension = formats[len(formats)-1]
		}

		domain := os.Getenv("APP_URL") + "/api/upload/"

		if r.processed {
			domain = os.Getenv("STATIC_URL")
		}

		// generate the proper content url
		generatedContent = append(generatedContent, &Url{
			fullUrl:  domain + r.Url() + extension,
			mimeType: m,
		})
	}

	return generatedContent
}

func UnmarshalResourceFromDatabase(itemId, resourceId string, tp int, mimeTypes []string, processed bool, processedId string) *Resource {

	typ, _ := TypeFromInt(tp)

	return &Resource{
		id:           resourceId,
		itemId:       itemId,
		processedId:  processedId,
		mimeTypes:    mimeTypes,
		resourceType: typ,
		processed:    processed,
	}
}
