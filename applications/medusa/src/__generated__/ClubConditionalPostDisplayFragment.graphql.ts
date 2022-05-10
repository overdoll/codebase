/**
 * @generated SignedSource<<c3bea071b714db74fc6dfc3d0802f166>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubConditionalPostDisplayFragment$data = {
  readonly slug: string;
  readonly canSupport: boolean;
  readonly viewerIsOwner: boolean;
  readonly suspension: {
    readonly __typename: string;
  } | null;
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonClubFragment" | "ClubExclusivePostsFragment" | "ClubTopPostsFragment">;
  readonly " $fragmentType": "ClubConditionalPostDisplayFragment";
};
export type ClubConditionalPostDisplayFragment = ClubConditionalPostDisplayFragment$data;
export type ClubConditionalPostDisplayFragment$key = {
  readonly " $data"?: ClubConditionalPostDisplayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubConditionalPostDisplayFragment">;
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
  "name": "ClubConditionalPostDisplayFragment",
  "selections": [
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
      "kind": "ScalarField",
      "name": "canSupport",
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
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "posts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Post",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "posts(first:1)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubButtonClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubExclusivePostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubTopPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "eb48318d3fe169f89ee94c75c210d704";

export default node;
