package media_processing

import (
	"bufio"
	bytes2 "bytes"
	"encoding/json"
	"fmt"
	"github.com/EdlinOrg/prominentcolor"
	"github.com/disintegration/gift"
	"github.com/h2non/filetype"
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
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"overdoll/libraries/zap_support/zap_adapters"
	"strconv"
	"strings"
)

type ErrorMediaCallbackNotFound struct{}

func newMediaCallbackNotFound() error {
	return &ErrorMediaCallbackNotFound{}
}

func (c *ErrorMediaCallbackNotFound) Error() string {
	return "media callback not found"
}

var (
	ErrFileTypeNotAllowed    = domainerror.NewValidation("filetype not allowed")
	ErrMediaCallbackNotFound = newMediaCallbackNotFound()
)

// accepted formats
var (
	imageAcceptedTypes = []string{"image/png", "image/jpeg"}
	videoAcceptedTypes = []string{"video/mp4", "video/x-m4v", "video/quicktime", "video/webm"}
)

var (
	maxImageWidthOrHeight = 4096
)

func init() {
	// not ideal but we need to disable the log messages from ffmpeg-go
	log.SetOutput(ioutil.Discard)
}

func createPreviewFromFile(r io.Reader) ([]*proto.ColorPalette, error) {

	img, err := jpeg.Decode(r)

	if err != nil {
		return nil, errors.Wrap(err, "failed to decode jpeg")
	}

	var cols []prominentcolor.ColorItem

	cols, err = prominentcolor.KmeansWithArgs(prominentcolor.ArgumentDefault, img)

	if err != nil {

		if err.Error() == "Failed, no non-alpha pixels found (either fully transparent image, or the ColorBackgroundMask removed all pixels)" {

			err = nil
			cols, err = prominentcolor.KmeansWithAll(prominentcolor.DefaultK, img, prominentcolor.ArgumentDefault, prominentcolor.DefaultSize, []prominentcolor.ColorBackgroundMask{})

			if err != nil {
				return nil, errors.Wrap(err, "failed to generate preview from file")
			}
		}

		if err != nil {
			return nil, err
		}
	}

	var palettes []*proto.ColorPalette

	for _, col := range cols {
		palettes = append(palettes, &proto.ColorPalette{
			Percent: 0,
			Red:     int32(col.Color.R),
			Green:   int32(col.Color.G),
			Blue:    int32(col.Color.B),
		})
	}

	return palettes, nil
}

type ffmpegProbeStream struct {
	Streams []struct {
		Width    int    `json:"width"`
		Height   int    `json:"height"`
		Duration string `json:"duration"`
	} `json:"streams"`
	Format struct {
		Duration string `json:"duration"`
	} `json:"format"`
}

func processVideo(media *media.Media, file *os.File) (*ProcessResponse, error) {

	fileName := uuid.New().String()

	videoNoAudio := true

	// arguments we wil use to encode our video
	// h.264 codec, with crf=18 (good quality, indistinguishable from original)
	// map_metadata removes all metadata
	// sn removes subtitles
	// map 0:v:0 selects only the first video track
	encodingArgs := ffmpeg_go.KwArgs{"c:v": "libx264", "crf": "23", "preset": "slow", "map_metadata": "-1", "sn": "", "map": []string{"0:v:0"}, "threads:v": "1", "movflags": "+faststart"}

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
		return &ProcessResponse{failed: true}, nil
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
			videoNoAudio = true
		} else {
			// otherwise, only select the first audio stream for our encoding
			encodingArgs["map"] = append(encodingArgs["map"].([]string), "0:a:0")
		}
	} else {
		// no audio streams are on this audio track, add a flag to remove it just in case
		encodingArgs["an"] = ""
		videoNoAudio = true
	}

	// probe for video streams
	str, err = ffmpeg_go.Probe(file.Name(), map[string]interface{}{
		"select_streams": "v:0",
		"show_entries":   "stream=width,height",
		"show_format":    "",
	})

	if err != nil {
		return nil, err
	}

	var videoStreamProbeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &videoStreamProbeResult); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal probe stream")
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

	parsedDuration, err := strconv.ParseFloat(videoStreamProbeResult.Format.Duration, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse duration")
	}

	socket, err, done := createFFMPEGTempSocket(media.RawProto().Id, parsedDuration)

	if err != nil {
		return nil, err
	}

	// make sure to call this function or socket won't close correctly
	defer done()

	if err := ffmpeg_go.Input(file.Name(), defaultArgs).
		Output(newVideoFileName, encodingArgs).
		WithErrorOutput(ffmpegLogger).
		GlobalArgs("-progress", "unix://"+socket).
		Run(); err != nil {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		return nil, err
	}

	thumbnailFileName := uuid.New().String()

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

	str, err = ffmpeg_go.Probe(newVideoFileName, defaultArgs)

	if err != nil {
		return nil, err
	}

	var probeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal probe stream #2")
	}

	s, err := strconv.ParseFloat(probeResult.Format.Duration, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse probe duration")
	}

	_, _ = fileThumbnail.Seek(0, io.SeekStart)
	palettes, err := createPreviewFromFile(fileThumbnail)

	if err != nil {
		return nil, errors.Wrap(err, "failed to create preview from thumbnail")
	}

	// update the source image data - this is used for the thumbnail
	media.RawProto().ImageData = &proto.ImageData{
		Id:       fileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Width:    int64(probeResult.Streams[0].Width),
		Height:   int64(probeResult.Streams[0].Height),
		Palettes: palettes,
	}

	media.RawProto().VideoData = &proto.VideoData{
		Containers: []*proto.VideoContainer{{
			Id:       fileName + ".mp4",
			MimeType: proto.MediaMimeType_VideoMp4,
			Bitrate:  0,
		}},
		AspectRatio: &proto.VideoAspectRatio{
			Width:  0,
			Height: 0,
		},
		DurationMilliseconds: int64(math.Round(s * 1000)),
		HasAudio:             !videoNoAudio,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: thumbnailFileName,
		},
		{
			fileName: newVideoFileName,
		},
	}}, nil
}

func processImage(media *media.Media, mimeType string, file *os.File) (*ProcessResponse, error) {

	fileName := uuid.New().String()

	var src image.Image
	var err error

	if mimeType == "image/png" {
		src, err = png.Decode(file)
		// check for png format error
		var formatError png.FormatError
		if errors.As(err, &formatError) {
			zap.S().Errorw("failed to decode png", zap.Error(err))
			return &ProcessResponse{failed: true}, nil
		}
	} else {
		src, err = jpeg.Decode(file)
		// check for jpeg format error
		var formatError jpeg.FormatError
		if errors.As(err, &formatError) {
			zap.S().Errorw("failed to decode jpeg", zap.Error(err))
			return &ProcessResponse{failed: true}, nil
		}
	}

	if err != nil {
		return nil, errors.Wrap(err, "failed to decode image")
	}

	imageFile, err := os.Create(fileName)
	if err != nil {
		return nil, err
	}

	var finalMimeType proto.MediaMimeType

	if mimeType == "image/png" {
		finalMimeType = proto.MediaMimeType_ImagePng
		if err := png.Encode(imageFile, src); err != nil {
			return nil, errors.Wrap(err, "failed to encode png")
		}
	} else {
		finalMimeType = proto.MediaMimeType_ImageJpeg
		if err := jpeg.Encode(imageFile, src, &jpeg.Options{Quality: 100}); err != nil {
			return nil, errors.Wrap(err, "failed to encode jpeg")
		}
	}

	_, _ = imageFile.Seek(0, io.SeekStart)
	palettes, err := createPreviewFromFile(imageFile)

	if err != nil {
		return nil, err
	}

	// update the source image data
	media.RawProto().ImageData = &proto.ImageData{
		Id:       fileName,
		MimeType: finalMimeType,
		Width:    int64(src.Bounds().Dx()),
		Height:   int64(src.Bounds().Dy()),
		Palettes: palettes,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: fileName,
		},
	}}, nil
}

func ProcessMedia(media *media.Media, file *os.File) (*ProcessResponse, error) {

	defer os.Remove(file.Name())
	defer file.Close()

	headBuffer := make([]byte, 261)
	_, err := file.Read(headBuffer)
	if err != nil {
		return nil, err
	}

	// do a mime type check on the file to make sure its an accepted file and to get our extension
	kind, _ := filetype.Match(headBuffer)
	if kind == filetype.Unknown {
		return &ProcessResponse{failed: true}, nil
	}

	// seek file, so we can read it again (first time we only grab a few bytes)
	_, _ = file.Seek(0, io.SeekStart)

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

	var response *ProcessResponse

	if foundImage {
		response, err = processImage(media, mimeType, file)

		if err != nil {
			return nil, err
		}
	}

	if foundVideo {
		response, err = processVideo(media, file)

		if err != nil {
			return nil, err
		}
	}

	if !foundImage && !foundVideo {
		zap.S().Errorw("unknown mime type", zap.String("mimeType", mimeType))
		return &ProcessResponse{failed: true}, nil
	}

	media.RawProto().State.Processed = true
	media.RawProto().State.Failed = false

	return response, nil
}

func ApplyFilters(media *media.Media, file *os.File, filters *ImageFilters, mimeType proto.MediaMimeType) (*ProcessResponse, error) {

	defer file.Close()
	defer os.Remove(file.Name())

	var src image.Image
	var err error

	if mimeType == proto.MediaMimeType_ImagePng {
		src, err = png.Decode(file)
		if err != nil {
			return nil, errors.Wrap(err, "failed to decode png")
		}
	} else {
		src, err = jpeg.Decode(file)
		if err != nil {
			return nil, errors.Wrap(err, "failed to encode jpeg")
		}
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

	finalFileName := uuid.New().String()

	targetFile, err := os.Create(finalFileName)
	if err != nil {
		return nil, err
	}

	// when filters are applied, this is usually to an existing JPEG, so it has already been compressed
	// we want to avoid compressing it twice, so we set the quality to 100
	if err := jpeg.Encode(targetFile, pixelatedSrc, &jpeg.Options{Quality: 100}); err != nil {
		return nil, errors.Wrap(err, "failed to encode jpeg")
	}

	_, _ = targetFile.Seek(0, io.SeekStart)
	palettes, err := createPreviewFromFile(targetFile)

	if err != nil {
		return nil, err
	}

	// update the source image data
	media.RawProto().ImageData = &proto.ImageData{
		Id:       finalFileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Width:    int64(src.Bounds().Dx()),
		Height:   int64(src.Bounds().Dy()),
		Palettes: palettes,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: finalFileName,
		},
	}}, nil
}
