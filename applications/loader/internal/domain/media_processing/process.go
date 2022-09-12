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

func init() {
	// not ideal but we need to disable the log messages from ffmpeg-go
	log.SetOutput(ioutil.Discard)
}

func createPreviewFromFile(r io.Reader, isPng bool) ([]*proto.ColorPalette, error) {

	var img image.Image
	var err error

	if isPng {
		img, err = png.Decode(r)

		if err != nil {
			return nil, errors.Wrap(err, "failed to decode png")
		}
	} else {
		img, err = jpeg.Decode(r)

		if err != nil {
			return nil, errors.Wrap(err, "failed to decode jpeg")
		}
	}

	var cols []prominentcolor.ColorItem

	cols, err = prominentcolor.KmeansWithArgs(prominentcolor.ArgumentDefault, img)

	if err != nil {
		return nil, err
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
		Width              int    `json:"width"`
		Height             int    `json:"height"`
		Duration           string `json:"duration"`
		DisplayAspectRatio string `json:"display_aspect_ratio"`
		NBReadPackets      string `json:"nb_read_packets"`
	} `json:"streams"`
	Format struct {
		Duration string `json:"duration"`
		BitRate  string `json:"bit_rate"`
	} `json:"format"`
}

func processVideo(media *media.Media, file *os.File) (*ProcessResponse, error) {

	fileName := uuid.New().String()

	videoNoAudio := true

	newVideoFileName := fileName + "/master.m3u8"

	defaultArgs := map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
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
			videoNoAudio = true
		}
	} else {
		// no audio streams are on this audio track, add a flag to remove it just in case
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

	masterPlaylistFileName := fileName + "/playlist/master.m3u8"
	defaultAppArgs := map[string]interface{}{
		"v":              "error",
		"hide_banner":    "",
		"master_pl_name": masterPlaylistFileName,
	}

	encodingArgs := ffmpeg_go.KwArgs{
		"c:v":                "libx264",
		"preset":             "medium",
		"map_metadata":       "-1",
		"sn":                 "",
		"map":                []string{"0:v:0"},
		"sc_threshold":       "0",
		"hls_time":           "3",
		"force_key_frames:v": "'expr:gte(t,n_forced*1)'",
		"hls_playlist_type":  "vod",
		"hls_segment_type":   "fmp4",
	}

	if videoNoAudio {
		encodingArgs["an"] = ""
	} else {
		encodingArgs["map"] = append(encodingArgs["map"].([]string), "0:a:0")
		encodingArgs["c:a"] = "aac"
		encodingArgs["ar"] = "48000"
	}

	input := ffmpeg_go.Input(file.Name(), defaultArgs).Split()

	var streams []*ffmpeg_go.Stream

	firstStream := videoStreamProbeResult.Streams[0]
	isLandscape := firstStream.Width > firstStream.Height
	isPortrait := firstStream.Width < firstStream.Height

	hasDefaultResolution := false
	hasFullHd := false

	if isLandscape {
		// 720+ video detected
		if firstStream.Height >= 720 && firstStream.Width >= 1280 {
			hasDefaultResolution = true
		}

		if firstStream.Height >= 1080 && firstStream.Width >= 1920 {
			hasFullHd = true
		}

	} else if isPortrait {
		if firstStream.Width >= 720 && firstStream.Height >= 1280 {
			hasDefaultResolution = true
		}

		if firstStream.Width >= 1080 && firstStream.Height >= 1920 {
			hasFullHd = true
		}
	}

	if !hasDefaultResolution && !hasFullHd {

		width := strconv.Itoa(firstStream.Width)
		height := strconv.Itoa(firstStream.Width)
		firstPrefix := width + "x" + height

		// add a regular stream
		input.Get("0").Filter("scale", ffmpeg_go.Args{"w=" + width + ":h=" + height + ":force_original_aspect_ratio=decrease"}).Output(fileName+"/playlist/"+firstPrefix+"/original.m3u8", mergeArgs(encodingArgs, ffmpeg_go.KwArgs{
			"crf":                  "22",
			"hls_segment_filename": fileName + "/segment/" + firstPrefix + "/original_%03d.ts",
		}))
	}

	if hasDefaultResolution {

		firstResolution := "w=640:h=360:force_original_aspect_ratio=decrease"
		firstPrefix := "640x360"
		secondResolution := "w=1280:h=720:force_original_aspect_ratio=decrease"
		secondPrefix := "1280x720"
		ThirdResolution := "w=852:h=480:force_original_aspect_ratio=decrease"
		ThirdPrefix := "852x480"
		if isPortrait {
			firstPrefix = "360x640"
			firstResolution = "w=360:h=640:force_original_aspect_ratio=decrease"
			secondResolution = "w=720:h=1280:force_original_aspect_ratio=decrease"
			secondPrefix = "720x1280"
			ThirdResolution = "w=480:h=852:force_original_aspect_ratio=decrease"
			ThirdPrefix = "480x852"
		}

		streams = append(streams,
			// add 360p stream
			input.Get("0").Filter("scale", ffmpeg_go.Args{firstResolution}).Output(fileName+"/playlist/"+firstPrefix+"/360p.m3u8", mergeArgs(encodingArgs, ffmpeg_go.KwArgs{
				//"b:v":                  "800k",
				//"bufsize":              "1200k",
				//"maxrate":              "856k",
				//"b:a":                  "96k",
				"crf":                  "21",
				"hls_segment_filename": fileName + "/segment/" + firstPrefix + "/360p_%03d.ts",
			})),

			// add a 480p stream
			input.Get("2").Filter("scale", ffmpeg_go.Args{ThirdResolution}).Output(fileName+"/playlist/"+ThirdPrefix+"/480p.m3u8", mergeArgs(encodingArgs, ffmpeg_go.KwArgs{
				//"b:v":                  "2800k",
				//"bufsize":              "4200k",
				//"maxrate":              "2996k",
				//"b:a":                  "128k",
				"crf":                  "21",
				"hls_segment_filename": fileName + "/segment/" + ThirdPrefix + "/480p_%03d.ts",
			})),

			// add a 720p stream
			input.Get("3").Filter("scale", ffmpeg_go.Args{secondResolution}).Output(fileName+"/playlist/"+secondPrefix+"/720p.m3u8", mergeArgs(encodingArgs, ffmpeg_go.KwArgs{
				//"b:v":                  "2800k",
				//"bufsize":              "4200k",
				//"maxrate":              "2996k",
				//"b:a":                  "128k",
				"crf":                  "21",
				"hls_segment_filename": fileName + "/segment/" + secondPrefix + "/720p_%03d.ts",
			})),
		)
	}

	if hasFullHd {
		firstResolution := "w=1920:h=1080:force_original_aspect_ratio=decrease"
		firstPrefix := "1920x1080"
		if isPortrait {
			firstResolution = "w=1080:h=1920:force_original_aspect_ratio=decrease"
			firstPrefix = "1080x1920"
		}

		streams = append(streams,
			// add 1080p stream
			input.Get("4").Filter("scale", ffmpeg_go.Args{firstResolution}).Output(fileName+"/playlist/"+firstPrefix+"/1080p.m3u8", mergeArgs(encodingArgs, ffmpeg_go.KwArgs{
				"b:v":                  "5000k",
				"maxrate":              "5350k",
				"bufsize":              "7500k",
				"b:a":                  "192k",
				"crf":                  "23",
				"hls_segment_filename": fileName + "/segment/" + firstPrefix + "/1080p_%03d.ts",
			})),
		)
	}

	finalStream := input.Get("5")

	// finally, we generate a video file that is 720p with crf of 23. this will be useful in case we can't support streaming
	if isPortrait {
		if firstStream.Width > 720 {
			finalStream.Filter("scale", ffmpeg_go.Args{"-2:720"})
		}
	} else {
		if firstStream.Height > 720 {
			finalStream.Filter("scale", ffmpeg_go.Args{"720:-1"})
		}
	}

	mp4FileName := fileName + "/raw/720p.mp4"

	streams = append(streams,
		finalStream.Output(mp4FileName, ffmpeg_go.KwArgs{
			"crf":          "23",
			"movflags":     "+faststart",
			"c:v":          "libx264",
			"preset":       "medium",
			"map_metadata": "-1",
			"sn":           "",
			"map":          []string{"0:v:0"},
		}),
	)

	if err := ffmpeg_go.Input(file.Name(), defaultAppArgs).
		OverwriteOutput(ffmpeg_go.MergeOutputs(streams...)).
		WithErrorOutput(ffmpegLogger).
		GlobalArgs("-progress", "unix://"+socket).
		Run(); err != nil {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		return nil, err
	}

	thumbnailFileName := uuid.New().String()
	var palettes []*proto.ColorPalette

	lastFrame := 5

	// keep looking for frames that are not all black
	for true {

		fileThumbnail, err := os.Create(thumbnailFileName)
		if err != nil {
			return nil, err
		}

		if err := ffmpeg_go.Input(file.Name(), defaultArgs).
			Filter("select", ffmpeg_go.Args{fmt.Sprintf("gte(n,%d)", lastFrame)}).
			Output("pipe:", ffmpeg_go.KwArgs{"vframes": 1, "format": "image2"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(fileThumbnail).
			Run(); err != nil {
			zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
			return nil, err
		}

		palettes, err = createPreviewFromFile(fileThumbnail, false)

		if err != nil {
			// fully black image - we want to find a different one
			if err.Error() == "Failed, no non-alpha pixels found (either fully transparent image, or the ColorBackgroundMask removed all pixels)" {
				_ = os.Remove(fileThumbnail.Name())
				lastFrame = lastFrame * 2
				continue
			}

			return nil, err
		}

		_ = fileThumbnail.Close()

		break
	}

	str, err = ffmpeg_go.Probe(newVideoFileName, defaultArgs)

	if err != nil {
		return nil, err
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

	widthAspect, err := strconv.ParseInt(aspectRatioSplit[0], 10, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse aspect ratio split width")
	}

	heightAspect, err := strconv.ParseInt(aspectRatioSplit[1], 10, 64)
	if err != nil {
		return nil, errors.Wrap(err, "failed to parse aspect ratio split height")
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
		Containers: []*proto.VideoContainer{
			{
				Id:       masterPlaylistFileName,
				MimeType: proto.MediaMimeType_VideoMpegUrl,
			},
			{
				Id:       mp4FileName,
				MimeType: proto.MediaMimeType_VideoMp4,
				Bitrate:  bitRate,
			},
		},
		AspectRatio: &proto.VideoAspectRatio{
			Width:  widthAspect,
			Height: heightAspect,
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
			fileName: newVideoFileName,
		},
	}}, nil
}

func mergeArgs(target ffmpeg_go.KwArgs, destination ffmpeg_go.KwArgs) ffmpeg_go.KwArgs {
	for k, v := range target {
		destination[k] = v
	}

	return destination
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
	palettes, err := createPreviewFromFile(imageFile, mimeType == "image/png")

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
	palettes, err := createPreviewFromFile(targetFile, false)

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
			isImage:  true,
		},
	}}, nil
}
