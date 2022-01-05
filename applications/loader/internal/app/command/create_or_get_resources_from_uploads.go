package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"

	tusd "github.com/tus/tusd/pkg/handler"
)

type CreateOrGetResourcesFromUploadsHandler struct {
	cr resource.Repository
}

func NewCreateOrGetResourcesFromUploadsHandler(cr resource.Repository) CreateOrGetResourcesFromUploadsHandler {
	return CreateOrGetResourcesFromUploadsHandler{cr: cr}
}

func (h CreateOrGetResourcesFromUploadsHandler) Handle(ctx context.Context) (*tusd.StoreComposer, error) {

	var newUploadIds []string

	for _, uploadId := range uploadIds {
		// fix upload IDs
		newUploadIds = append(newUploadIds, getUploadIdWithoutExtension(uploadId))
	}

	// first, get all resources
	resourcesFromIds, err := r.GetResourcesByIds(ctx, itemId, newUploadIds)

	if err != nil {
		return nil, err
	}

	// now, get the resources that were not found, create the object and then create the record
	var idsNotFound []string

	for _, uploadId := range newUploadIds {

		foundResource := false

		for _, res := range resourcesFromIds {
			if res.ID() == uploadId {
				foundResource = true
				break
			}
		}

		if !foundResource {
			idsNotFound = append(idsNotFound, uploadId)
		}
	}

	var newResources []*resource.Resource

	// found at least 1 resource that was not created
	if len(idsNotFound) > 0 {
		// get the resources from our remote source - grabbing information like file info
		newResources, err = r.getResourcesRemote(ctx, itemId, idsNotFound)

		if err != nil {
			return nil, err
		}

		// now, we add a database entry to be used later
		if err := r.createResources(ctx, newResources); err != nil {
			return nil, err
		}
	}

	// merge 2 arrays: new resources + current resources
	return append(resourcesFromIds, newResources...), nil
}
