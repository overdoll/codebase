package vips

import (
	"fmt"
	"os/exec"
	"overdoll/libraries/errors"
)

const (
	defaultOpts = "[Q=%s,strip,interlace=true,optimize-coding=true,subsample-mode=auto,trellis-quant=true,overshoot-deringing=true,optimize-scans=true,quant-table=3]"
)

func Resize(filename string, out string, scaleFactor float64, quality string) error {
	command := exec.Command("vips", "resize", filename, out+fmt.Sprintf(defaultOpts, quality), fmt.Sprintf("%f", scaleFactor), "--kernel=lanczos3")
	if err := command.Run(); err != nil {
		if ee, ok := err.(*exec.ExitError); ok {
			return errors.Wrap(err, "failed to resize image: "+string(ee.Stderr))
		}
		return errors.Wrap(err, "failed to resize image")
	}

	return nil
}
