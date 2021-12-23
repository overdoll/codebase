/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStatePublishedPreviewFragment = {
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryContentFragment">;
    readonly " $refType": "PostStatePublishedPreviewFragment";
};
export type PostStatePublishedPreviewFragment$data = PostStatePublishedPreviewFragment;
export type PostStatePublishedPreviewFragment$key = {
    readonly " $data"?: PostStatePublishedPreviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostStatePublishedPreviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStatePublishedPreviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '0f25bb6391bbe61715d0c39d5b9ce2a2';
export default node;
