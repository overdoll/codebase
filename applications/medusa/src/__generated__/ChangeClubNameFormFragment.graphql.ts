/**
 * @generated SignedSource<<3afcfff664dd07e4a55885d2a4590df5>>
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
