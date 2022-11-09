/**
 * @generated SignedSource<<ca55b7fb1a444d167c87fdf1a59f1d33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubHeaderFragment$data = {
  readonly header: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubHeaderMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "ClubHeaderFragment";
};
export type ClubHeaderFragment$key = {
  readonly " $data"?: ClubHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubHeaderFragment",
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
      "name": "header",
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
          "name": "ClubHeaderMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "d42b6bdefeed18c50476f8c01b03d97e";

export default node;
