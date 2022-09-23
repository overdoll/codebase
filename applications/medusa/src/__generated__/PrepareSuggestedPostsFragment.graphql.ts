/**
 * @generated SignedSource<<b21052dcfd38deabc993eb0946be65a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrepareSuggestedPostsFragment$data = {
  readonly reference: string;
  readonly " $fragmentType": "PrepareSuggestedPostsFragment";
};
export type PrepareSuggestedPostsFragment$key = {
  readonly " $data"?: PrepareSuggestedPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrepareSuggestedPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrepareSuggestedPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ff2bbc5a9d6497b2f0e809cbdb77af04";

export default node;
