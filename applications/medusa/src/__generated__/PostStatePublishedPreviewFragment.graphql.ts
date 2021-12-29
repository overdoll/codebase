/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostStatePublishedPreviewFragment = {
    readonly reference: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '444f35122917f76b9135d468ccd51711';
export default node;
