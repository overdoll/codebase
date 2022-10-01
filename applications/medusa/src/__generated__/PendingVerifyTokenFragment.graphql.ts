/**
 * @generated SignedSource<<2803fa65a9a7810d8d26df03bfffa351>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PendingVerifyTokenFragment$data = {
  readonly secure: boolean;
  readonly verified: boolean;
  readonly " $fragmentType": "PendingVerifyTokenFragment";
};
export type PendingVerifyTokenFragment$key = {
  readonly " $data"?: PendingVerifyTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PendingVerifyTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PendingVerifyTokenFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "verified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "secure",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "a3b50daab8b6a1d6642742d583b0990b";

export default node;
