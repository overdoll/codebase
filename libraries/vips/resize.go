package vips

import (
	"fmt"
	"os/exec"
	"overdoll/libraries/errors"
)

const (
	defaultOpts = "[Q=85,strip,interlace=true,optimize-coding=true,subsample-mode=auto,trellis-quant=true,overshoot-deringing=true,optimize-scans=true,quant-table=3]"
)

func Resize(filename string, out string, scaleFactor float64) error {
	command := exec.Command("vips", "resize", filename, out+defaultOpts, fmt.Sprintf("%f", scaleFactor), "--kernel=lanczos3")
	if err := command.Run(); err != nil {
		if ee, ok := err.(*exec.ExitError); ok {
			return errors.Wrap(err, "failed to resize image: "+string(ee.Stderr))
		}
		return errors.Wrap(err, "failed to resize image")
	}

	return nil
}
