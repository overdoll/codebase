package resource

import (
	"encoding/json"
	"fmt"
	"github.com/CapsLock-Studio/go-webpbin"
	"github.com/EdlinOrg/prominentcolor"
	"github.com/disintegration/gift"
	"github.com/h2non/filetype"
	"github.com/nfnt/resize"
	ffmpeg_go "github.com/u2takey/ffmpeg-go"
	"go.uber.org/zap"
	"image"
	"image/jpeg"
	"image/png"
	_ "image/png"
	"io"
	"io/ioutil"
	"log"
	"math"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/resource"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/uuid"
	"overdoll/libraries/zap_support/zap_adapters"
	"strconv"
	"strings"
)

type ErrorResourceCallbackNotFound struct{}

func newResourceCallbackNotFound() error {
	return &ErrorResourceCallbackNotFound{}
}

func (c *ErrorResourceCallbackNotFound) Error() string {
	return "resource callback not found"
}

var (
	ErrFileTypeNotAllowed       = domainerror.NewValidation("filetype not allowed")
	ErrResourceCallbackNotFound = newResourceCallbackNotFound()
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
	"image/jpg":  ".jpg",
	"image/jpeg": ".jpg",
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

	token string

	isPrivate bool
	failed    bool

	copiedFromId string

	videoThumbnail         string
	videoThumbnailMimeType string

	width  int
	height int

	videoDuration int

	mimeTypes    []string
	resourceType resource.Type

	preview string
}

func NewImageCopyResource(itemId, mimeType string, isPrivate bool, token string, copiedFromItemId, copiedFromResourceId string) (*Resource, error) {
	id := uuid.New().String()
	return &Resource{
		id:           id,
		itemId:       itemId,
		processedId:  "",
		mimeTypes:    []string{mimeType},
		resourceType: resource.Image,
		isPrivate:    isPrivate,
		processed:    false,
		failed:       false,
		token:        token,
		copiedFromId: copiedFromItemId + "-" + copiedFromResourceId,
	}, nil
}

func NewResource(itemId, id, mimeType string, isPrivate bool, token string, allowImages, allowVideos bool) (*Resource, error) {

	// initial mimetype we dont care about until we do a processing step later that determines the type
	var rType resource.Type

	for _, m := range imageAcceptedTypes {
		if m == mimeType {
			if !allowImages {
				return nil, ErrFileTypeNotAllowed
			}
			rType = resource.Image
		}
	}

	for _, m := range videoAcceptedTypes {
		if m == mimeType {
			if !allowVideos {
				return nil, ErrFileTypeNotAllowed
			}
			rType = resource.Video
		}
	}

	if rType.Int() == 0 {
		return nil, ErrFileTypeNotAllowed
	}

	return &Resource{
		id:            id,
		itemId:        itemId,
		mimeTypes:     []string{mimeType},
		resourceType:  rType,
		isPrivate:     isPrivate,
		processed:     false,
		token:         token,
		height:        0,
		width:         0,
		videoDuration: 0,
		preview:       "",
		failed:        false,
	}, nil
}

func (r *Resource) ApplyFilters(file *os.File, config *Config, filters *ImageFilters) ([]*Move, error) {

	fileName := uuid.New().String()

	defer file.Close()
	defer os.Remove(file.Name())

	src, err := jpeg.Decode(file)

	if err != nil {
		return nil, err
	}

	if err != nil {
		return nil, errors.Wrap(err, "failed to decode a file for filters")
	}

	src = resize.Resize(uint(config.Width()), uint(config.Height()), src, resize.Lanczos3)

	// create and apply filters
	g := gift.New()

	if filters.Pixelate() != nil {
		g.Add(gift.Pixelate(*filters.Pixelate()))
	}

	dst := image.NewNRGBA(g.Bounds(src.Bounds()))
	g.Draw(dst, src)

	webpFileName := fileName + ".webp"

	webpFile, err := os.Create(webpFileName)
	if err != nil {
		return nil, err
	}

	if err := webpbin.NewCWebP().
		Quality(100).
		InputImage(src).
		Output(webpFile).
		Run(); err != nil {
		_ = webpFile.Close()
		return nil, errors.Wrap(err, "failed to convert png to webp")
	}

	jpegFileName := fileName + ".jpg"

	jpegFile, err := os.Create(jpegFileName)
	if err != nil {
		return nil, err
	}

	if err := jpeg.Encode(jpegFile, src, &jpeg.Options{Quality: 100}); err != nil {
		return nil, errors.Wrap(err, "failed to encode jpeg")
	}

	r.resourceType = resource.Image

	_, _ = jpegFile.Seek(0, io.SeekStart)

	// get config
	cfgSrc, err := jpeg.DecodeConfig(jpegFile)
	if err != nil {
		return nil, err
	}

	_, _ = jpegFile.Seek(0, io.SeekStart)

	r.height = cfgSrc.Height
	r.width = cfgSrc.Width

	_, _ = jpegFile.Seek(0, io.SeekStart)
	preview, err := createPreviewFromFile(jpegFile)

	if err != nil {
		return nil, err
	}

	r.preview = preview
	r.mimeTypes = []string{"image/webp", "image/jpg"}

	r.processedId = fileName
	r.processed = true

	return []*Move{
		{
			fileName: jpegFileName,
		},
		{
			fileName: webpFileName,
		},
	}, nil
}

func createPreviewFromFile(r io.Reader) (string, error) {
	img, err := jpeg.Decode(r)

	if err != nil {
		return "", err
	}

	cols, err := prominentcolor.KmeansWithArgs(prominentcolor.ArgumentDefault, img)
	if err != nil {
		return "", err
	}

	col := cols[0]

	return fmt.Sprintf("#%02x%02x%02x", col.Color.R, col.Color.G, col.Color.B), nil
}

type ffmpegProbeStream struct {
	Streams []struct {
		Width    int    `json:"width"`
		Height   int    `json:"height"`
		Duration string `json:"duration"`
	} `json:"streams"`
}

func (r *Resource) processVideo(fileName string, file *os.File, config *Config) ([]*Move, error) {

	newVideoFileName := fileName + ".mp4"

	defaultArgs := map[string]interface{}{
		"f": "mp4",
	}

	str, err := ffmpeg_go.Probe(file.Name(), map[string]interface{}{
		"f":              "mp4",
		"show_streams":   "",
		"select_streams": "a",
	})

	if err != nil {
		zap.S().Errorw("ffmpeg_go probe error", zap.String("message", str))
		return nil, err
	}

	var probeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
		return nil, err
	}

	// "vf": "scale=-1:720" - TODO: need to scale down video if video is high resolution
	encodingArgs := ffmpeg_go.KwArgs{"c:v": "libx264", "crf": "18", "preset": "medium", "map_metadata": "-1"}

	// TODO: if there is no audio, strip it
	if len(probeResult.Streams) == 0 {
		encodingArgs["an"] = ""
	}

	ffmpegLogger := &zap_adapters.FfmpegGoLogErrorAdapter{
		Output: *new([]byte),
	}

	if err := ffmpeg_go.Input(file.Name(), defaultArgs).
		Output(newVideoFileName, encodingArgs).
		WithErrorOutput(ffmpegLogger).
		Run(); err != nil {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		r.failed = true
		return nil, nil
	}

	thumbnailFileName := "t-" + fileName + ".jpg"

	fileThumbnail, err := os.Create(thumbnailFileName)
	if err != nil {
		return nil, err
	}

	defer fileThumbnail.Close()

	if err := ffmpeg_go.Input(newVideoFileName, defaultArgs).
		Filter("select", ffmpeg_go.Args{fmt.Sprintf("gte(n,%d)", 5)}).
		Output("pipe:", ffmpeg_go.KwArgs{"vframes": 1, "format": "image2"}).
		WithErrorOutput(ffmpegLogger).
		WithOutput(fileThumbnail).
		Run(); err != nil {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		r.failed = true
		return nil, nil
	}

	videoThumb := "t-" + fileName

	str, err = ffmpeg_go.Probe(newVideoFileName, defaultArgs)

	if err != nil {
		zap.S().Errorw("ffmpeg_go probe error", zap.String("message", str))
		return nil, err
	}

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

	r.videoThumbnailMimeType = "image/jpg"
	r.videoThumbnail = videoThumb
	r.resourceType = resource.Video

	r.mimeTypes = []string{"video/mp4"}

	_, _ = fileThumbnail.Seek(0, io.SeekStart)
	preview, err := createPreviewFromFile(fileThumbnail)

	if err != nil {
		return nil, err
	}

	_, _ = fileThumbnail.Seek(0, io.SeekStart)

	r.preview = preview

	return []*Move{
		{
			fileName: thumbnailFileName,
		},
		{
			fileName: newVideoFileName,
		},
	}, nil
}

func (r *Resource) processImage(fileName string, file *os.File, config *Config) ([]*Move, error) {

	src, err := png.Decode(file)

	if err != nil {

		if err == image.ErrFormat {
			zap.S().Errorw("failed to decode png", zap.Error(err))
			r.failed = true
			return nil, nil
		}

		return nil, errors.Wrap(err, "failed to decode png")
	}

	// resize to specified width
	src = resize.Resize(uint(config.Width()), uint(config.Height()), src, resize.Lanczos3)

	webpFileName := fileName + ".webp"

	webpFile, err := os.Create(webpFileName)
	if err != nil {
		return nil, err
	}

	if err := webpbin.NewCWebP().
		Quality(80).
		InputImage(src).
		Output(webpFile).
		Run(); err != nil {
		_ = webpFile.Close()
		return nil, errors.Wrap(err, "failed to convert png to webp")
	}

	jpegFileName := fileName + ".jpg"

	jpegFile, err := os.Create(jpegFileName)
	if err != nil {
		return nil, err
	}

	if err := jpeg.Encode(jpegFile, src, &jpeg.Options{Quality: 80}); err != nil {
		return nil, errors.Wrap(err, "failed to encode jpeg")
	}

	r.resourceType = resource.Image

	_, _ = jpegFile.Seek(0, io.SeekStart)

	// get config
	cfgSrc, err := jpeg.DecodeConfig(jpegFile)
	if err != nil {
		return nil, err
	}

	_, _ = jpegFile.Seek(0, io.SeekStart)

	r.height = cfgSrc.Height
	r.width = cfgSrc.Width

	_, _ = jpegFile.Seek(0, io.SeekStart)
	preview, err := createPreviewFromFile(jpegFile)

	if err != nil {
		return nil, err
	}

	r.preview = preview
	r.mimeTypes = []string{"image/webp", "image/jpg"}

	return []*Move{
		{
			fileName: jpegFileName,
		},
		{
			fileName: webpFileName,
		},
	}, nil
}

// ProcessResource process resource - should be at a new Url and any additional mimetypes that are available
// must pass the file that needs to be processed (usually the current file, gotten from Url())
func (r *Resource) ProcessResource(file *os.File, config *Config) ([]*Move, error) {

	defer os.Remove(file.Name())
	defer file.Close()

	var moveTargets []*Move

	headBuffer := make([]byte, 261)
	_, err := file.Read(headBuffer)
	if err != nil {
		return nil, err
	}

	// do a mime type check on the file to make sure its an accepted file and to get our extension
	kind, _ := filetype.Match(headBuffer)
	if kind == filetype.Unknown {
		r.failed = false
		return nil, nil
	}

	// seek file, so we can read it again (first time we only grab a few bytes)
	_, _ = file.Seek(0, io.SeekStart)

	fileName := uuid.New().String()

	// in case we are re-processing, keep the same processed ID && override old files
	if r.processedId != "" {
		fileName = r.processedId
	}

	if kind.MIME.Value == "image/png" {

		moveTargets, err = r.processImage(fileName, file, config)

		if err != nil {
			return nil, err
		}

	} else if kind.MIME.Value == "video/mp4" {

		moveTargets, err = r.processVideo(fileName, file, config)

		if err != nil {
			return nil, err
		}

	} else {
		r.failed = true
		return nil, nil
	}

	r.processedId = fileName
	r.processed = true

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

func (r *Resource) Failed() bool {
	return r.failed
}

func (r *Resource) IsCopied() bool {
	return r.copiedFromId != ""
}

func (r *Resource) CopiedItemId() string {
	return strings.Split(r.copiedFromId, "-")[0]
}

func (r *Resource) CopiedFromId() string {
	return r.copiedFromId
}

func (r *Resource) CopiedId() string {
	return strings.Split(r.copiedFromId, "-")[1]
}

func (r *Resource) SetPrivate(private bool) {
	r.isPrivate = private
}

func (r *Resource) MimeTypes() []string {
	return r.mimeTypes
}

func (r *Resource) MakeImage() error {
	r.resourceType = resource.Image
	return nil
}

func (r *Resource) MakeVideo() error {
	r.resourceType = resource.Video
	return nil
}

func (r *Resource) IsProcessed() bool {
	return r.processed
}

func (r *Resource) LastMimeType() string {
	return r.mimeTypes[len(r.mimeTypes)-1]
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

func (r *Resource) Token() string {
	return r.token
}

func (r *Resource) IsImage() bool {
	return r.resourceType == resource.Image
}

func (r *Resource) IsVideo() bool {
	return r.resourceType == resource.Video
}

func (r *Resource) VideoThumbnailMimeType() string {
	return r.videoThumbnailMimeType
}

func (r *Resource) VideoThumbnail() string {
	return r.videoThumbnail
}

func UnmarshalResourceFromDatabase(itemId, resourceId string, tp int, isPrivate bool, mimeTypes []string, processed bool, processedId string, videoDuration int, videoThumbnail, videoThumbnailMimeType string, width, height int, preview, token string, failed bool, copiedFromId string) *Resource {

	typ, _ := resource.TypeFromInt(tp)

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
		preview:                preview,
		token:                  token,
		failed:                 failed,
		copiedFromId:           copiedFromId,
	}
}

func ToProto(res *Resource) *proto.Resource {
	var tp proto.ResourceType

	if res.IsImage() {
		tp = proto.ResourceType_IMAGE
	}

	if res.IsVideo() {
		tp = proto.ResourceType_VIDEO
	}
	return &proto.Resource{
		Id:                     res.ID(),
		ItemId:                 res.ItemId(),
		Processed:              res.IsProcessed(),
		ProcessedId:            res.ProcessedId(),
		Private:                res.IsPrivate(),
		VideoThumbnail:         res.VideoThumbnail(),
		VideoThumbnailMimeType: res.VideoThumbnailMimeType(),
		Width:                  int64(res.Width()),
		Height:                 int64(res.Height()),
		VideoDuration:          int64(res.VideoDuration()),
		MimeTypes:              res.MimeTypes(),
		Type:                   tp,
		Preview:                res.Preview(),
		Token:                  res.Token(),
		Failed:                 res.Failed(),
	}
}
