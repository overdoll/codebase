/**
 * @generated SignedSource<<0b548b36f7cef4dbe4e4ffa2b77b6a83>>
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
  readonly " $fragmentSpreads": FragmentRefs<"SupporterLockedContentFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupporterLockedContentFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "32b49e7ce946cea3a896a2e19d104623";

export default node;
