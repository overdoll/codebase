package media_processing

import (
	"bufio"
	bytes2 "bytes"
	"encoding/json"
	"fmt"
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
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"overdoll/libraries/zap_support/zap_adapters"
	"strconv"
	"strings"
	"time"
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

const (
	jpegQuality   = 80
	defaultPreset = "veryslow"
)

func init() {
	// not ideal but we need to disable the log messages from ffmpeg-go
	log.SetOutput(ioutil.Discard)
}

func createPreviewFromFile(r io.Reader, isPng bool) ([]*proto.ColorPalette, image.Image, error) {

	var img image.Image
	var err error

	if isPng {
		img, err = png.Decode(r)

		if err != nil {
			return nil, nil, errors.Wrap(err, "failed to decode png for preview")
		}
	} else {
		img, err = jpeg.Decode(r)

		if err != nil {
			return nil, nil, errors.Wrap(err, "failed to decode jpeg for preview")
		}
	}

	var cols []prominentcolor.ColorItem

	cols, err = prominentcolor.KmeansWithArgs(prominentcolor.ArgumentDefault, img)

	if err != nil {
		return nil, nil, err
	}

	totalPixels := 0

	for _, c := range cols {
		totalPixels += c.Cnt
	}

	var palettes []*proto.ColorPalette

	for i, col := range cols {

		if i == 3 {
			break
		}

		palettes = append(palettes, &proto.ColorPalette{
			Percent: math.Round(100*(float64(col.Cnt)/float64(totalPixels)*float64(100))) / 100,
			Red:     col.Color.R,
			Green:   col.Color.G,
			Blue:    col.Color.B,
		})
	}

	return palettes, img, nil
}

type ffmpegProbeStream struct {
	Streams []struct {
		Width              int     `json:"width"`
		Height             int     `json:"height"`
		Duration           string  `json:"duration"`
		DisplayAspectRatio string  `json:"display_aspect_ratio"`
		NBReadPackets      string  `json:"nb_read_packets"`
		FrameRate          float64 `json:"r_frame_rate"`
	} `json:"streams"`
	Format struct {
		Duration string `json:"duration"`
		BitRate  string `json:"bit_rate"`
	} `json:"format"`
}

func processVideo(media *media.Media, file *os.File) (*ProcessResponse, error) {

	fileName := uuid.New().String()
	targetFileName := file.Name()

	videoNoAudio := false

	newVideoFileName := fileName + "/master.m3u8"

	defaultArgs := map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
	}

	ffmpegLogger := &zap_adapters.FfmpegGoLogErrorAdapter{
		Output: *new([]byte),
	}

	// first, check integrity of mp4 file before proceeding to process the video
	if err := ffmpeg_go.Input(targetFileName, defaultArgs).
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
		if err := ffmpeg_go.Input(targetFileName, ffmpeg_go.KwArgs{"loglevel": "error"}).
			Output("-", ffmpeg_go.KwArgs{"map": "0:a:0", "af": "astats=metadata=1:reset=0,ametadata=print:file=-:key=lavfi.astats.Overall.RMS_level", "f": "null"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(bytes).
			Run(); err != nil {
			return nil, errors.Wrap(err, string(ffmpegLogger.Output))
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
			videoNoAudio = true
		}
	} else {
		// no audio streams are on this audio track, add a flag to remove it just in case
		videoNoAudio = true
	}

	// if the video doesn't have audio, we need to re-encode it with a blank audio stream or HLS doesn't like it
	if videoNoAudio {
		newFileNameWithAudio := uuid.New().String()
		if err := ffmpeg_go.
			Input(targetFileName, map[string]interface{}{
				"v":           "error",
				"hide_banner": "",
				"i":           "anullsrc",
				"f":           "lavfi",
			}).
			Output(newFileNameWithAudio, ffmpeg_go.KwArgs{
				"c:v":      "copy",
				"c:a":      "aac",
				"map":      []string{"1:v", "0:a"},
				"shortest": "",
				"format":   "mp4",
			}).
			WithErrorOutput(ffmpegLogger).
			Run(); err != nil {
			return nil, errors.Wrap(err, "failed to generate blank stream for video audio: "+string(ffmpegLogger.Output))
		}
		targetFileName = newFileNameWithAudio
		// remove the file since we won't need it
		defer os.Remove(newFileNameWithAudio)
	}

	// probe for video streams
	str, err = ffmpeg_go.Probe(targetFileName, map[string]interface{}{
		"select_streams": "v:0",
		"show_entries":   "stream=width,height,r_frame_rate",
		"show_format":    "",
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to probe for video stream")
	}

	var videoStreamProbeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &videoStreamProbeResult); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal probe stream")
	}

	parsedDuration, err := strconv.ParseFloat(videoStreamProbeResult.Format.Duration, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse duration")
	}

	firstStream := videoStreamProbeResult.Streams[0]
	isLandscape := firstStream.Width > firstStream.Height
	isPortrait := firstStream.Width < firstStream.Height

	thumbnailFileName := uuid.New().String()
	var palettes []*proto.ColorPalette
	var img image.Image

	lastFrame := 5
	foundFrame := false

	// keep looking for frames that are not all black (we can successfully generate a preview
	for start := time.Now(); time.Since(start) < time.Second*10; {

		fileThumbnail, err := os.Create(thumbnailFileName)
		if err != nil {
			return nil, err
		}

		if err := ffmpeg_go.Input(targetFileName, defaultArgs).
			Filter("select", ffmpeg_go.Args{fmt.Sprintf("gte(n,%d)", lastFrame)}).
			Output("pipe:", ffmpeg_go.KwArgs{"vframes": 1, "format": "image2"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(fileThumbnail).
			Run(); err != nil {
			return nil, errors.Wrap(err, "failed to generate thumbnail: "+string(ffmpegLogger.Output))
		}

		_, _ = fileThumbnail.Seek(0, io.SeekStart)
		palettes, img, err = createPreviewFromFile(fileThumbnail, false)

		if err != nil {
			// fully black image - we want to find a different one
			if err.Error() == "Failed, no non-alpha pixels found (either fully transparent image, or the ColorBackgroundMask removed all pixels)" {
				_ = os.Remove(fileThumbnail.Name())
				lastFrame += 30
				continue
			}

			return nil, err
		}

		_ = fileThumbnail.Close()
		foundFrame = true

		break
	}

	if !foundFrame {
		return nil, errors.New("failed to find a frame thumbnail in time")
	}

	requiresResizing := false

	if isPortrait {
		if img.Bounds().Dx() > 1080 {
			requiresResizing = true
		}
	} else {
		if img.Bounds().Dy() > 1080 {
			requiresResizing = true
		}
	}

	// make sure to resize our thumbnail if needed (since we look at the source video for the thumbnail)
	if requiresResizing {
		_ = os.Remove(thumbnailFileName)

		resizeWidth := 1920
		resizeHeight := 1080

		if isLandscape {
			resizeWidth = 1080
			resizeHeight = 1920
		}

		src := resize.Resize(uint(resizeWidth), uint(resizeHeight), img, resize.Lanczos3)

		jpegFile, err := os.Create(thumbnailFileName)
		if err != nil {
			return nil, err
		}

		if err := jpeg.Encode(jpegFile, src, &jpeg.Options{Quality: jpegQuality}); err != nil {
			return nil, errors.Wrap(err, "failed to encode jpeg")
		}

		img = src

		_ = jpegFile.Close()
	}

	type resolutionTarget struct {
		high    int
		low     int
		rate    string
		ar      string
		maxFps  int
		profile string
	}

	resolutionTargets := []resolutionTarget{
		{
			high:    1920,
			low:     1080,
			ar:      "128k",
			rate:    "3100k",
			maxFps:  60,
			profile: "high",
		},
		{
			high:    1280,
			low:     720,
			ar:      "96k",
			rate:    "1800k",
			maxFps:  60,
			profile: "high",
		},
		{
			high:    854,
			low:     480,
			ar:      "48k",
			rate:    "900k",
			maxFps:  60,
			profile: "high",
		},
		{
			high:    640,
			low:     360,
			ar:      "48k",
			rate:    "500k",
			maxFps:  30,
			profile: "baseline",
		},
	}

	var scales []resolutionTarget

	requiresResize := false

	if isLandscape {
		if firstStream.Width > 1920 {
			requiresResize = true
		}
	} else {
		if firstStream.Height > 1920 {
			requiresResize = true
		}
	}

	for _, target := range resolutionTargets {
		if isLandscape {
			if firstStream.Height >= target.low {
				scales = append(scales, target)
			}
		} else {
			if firstStream.Width >= target.low {
				scales = append(scales, target)
			}
		}
	}

	socket, err, done := createFFMPEGTempSocket(media.RawProto().Id, parsedDuration)

	if err != nil {
		return nil, err
	}

	//// make sure to call this function or socket won't close correctly
	defer done()

	defaultAllArgs := map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
		"progress":    "unix://" + socket,
	}

	mp4FileArgs := ffmpeg_go.KwArgs{
		"c:v":          "libx264",
		"preset":       defaultPreset,
		"movflags":     "+faststart",
		"crf":          "23",
		"map_metadata": "-1",
		"map":          []string{"0:v:0"},
	}

	var streams []*ffmpeg_go.Stream
	var streamMap string

	width := strconv.Itoa(firstStream.Width)
	height := strconv.Itoa(firstStream.Width)
	firstPrefix := width + "x" + height

	firstSegmentDirectory := fileName + "/" + firstPrefix
	_ = os.MkdirAll(firstSegmentDirectory, os.ModePerm)
	firstPlaylistDirectory := fileName + "/" + firstPrefix
	_ = os.MkdirAll(firstPlaylistDirectory, os.ModePerm)

	mp4RawDirectory := fileName + "/raw"
	_ = os.MkdirAll(mp4RawDirectory, os.ModePerm)
	mp4FileName := mp4RawDirectory + "/low_res.mp4"

	generatedSoloFile := false

	input := ffmpeg_go.Input(targetFileName, defaultAllArgs)

	for i, scale := range scales {
		index := strconv.Itoa(i)

		streamTarget := "v:" + index + ",a:" + index
		if i == len(scales)-1 {
			streamMap += streamTarget
		} else {
			streamMap += streamTarget + ","
		}

		var targetScale string

		convertedLow := strconv.Itoa(scale.low)
		convertedHigh := strconv.Itoa(scale.high)

		if isLandscape {
			if firstStream.Height >= scale.low {
				if requiresResize {
					targetScale = "w=" + convertedHigh + ":h=" + convertedLow
				} else {
					targetScale = "w=-2:h=" + convertedLow
				}
			}
		} else {
			if firstStream.Width >= scale.low {
				if requiresResize {
					targetScale = "w=" + convertedLow + ":h=" + convertedHigh
				} else {
					targetScale = "w=" + convertedLow + ":h=-2"
				}
			}
		}

		overlay := input.Filter("boxblur", ffmpeg_go.Args{"40", targetScale, "setsar=1"})
		scaleWithAspectRatio := targetScale + ":force_original_aspect_ratio=decrease"

		overlayScale := ffmpeg_go.KwArgs{"y": "(H-h)/2"}

		if isPortrait {
			overlayScale = ffmpeg_go.KwArgs{"x": "(W-w)/2"}
		}

		streams = append(streams,
			input.Get(index).
				Filter("scale", ffmpeg_go.Args{scaleWithAspectRatio}).
				Overlay(overlay, "", overlayScale).
				Output(fileName+"/segment_"+index+"_%v.m3u8", ffmpeg_go.KwArgs{
					"c:v":              "libx264",
					"c:a":              "aac",
					"ar":               scale.ar,
					"maxrate":          scale.rate,
					"bufsize":          scale.rate,
					"tune":             "animation",
					"crf":              "23",
					"profile:v":        scale.profile,
					"force_key_frames": "'expr:gte(t,n_forced*3)'",
					"preset":           defaultPreset,
					"sc_threshold":     "0",
					"map_metadata":     "-1",
				}),
		)

		if scale.low <= 720 && !generatedSoloFile {

			generatedSoloFile = true

			if !videoNoAudio {
				mp4FileArgs["c:a"] = "aac"
				mp4FileArgs["b:a"] = scale.ar
				mp4FileArgs["ac"] = "2"
				mp4FileArgs["map"] = append(mp4FileArgs["map"].([]string), "0:a:0")
			} else {
				mp4FileArgs["an"] = ""
			}

			streams = append(streams,
				input.Get(strconv.Itoa(len(scales))).
					Overlay(overlay, "", overlayScale).
					Filter("scale", ffmpeg_go.Args{scaleWithAspectRatio}).
					Output(mp4FileName, mp4FileArgs),
			)
		}
	}

	if err := ffmpeg_go.MergeOutputs(streams...).
		WithErrorOutput(ffmpegLogger).
		WithCpuCoreLimit(2).
		WithCpuCoreRequest(2).
		GlobalArgs(
			"hls_time", "3",
			"hls_playlist_type", "vod",
			"hls_segment_type", "fmp4",
			"master_pl_name", "master.m3u8",
			"hls_segment_filename", fileName+"/stream_%v_%02d.m4s",
			"var_stream_map", streamMap,
		).
		Run(); err != nil {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		return nil, err
	}

	str, err = ffmpeg_go.Probe(mp4FileName, map[string]interface{}{
		"v":            "error",
		"show_entries": "stream=width,height,display_aspect_ratio,bit_rate",
		"show_format":  "",
		"hide_banner":  "",
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to probe new video file")
	}

	var probeResult *ffmpegProbeStream

	if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal probe stream #2")
	}

	bitRate, err := strconv.ParseInt(probeResult.Format.BitRate, 10, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse bit rate")
	}

	s, err := strconv.ParseFloat(probeResult.Format.Duration, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse probe duration")
	}

	aspectRatioSplit := strings.Split(probeResult.Streams[0].DisplayAspectRatio, ":")

	var widthAspect int64
	var heightAspect int64

	if len(aspectRatioSplit) == 2 {
		widthAspect, err = strconv.ParseInt(aspectRatioSplit[0], 10, 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse aspect ratio split width")
		}

		heightAspect, err = strconv.ParseInt(aspectRatioSplit[1], 10, 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse aspect ratio split height")
		}
	} else {
		widthAspect = 0
		heightAspect = 0
	}

	// update the source image data - this is used for the thumbnail
	media.RawProto().ImageData = &proto.ImageData{
		Id:       thumbnailFileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Width:    uint32(img.Bounds().Dx()),
		Height:   uint32(img.Bounds().Dy()),
		Palettes: palettes,
	}

	media.RawProto().VideoData = &proto.VideoData{
		Containers: []*proto.VideoContainer{
			{
				Id:       newVideoFileName,
				MimeType: proto.MediaMimeType_VideoMpegUrl,
			},
			{
				Id:       mp4FileName,
				MimeType: proto.MediaMimeType_VideoMp4,
				Bitrate:  uint64(bitRate),
				Width:    uint32(probeResult.Streams[0].Width),
				Height:   uint32(probeResult.Streams[0].Height),
			},
		},
		AspectRatio: &proto.VideoAspectRatio{
			Width:  uint32(widthAspect),
			Height: uint32(heightAspect),
		},
		DurationMilliseconds: int64(math.Round(s * 1000)),
		HasAudio:             !videoNoAudio,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: thumbnailFileName,
			isImage:  true,
		},
		{
			directory: fileName,
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

	isPortrait := src.Bounds().Dy() > src.Bounds().Dx()

	// if larger than 4096, we resize to save on storage space && resizing operations at origin
	if isPortrait && src.Bounds().Dy() > 4096 {
		src = resize.Resize(0, 4096, src, resize.Lanczos3)
	} else if !isPortrait && src.Bounds().Dx() > 4096 {
		src = resize.Resize(4096, 0, src, resize.Lanczos3)
	}

	var imageFile *os.File

	imageFile, err = os.Create(fileName)
	if err != nil {
		return nil, err
	}

	if err := jpeg.Encode(imageFile, src, &jpeg.Options{Quality: jpegQuality}); err != nil {
		return nil, errors.Wrap(err, "failed to encode jpeg")
	}

	_, _ = imageFile.Seek(0, io.SeekStart)
	palettes, _, err := createPreviewFromFile(imageFile, false)

	if err != nil {
		return nil, err
	}

	// update the source image data
	media.RawProto().ImageData = &proto.ImageData{
		Id:       fileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Width:    uint32(src.Bounds().Dx()),
		Height:   uint32(src.Bounds().Dy()),
		Palettes: palettes,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: fileName,
			isImage:  true,
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
			break
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
	if err := jpeg.Encode(targetFile, pixelatedSrc, &jpeg.Options{Quality: jpegQuality}); err != nil {
		return nil, errors.Wrap(err, "failed to encode jpeg")
	}

	_, _ = targetFile.Seek(0, io.SeekStart)
	palettes, _, err := createPreviewFromFile(targetFile, false)

	if err != nil {
		return nil, err
	}

	// update the source image data
	media.RawProto().ImageData = &proto.ImageData{
		Id:       finalFileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Width:    uint32(src.Bounds().Dx()),
		Height:   uint32(src.Bounds().Dy()),
		Palettes: palettes,
	}

	return &ProcessResponse{move: []*Move{
		{
			fileName: finalFileName,
			isImage:  true,
		},
	}}, nil
}
