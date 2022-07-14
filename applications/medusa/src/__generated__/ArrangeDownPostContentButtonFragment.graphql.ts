/**
 * @generated SignedSource<<f05118fa110103d3182215d6a72871bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArrangeDownPostContentButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceInfoFragment">;
  readonly " $fragmentType": "ArrangeDownPostContentButtonFragment";
};
export type ArrangeDownPostContentButtonFragment$key = {
  readonly " $data"?: ArrangeDownPostContentButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeDownPostContentButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeDownPostContentButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourceInfoFragment"
    }
  ],
  "type": "PostContent",
  "abstractKey": null
};

(node as any).hash = "d8cdc66503af384f7eee330a9196b6c8";

export default node;
