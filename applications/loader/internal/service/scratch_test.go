package service_test

import (
	"github.com/stretchr/testify/require"
	"os"
	"overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/testing_tools"
	"testing"
)

func TestScratchTest(t *testing.T) {

	targ, _ := testing_tools.NormalizedPathFromBazelTarget("applications/loader/internal/service/file_fixtures/2560x1080_30.mp4")

	file, err := os.Open(targ)
	require.NoError(t, err, "no error opening file")

	_, err = media_processing.ProcessMedia(media.FromProto(&proto.Media{
		Id:               "Test",
		IsUpload:         true,
		OriginalFileName: "",
		Private:          false,
		Link:             nil,
		State: &proto.MediaState{
			Processed: false,
			Failed:    false,
		},
		Version: 0,
	}), file)

	require.NoError(t, err, "no error processing medias")
}
