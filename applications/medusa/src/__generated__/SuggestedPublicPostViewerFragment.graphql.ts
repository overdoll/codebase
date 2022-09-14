/**
 * @generated SignedSource<<58f585ff79b858014d920000acf1ab62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuggestedPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "SuggestedPublicPostViewerFragment";
};
export type SuggestedPublicPostViewerFragment$key = {
  readonly " $data"?: SuggestedPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuggestedPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuggestedPublicPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1a6b623341ae3688c4b59b744d1f89ec";

export default node;
