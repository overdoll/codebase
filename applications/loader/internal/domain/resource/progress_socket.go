package resource

import (
	"fmt"
	"go.uber.org/zap"
	"math/rand"
	"net"
	"os"
	"path"
	"regexp"
	"strconv"
	"strings"
	"time"
)

func ListenProgressSocket(itemId, resourceId string, cb func(progress int64)) (func(), error) {

	if err := os.RemoveAll(getSockAddr(itemId, resourceId)); err != nil {
		return nil, err
	}

	sockAddr := getSockAddr(itemId, resourceId)
	l, err := net.Listen("unix", sockAddr)
	if err != nil {
		return nil, err
	}

	// use a 500ms ticker to rate limit
	ticker := time.NewTicker(5000 * time.Millisecond)
	done := make(chan bool)

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
				break
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
		ticker.Stop()
		select {
		case done <- true:
		default:
		}
	}, nil
}

func getSocketClient(itemId, resourceId string) (net.Conn, error) {
	return net.Dial("unix", getSockAddr(itemId, resourceId))
}

func getSockAddr(itemId, resourceId string) string {
	return fmt.Sprintf("resource_%s-%s_sock", itemId, resourceId)
}

// show progress taken from: https://github.com/u2takey/ffmpeg-go/blob/master/examples/showProgress.go
func createFFMPEGTempSocket(itemId, resourceId string, duration float64) (string, func()) {

	rand.Seed(time.Now().Unix())
	sockFileName := path.Join(os.TempDir(), fmt.Sprintf("%d_sock", rand.Int63()))
	l, err := net.Listen("unix", sockFileName)
	if err != nil {
		panic(err)
	}

	done := make(chan bool)

	go func() {
		c, _ := getSocketClient(itemId, resourceId)

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
				break
			default:
				_, err = fd.Read(buf)
				if err != nil {
					return
				}
				data += string(buf)
				a := re.FindAllStringSubmatch(data, -1)
				cp := ""

				if len(a) > 0 && len(a[len(a)-1]) > 0 {
					c, _ := strconv.Atoi(a[len(a)-1][len(a[len(a)-1])-1])
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

	return sockFileName, func() {
		select {
		case done <- true:
		default:
		}
	}
}
