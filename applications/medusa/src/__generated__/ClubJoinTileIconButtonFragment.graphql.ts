/**
 * @generated SignedSource<<0359a30287f033181e8b6f3a00633a12>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinTileIconButtonFragment$data = {
  readonly name: string;
  readonly viewerMember: {
    readonly __typename: "ClubMember";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperFragment" | "ClubTileOverlayFragment">;
  readonly " $fragmentType": "ClubJoinTileIconButtonFragment";
};
export type ClubJoinTileIconButtonFragment$key = {
  readonly " $data"?: ClubJoinTileIconButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinTileIconButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinTileIconButtonFragment",
  "selections": [
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
      "concreteType": "ClubMember",
      "kind": "LinkedField",
      "name": "viewerMember",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubTileOverlayFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinConditionWrapperFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "94efd4ac9526a415991ca5de2b9e6d79";

export default node;
