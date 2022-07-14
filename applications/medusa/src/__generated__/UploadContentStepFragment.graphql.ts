/**
 * @generated SignedSource<<cbcf469cd09299acf98765e51a31f43f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadContentStepFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UploadContentAddFragment" | "UploadContentModifyFragment" | "UploadContentSuggestionsFragment">;
  readonly " $fragmentType": "UploadContentStepFragment";
};
export type UploadContentStepFragment$key = {
  readonly " $data"?: UploadContentStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadContentStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadContentStepFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadContentSuggestionsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadContentModifyFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UploadContentAddFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "a4ab724f961273bb67dfc8d02841b118";

export default node;
