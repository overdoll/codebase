/**
 * @generated SignedSource<<698b0aef1d69c101e724cd00c3e0807a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportSelectMethodFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodFragment">;
  readonly " $fragmentType": "ClubSupportSelectMethodFragment";
};
export type ClubSupportSelectMethodFragment$key = {
  readonly " $data"?: ClubSupportSelectMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportSelectMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportSelectMethodFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportSelectMethodFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "8f0e52d560e63a9fd6e74fadd09b7d11";

export default node;
