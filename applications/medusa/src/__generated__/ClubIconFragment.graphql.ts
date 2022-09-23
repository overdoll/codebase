/**
 * @generated SignedSource<<c3c4cd115a86e7b685c0f6f962854b26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubIconFragment$data = {
  readonly id: string;
  readonly thumbnailMedia: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"IconMediaFragment">;
  } | null;
  readonly " $fragmentType": "ClubIconFragment";
};
export type ClubIconFragment$key = {
  readonly " $data"?: ClubIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubIconFragment",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "thumbnailMedia",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "IconMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "1a3034c022abae028348bb884db40317";

export default node;
