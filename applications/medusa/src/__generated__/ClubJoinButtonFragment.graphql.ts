/**
 * @generated SignedSource<<b3449e0ddff3479e05cfa26f04fc417f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinButtonFragment$data = {
  readonly viewerIsOwner: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinLoggedOutButtonFragment" | "ClubJoinWrapperFragment">;
  readonly " $fragmentType": "ClubJoinButtonFragment";
};
export type ClubJoinButtonFragment$key = {
  readonly " $data"?: ClubJoinButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinLoggedOutButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinWrapperFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "dd17f0ea0f331cd06dec20be7f36725d";

export default node;
