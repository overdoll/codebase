/**
 * @generated SignedSource<<ef62b94ef28c7b5f9a3349e73fa22a4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinModalProviderFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "JoinModalProviderFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "JoinModalProviderFragment";
};
export type JoinModalProviderFragment$key = {
  readonly " $data"?: JoinModalProviderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinModalProviderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinModalProviderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "809fa7162931859212960951af1b5d0f";

export default node;
