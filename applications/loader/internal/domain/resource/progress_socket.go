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

func ListenProgressSocket(itemId, resourceId string, cb func(progress float64)) error {

	if err := os.RemoveAll(getSockAddr(itemId, resourceId)); err != nil {
		return err
	}

	sockAddr := getSockAddr(itemId, resourceId)
	l, err := net.Listen("unix", sockAddr)
	if err != nil {
		return err
	}

	go func() {
		fd, err := l.Accept()
		if err != nil {
			zap.S().Fatalw("accept error", zap.Error(err))
		}
		buf := make([]byte, 16)
		for {
			_, err := fd.Read(buf)
			if err != nil {
				return
			}

			// if no error, write output
			if s, err := strconv.ParseFloat(string(buf), 64); err == nil {
				cb(s)
			}
		}
	}()

	return nil
}

func getSockAddr(itemId, resourceId string) string {
	return fmt.Sprintf("resource:%s-%s_sock", itemId, resourceId)
}

func createFFMPEGTempSocket(itemId, resourceId string, duration float64) string {
	rand.Seed(time.Now().Unix())
	sockFileName := path.Join(os.TempDir(), fmt.Sprintf("%d_sock", rand.Int()))
	l, err := net.Listen("unix", sockFileName)
	if err != nil {
		panic(err)
	}

	c, err := net.Dial("unix", getSockAddr(itemId, resourceId))

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
			_, err := fd.Read(buf)
			if err != nil {
				return
			}
			data += string(buf)
			a := re.FindAllStringSubmatch(data, -1)
			cp := ""

			if len(a) > 0 && len(a[len(a)-1]) > 0 {
				c, _ := strconv.Atoi(a[len(a)-1][len(a[len(a)-1])-1])
				cp = fmt.Sprintf("%.2f", float64(c)/duration/1000000)
			}

			if strings.Contains(data, "progress=end") {
				cp = "100"
			}

			if cp == "" {
				cp = ".0"
			}

			if progress != cp {
				c.Write([]byte(cp))
			}
		}
	}()

	return sockFileName
}
