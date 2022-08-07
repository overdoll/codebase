/**
 * @generated SignedSource<<9e051a3670e68cc938204b537dda928d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadContentModifyFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContentModifyPreviewFragment" | "PostUpdateDescriptionFragment" | "UploadPostOptionsFragment">;
  readonly " $fragmentType": "UploadContentModifyFragment";
};
export type UploadContentModifyFragment$key = {
  readonly " $data"?: UploadContentModifyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadContentModifyFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadContentModifyFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContentModifyPreviewFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadPostOptionsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostUpdateDescriptionFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c8129255bfea8fd817b818a7387042e5";

export default node;
