/**
 * @generated SignedSource<<623af391ad828cb524dd44a1a28d2210>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupporterSlideFragment$data = {
  readonly isSupporterOnly: boolean;
  readonly viewerCanViewSupporterOnlyContent: boolean;
  readonly " $fragmentType": "SupporterSlideFragment";
};
export type SupporterSlideFragment$key = {
  readonly " $data"?: SupporterSlideFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterSlideFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupporterSlideFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerCanViewSupporterOnlyContent",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSupporterOnly",
      "storageKey": null
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "0278b53b0c05c9b2e0a44bd3a56efc8b";

export default node;
