/**
 * @generated SignedSource<<97981c2939d96d436fb9b58d5ed883b7>>
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
export type RevokeSessionFragment = RevokeSessionFragment$data;
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
