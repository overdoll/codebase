package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/resource"
	"strings"
)

type CreateOrGetResourcesFromUploads struct {
	ItemId    string
	UploadIds []string
	IsPrivate bool
}

type CreateOrGetResourcesFromUploadsHandler struct {
	rr    resource.Repository
	fr    resource.FileRepository
	event event.Repository
}

func NewCreateOrGetResourcesFromUploadsHandler(rr resource.Repository, fr resource.FileRepository, event event.Repository) CreateOrGetResourcesFromUploadsHandler {
	return CreateOrGetResourcesFromUploadsHandler{rr: rr, fr: fr, event: event}
}

func (h CreateOrGetResourcesFromUploadsHandler) Handle(ctx context.Context, cmd CreateOrGetResourcesFromUploads) ([]*resource.Resource, error) {

	var newUploadIds []string

	for _, uploadId := range cmd.UploadIds {
		// fix upload IDs
		newUploadIds = append(newUploadIds, getUploadIdWithoutExtension(uploadId))
	}

	// first, get all resources
	resourcesFromIds, err := h.rr.GetResourcesByIds(ctx, []string{cmd.ItemId}, newUploadIds)

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
		newResources, err = h.fr.GetAndCreateResources(ctx, cmd.ItemId, idsNotFound, cmd.IsPrivate)

		if err != nil {
			return nil, err
		}

		// now, we add a database entry to be used later
		if err := h.rr.CreateResources(ctx, newResources); err != nil {
			return nil, err
		}
	}

	// merge 2 arrays: new resources + current resources
	resources := append(resourcesFromIds, newResources...)

	var newResourceIds []string

	for _, r := range resources {
		newResourceIds = append(newResourceIds, r.ID())
	}

	if err := h.event.ProcessResources(ctx, cmd.ItemId, newResourceIds); err != nil {
		return nil, err
	}

	return resources, nil
}

func getUploadIdWithoutExtension(uploadId string) string {
	// strip any urls or extensions
	splitPath := strings.Split(uploadId, "/")
	idWithOrWithoutExtension := splitPath[len(strings.Split(uploadId, "/"))-1]

	return strings.Split(idWithOrWithoutExtension, "+")[0]
}
