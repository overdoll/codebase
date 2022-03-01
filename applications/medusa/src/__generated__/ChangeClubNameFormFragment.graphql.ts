/**
 * @generated SignedSource<<92e12ea7d89759a227b3ee5024a0ae94>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubNameFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeClubNameFormFragment";
};
export type ChangeClubNameFormFragment = ChangeClubNameFormFragment$data;
export type ChangeClubNameFormFragment$key = {
  readonly " $data"?: ChangeClubNameFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubNameFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeClubNameFormFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      "action": "THROW",
      "path": "id"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "2d319a89c67dbbcad5c46aece922ad73";

export default node;
