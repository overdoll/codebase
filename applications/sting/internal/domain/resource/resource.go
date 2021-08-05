package resource

import (
	"os"

	"overdoll/libraries/graphql"
)

// Resource represents a media resource that can either be an image or a video
// it will contain an ID to identify the resource, as well as the available mimeTypes for the specific resource
// it is most often useful for static content such as posts or thumbnails for tags, where we need image & video fallbacks as
// well as a universal way to get links
type Resource struct {
	// url should be a URL to the resource (since sometimes an object might want to have different URLs for each resource
	// the URL should NOT contain an extension or else it will be stripped (we keep track of mimetypes and sizes already so it's not necessary)
	url       string
	mimeTypes []string
	sizes     []int
}

// a new resource that has not been processed yet
func NewResource(url string) (*Resource, error) {
	return &Resource{
		url:       url,
		mimeTypes: []string{},
		sizes:     []int{},
	}, nil
}

// whether or not the resource is processed
// unprocessed resources stay inside of one bucket and processed resource are in another, so
// we need a way to differentiate this
func (r *Resource) IsProcessed() bool {
	return len(r.mimeTypes) > 0
}

func (r *Resource) URL() string {
	return r.url
}

func (r *Resource) GetGraphqlURIs() []graphql.URI {

	var generatedContent []graphql.URI

	// mimetypes length is 0, which means that the resource is still in the upload phase
	if !r.IsProcessed() {
		return generatedContent
	}

	// TODO: get extension from mimeType
	for _, _ = range r.mimeTypes {

		baseUrl := os.Getenv("STATIC_URL") + r.url

		// generate the proper content url
		generatedContent = append(generatedContent, graphql.NewURI(baseUrl))
	}

	return generatedContent
}

func UnmarshalResourceFromDatabase(resource map[string]string) *Resource {

}

// usually we don't include marshalling functions inside of the domain (since the database layer should be handling this)
// but we want consistent formats that can be parsed easily across providers so we include one
func (r *Resource) MarshalResourceToDatabase() map[string]string {

}
