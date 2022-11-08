/**
 * @generated SignedSource<<685876c8f04a872eded495b9ae440c2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscoverClubPreviewFragment$data = {
  readonly header: {
    readonly __typename: string;
  } | null;
  readonly name: string;
  readonly slug: string;
  readonly viewerMember: {
    readonly __typename: "ClubMember";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBannerFragment" | "ClubHeaderFragment" | "ClubIconFragment" | "ClubJoinButtonFragment" | "ClubJoinLoggedOutButtonFragment">;
  readonly " $fragmentType": "DiscoverClubPreviewFragment";
};
export type DiscoverClubPreviewFragment$key = {
  readonly " $data"?: DiscoverClubPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubPreviewFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscoverClubPreviewFragment",
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
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "header",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinLoggedOutButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "b647088e3b7397625563406596294b7e";

export default node;
