package resource

import (
	"bufio"
	bytes2 "bytes"
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
	imageAcceptedTypes = []string{"image/png", "image/jpeg"}
	videoAcceptedTypes = []string{"video/mp4", "video/x-m4v"}
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

	videoNoAudio bool

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

	// if we ask to resize width, to prevent distorting the image, we only resize if the width of the image is larger than the requested width
	// we also check width
	if config.Width() > 0 && config.Height() == 0 {
		if uint64(src.Bounds().Dx()) > config.Width() {
			src = resize.Resize(uint(config.Width()), uint(config.Height()), src, resize.Lanczos3)
		}
	} else {
		src = resize.Resize(uint(config.Width()), uint(config.Height()), src, resize.Lanczos3)
	}

	// create and apply filters
	g := gift.New()

	if filters.Pixelate() != nil {
		pixelateAmount := *filters.Pixelate()
		// in order to have a consistent pixelation filter, regardless of how large the image is,
		// we take the total amount of pixels in the image (w * h) and multiply by the percentage
		// this will be the # of pixels left
		totalPixels := float64(src.Bounds().Dx()) * float64(pixelateAmount) / float64(100)
		pixelateValue := int(math.Floor(totalPixels))
		g.Add(gift.Pixelate(pixelateValue))
	}

	pixelatedSrc := image.NewNRGBA(g.Bounds(src.Bounds()))
	g.Draw(pixelatedSrc, src)

	webpFileName := fileName + ".webp"

	webpFile, err := os.Create(webpFileName)
	if err != nil {
		return nil, err
	}

	if err := webpbin.NewCWebP().
		Quality(80).
		InputImage(pixelatedSrc).
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

	if err := jpeg.Encode(jpegFile, pixelatedSrc, &jpeg.Options{Quality: 80}); err != nil {
		return nil, errors.Wrap(err, "failed to encode jpeg")
	}

	r.resourceType = resource.Image

	r.height = pixelatedSrc.Bounds().Dy()
	r.width = pixelatedSrc.Bounds().Dx()

	_, _ = jpegFile.Seek(0, io.SeekStart)
	preview, err := createPreviewFromFile(jpegFile, false)

	if err != nil {
		return nil, err
	}

	r.preview = preview
	r.mimeTypes = []string{"image/webp", "image/jpeg"}

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

func createPreviewFromFile(r io.Reader, isVideo bool) (string, error) {
	img, err := jpeg.Decode(r)

	if err != nil {
		return "", err
	}

	var cols []prominentcolor.ColorItem

	if isVideo {
		// don't mask since videos could include black / white fade-ins
		cols, err = prominentcolor.KmeansWithAll(prominentcolor.DefaultK, img, prominentcolor.ArgumentDefault, prominentcolor.DefaultSize, []prominentcolor.ColorBackgroundMask{})
	} else {
		cols, err = prominentcolor.KmeansWithArgs(prominentcolor.ArgumentDefault, img)
	}

	if err != nil {
		return "", errors.Wrap(err, "failed to generate preview from file")
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

	// arguments we wil use to encode our video
	// h.264 codec, with crf=18 (good quality, indistinguishable from original)
	// map_metadata removes all metadata
	// sn removes subtitles
	// map 0:v:0 selects only the first video track
	encodingArgs := ffmpeg_go.KwArgs{"c:v": "libx264", "crf": "23", "preset": "slow", "map_metadata": "-1", "sn": "", "map": []string{"0:v:0"}, "threads:v": "1"}

	newVideoFileName := fileName + ".mp4"

	defaultArgs := map[string]interface{}{
		"v": "error",
	}

	ffmpegLogger := &zap_adapters.FfmpegGoLogErrorAdapter{
		Output: *new([]byte),
	}

	// first, check integrity of mp4 file before proceeding to process the video
	if err := ffmpeg_go.Input(file.Name(), defaultArgs).
		Output("pipe:", ffmpeg_go.KwArgs{
			"format": "rawvideo",
		}).
		WithOutput(ioutil.Discard).
		WithErrorOutput(ffmpegLogger).
		Run(); err != nil && len(ffmpegLogger.Output) > 0 {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		r.failed = true
		return nil, nil
	}

	// probe for audio streams
	str, err := ffmpeg_go.Probe(file.Name(), map[string]interface{}{
		"select_streams": "a",
		"show_streams":   "",
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to probe for audio stream")
	}

	var audioStreamProbeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &audioStreamProbeResult); err != nil {
		return nil, err
	}

	if len(audioStreamProbeResult.Streams) > 0 {
		bytes := bytes2.NewBuffer(nil)
		// found audio streams - get first audio stream and check if it's silent
		if err := ffmpeg_go.Input(file.Name(), ffmpeg_go.KwArgs{"loglevel": "error"}).
			Output("-", ffmpeg_go.KwArgs{"map": "0:a:0", "af": "astats=metadata=1:reset=0,ametadata=print:file=-:key=lavfi.astats.Overall.RMS_level", "f": "null"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(bytes).
			Run(); err != nil {
			zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
			return nil, err
		}

		var buffLine []byte

		reader := bufio.NewReader(bytes)

		// from our ffmpeg output, read all lines until we are at the end
		for {
			line, _, err := reader.ReadLine()

			if err == io.EOF {
				break
			}

			buffLine = line
		}

		hasSilentAudioStream := false

		// now, check our final line
		if buffLine != nil {
			result := strings.Split(string(buffLine), "=")
			if len(result) > 1 {
				// if on our final line, the overall RMS_level is -inf, then the audio stream is silent
				if result[1] == "-inf" {
					hasSilentAudioStream = true
				}
			}
		}

		// silent audio stream, remove it
		if hasSilentAudioStream {
			encodingArgs["an"] = ""
			r.videoNoAudio = true
		} else {
			// otherwise, only select the first audio stream for our encoding
			encodingArgs["map"] = append(encodingArgs["map"].([]string), "0:a:0")
		}
	} else {
		// no audio streams are on this audio track, add a flag to remove it just in case
		encodingArgs["an"] = ""
		r.videoNoAudio = true
	}

	// probe for video streams
	str, err = ffmpeg_go.Probe(file.Name(), map[string]interface{}{
		"select_streams": "v:0",
		"show_entries":   "stream=width,height",
	})

	if err != nil {
		return nil, err
	}

	var videoStreamProbeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &videoStreamProbeResult); err != nil {
		return nil, err
	}

	// logic for scaling down the video resolution if it's too large
	if len(videoStreamProbeResult.Streams) > 0 {
		firstStream := videoStreamProbeResult.Streams[0]

		// width > height, landscape
		if firstStream.Width > firstStream.Height {
			if (firstStream.Height) > 1080 {
				encodingArgs["vf"] = "scale=-2:1080"
			}
			// height > width, portrait
		} else if firstStream.Width < firstStream.Height {
			if (firstStream.Width) > 1080 {
				encodingArgs["vf"] = "scale=1080:-2"
			}
		} else if firstStream.Width == firstStream.Height {
			// otherwise, it's a square
			if (firstStream.Width) > 1080 {
				encodingArgs["vf"] = "scale=-2:1080"
			}
		}
	}

	parsedDuration, err := strconv.ParseFloat(videoStreamProbeResult.Streams[0].Duration, 64)
	if err != nil {
		return nil, err
	}

	socket, err, done := createFFMPEGTempSocket(r.itemId, r.id, parsedDuration)

	if err != nil {
		return nil, err
	}

	// make sure to call this function or socket wont close correctly
	defer done()

	if err := ffmpeg_go.Input(file.Name(), defaultArgs).
		Output(newVideoFileName, encodingArgs).
		WithErrorOutput(ffmpegLogger).
		GlobalArgs("-progress", "unix://"+socket).
		Run(); err != nil {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		return nil, err
	}

	thumbnailFileName := fileName + ".jpg"

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
		return nil, err
	}

	videoThumb := fileName

	str, err = ffmpeg_go.Probe(newVideoFileName, defaultArgs)

	if err != nil {
		return nil, err
	}

	var probeResult *ffmpegProbeStream

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

	r.videoThumbnailMimeType = "image/jpeg"
	r.videoThumbnail = videoThumb
	r.resourceType = resource.Video

	r.mimeTypes = []string{"video/mp4"}

	_, _ = fileThumbnail.Seek(0, io.SeekStart)
	preview, err := createPreviewFromFile(fileThumbnail, true)

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

func (r *Resource) processImage(mimeType string, fileName string, file *os.File, config *Config) ([]*Move, error) {

	c, _ := getSocketClient(r.itemId, r.id)
	c.Write([]byte("0"))
	defer c.Close()

	var src image.Image
	var err error

	if mimeType == "image/png" {
		src, err = png.Decode(file)
	} else {
		src, err = jpeg.Decode(file)
	}

	if err != nil {
		if err == image.ErrFormat {
			zap.S().Errorw("failed to decode image", zap.Error(err))
			r.failed = true
			return nil, nil
		}

		return nil, errors.Wrap(err, "failed to decode image")
	}

	// resize to specified width
	if config.Width() > 0 && config.Height() == 0 {
		if uint64(src.Bounds().Dx()) > config.Width() {
			src = resize.Resize(uint(config.Width()), uint(config.Height()), src, resize.Lanczos3)
		}
	} else {
		src = resize.Resize(uint(config.Width()), uint(config.Height()), src, resize.Lanczos3)
	}

	webpFileName := fileName + ".webp"

	webpFile, err := os.Create(webpFileName)
	if err != nil {
		return nil, err
	}

	if err := webpbin.NewCWebP().
		Quality(90).
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

	if err := jpeg.Encode(jpegFile, src, &jpeg.Options{Quality: 90}); err != nil {
		return nil, errors.Wrap(err, "failed to encode jpeg")
	}

	r.resourceType = resource.Image

	r.height = src.Bounds().Dy()
	r.width = src.Bounds().Dx()

	_, _ = jpegFile.Seek(0, io.SeekStart)
	preview, err := createPreviewFromFile(jpegFile, false)

	if err != nil {
		return nil, err
	}

	r.preview = preview
	r.mimeTypes = []string{"image/webp", "image/jpeg"}

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
		r.failed = true
		return nil, nil
	}

	// seek file, so we can read it again (first time we only grab a few bytes)
	_, _ = file.Seek(0, io.SeekStart)

	fileName := uuid.New().String()

	// in case we are re-processing, keep the same processed ID && override old files
	if r.processedId != "" {
		fileName = r.processedId
	}

	foundImage := false
	foundVideo := false
	mimeType := kind.MIME.Value

	for _, m := range imageAcceptedTypes {
		if m == mimeType {
			foundImage = true
			break
		}
	}

	for _, m := range videoAcceptedTypes {
		if m == mimeType {
			foundVideo = true
		}
	}

	if foundImage {
		moveTargets, err = r.processImage(mimeType, fileName, file, config)

		if err != nil {
			return nil, err
		}
	}

	if foundVideo {
		moveTargets, err = r.processVideo(fileName, file, config)

		if err != nil {
			return nil, err
		}
	}

	if !foundVideo && !foundImage {
		zap.S().Errorw("unknown mime type", zap.String("mimeType", mimeType))
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

func (r *Resource) VideoNoAudio() bool {
	return r.videoNoAudio
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

func UnmarshalResourceFromDatabase(itemId, resourceId string, tp int, isPrivate bool, mimeTypes []string, processed bool, processedId string, videoDuration int, videoThumbnail, videoThumbnailMimeType string, width, height int, preview, token string, failed bool, copiedFromId string, videoNoAudio bool) *Resource {

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
		videoNoAudio:           videoNoAudio,
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
		VideoNoAudio:           res.VideoNoAudio(),
	}
}
