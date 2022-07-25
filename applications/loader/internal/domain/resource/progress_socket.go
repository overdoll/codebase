package resource

import (
	"fmt"
	"go.uber.org/zap"
	"math"
	"math/rand"
	"net"
	"os"
	"path"
	"regexp"
	"strconv"
	"strings"
	"time"
)

func ListenProgressSocket(itemId, resourceId string, cb func(progress float64)) (func(), error) {

	if err := os.RemoveAll(getSockAddr(itemId, resourceId)); err != nil {
		return nil, err
	}

	sockAddr := getSockAddr(itemId, resourceId)
	l, err := net.Listen("unix", sockAddr)
	if err != nil {
		return nil, err
	}

	var ticker *time.Ticker
	done := make(chan bool)

	go func() {
		// use a 500ms ticker to rate limit ffmpeg
		ticker = time.NewTicker(2000 * time.Millisecond)

		fd, err := l.Accept()
		if err != nil {
			zap.S().Fatalw("accept error", zap.Error(err))
		}
		buf := make([]byte, 16)

		for {
			select {
			case <-done:
				return
			case _ = <-ticker.C:
				fmt.Println("ticked")
				// if no error, write output
				s, err := strconv.ParseFloat(strings.Trim(string(buf), "\x00"), 64)

				if err == nil {
					cb(s)
				}
			}

			_, _ = fd.Read(buf)
			fmt.Println("last buffer")
			fmt.Println(buf)

		}
	}()

	return func() {
		ticker.Stop()
		done <- true
	}, nil
}

func getSocketClient(itemId, resourceId string) (net.Conn, error) {
	return net.Dial("unix", getSockAddr(itemId, resourceId))
}

func getSockAddr(itemId, resourceId string) string {
	return fmt.Sprintf("resource:%s-%s_sock", itemId, resourceId)
}

// show progress taken from: https://github.com/u2takey/ffmpeg-go/blob/master/examples/showProgress.go
func createFFMPEGTempSocket(itemId, resourceId string, duration float64) (string, func()) {

	rand.Seed(time.Now().Unix())
	sockFileName := path.Join(os.TempDir(), fmt.Sprintf("%d_sock", rand.Int()))
	l, err := net.Listen("unix", sockFileName)
	if err != nil {
		panic(err)
	}

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
			_, err = fd.Read(buf)
			if err != nil {
				return
			}
			data += string(buf)
			a := re.FindAllStringSubmatch(data, -1)
			cp := ""

			if len(a) > 0 && len(a[len(a)-1]) > 0 {
				c, _ := strconv.Atoi(a[len(a)-1][len(a[len(a)-1])-1])
				parsed := (float64(c) / duration / 1000000) * 100
				rounded := math.Floor(parsed*100) / 100
				cp = fmt.Sprintf("%f", rounded)
			}

			if strings.Contains(data, "progress=end") {
				cp = "100"
			}

			if cp == "" {
				cp = "00.00"
			}

			if cp != progress {
				progress = cp
				if c != nil {
					c.Write([]byte(progress))
				}
			}
		}
	}()

	return sockFileName, func() {
		_ = os.RemoveAll(sockFileName)
	}
}
