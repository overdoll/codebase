/**
 * @generated SignedSource<<26cec01ab7f18b4a7a0da1941e60b059>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProcessContentFragment$data = {
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"isFailedFragment" | "isProcessedFragment">;
  readonly " $fragmentType": "ProcessContentFragment";
};
export type ProcessContentFragment$key = {
  readonly " $data"?: ProcessContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessContentFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessContentFragment",
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
      "name": "isProcessedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "isFailedFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "8392037791b20e3aaedf76104009603a";

export default node;
