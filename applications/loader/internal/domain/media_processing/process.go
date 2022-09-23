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
	"github.com/oliamb/cutter"
	ffmpeg_go "github.com/u2takey/ffmpeg-go"
	"go.uber.org/zap"
	"image"
	"image/jpeg"
	"image/png"
	_ "image/png"
	"io"
	"io/fs"
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
	"path/filepath"
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
	jpegQuality   = 85
	defaultPreset = "slow"
)

func init() {
	// not ideal but we need to disable the log messages from: ffmpeg-go
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
		Width              int    `json:"width"`
		Height             int    `json:"height"`
		Duration           string `json:"duration"`
		DisplayAspectRatio string `json:"display_aspect_ratio"`
		NBReadPackets      string `json:"nb_read_packets"`
		FrameRate          string `json:"r_frame_rate"`
		BitRate            string `json:"bit_rate"`
		CodecTagString     string `json:"codec_tag_string"`
		Profile            string `json:"profile"`
		Level              int    `json:"level"`
	} `json:"streams"`
	Format struct {
		Duration string `json:"duration"`
		BitRate  string `json:"bit_rate"`
	} `json:"format"`
}

type ffmpegPacket struct {
	Size         string `json:"size"`
	DurationTime string `json:"duration_time"`
	PtsTime      string `json:"pts_time"`
}

type ffmpegPacketsProbe struct {
	Packets []ffmpegPacket `json:"packets"`
}

func processVideo(target *media.Media, file *os.File) (*ProcessResponse, error) {

	fileName := uuid.New().String()
	targetFileName := file.Name()

	videoNoAudio := false

	ffmpegLogger := &zap_adapters.FfmpegGoLogErrorAdapter{
		Output: *new([]byte),
	}

	validationSocket, err, cleanupValidationSocket := createFFMPEGTempSocket(target.RawProto().Id, 0, true)

	if err != nil {
		return nil, err
	}

	//// make sure to call this function or socket won't close correctly
	defer cleanupValidationSocket()

	// first, check integrity of mp4 file before proceeding to process the video
	if err := ffmpeg_go.Input(targetFileName, map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
		"progress":    "unix://" + validationSocket,
	}).
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

	type resolutionTarget struct {
		high    int
		low     int
		rate    string
		ar      string
		maxFps  int
		profile string
		level   string
		crf     string
	}

	resolutionTargets := []resolutionTarget{
		{
			high:    1920,
			low:     1080,
			ar:      "128k",
			rate:    "3100k",
			maxFps:  60,
			profile: "high",
			level:   "4.2",
			crf:     "23",
		},
		{
			high:    1280,
			low:     720,
			ar:      "96k",
			rate:    "1800k",
			maxFps:  60,
			profile: "high",
			level:   "3.2",
			crf:     "23",
		},
		{
			high:    854,
			low:     480,
			ar:      "48k",
			rate:    "900k",
			maxFps:  30,
			profile: "main",
			level:   "3.1",
			crf:     "23",
		},
		{
			high:    480,
			low:     270,
			ar:      "48k",
			rate:    "500k",
			maxFps:  30,
			profile: "main",
			level:   "3.0",
			crf:     "23",
		},
	}

	var scales []resolutionTarget

	requiresResize := false
	hasOversized := false

	if isLandscape {
		if firstStream.Width > 1920 {
			requiresResize = true
		}

		if firstStream.Height > 1080 {
			hasOversized = true
		}
	} else {
		if firstStream.Height > 1920 {
			requiresResize = true
		}

		if firstStream.Width > 1080 {
			hasOversized = true
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

	if !requiresResize && !hasOversized {
		if len(scales) < 4 {

			var high, low int

			if isLandscape {
				high = firstStream.Width
				low = firstStream.Height
			} else {
				high = firstStream.Height
				low = firstStream.Width
			}

			var highTarget, lowTarget int

			if isLandscape {
				highTarget = scales[0].high
				lowTarget = scales[0].low
			} else {
				highTarget = scales[0].low
				lowTarget = scales[0].high
			}

			// include original resolution if the original resolution isn't the top one
			if high != highTarget && low != lowTarget {
				scales = append([]resolutionTarget{{
					high:    high,
					low:     low,
					ar:      "96k",
					rate:    "3100k",
					maxFps:  60,
					profile: "high",
					level:   "4.2",
					crf:     "23",
				}}, scales...)
			}
		}
	}

	processSocket, err, processCleanup := createFFMPEGTempSocket(target.RawProto().Id, parsedDuration, false)

	if err != nil {
		return nil, err
	}

	defer processCleanup()

	defaultAllArgs := map[string]interface{}{
		"v":           "error",
		"hide_banner": "",
		"progress":    "unix://" + processSocket,
	}

	var streams []*ffmpeg_go.Stream

	mp4RawDirectory := fileName
	mp4ActualFileName := "original.mp4"
	_ = os.MkdirAll(mp4RawDirectory, os.ModePerm)
	mp4FileName := mp4RawDirectory + "/" + mp4ActualFileName

	generatedSoloFile := false

	input := ffmpeg_go.Input(targetFileName, defaultAllArgs).Split()

	for i, scale := range scales {

		index := strconv.Itoa(i)

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

		fpsTarget := ""

		parsedFps := strings.Split(firstStream.FrameRate, "/")
		fpsDecimalFirst, err := strconv.ParseFloat(parsedFps[0], 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse first decimal")
		}
		fpsDecimalSecond, err := strconv.ParseFloat(parsedFps[1], 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse second decimal")
		}

		targetFrameRate := fpsDecimalFirst / fpsDecimalSecond

		// check if we need to limit our framerate
		if targetFrameRate > float64(scale.maxFps) {
			fpsTarget = strconv.Itoa(scale.maxFps)
		}

		// helper function to create a playlist variant
		createVariant := func(index, fileName string, args ffmpeg_go.KwArgs) {
			scaleWithAspectRatio := targetScale

			if requiresResize {
				scaleWithAspectRatio += ":force_original_aspect_ratio=decrease"
			}

			overlay := input.Get(index).
				Filter("scale", ffmpeg_go.Args{targetScale})

			if requiresResize {
				overlay = overlay.Filter("crop", ffmpeg_go.Args{"h=ceil(ih/2)*2"}).
					Filter("gblur", ffmpeg_go.Args{"sigma=20"})
			}

			if fpsTarget != "" {
				overlay = overlay.Filter("fps", ffmpeg_go.Args{fpsTarget})
			}

			overlayScale := ffmpeg_go.KwArgs{"x": "(main_w-overlay_w)/2", "y": "(main_h-overlay_h)/2"}

			if requiresResize {
				baseStream := input.Get("0"+index).
					Filter("scale", ffmpeg_go.Args{scaleWithAspectRatio})

				if fpsTarget != "" {
					baseStream = baseStream.Filter("fps", ffmpeg_go.Args{fpsTarget})
				}

				overlay = overlay.Overlay(baseStream, "", overlayScale)
			}

			streams = append(streams, overlay.
				Output(fileName, args))
		}

		hlsArgs := ffmpeg_go.KwArgs{
			"c:v":                    "libx264",
			"maxrate":                scale.rate,
			"bufsize":                scale.rate,
			"tune":                   "animation",
			"crf":                    scale.crf,
			"profile:v":              scale.profile,
			"force_key_frames":       "expr:gte(t,n_forced*3)",
			"preset":                 defaultPreset,
			"sc_threshold":           "0",
			"map_metadata":           "-1",
			"hls_segment_filename":   fileName + "/sg_" + index + "_%v_%02d.m4s",
			"hls_fmp4_init_filename": "init_" + index + ".mp4",
			"hls_time":               "3",
			"hls_playlist_type":      "vod",
			"hls_segment_type":       "fmp4",
			"hls_list_size":          "0",
			"level":                  scale.level,
		}

		if videoNoAudio {
			hlsArgs["an"] = ""
		} else {
			hlsArgs["c:a"] = "aac"
			hlsArgs["b:a"] = scale.ar
			hlsArgs["ar"] = "48000"
			hlsArgs["ac"] = "2"
			hlsArgs["map"] = []string{"0:a:0"}
		}

		createVariant(index, fileName+"/pl_"+index+"_%v.m3u8", hlsArgs)

		if scale.low <= 720 && !generatedSoloFile {

			mp4FileArgs := ffmpeg_go.KwArgs{
				"c:v":          "libx264",
				"preset":       defaultPreset,
				"movflags":     "+faststart",
				"crf":          "23",
				"map_metadata": "-1",
				"tune":         "animation",
				"profile":      "high",
				"level":        "3.2",
			}

			generatedSoloFile = true

			if !videoNoAudio {
				mp4FileArgs["c:a"] = "aac"
				mp4FileArgs["ar"] = "48000"
				mp4FileArgs["b:a"] = scale.ar
				mp4FileArgs["ac"] = "2"
				mp4FileArgs["map"] = []string{"0:a:0"}
			} else {
				mp4FileArgs["an"] = ""
			}

			mp4Index := strconv.Itoa(len(scales))

			createVariant(mp4Index, mp4FileName, mp4FileArgs)
		}
	}

	ffprobeSettings := map[string]interface{}{
		"v":            "error",
		"show_entries": "stream=width,height,display_aspect_ratio,bit_rate,codec_tag_string,profile,level",
		"show_format":  "",
		"hide_banner":  "",
	}

	if err := ffmpeg_go.MergeOutputs(streams...).
		OverWriteOutput().
		WithErrorOutput(ffmpegLogger).
		WithCpuCoreLimit(2).
		WithCpuCoreRequest(2).
		Run(); err != nil {
		zap.S().Errorw("ffmpeg_go error output", zap.String("message", string(ffmpegLogger.Output)))
		return nil, err
	}

	type playlist struct {
		bitrateInt     int
		bitrate        string
		averageBitrate string
		resolution     string
		uri            string
		codecs         string
	}

	var playlists []*playlist
	var highResolutionPlaylist *playlist

	if err := filepath.Walk(fileName, func(path string, info fs.FileInfo, err error) error {

		if info.IsDir() {
			return nil
		}

		if !strings.HasSuffix(info.Name(), ".m3u8") {
			return nil
		}

		str, err := ffmpeg_go.Probe(path, ffprobeSettings)

		if err != nil {
			return errors.Wrap(err, "failed to probe playlist file")
		}

		var probeResult *ffmpegProbeStream

		if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
			return errors.Wrap(err, "failed to unmarshal playlist probe")
		}

		var codecs string
		var bitrate int64

		finalStreamList := probeResult.Streams

		// reverse the stream list
		for i, j := 0, len(finalStreamList)-1; i < j; i, j = i+1, j-1 {
			finalStreamList[i], finalStreamList[j] = finalStreamList[j], finalStreamList[i]
		}

		var videoStreamWidth, videoStreamHeight int

		for i, stream := range finalStreamList {

			parsedInt, err := strconv.ParseInt(stream.BitRate, 10, 64)
			if err != nil {
				return err
			}

			bitrate += parsedInt

			if stream.CodecTagString == "mp4a" {
				codecs += "mp4a.40.2"

			} else if stream.CodecTagString == "avc1" {
				codecs += "avc1"

				if stream.Level == 42 {
					codecs += ".64002a"
				} else if stream.Level == 32 {
					codecs += ".640020"
				} else if stream.Level == 30 {
					codecs += ".4d001e"
				} else if stream.Level == 31 {
					codecs += ".4d001f"
				} else {
					return errors.New("unknown level with codec: " + stream.CodecTagString + " - " + stream.Profile + ": " + strconv.Itoa(stream.Level))
				}

				videoStreamWidth = stream.Width
				videoStreamHeight = stream.Height

			} else {
				return errors.New("unknown codec: " + stream.CodecTagString)
			}

			if i != len(probeResult.Streams)-1 {
				codecs += ","
			}
		}

		packets, err := ffmpeg_go.Probe(path, map[string]interface{}{
			"hide_banner":    "",
			"v":              "error",
			"select_streams": "v:0",
			"show_packets":   "",
			"show_entries":   "packet=pts_time,dts_time,duration_time,size,flags",
		})

		if err != nil {
			return errors.Wrap(err, "failed to probe packets")
		}

		var probePackets *ffmpegPacketsProbe

		if err := json.Unmarshal([]byte(packets), &probePackets); err != nil {
			return errors.Wrap(err, "failed to unmarshal playlist probe")
		}

		var defaultDuration float64

		// get the first duration that's not empty
		for _, packet := range probePackets.Packets {
			if packet.DurationTime != "" {
				parsedTime, err := strconv.ParseFloat(packet.DurationTime, 64)
				if err != nil {
					return errors.Wrap(err, "failed to parse first duration time")
				}
				defaultDuration = parsedTime
				break
			}
		}

		var aggregateDuration float64
		var currentList []ffmpegPacket
		var aggregation [][]ffmpegPacket

		// bucket up packets, so we can get peak bit-rates
		for _, packet := range probePackets.Packets {
			var currentDuration float64
			if packet.DurationTime != "" {
				parsedTime, err := strconv.ParseFloat(packet.DurationTime, 64)
				if err != nil {
					return errors.Wrap(err, "failed to parse duration time")
				}
				currentDuration = parsedTime
			} else {
				currentDuration = defaultDuration
			}

			// our bucket here is 1 second-intervals of the video
			if aggregateDuration < 3 {
				currentList = append(currentList, packet)
				aggregateDuration += currentDuration
			} else {
				fmt.Println(aggregateDuration)
				if len(currentList) > 0 {
					aggregation = append(aggregation, currentList)
				}

				currentList = []ffmpegPacket{packet}
				aggregateDuration = currentDuration
			}
		}

		aggregation = append(aggregation, currentList)

		fmt.Println(aggregation)

		var peakBitrate float64

		if len(aggregation) > 1 {
			// go through our bucketed list and get the largest bitrate in the bucket
			for _, aggregate := range aggregation {

				lastFrame, err := strconv.ParseFloat(aggregate[len(aggregate)-1].PtsTime, 64)
				if err != nil {
					return errors.Wrap(err, "failed to parse last frame time")
				}

				firstFrame, err := strconv.ParseFloat(aggregate[0].PtsTime, 64)
				if err != nil {
					return errors.Wrap(err, "failed to parse first frame time")
				}

				duration := lastFrame - firstFrame
				var totalSize float64
				for _, frame := range aggregate {
					parsedSize, err := strconv.ParseFloat(frame.Size, 64)
					if err != nil {
						return errors.Wrap(err, "failed to parse frame size")
					}
					totalSize += parsedSize
				}

				bitrateForFrame := ((totalSize * 8) / 1000) / duration * 1000

				if bitrateForFrame > peakBitrate {
					peakBitrate = bitrateForFrame
				}
			}
		} else {
			peakBitrate = float64(bitrate)
		}

		playlist := &playlist{
			bitrate:        strconv.Itoa(int(peakBitrate)),
			averageBitrate: strconv.Itoa(int(bitrate)),
			resolution:     strconv.Itoa(videoStreamWidth) + "x" + strconv.Itoa(videoStreamHeight),
			uri:            path,
			codecs:         "\"" + codecs + "\"",
		}

		if highResolutionPlaylist == nil {
			highResolutionPlaylist = playlist
		} else {
			if playlist.bitrateInt > highResolutionPlaylist.bitrateInt {
				highResolutionPlaylist = playlist
			}
		}

		playlists = append(playlists, playlist)
		return nil
	}); err != nil {
		return nil, errors.Wrap(err, "failed to walk playlists")
	}

	// generate a thumbnail
	var img image.Image

	foundFrame := false

	fileThumbnailName := uuid.New().String()

	durationAddition := float64(0)

	// keep looking for frames that are not all black (we can successfully generate a preview
	for start := time.Now(); time.Since(start) < time.Second*10; {

		fileThumbnail, err := os.Create(fileThumbnailName)
		if err != nil {
			return nil, err
		}

		str, err := ffmpeg_go.Probe(highResolutionPlaylist.uri, ffprobeSettings)

		if err != nil {
			return nil, errors.Wrap(err, "failed to probe playlist file")
		}

		var probeResult *ffmpegProbeStream

		if err := json.Unmarshal([]byte(str), &probeResult); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal playlist probe")
		}

		duration, err := strconv.ParseFloat(probeResult.Format.Duration, 64)

		if err != nil {
			return nil, err
		}

		parsedFps := strings.Split(probeResult.Streams[0].FrameRate, "/")
		fpsDecimalFirst, err := strconv.ParseFloat(parsedFps[0], 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse first decimal")
		}
		fpsDecimalSecond, err := strconv.ParseFloat(parsedFps[1], 64)
		if err != nil {
			return nil, errors.Wrap(err, "failed to parse second decimal")
		}

		targetFrameRate := fpsDecimalFirst / fpsDecimalSecond
		frameCut := ((duration + durationAddition - (duration / 10)) / float64(2)) * targetFrameRate

		if err := ffmpeg_go.Input(highResolutionPlaylist.uri, map[string]interface{}{
			"v":           "error",
			"hide_banner": "",
		}).
			Filter("select", ffmpeg_go.Args{fmt.Sprintf("gte(n,%f)", frameCut)}).
			Output("pipe:", ffmpeg_go.KwArgs{"vframes": 1, "format": "image2"}).
			WithErrorOutput(ffmpegLogger).
			WithOutput(fileThumbnail).
			Run(); err != nil {
			return nil, errors.Wrap(err, "failed to generate thumbnail: "+string(ffmpegLogger.Output))
		}

		_, _ = fileThumbnail.Seek(0, io.SeekStart)
		_, img, err = createPreviewFromFile(fileThumbnail, false)

		if err != nil {
			// fully black image - we want to find a different one
			if err.Error() == "Failed, no non-alpha pixels found (either fully transparent image, or the ColorBackgroundMask removed all pixels)" {
				_ = os.Remove(fileThumbnail.Name())
				durationAddition += 0.5
				continue
			}

			return nil, err
		}

		_ = fileThumbnail.Close()
		foundFrame = true

		break
	}

	defer os.Remove(fileThumbnailName)

	if !foundFrame {
		return nil, errors.New("failed to find a frame thumbnail in time")
	}

	targetDeviceDesktop := proto.MediaDeviceType_Desktop
	targetDeviceMobile := proto.MediaDeviceType_Mobile
	targetDeviceUniversal := proto.MediaDeviceType_Universal

	var videoContainers []*proto.VideoContainer

	if len(playlists) == 4 {
		videoContainers = []*proto.VideoContainer{
			{
				Id:           "master.m3u8",
				MimeType:     proto.MediaMimeType_VideoMpegUrl,
				TargetDevice: &targetDeviceDesktop,
			},
			{
				Id:           "master-d_mobile.m3u8",
				MimeType:     proto.MediaMimeType_VideoMpegUrl,
				TargetDevice: &targetDeviceMobile,
			},
		}
	} else {
		videoContainers = []*proto.VideoContainer{
			{
				Id:           "master.m3u8",
				MimeType:     proto.MediaMimeType_VideoMpegUrl,
				TargetDevice: &targetDeviceUniversal,
			},
		}
	}

	for _, container := range videoContainers {

		masterPlaylistFile, err := os.Create(fileName + "/" + container.Id)
		if err != nil {
			return nil, errors.Wrap(err, "failed to create file")
		}

		dataWriter := bufio.NewWriter(masterPlaylistFile)

		_, _ = dataWriter.WriteString("#EXTM3U" + "\n")
		_, _ = dataWriter.WriteString("#EXT-X-VERSION:7" + "\n")
		_, _ = dataWriter.WriteString("#EXT-X-INDEPENDENT-SEGMENTS" + "\n")

		// if mobile, put the largest resolution to the bottom (only if we have 4 playlists, like a 1080p stream at the top)
		if len(playlists) == 4 && *container.TargetDevice == proto.MediaDeviceType_Mobile {
			var popped *playlist
			popped, playlists = playlists[0], playlists[1:]
			playlists = append(playlists, popped)
		}

		for _, playlist := range playlists {
			_, _ = dataWriter.WriteString("#EXT-X-STREAM-INF:AVERAGE-BANDWIDTH=" + playlist.averageBitrate + ",BANDWIDTH=" + playlist.bitrate + ",RESOLUTION=" + playlist.resolution + ",CODECS=" + playlist.codecs + "\n")
			_, _ = dataWriter.WriteString(strings.Replace(playlist.uri, fileName+"/", "", 1) + "\n")
		}

		_ = dataWriter.Flush()
		_ = masterPlaylistFile.Close()
	}

	str, err = ffmpeg_go.Probe(mp4FileName, ffprobeSettings)

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

		// calculate aspect ratio manually since it's not available
		newWidth, newHeight := media.CalculateAspectRatio(probeResult.Streams[0].Width, probeResult.Streams[0].Height)

		widthAspect = int64(newWidth)
		heightAspect = int64(newHeight)
	}

	processedResponses, err := processImageWithSizes(target, img)

	if err != nil {
		return nil, err
	}

	target.RawProto().VideoData = &proto.VideoData{
		Id: fileName,
		Containers: append(videoContainers, &proto.VideoContainer{
			Id:       mp4ActualFileName,
			MimeType: proto.MediaMimeType_VideoMp4,
			Bitrate:  uint64(bitRate),
			Width:    uint32(probeResult.Streams[0].Width),
			Height:   uint32(probeResult.Streams[0].Height),
		}),
		AspectRatio: &proto.VideoAspectRatio{
			Width:  uint32(widthAspect),
			Height: uint32(heightAspect),
		},
		DurationMilliseconds: int64(math.Round(s * 1000)),
		HasAudio:             !videoNoAudio,
	}

	return &ProcessResponse{
		move: append(processedResponses, &Move{
			directory: fileName,
		}),
	}, nil
}

type processImageSizes struct {
	name       string
	constraint int
	resize     bool
	crop       bool
	mandatory  bool
}

var postContentSizes = []*processImageSizes{
	{
		name:       "hd",
		constraint: 4096,
		mandatory:  true,
	},
	{
		name:       "large",
		constraint: 2048,
	},
	{
		name:       "medium",
		constraint: 1200,
	},
	{
		name:       "small",
		constraint: 680,
	},
	{
		name:       "thumbnail",
		constraint: 150,
		resize:     true,
	},
}

var thumbnailSizes = []*processImageSizes{
	{
		name:       "icon",
		constraint: 100,
		resize:     true,
		mandatory:  true,
	},
	{
		name:       "mini",
		constraint: 50,
		resize:     true,
		mandatory:  true,
	},
}

var banner = []*processImageSizes{
	{
		name:       "banner",
		constraint: 720,
		mandatory:  true,
	},
	{
		name:       "small-banner",
		constraint: 360,
		mandatory:  true,
	},
}

func processImageWithSizes(media *media.Media, sourceSrc image.Image) ([]*Move, error) {

	var contentSizes []*processImageSizes

	var imageSizes []*proto.ImageDataSize
	var imageFile *os.File

	fileName := uuid.New().String()

	_ = os.MkdirAll(fileName, os.ModePerm)

	isPortrait := sourceSrc.Bounds().Dy() > sourceSrc.Bounds().Dx()

	switch media.LinkType() {
	case proto.MediaLinkType_POST_CONTENT:
		contentSizes = postContentSizes
		break
	case proto.MediaLinkType_CLUB_THUMBNAIL:
		contentSizes = thumbnailSizes
		break
	case proto.MediaLinkType_CLUB_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_SERIES_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_CATEGORY_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_CHARACTER_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_AUDIENCE_BANNER:
		contentSizes = banner
		break
	case proto.MediaLinkType_TOPIC_BANNER:
		contentSizes = banner
		break
	}

	for _, size := range contentSizes {

		shouldResizeHeight := isPortrait && sourceSrc.Bounds().Dy() > size.constraint
		shouldResizeWidth := !isPortrait && sourceSrc.Bounds().Dx() > size.constraint

		if !shouldResizeWidth && !shouldResizeHeight && !size.mandatory {
			continue
		}

		var src image.Image

		if size.resize {
			src = resize.Thumbnail(uint(size.constraint), uint(size.constraint), sourceSrc, resize.Lanczos3)
		} else if size.crop {
			var err error
			src, err = cutter.Crop(sourceSrc, cutter.Config{
				Width:   size.constraint,
				Height:  size.constraint,
				Options: cutter.Copy,
				Mode:    cutter.Centered,
			})
			if err != nil {
				return nil, errors.Wrap(err, "failed to crop")
			}
		} else {
			// if larger than constraint, we resize
			if shouldResizeHeight {
				src = resize.Resize(0, uint(size.constraint), sourceSrc, resize.Lanczos3)
			} else if shouldResizeWidth {
				src = resize.Resize(uint(size.constraint), 0, sourceSrc, resize.Lanczos3)
			} else {
				src = sourceSrc
			}
		}

		imageName := size.name + ".jpg"

		imageSizes = append(imageSizes, &proto.ImageDataSize{
			Id:     imageName,
			Width:  uint32(src.Bounds().Dx()),
			Height: uint32(src.Bounds().Dy()),
		})

		resizedImageFile, err := os.Create(fileName + "/" + imageName)
		if err != nil {
			return nil, errors.Wrap(err, "failed to create image")
		}

		if err := jpeg.Encode(resizedImageFile, src, &jpeg.Options{Quality: jpegQuality}); err != nil {
			return nil, errors.Wrap(err, "failed to encode jpeg")
		}

		if imageFile == nil {
			imageFile = resizedImageFile
		}
	}

	// do preview generation on the first file
	_, _ = imageFile.Seek(0, io.SeekStart)
	palettes, _, err := createPreviewFromFile(imageFile, false)

	if err != nil {
		return nil, err
	}

	// update the source image data
	media.RawProto().ImageData = &proto.ImageData{
		Id:       fileName,
		MimeType: proto.MediaMimeType_ImageJpeg,
		Sizes:    imageSizes,
		Palettes: palettes,
	}

	return []*Move{
		{
			directory: fileName,
			isImage:   true,
		},
	}, nil
}

func processImage(media *media.Media, mimeType string, file *os.File) (*ProcessResponse, error) {

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

	move, err := processImageWithSizes(media, src)

	if err != nil {
		return nil, err
	}

	return &ProcessResponse{move: move}, nil
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

	move, err := processImageWithSizes(media, pixelatedSrc)

	if err != nil {
		return nil, err
	}

	media.RawProto().State.Processed = true
	media.RawProto().State.Failed = false

	return &ProcessResponse{move: move}, nil
}
