/**
 * @generated SignedSource<<d24b078bb3931a0241bd8ce3c080eb54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubShareTwitterButtonFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ClubShareTwitterButtonFragment";
};
export type ClubShareTwitterButtonFragment$key = {
  readonly " $data"?: ClubShareTwitterButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubShareTwitterButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubShareTwitterButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "9a77845fbf988f409df539a4b2e1550d";

export default node;
