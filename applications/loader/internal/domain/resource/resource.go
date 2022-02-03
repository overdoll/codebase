package resource

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/h2non/filetype"
	ffmpeg_go "github.com/u2takey/ffmpeg-go"
	"image"
	_ "image/png"
	"io"
	"math"
	"os"
	"overdoll/libraries/uuid"
	"strconv"
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

var extensionsMap = map[string]string{
	"video/mp4":  ".mp4",
	"image/png":  ".png",
	"image/webp": ".webp",
}

func extensionByType(tp string) (string, error) {
	return extensionsMap[tp], nil
}

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

	videoThumbnail         string
	videoThumbnailMimeType string

	width  int
	height int

	videoDuration int

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
		id:            id,
		itemId:        itemId,
		mimeTypes:     []string{mimeType},
		sizes:         []int{},
		resourceType:  rType,
		processed:     false,
		height:        0,
		width:         0,
		videoDuration: 0,
	}, nil
}

// ProcessResource process resource - should be at a new Url and any additional mimetypes that are available
// must pass the file that needs to be processed (usually the current file, gotten from Url())
func (r *Resource) ProcessResource(file *os.File) ([]*Move, error) {
	var mimeTypes []string
	var moveTargets []*Move

	headBuffer := make([]byte, 261)
	_, err := file.Read(headBuffer)
	if err != nil {
		return nil, err
	}

	// do a mime type check on the file to make sure its an accepted file and to get our extension
	kind, _ := filetype.Match(headBuffer)
	if kind == filetype.Unknown {
		return nil, fmt.Errorf("uknown file type: %s", kind)
	}

	var newFileName string
	var newFileExtension string
	currentFileName := file.Name()

	// seek file so we can read it again (first time we only grab a few bytes)
	_, _ = file.Seek(0, io.SeekStart)

	fileName := uuid.New().String()

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

		// get config
		_, _ = file.Seek(0, io.SeekStart)
		cfgSrc, _, err := image.DecodeConfig(file)
		if err != nil {
			return nil, err
		}

		r.height = cfgSrc.Height
		r.width = cfgSrc.Width

	} else if kind.MIME.Value == "video/mp4" {
		mimeTypes = append(mimeTypes, "video/mp4")

		thumbnailFileName := "t-" + fileName + "." + ".png"

		fileThumbnail, err := os.Create(thumbnailFileName)
		if err != nil {
			return nil, err
		}

		if err := ffmpeg_go.Input(file.Name()).
			Filter("select", ffmpeg_go.Args{fmt.Sprintf("gte(n,%d)", 5)}).
			Output("pipe:", ffmpeg_go.KwArgs{"vframes": 1, "format": "image2", "vcodec": "png"}).
			WithOutput(fileThumbnail).
			Run(); err != nil {
			return nil, err
		}

		videoThumb := "t-" + fileName

		moveTargets = append(moveTargets, &Move{
			osFileLocation:  thumbnailFileName,
			remoteUrlTarget: r.itemId + "/" + videoThumb + ".png",
		})

		str, err := ffmpeg_go.Probe(file.Name())

		if err != nil {
			return nil, err
		}

		type ffmpegProbeRes struct {
			Streams []struct {
				Width    int    `json:"width"`
				Height   int    `json:"height"`
				Duration string `json:"duration"`
			} `json:"streams"`
		}

		var probeResult *ffmpegProbeRes

		if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
			return nil, err
		}

		s, err := strconv.ParseFloat(probeResult.Streams[0].Duration, 32)
		if err != nil {
			return nil, err
		}

		r.width = probeResult.Streams[0].Width
		r.height = probeResult.Streams[0].Height
		r.videoDuration = int(math.Round(s * 1000))

		r.videoThumbnailMimeType = "image/png"
		r.videoThumbnail = videoThumb
		r.resourceType = Video

	} else {
		return nil, fmt.Errorf("invalid resource format: %s", kind.MIME.Value)
	}

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

	return "/" + r.id
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

func (r *Resource) Width() int {
	return r.width
}

func (r *Resource) Height() int {
	return r.height
}

func (r *Resource) VideoDuration() int {
	return r.videoDuration
}

func (r *Resource) IsImage() bool {
	return r.resourceType == Image
}

func (r *Resource) IsVideo() bool {
	return r.resourceType == Video
}

func (r *Resource) VideoThumbnailMimeType() string {
	return r.videoThumbnailMimeType
}

func (r *Resource) VideoThumbnail() string {
	return r.videoThumbnail
}

func (r *Resource) VideoThumbnailFullUrl() *Url {

	if r.processed {
		format, _ := extensionByType(r.videoThumbnailMimeType)
		return &Url{
			fullUrl:  os.Getenv("RESOURCES_URL") + "/" + r.itemId + "/" + r.videoThumbnail + format,
			mimeType: r.videoThumbnailMimeType,
		}
	}

	return nil
}

func (r *Resource) FullUrls() []*Url {

	var generatedContent []*Url

	for _, m := range r.mimeTypes {

		extension := ""

		format, err := extensionByType(m)

		if err == nil && r.processed {
			extension = format
		}

		domain := os.Getenv("UPLOADS_URL")

		if r.processed {
			domain = os.Getenv("RESOURCES_URL")
		}

		// generate the proper content url
		generatedContent = append(generatedContent, &Url{
			fullUrl:  domain + r.Url() + extension,
			mimeType: m,
		})
	}

	return generatedContent
}

func UnmarshalResourceFromDatabase(itemId, resourceId string, tp int, mimeTypes []string, processed bool, processedId string, videoDuration int, videoThumbnail, videoThumbnailMimeType string, width, height int) *Resource {

	typ, _ := TypeFromInt(tp)

	return &Resource{
		id:                     resourceId,
		itemId:                 itemId,
		videoDuration:          videoDuration,
		videoThumbnail:         videoThumbnail,
		videoThumbnailMimeType: videoThumbnailMimeType,
		width:                  width,
		height:                 height,
		processedId:            processedId,
		mimeTypes:              mimeTypes,
		resourceType:           typ,
		processed:              processed,
	}
}
