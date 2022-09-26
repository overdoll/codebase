package vips

import (
	"os/exec"
	"overdoll/libraries/errors"
	"strconv"
)

func Thumbnail(filename string, out string, size int, smartCrop bool) error {

	crop := "--crop=centre"

	if smartCrop {
		crop = "--crop=attention"
	}

	command := exec.Command("vips", "thumbnail", filename, out+defaultOpts, strconv.Itoa(size), "--height="+strconv.Itoa(size), crop, "--fail-on=error")
	if err := command.Run(); err != nil {
		if ee, ok := err.(*exec.ExitError); ok {
			return errors.Wrap(err, "failed to create thumbnail: "+string(ee.Stderr))
		}
		return errors.Wrap(err, "failed to create thumbnail")
	}

	return nil
}
