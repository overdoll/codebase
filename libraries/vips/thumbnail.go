package vips

import (
	"os/exec"
	"overdoll/libraries/errors"
	"strconv"
)

func Thumbnail(filename string, out string, size int) error {
	command := exec.Command("vips", "thumbnail", filename, out+defaultOpts, strconv.Itoa(size), "--height="+strconv.Itoa(size), "--crop=attention", "--fail-on=error")
	if err := command.Run(); err != nil {
		if ee, ok := err.(*exec.ExitError); ok {
			return errors.Wrap(err, "failed to create thumbnail: "+string(ee.Stderr))
		}
		return errors.Wrap(err, "failed to create thumbnail")
	}

	return nil
}
