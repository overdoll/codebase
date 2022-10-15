/**
 * @generated SignedSource<<d71544ae6f39882434a44b2b18491048>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinBannerFragment$data = {
  readonly canSupport: boolean;
  readonly name: string;
  readonly viewerIsOwner: boolean;
  readonly viewerMember: {
    readonly __typename: "ClubMember";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonFragment">;
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
      "name": "ClubJoinButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "08f89b0e07b2af842234692447056e32";

export default node;
