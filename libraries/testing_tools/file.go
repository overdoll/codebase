package testing_tools

import (
	"io"
	"net/http"
	"os"
)

func DownloadFile(filepath string, url string) error {

	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer out.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	return err
}

func FileExists(fileUrl string) bool {
	resp, err := http.Head(fileUrl)
	if err != nil {
		return false
	}
	if resp.StatusCode != http.StatusOK {
		return false
	}

	return true
}
