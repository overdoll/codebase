package vips

import (
	"bufio"
	"os/exec"
	"overdoll/libraries/errors"
	"strconv"
	"strings"
)

type ImageDimensions struct {
	Width  int
	Height int
}

func GetImageDimensions(fileName string) (*ImageDimensions, error) {
	out, err := exec.Command("vipsheader", "-a", fileName).Output()
	if err != nil {
		if ee, ok := err.(*exec.ExitError); ok {
			return nil, errors.Wrap(err, "failed to get image info: "+string(ee.Stderr))
		}
		return nil, errors.Wrap(err, "failed to get image info")
	}

	var width, height int64

	scanner := bufio.NewScanner(strings.NewReader(string(out)))
	for scanner.Scan() {
		text := scanner.Text()
		if strings.HasPrefix(text, "width: ") {
			parsed, err := strconv.ParseInt(strings.Replace(text, "width: ", "", 1), 10, 64)
			if err != nil {
				return nil, errors.Wrap(err, "failed to parse int")
			}

			width = parsed
		}

		if strings.HasPrefix(text, "height: ") {
			parsed, err := strconv.ParseInt(strings.Replace(text, "height: ", "", 1), 10, 64)
			if err != nil {
				return nil, errors.Wrap(err, "failed to parse int")
			}

			height = parsed
		}
	}

	return &ImageDimensions{
		Width:  int(width),
		Height: int(height),
	}, nil
}
