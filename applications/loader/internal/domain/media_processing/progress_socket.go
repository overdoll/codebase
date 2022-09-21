package media_processing

import (
	"crypto/rand"
	"fmt"
	"go.uber.org/zap"
	"math/big"
	"net"
	"os"
	"path"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var progressSocketChannels = make(map[string]chan ProgressSocketMessage)

type ProgressSocketMessage struct {
	Progress      int64
	OnlyHeartbeat bool
}

func ListenProgressSocket(id string, cb func(progress ProgressSocketMessage)) (func(), error) {

	progressChannel := make(chan ProgressSocketMessage)
	progressSocketChannels[id] = progressChannel

	// use a 500ms ticker to rate limit
	ticker := time.NewTicker(5000 * time.Millisecond)
	stop := make(chan bool, 1)

	go func() {
		var lastProgress ProgressSocketMessage
		clearProgress := false
		for {
			select {
			case progressValue := <-progressChannel:
				lastProgress = progressValue
				clearProgress = true
				continue
			case _ = <-ticker.C:
				if clearProgress {
					cb(lastProgress)
					clearProgress = false
				}
				continue
			case <-stop:
				return
			default:
				continue
			}
		}
	}()

	return func() {
		stop <- true
		close(progressChannel)
		delete(progressSocketChannels, id)
		ticker.Stop()
	}, nil
}

// show progress taken from: https://github.com/u2takey/ffmpeg-go/blob/master/examples/showProgress.go
func createFFMPEGTempSocket(id string, duration float64, onlyHeartbeat bool) (string, error, func()) {

	nBig, err := rand.Int(rand.Reader, big.NewInt(9223372036854775))
	if err != nil {
		return "", err, nil
	}

	sockFileName := path.Join(os.TempDir(), fmt.Sprintf("%d_sock", nBig.Int64()))
	l, err := net.Listen("unix", sockFileName)
	if err != nil {
		return "", err, nil
	}

	done := make(chan bool, 1)

	go func() {
		re := regexp.MustCompile(`out_time_ms=(\d+)`)
		fd, err := l.Accept()
		if err != nil {
			zap.S().Fatalw("accept error", zap.Error(err))
		}
		buf := make([]byte, 16)
		data := ""
		progress := ""

		for {
			select {
			case <-done:
				// clean up our sockets
				_ = l.Close()
				_ = fd.Close()
				_ = os.RemoveAll(sockFileName)
				data = ""
				progress = ""
				return
			default:
				_, err = fd.Read(buf)
				if err != nil {
					continue
				}
				data += string(buf)
				a := re.FindAllStringSubmatch(data, -1)
				cp := ""

				if len(a) > 0 && len(a[len(a)-1]) > 0 {
					intValue := a[len(a)-1][len(a[len(a)-1])-1]

					// if the intValue is not 8 digits, we got a bad reading, so we ignore it
					if len(intValue) < 7 {
						continue
					}

					c, _ := strconv.Atoi(intValue)
					parsed := float64(c) / duration / 1000000

					truncated := fmt.Sprintf("%.2f", parsed)
					parsed, _ = strconv.ParseFloat(truncated, 64)
					cp = strconv.Itoa(int(parsed * 100))
				}

				if strings.Contains(data, "progress=end") {
					cp = "100"
				}

				if cp == "" {
					cp = "0"
				}

				if cp != progress {
					progress = cp
					if channel, ok := progressSocketChannels[id]; ok {
						parsedInt, err := strconv.ParseInt(cp, 10, 64)
						if err == nil {
							channel <- ProgressSocketMessage{Progress: parsedInt, OnlyHeartbeat: onlyHeartbeat}
						}
					}
				}
			}

		}
	}()

	return sockFileName, nil, func() {
		done <- true
	}
}
