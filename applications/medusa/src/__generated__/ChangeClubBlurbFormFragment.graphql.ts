/**
 * @generated SignedSource<<7dda70ca6940eaf98035cb3ba5103b30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeClubBlurbFormFragment$data = {
  readonly blurb: string;
  readonly id: string;
  readonly " $fragmentType": "ChangeClubBlurbFormFragment";
};
export type ChangeClubBlurbFormFragment$key = {
  readonly " $data"?: ChangeClubBlurbFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeClubBlurbFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeClubBlurbFormFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blurb",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "d70542c8d0c9c1de18e5495e5868f6db";

export default node;
