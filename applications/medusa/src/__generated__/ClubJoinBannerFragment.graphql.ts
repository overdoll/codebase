/**
 * @generated SignedSource<<96bdaf67b00efd2466ca1c84e0bafd33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinBannerFragment$data = {
  readonly viewerIsOwner: boolean;
  readonly viewerMember: {
    readonly __typename: "ClubMember";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperFragment">;
  readonly " $fragmentType": "ClubJoinBannerFragment";
};
export type ClubJoinBannerFragment$key = {
  readonly " $data"?: ClubJoinBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinBannerFragment",
  "selections": [
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
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

(node as any).hash = "b229325cefc75da04a5b045908e097e6";

export default node;
