/**
 * @generated SignedSource<<3eec1d47de082c918a0d88bb54e68345>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubLeaveButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ClubLeaveButtonFragment";
};
export type ClubLeaveButtonFragment$key = {
  readonly " $data"?: ClubLeaveButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubLeaveButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubLeaveButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "c8b15cf039d8b54a9d407140c514d89c";

export default node;
