/**
 * @generated SignedSource<<5e19e53267c824e0422df9710df2777b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RevokeSessionFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "RevokeSessionFragment";
};
export type RevokeSessionFragment$key = {
  readonly " $data"?: RevokeSessionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeSessionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RevokeSessionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "AccountSession",
  "abstractKey": null
};

(node as any).hash = "a9c954e8aff1aab33a851f19553e0eca";

export default node;
