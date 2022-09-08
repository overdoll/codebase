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

func ListenProgressSocket(id string, cb func(progress int64)) (func(), error) {

	if err := os.RemoveAll(getSockAddr(id)); err != nil {
		return nil, err
	}

	sockAddr := getSockAddr(id)
	l, err := net.Listen("unix", sockAddr)
	if err != nil {
		return nil, err
	}

	// use a 500ms ticker to rate limit
	ticker := time.NewTicker(5000 * time.Millisecond)
	done := make(chan bool, 1)

	go func() {
		re := regexp.MustCompile(`prog_per=(\d+)`)
		fd, err := l.Accept()
		if err != nil {
			zap.S().Fatalw("accept error", zap.Error(err))
		}

		buf := make([]byte, 16)
		data := ""

		for {
			_, err = fd.Read(buf)
			if err == nil {
				data += string(buf)
			}

			select {
			case <-done:
				_ = l.Close()
				_ = fd.Close()
				data = ""
				return
			case _ = <-ticker.C:
				a := re.FindAllStringSubmatch(data, -1)
				if len(a) > 0 && len(a[len(a)-1]) > 0 {
					c, err := strconv.Atoi(a[len(a)-1][len(a[len(a)-1])-1])
					if err == nil {
						cb(int64(c))
						// clear data since we got it all this run
						data = ""
					}
				}
			default:
				continue
			}
		}
	}()

	return func() {
		done <- true
		ticker.Stop()
	}, nil
}

func getSocketClient(id string) (net.Conn, error) {
	return net.Dial("unix", getSockAddr(id))
}

func getSockAddr(id string) string {
	return path.Join(os.TempDir(), fmt.Sprintf("media_%s_sock", id))
}

// show progress taken from: https://github.com/u2takey/ffmpeg-go/blob/master/examples/showProgress.go
func createFFMPEGTempSocket(id string, duration float64) (string, error, func()) {

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
		c, _ := getSocketClient(id)

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
				_ = c.Close()
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
					if c != nil && cp != "0" {
						c.Write([]byte(fmt.Sprintf("prog_per=%s", cp)))
					}
				}
			}

		}
	}()

	return sockFileName, nil, func() {
		done <- true
	}
}
