package resource

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/h2non/filetype"
	"github.com/nfnt/resize"
	ffmpeg_go "github.com/u2takey/ffmpeg-go"
	"go.uber.org/zap"
	"image"
	"image/png"
	_ "image/png"
	"io"
	"io/ioutil"
	"log"
	"math"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/uuid"
	"overdoll/libraries/zap_support/zap_adapters"
	"strconv"
)

var (
	ErrFileTypeNotAllowed = domainerror.NewValidation("filetype not allowed")
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

func init() {
	// not ideal but we need to disable the log messages from ffmpeg-go
	log.SetOutput(ioutil.Discard)
}

func ExtensionByType(tp string) (string, error) {
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

	urls              []*Url
	videoThumbnailUrl *Url

	isPrivate bool

	videoThumbnail         string
	videoThumbnailMimeType string

	width  int
	height int

	videoDuration int

	mimeTypes    []string
	sizes        []int
	resourceType Type

	preview string
}

func NewImageProcessedResource(itemId, mimeType string, isPrivate bool, height, width int) (*Resource, error) {
	id := uuid.New().String()
	return &Resource{
		id:           id,
		itemId:       itemId,
		processedId:  id,
		mimeTypes:    []string{mimeType},
		sizes:        []int{},
		resourceType: Image,
		isPrivate:    isPrivate,
		processed:    true,
		height:       height,
		width:        width,
	}, nil
}

func NewResource(itemId, id, mimeType string, isPrivate bool) (*Resource, error) {

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
		isPrivate:     isPrivate,
		processed:     false,
		height:        0,
		width:         0,
		videoDuration: 0,
		preview:       "",
	}, nil
}

func createPreviewFromFile(r io.Reader) (string, error) {
	img, err := png.Decode(r)

	if err != nil {
		return "", err
	}

	resizedImage := resize.Resize(10, 10, img, resize.Lanczos3)

	buf := new(bytes.Buffer)
	err = png.Encode(buf, resizedImage)

	if err != nil {
		return "", err
	}

	return "data:image/png;base64," + base64.StdEncoding.EncodeToString(buf.Bytes()), nil
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
		return nil, errors.Wrap(err, "uknown file type")
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
			return nil, errors.Wrap(err, "failed to decode png")
		}

		newFileExtension = ".webp"

		newFileName = currentFileName + newFileExtension

		newFile, err := os.Create(newFileName)
		if err != nil {
			return nil, err
		}

		bin := webpbin.NewCWebP()
		bin.ExecPath("/usr/local/bin/cwebp")

		if err := bin.
			Quality(100).
			InputImage(src).
			Output(newFile).
			Run(); err != nil {
			_ = newFile.Close()
			return nil, errors.Wrap(err, "failed to convert png to webp")
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

		_, _ = file.Seek(0, io.SeekStart)
		preview, err := createPreviewFromFile(file)

		if err != nil {
			return nil, err
		}

		r.preview = preview

	} else if kind.MIME.Value == "video/mp4" {
		mimeTypes = append(mimeTypes, "video/mp4")

		thumbnailFileName := "t-" + fileName + "." + ".png"

		fileThumbnail, err := os.Create(thumbnailFileName)
		if err != nil {
			return nil, err
		}

		ffmpegLogger := &zap_adapters.FfmpegGoLogErrorAdapter{
			Output: *new([]byte),
		}

		if err := ffmpeg_go.Input(file.Name(), map[string]interface{}{
			"f": "mp4",
		}).
			Filter("select", ffmpeg_go.Args{fmt.Sprintf("gte(n,%d)", 5)}).
			Output("pipe:", ffmpeg_go.KwArgs{"vframes": 1, "format": "image2", "vcodec": "png"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(fileThumbnail).
			Run(); err != nil {
			zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
			return nil, errors.Wrap(err, "failed to process ffmpeg_go file")
		}

		videoThumb := "t-" + fileName

		moveTargets = append(moveTargets, &Move{
			osFileLocation:  thumbnailFileName,
			remoteUrlTarget: r.itemId + "/" + videoThumb + ".png",
		})

		str, err := ffmpeg_go.Probe(file.Name(), map[string]interface{}{
			"f": "mp4",
		})

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

		_, _ = fileThumbnail.Seek(0, io.SeekStart)
		preview, err := createPreviewFromFile(fileThumbnail)

		if err != nil {
			return nil, err
		}

		_, _ = fileThumbnail.Seek(0, io.SeekStart)

		r.preview = preview

	} else {
		return nil, errors.New(fmt.Sprintf("invalid resource format: %s", kind.MIME.Value))
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
		return nil, errors.Wrap(err, "failed to close file")
	}

	return moveTargets, nil
}

func (r *Resource) ID() string {
	return r.id
}

func (r *Resource) ItemId() string {
	return r.itemId
}

func (r *Resource) IsPrivate() bool {
	return r.isPrivate
}

func (r *Resource) MimeTypes() []string {
	return r.mimeTypes
}

func (r *Resource) LastMimeType() string {
	return r.mimeTypes[len(r.mimeTypes)-1]
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

func (r *Resource) Preview() string {
	return r.preview
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
	return r.videoThumbnailUrl
}

func (r *Resource) FullUrls() []*Url {
	return r.urls
}

func UnmarshalResourceFromDatabase(itemId, resourceId string, tp int, isPrivate bool, mimeTypes []string, processed bool, processedId string, videoDuration int, videoThumbnail, videoThumbnailMimeType string, width, height int, urls []*Url, videoThumbnailUrl *Url, preview string) *Resource {

	typ, _ := TypeFromInt(tp)

	return &Resource{
		id:                     resourceId,
		itemId:                 itemId,
		videoDuration:          videoDuration,
		isPrivate:              isPrivate,
		videoThumbnail:         videoThumbnail,
		videoThumbnailMimeType: videoThumbnailMimeType,
		width:                  width,
		height:                 height,
		processedId:            processedId,
		mimeTypes:              mimeTypes,
		resourceType:           typ,
		processed:              processed,
		urls:                   urls,
		videoThumbnailUrl:      videoThumbnailUrl,
		preview:                preview,
	}
}
