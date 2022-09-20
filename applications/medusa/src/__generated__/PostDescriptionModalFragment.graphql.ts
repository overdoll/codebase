/**
 * @generated SignedSource<<76ace8cedbfd01cb7d2fe48654123b11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostDescriptionModalFragment$data = {
  readonly club: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostDescriptionFormFragment">;
  readonly " $fragmentType": "PostDescriptionModalFragment";
};
export type PostDescriptionModalFragment$key = {
  readonly " $data"?: PostDescriptionModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostDescriptionModalFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdatePostDescriptionFormFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "fc7c1fd018babe6bf8228f712cddb68d";

export default node;
