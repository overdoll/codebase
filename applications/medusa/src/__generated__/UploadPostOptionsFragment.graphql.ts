/**
 * @generated SignedSource<<248445884b6aafc2a32678dc919f01c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadPostOptionsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostAddDescriptionFragment">;
  readonly " $fragmentType": "UploadPostOptionsFragment";
};
export type UploadPostOptionsFragment$key = {
  readonly " $data"?: UploadPostOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadPostOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadPostOptionsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostAddDescriptionFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "8710a2d941a481719a404b9a7b3b7382";

export default node;
