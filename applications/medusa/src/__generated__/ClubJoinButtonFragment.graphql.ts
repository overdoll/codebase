/**
 * @generated SignedSource<<e72395d9b6d790e73a1bd60fdee98622>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinButtonFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
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
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "184c76bc0cfb4422d1bf06c82a9b5b87";

export default node;
