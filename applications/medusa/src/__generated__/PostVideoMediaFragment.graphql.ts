/**
 * @generated SignedSource<<8a008e24e96d1aa47461bab360e821d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostVideoMediaFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ControlledVideoFragment" | "useVideoControlsFragment">;
  readonly " $fragmentType": "PostVideoMediaFragment";
};
export type PostVideoMediaFragment$key = {
  readonly " $data"?: PostVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostVideoMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostVideoMediaFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ControlledVideoFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useVideoControlsFragment"
    }
  ],
  "type": "Resource",
  "abstractKey": null
};

(node as any).hash = "b8bea36f7a9197e1828f08dd5225f03b";

export default node;
