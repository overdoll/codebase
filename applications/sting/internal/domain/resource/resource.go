package resource

import (
	"encoding/json"
	"errors"
	"mime"
	"os"
)

var (
	ErrAlreadyProcessed = errors.New("resource already processed")
)

type resourceType int

const (
	imageType resourceType = iota
	videoType
)

type marshalled struct {
	Url       string   `json:"url"`
	MimeTypes []string `json:"mimeTypes"`
	Sizes     []int    `json:"sizes"`
	Type      int      `json:"type"`
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
}

// a new resource that has not been processed yet
func NewResource(url string) (*Resource, error) {

	// TODO: get type from Url?

	return &Resource{
		url:          url,
		mimeTypes:    []string{},
		sizes:        []int{},
		resourceType: imageType,
	}, nil
}

// whether or not the resource is processed
// unprocessed resources stay inside of one bucket and processed resource are in another, so
// we need a way to differentiate this
func (r *Resource) IsProcessed() bool {
	return len(r.mimeTypes) > 0
}

// process resource - should be at a new Url and now contains mimetypes
func (r *Resource) ProcessResource(newUrl string, mimeTypes []string) error {
	r.url = newUrl
	r.mimeTypes = mimeTypes
	return nil
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

func (r *Resource) IsImage() bool {
	return r.resourceType == imageType
}

func (r *Resource) IsVideo() bool {
	return r.resourceType == videoType
}

func (r *Resource) FullUrls() []*Url {

	var generatedContent []*Url

	// mimetypes length is 0, which means that the resource is still in the upload phase
	if !r.IsProcessed() {
		return generatedContent
	}

	// TODO: get extension from mimeType
	for _, m := range r.mimeTypes {

		formats, _ := mime.ExtensionsByType(m)

		if formats != nil {
			// generate the proper content url
			generatedContent = append(generatedContent, &Url{
				fullUrl:  os.Getenv("STATIC_URL") + r.url + "." + formats[0],
				mimeType: m,
			})
		}
	}

	return generatedContent
}

func UnmarshalResourceFromDatabase(resource string) *Resource {

	var target marshalled

	if err := json.Unmarshal([]byte(resource), &target); err != nil {
		return nil
	}

	return &Resource{
		url:          target.Url,
		mimeTypes:    target.MimeTypes,
		sizes:        target.Sizes,
		resourceType: resourceType(target.Type),
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
	}

	b, err := json.Marshal(toMarshal)

	if err != nil {
		return "", err
	}

	return string(b), nil
}
