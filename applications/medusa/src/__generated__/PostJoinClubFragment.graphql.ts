/**
 * @generated SignedSource<<e3b320f102ef09dc68d389fc653f885d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostJoinClubFragment$data = {
  readonly canSupport: boolean;
  readonly name: string;
  readonly slug: string;
  readonly viewerIsOwner: boolean;
  readonly viewerMember: {
    readonly isSupporter: boolean;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinConditionWrapperFragment" | "ClubSupportPostConditionWrapperFragment">;
  readonly " $fragmentType": "PostJoinClubFragment";
};
export type PostJoinClubFragment$key = {
  readonly " $data"?: PostJoinClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostJoinClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostJoinClubFragment",
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
      "kind": "ScalarField",
      "name": "slug",
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
          "name": "isSupporter",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canSupport",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinConditionWrapperFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportPostConditionWrapperFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "29d84e2eb310c2a29520dbb7c70a61b5";

export default node;
